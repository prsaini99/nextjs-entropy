// Career application emails: a branded confirmation to the applicant, and an
// internal notification to the team.
//
// Same email-client-safe rules as email-templates.js: table layout, inline
// styles, hosted assets only, no external CSS.
//
// Written for the audience that actually applies here — students and early
// career engineers — so the confirmation is warm and concrete about what
// happens next, rather than the corporate "we will contact you if shortlisted"
// that tells a candidate nothing.

import { CONTACT_EMAIL } from "@/constants/contact";

const BRAND = {
  accent: "#ed5145",
  dark: "#0a0a0a",
  card: "#141414",
  border: "#2a2a2a",
  text: "#ededed",
  muted: "#9a9a9a",
  logo: "https://stackbinary.io/stack-logo.png",
  site: "https://stackbinary.io",
  careers: "https://stackbinary.io/careers",
  linkedin: "https://www.linkedin.com/company/stackbinary",
  email: CONTACT_EMAIL,
};

// Any applicant-supplied string that lands in HTML goes through this first.
// A CV or a "why StackBinary" answer containing < or & would otherwise break
// the markup, and in the internal email it would be markup we then read.
function esc(v) {
  if (v === null || v === undefined) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label, value) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:13px;color:${BRAND.muted};width:38%;vertical-align:top;">${esc(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:13px;color:${BRAND.text};font-weight:600;">${esc(value)}</td>
    </tr>`;
}

function block(label, value) {
  if (!value) return "";
  return `
    <tr>
      <td colspan="2" style="padding:14px 0 0;">
        <div style="font-size:11px;letter-spacing:1.2px;color:${BRAND.muted};text-transform:uppercase;font-weight:bold;padding-bottom:6px;">${esc(label)}</div>
        <div style="font-size:13px;line-height:1.65;color:${BRAND.text};white-space:pre-wrap;">${esc(value)}</div>
      </td>
    </tr>`;
}

/* ── Applicant confirmation ─────────────────────────────────────────────── */

export function applicationConfirmationHtml({ firstName, jobTitle }) {
  const name = esc(firstName || "there");
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StackBinary — Application received</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.dark};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.dark};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td align="center" style="padding:8px 0 28px;">
              <a href="${BRAND.site}" style="text-decoration:none;">
                <img src="${BRAND.logo}" width="170" alt="StackBinary" style="display:block;border:0;" />
              </a>
            </td>
          </tr>

          <tr>
            <td style="background-color:${BRAND.card};border:1px solid ${BRAND.border};border-radius:12px;padding:36px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;">
                    <div style="display:inline-block;border:1px solid ${BRAND.accent};border-radius:999px;padding:6px 14px;font-size:11px;letter-spacing:1.5px;color:${BRAND.accent};font-weight:bold;text-transform:uppercase;">
                      Application received ✓
                    </div>
                    <h1 style="margin:20px 0 12px;font-size:26px;line-height:1.25;color:#ffffff;">
                      Thanks, ${name}. We have your application.
                    </h1>
                    <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:${BRAND.muted};">
                      Your application for <strong style="color:${BRAND.text};">${esc(jobTitle || "the role")}</strong> is with our engineering team. A person reads every application here, not a keyword filter.
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.text};font-weight:bold;">
                      We will get back to you.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-top:16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.card};border:1px solid ${BRAND.border};border-radius:12px;">
                <tr>
                  <td style="padding:24px 32px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="font-size:11px;letter-spacing:1.5px;color:${BRAND.muted};font-weight:bold;text-transform:uppercase;padding-bottom:14px;">
                      What happens next
                    </div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="top" style="width:28px;font-size:14px;color:${BRAND.accent};font-weight:bold;padding-bottom:12px;">01</td>
                        <td style="font-size:13px;line-height:1.6;color:${BRAND.text};padding-bottom:12px;">Your application goes to the team hiring for this role.</td>
                      </tr>
                      <tr>
                        <td valign="top" style="width:28px;font-size:14px;color:${BRAND.accent};font-weight:bold;padding-bottom:12px;">02</td>
                        <td style="font-size:13px;line-height:1.6;color:${BRAND.text};padding-bottom:12px;">We read it properly, your CV and your answers, against what the role actually needs.</td>
                      </tr>
                      <tr>
                        <td valign="top" style="width:28px;font-size:14px;color:${BRAND.accent};font-weight:bold;">03</td>
                        <td style="font-size:13px;line-height:1.6;color:${BRAND.text};">If there is a fit, we get in touch to set up an intro call.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-top:16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.card};border:1px solid ${BRAND.border};border-radius:12px;">
                <tr>
                  <td align="center" style="padding:24px 32px;font-family:Arial,Helvetica,sans-serif;">
                    <p style="margin:0 0 14px;font-size:13px;line-height:1.65;color:${BRAND.text};">
                      We announce new roles and ship-updates on <strong>LinkedIn</strong> first —
                      follow StackBinary to hear about them before they are posted anywhere else.
                    </p>
                    <a href="${BRAND.linkedin}" style="display:inline-block;border:1px solid ${BRAND.accent};color:${BRAND.accent};font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;text-decoration:none;padding:11px 26px;border-radius:999px;">
                      Follow StackBinary on LinkedIn
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:28px 0 8px;">
              <a href="${BRAND.careers}" style="display:inline-block;background-color:${BRAND.accent};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;padding:14px 32px;border-radius:999px;">
                See our other open roles
              </a>
              <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};">
                Questions? Just reply to this email.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:28px 12px 8px;border-top:1px solid ${BRAND.border};font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 6px;font-size:12px;color:${BRAND.muted};">
                <strong style="color:${BRAND.text};">StackBinary™</strong> · AI, Cloud &amp; Custom Software that ship and scale
              </p>
              <p style="margin:0;font-size:11px;">
                <a href="${BRAND.site}" style="color:${BRAND.accent};text-decoration:none;">stackbinary.io</a>
                &nbsp;·&nbsp;
                <a href="mailto:${BRAND.email}" style="color:${BRAND.accent};text-decoration:none;">${BRAND.email}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function applicationConfirmationText({ firstName, jobTitle }) {
  const name = firstName || "there";
  return `Hi ${name},

We have your application for ${jobTitle || "the role"}. A person reads every application here, not a keyword filter.

We will get back to you.

What happens next:
1. Your application goes to the team hiring for this role.
2. We read it properly, your CV and your answers, against what the role actually needs.
3. If there is a fit, we get in touch to set up an intro call.

We announce new roles and ship-updates on LinkedIn first — follow StackBinary
to hear about them before they are posted anywhere else:
https://www.linkedin.com/company/stackbinary

Other open roles: https://stackbinary.io/careers
Questions? Just reply to this email.

StackBinary(TM)
https://stackbinary.io`;
}

/* ── Internal notification ──────────────────────────────────────────────── */

export function applicationNotificationHtml(a) {
  const fullName = `${a.firstName || ""} ${a.lastName || ""}`.trim() || "Unnamed applicant";
  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:${BRAND.dark};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.dark};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background-color:${BRAND.card};border:1px solid ${BRAND.border};border-radius:12px;padding:28px 32px;font-family:Arial,Helvetica,sans-serif;">
              <div style="font-size:11px;letter-spacing:1.5px;color:${BRAND.accent};font-weight:bold;text-transform:uppercase;">New application</div>
              <h1 style="margin:12px 0 4px;font-size:22px;line-height:1.3;color:#ffffff;">${esc(fullName)}</h1>
              <div style="font-size:14px;color:${BRAND.muted};">applied for <strong style="color:${BRAND.text};">${esc(a.jobTitle || "-")}</strong></div>
            </td>
          </tr>

          <tr>
            <td style="padding-top:16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.card};border:1px solid ${BRAND.border};border-radius:12px;">
                <tr>
                  <td style="padding:24px 32px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="font-size:11px;letter-spacing:1.5px;color:${BRAND.muted};font-weight:bold;text-transform:uppercase;padding-bottom:6px;">Candidate</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${row("Email", a.email)}
                      ${row("Phone", a.phone)}
                      ${row("Location", a.location)}
                      ${row("Work eligibility", a.workEligibility)}
                      ${row("Experience", a.yearsOfExperience)}
                      ${row("Available from", a.availabilityDate)}
                      ${row("Salary expectation", a.salaryExpectations)}
                      ${row("Portfolio", a.portfolioUrl)}
                      ${row("LinkedIn", a.linkedinUrl)}
                      ${row("GitHub", a.githubUrl)}
                      ${row("CV", a.resumeFilename ? `${a.resumeFilename} — in Supabase storage` : "not attached")}
                      ${block("Key strengths", a.technicalSkills)}
                      ${block("Relevant experience", a.relevantProjects)}
                      ${block("In their words", a.additionalInfo)}
                      ${block("Role questions", a.roleAnswers)}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:24px 0 8px;">
              <a href="${BRAND.site}/admin/leads" style="display:inline-block;background-color:${BRAND.accent};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;padding:13px 30px;border-radius:999px;">
                Open the admin dashboard
              </a>
              <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${BRAND.muted};">
                Submitted ${esc(submittedAt)} IST${a.applicationId ? ` · ID ${esc(a.applicationId)}` : ""}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function applicationNotificationText(a) {
  const fullName = `${a.firstName || ""} ${a.lastName || ""}`.trim() || "Unnamed applicant";
  const line = (label, value) => (value ? `${label}: ${value}\n` : "");
  return `NEW APPLICATION — ${a.jobTitle || "-"}

${fullName}
${line("Email", a.email)}${line("Phone", a.phone)}${line("Location", a.location)}${line("Work eligibility", a.workEligibility)}${line("Experience", a.yearsOfExperience)}${line("Available from", a.availabilityDate)}${line("Salary expectation", a.salaryExpectations)}${line("Portfolio", a.portfolioUrl)}${line("LinkedIn", a.linkedinUrl)}${line("GitHub", a.githubUrl)}${line("CV", a.resumeFilename || "not attached")}
${a.technicalSkills ? `\nKey strengths:\n${a.technicalSkills}\n` : ""}${a.relevantProjects ? `\nRelevant experience:\n${a.relevantProjects}\n` : ""}${a.additionalInfo ? `\nIn their words:\n${a.additionalInfo}\n` : ""}${a.roleAnswers ? `\nRole questions:\n${a.roleAnswers}\n` : ""}
Submitted ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST${a.applicationId ? ` · ID ${a.applicationId}` : ""}
`;
}
