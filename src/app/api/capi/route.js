// Meta Conversions API relay endpoint.
//
// Browser code posts here; the access token stays server-side. The sending
// logic lives in @/lib/meta-capi so server routes that already hold a lead's
// real email can call it directly instead of round-tripping through here.

import { sendMetaEvent, readMetaCookies } from "@/lib/meta-capi";

export async function POST(request) {
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ ok: false, error: "bad json" }, { status: 400 });
	}
	if (!body?.eventName) {
		return Response.json({ ok: false, error: "eventName required" }, { status: 400 });
	}

	const { fbp, fbc } = readMetaCookies(request.headers.get("cookie"));
	const forwarded = request.headers.get("x-forwarded-for") || "";

	const result = await sendMetaEvent({
		eventName: body.eventName,
		eventId: body.eventId,
		sourceUrl: body.sourceUrl,
		email: body.email,
		phone: body.phone,
		fbclid: body.fbclid,
		fbp,
		fbc,
		clientIp: forwarded.split(",")[0].trim() || undefined,
		userAgent: request.headers.get("user-agent") || undefined,
		customData: body.customData,
	});

	return Response.json(result);
}
