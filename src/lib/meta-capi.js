// Meta Conversions API sender.
//
// The browser pixel sends the same events with the same event_id; Meta
// deduplicates the pair and keeps whichever copy matched better. Server
// copies survive ad blockers and iOS tracking prevention, and carry the
// hashed email or phone once a form has given us one.
//
// The access token is server-only and never reaches the browser.

import { createHash } from "crypto";

const DATASET_ID = process.env.META_DATASET_ID;
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
// Set to a code from Events Manager > Test events to watch events land there
// instead of counting as production traffic. Leave unset in normal operation.
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

/** Meta requires PII to be SHA-256 of the normalized (trimmed, lowercased) value. */
function hash(value) {
	if (!value || typeof value !== "string") return undefined;
	const normalized = value.trim().toLowerCase();
	if (!normalized) return undefined;
	return createHash("sha256").update(normalized).digest("hex");
}

/** Phones normalize to digits with country code. Indian forms collect bare
 *  10-digit numbers; without the 91 prefix Meta cannot match them. */
function hashPhone(value) {
	if (!value || typeof value !== "string") return undefined;
	let digits = value.replace(/\D/g, "");
	if (!digits) return undefined;
	if (digits.length === 10) digits = `91${digits}`;
	return createHash("sha256").update(digits).digest("hex");
}

function readCookie(header, name) {
	if (!header) return undefined;
	for (const part of header.split(";")) {
		const [k, ...rest] = part.trim().split("=");
		if (k === name) return rest.join("=");
	}
	return undefined;
}

/** Send one event to Meta. Exported so server routes that already hold a
 *  lead's real email (contact form, careers) can report conversions directly,
 *  without depending on the browser surviving the redirect. */
export async function sendMetaEvent({
	eventName,
	eventId,
	sourceUrl,
	email,
	phone,
	fbclid,
	fbp,
	fbc,
	clientIp,
	userAgent,
	customData,
}) {
	// Distinguish "not configured" from "Meta refused it": without this the
	// caller cannot tell a missing env var from a bad payload.
	if (!DATASET_ID || !ACCESS_TOKEN) return { ok: false, reason: "unconfigured" };
	if (!eventName) return { ok: false, reason: "no-event-name" };

	const eventTime = Math.floor(Date.now() / 1000);
	const userData = {
		client_ip_address: clientIp,
		client_user_agent: userAgent,
		fbp,
		// fbc encodes the ad click: prefer the cookie the pixel wrote, else
		// synthesize it from fbclid, which is what keeps a click attributable
		// when the pixel is blocked.
		fbc: fbc || (fbclid ? `fb.1.${eventTime * 1000}.${fbclid}` : undefined),
	};
	const em = hash(email);
	const ph = hashPhone(phone);
	if (em) userData.em = [em];
	if (ph) userData.ph = [ph];

	const payload = {
		event_name: eventName,
		event_time: eventTime,
		action_source: "website",
		event_source_url: sourceUrl,
		event_id: eventId,
		user_data: userData,
	};
	if (customData && typeof customData === "object") payload.custom_data = customData;

	const form = new URLSearchParams();
	form.set("access_token", ACCESS_TOKEN);
	form.set("data", JSON.stringify([payload]));
	if (TEST_EVENT_CODE) form.set("test_event_code", TEST_EVENT_CODE);

	try {
		const res = await fetch(`https://graph.facebook.com/v21.0/${DATASET_ID}/events`, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: form.toString(),
		});
		if (!res.ok) {
			const detail = await res.text();
			console.error("capi: Meta rejected event", eventName, detail);
			return { ok: false, reason: "rejected", detail: detail.slice(0, 300) };
		}
		return { ok: true };
	} catch (err) {
		console.error("capi: send failed", err);
		return { ok: false, reason: "network" };
	}
}

/** Read one cookie out of a raw Cookie header. */
export function readMetaCookies(header) {
	return { fbp: readCookie(header, "_fbp"), fbc: readCookie(header, "_fbc") };
}
