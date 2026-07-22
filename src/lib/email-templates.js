// Branded transactional email templates.
// Email-client-safe: table layout, inline styles, hosted assets only.

const BRAND = {
  accent: "#ed5145",
  dark: "#0a0a0a",
  card: "#141414",
  border: "#2a2a2a",
  text: "#ededed",
  muted: "#9a9a9a",
  logo: "https://stackbinary.io/stack-logo.png",
  site: "https://stackbinary.io",
  calendly: "https://calendly.com/stackbinary/30min",
  whatsapp: "https://wa.me/918928028738",
  email: "contact@stackbinary.io",
};

function row(label, value) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:13px;color:${BRAND.muted};width:40%;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:13px;color:${BRAND.text};font-weight:600;">${value}</td>
    </tr>`;
}

export function confirmationEmailHtml({ fullName, service, budget, timeline }) {
  const firstName = (fullName || "there").split(" ")[0];
  const isMartech = (service || "").startsWith("MarTech");
  const intro = isMartech
    ? "Your MarTech inquiry is in. Our team is reviewing your stack details and one of our martech engineers will get back to you with first observations — not a generic sales pitch."
    : "Your project inquiry is in. Our team is reviewing the details and will get back to you with concrete next steps — not a generic sales pitch.";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StackBinary — We've received your inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.dark};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.dark};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:8px 0 28px;">
              <a href="${BRAND.site}" style="text-decoration:none;">
                <img src="${BRAND.logo}" width="170" alt="StackBinary" style="display:block;border:0;" />
              </a>
            </td>
          </tr>

          <!-- Hero card -->
          <tr>
            <td style="background-color:${BRAND.card};border:1px solid ${BRAND.border};border-radius:12px;padding:36px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;">
                    <div style="display:inline-block;border:1px solid ${BRAND.accent};border-radius:999px;padding:6px 14px;font-size:11px;letter-spacing:1.5px;color:${BRAND.accent};font-weight:bold;text-transform:uppercase;">
                      Inquiry received ✓
                    </div>
                    <h1 style="margin:20px 0 12px;font-size:26px;line-height:1.25;color:#ffffff;">
                      You're in the pipeline, ${firstName}.
                    </h1>
                    <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:${BRAND.muted};">
                      ${intro}
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.text};font-weight:bold;">
                      Expect a reply within one business day.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Submission summary -->
          <tr>
            <td style="padding-top:16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.card};border:1px solid ${BRAND.border};border-radius:12px;padding:0;">
                <tr>
                  <td style="padding:24px 32px;font-family:Arial,Helvetica,sans-serif;">
                    <div style="font-size:11px;letter-spacing:1.5px;color:${BRAND.muted};font-weight:bold;text-transform:uppercase;padding-bottom:6px;">
                      What you told us
                    </div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${row("Service", service)}
                      ${row("Budget range", budget)}
                      ${row("Timeline", timeline)}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What happens next -->
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
                        <td style="font-size:13px;line-height:1.6;color:${BRAND.text};padding-bottom:12px;">We review your inquiry and map it against work we've already shipped.</td>
                      </tr>
                      <tr>
                        <td valign="top" style="width:28px;font-size:14px;color:${BRAND.accent};font-weight:bold;padding-bottom:12px;">02</td>
                        <td style="font-size:13px;line-height:1.6;color:${BRAND.text};padding-bottom:12px;">You get a reply with first observations and a suggested call slot.</td>
                      </tr>
                      <tr>
                        <td valign="top" style="width:28px;font-size:14px;color:${BRAND.accent};font-weight:bold;">03</td>
                        <td style="font-size:13px;line-height:1.6;color:${BRAND.text};">On the call: scope, timeline and a straight answer on whether we're the right fit.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:28px 0 8px;">
              <a href="${BRAND.calendly}" style="display:inline-block;background-color:${BRAND.accent};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;padding:14px 32px;border-radius:999px;">
                Skip the wait — book a call now
              </a>
              <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};">
                Or reply to this email · <a href="${BRAND.whatsapp}" style="color:${BRAND.accent};text-decoration:none;">WhatsApp us</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:28px 12px 8px;border-top:1px solid ${BRAND.border};font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 6px;font-size:12px;color:${BRAND.muted};">
                <strong style="color:${BRAND.text};">StackBinary™</strong> · AI, Cloud &amp; Custom Software that ship and scale
              </p>
              <p style="margin:0 0 6px;font-size:11px;color:${BRAND.muted};">
                16192 Coastal Highway, Lewes, Delaware 19958 · Spring Grove Towers, Kandivali East, Mumbai 400101
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

export function confirmationEmailText({ fullName }) {
  const firstName = (fullName || "there").split(" ")[0];
  return `Hi ${firstName},

Thank you for your inquiry — you're in the pipeline. Our team is reviewing the details and will get back to you within one business day.

What happens next:
1. We review your inquiry and map it against work we've already shipped.
2. You get a reply with first observations and a suggested call slot.
3. On the call: scope, timeline and a straight answer on whether we're the right fit.

Skip the wait — book a call: https://calendly.com/stackbinary/30min
WhatsApp: https://wa.me/918928028738

Best regards,
StackBinary(TM) Team
https://stackbinary.io`;
}
