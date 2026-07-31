// Every outward-facing address in one place.
//
// Before this file the site used six different addresses across nine files —
// contact@, prateek@, careers@, privacy@, hello@ and admin@stackbinary.com —
// several of which were never live mailboxes, so enquiries sent to them went
// nowhere. Consolidated onto contact@stackbinary.io (2026-07-31).
//
// prateek@ deliberately survives in lib/admins.js: that is a dashboard *login*
// identity, not a contact address, and the two should not be conflated.

/** The address humans should write to, and the address mail is sent from. */
export const CONTACT_EMAIL = 'contact@stackbinary.io';

/** Where internal notifications land (new leads, applications). */
export const NOTIFY_EMAIL = CONTACT_EMAIL;

/** Named in the privacy policy for data-rights requests. */
export const PRIVACY_EMAIL = CONTACT_EMAIL;

/** Named on job listings. */
export const CAREERS_EMAIL = CONTACT_EMAIL;

/** Display name used on outbound mail. */
export const MAIL_FROM = `"StackBinary™" <${CONTACT_EMAIL}>`;
