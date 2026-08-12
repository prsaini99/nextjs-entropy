// Careers-spillover detection for inbound leads.
//
// The hiring wave put thousands of job seekers on the site, and they reach for
// whatever input box is nearest: the contact form, the chatbot, the martech
// enquiry. Those submissions land in the same `leads` table as real buyers, so
// the pipeline reads as busier than it is and someone has to vet every row by
// hand before trusting a report.
//
// The check that actually settles it is cheap: the same person almost always
// applies with the same address they type into the form. One indexed lookup
// against career_applications turns a manual judgement call into a fact.
//
// Deliberately marks rather than drops. A candidate who asks a real business
// question is rare but possible, and silently discarding a submission is a
// worse failure than showing it in its own bucket.

import { supabaseAdmin } from "@/lib/supabase-admin";

/** Status given to leads that match a job applicant. Kept out of the sales
 *  statuses (new/contacted/qualified/...) so pipeline views can exclude it. */
export const CAREERS_STATUS = "careers";

/**
 * True when this email has applied for a job with us.
 *
 * Never throws: a vetting failure must not cost us the lead itself, so an
 * error here reads as "not a candidate" and the lead saves normally.
 */
export async function isCareersApplicant(email) {
	const address = String(email || "").trim().toLowerCase();
	if (!address) return false;

	try {
		const { data, error } = await supabaseAdmin
			.from("career_applications")
			.select("id", { head: false })
			.ilike("email", address)
			.limit(1);

		if (error) {
			console.error("careers vetting: lookup failed:", error);
			return false;
		}
		return Array.isArray(data) && data.length > 0;
	} catch (err) {
		console.error("careers vetting: lookup threw:", err);
		return false;
	}
}

/**
 * Stamp a lead row as careers spillover, in place.
 *
 * Zeroes the score as well as setting the status: lead_score drives sorting in
 * the admin, and a candidate should never sit at the top of the list.
 */
export function markAsCareers(leadData) {
	leadData.status = CAREERS_STATUS;
	leadData.lead_score = 0;
	const note = "Matched a job application on this email address.";
	leadData.project_summary = leadData.project_summary
		? `[careers] ${note} Original: ${leadData.project_summary}`
		: `[careers] ${note}`;
	return leadData;
}

/**
 * Vet then stamp. Returns true when the lead was marked as careers.
 */
export async function applyCareersVetting(leadData) {
	const isCandidate = await isCareersApplicant(leadData.work_email);
	if (isCandidate) markAsCareers(leadData);
	return isCandidate;
}
