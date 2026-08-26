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
  linkedin: "https://www.linkedin.com/company/stackbinary",
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
  const isAutomation = (service || "").startsWith("AI Automation");
  const isAiServices = (service || "").startsWith("AI Services");
  const intro = isAutomation
    ? "our team is reviewing where your hours go, and we will come back with the three automations worth building first rather than a generic pitch"
    : isMartech
    ? "one of our martech engineers is going through your stack details and will come back with first observations rather than a generic pitch"
    : isAiServices
    ? "one of our engineers is reading through what you want to build and will come back with scope and a straight answer on fit"
    : "our team is going through the details and will come back with concrete next steps rather than a generic pitch";

  const detail = [
    service ? `Service: ${service}` : "",
    budget ? `Budget: ${budget}` : "",
    timeline ? `Timeline: ${timeline}` : "",
  ].filter(Boolean).join("<br />");

  // DELIBERATELY PLAIN. This is a one-to-one reply, and Gmail sorts on shape:
  // logo images, nested tables, pill badges, brand colour blocks and several
  // CTAs are what put the previous version in Promotions. One narrow column,
  // system font, a single link, no images. Do not "improve" this with a
  // header banner or buttons, that is exactly what breaks it.
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:24px;background:#ffffff;">
  <div style="max-width:520px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;">
    <p style="margin:0 0 16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;">Thanks for getting in touch. Your enquiry has reached us and ${intro}. You should hear back within one working day.</p>
    ${detail ? `<p style="margin:0 0 16px;color:#555;">What you sent us:<br />${detail}</p>` : ""}
    <p style="margin:0 0 16px;">If it is easier to talk it through, you can pick a slot here: <a href="${BRAND.calendly}" style="color:#1a1a1a;">${BRAND.calendly}</a></p>
    <p style="margin:0 0 16px;">If anything has changed in the meantime, just reply to this email. It comes straight to us.</p>
    <p style="margin:0;">The Stackbinary team<br /><span style="color:#777;">${BRAND.site}</span></p>
  </div>
</body>
</html>`;
}

export function confirmationEmailText({ fullName, service, budget, timeline }) {
  const firstName = (fullName || "there").split(" ")[0];
  const detail = [
    service ? `Service: ${service}` : "",
    budget ? `Budget: ${budget}` : "",
    timeline ? `Timeline: ${timeline}` : "",
  ].filter(Boolean).join("\n");
  return `Hi ${firstName},

Thanks for getting in touch. Your enquiry has reached us and our team is going through the details. You should hear back within one working day.
${detail ? `\nWhat you sent us:\n${detail}\n` : ""}
If it is easier to talk it through, you can pick a slot here:
${BRAND.calendly}

If anything has changed in the meantime, just reply to this email. It comes straight to us.

The Stackbinary team
${BRAND.site}`;
}

// German confirmation, for leads with lead_source 'de-kontakt'. Same
// deliberately plain shape as the English one (that shape is what keeps these
// out of Promotions/Werbung tabs), Sie-Form throughout, no dashes, signed
// "Das Stackbinary Team". The promise matches the /de/kontakt page: reply
// within one Werktag from the German-speaking contact.
export function confirmationEmailHtmlDe({ fullName, service }) {
  const firstName = (fullName || "").split(" ")[0] || "";
  const anrede = firstName ? `Guten Tag ${firstName},` : "Guten Tag,";
  const serviceLine = service ? `<p style="margin:0 0 16px;color:#555;">Ihre Anfrage: ${String(service).replace("DE: ", "")}</p>` : "";
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:24px;background:#ffffff;">
  <div style="max-width:520px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;">
    <p style="margin:0 0 16px;">${anrede}</p>
    <p style="margin:0 0 16px;">vielen Dank für Ihre Anfrage. Sie ist bei uns angekommen, und Ihr deutschsprachiger Ansprechpartner meldet sich innerhalb eines Werktags bei Ihnen, mit einer ehrlichen Einschätzung statt einer Verkaufspräsentation.</p>
    ${serviceLine}
    <p style="margin:0 0 16px;">Wenn sich in der Zwischenzeit etwas ändert, antworten Sie einfach auf diese E-Mail. Sie erreicht uns direkt.</p>
    <p style="margin:0;">Das Stackbinary Team<br /><span style="color:#777;">${BRAND.site}</span></p>
  </div>
</body>
</html>`;
}

export function confirmationEmailTextDe({ fullName, service }) {
  const firstName = (fullName || "").split(" ")[0] || "";
  const anrede = firstName ? `Guten Tag ${firstName},` : "Guten Tag,";
  const serviceLine = service ? `\nIhre Anfrage: ${String(service).replace("DE: ", "")}\n` : "";
  return `${anrede}

vielen Dank für Ihre Anfrage. Sie ist bei uns angekommen, und Ihr deutschsprachiger Ansprechpartner meldet sich innerhalb eines Werktags bei Ihnen, mit einer ehrlichen Einschätzung statt einer Verkaufspräsentation.
${serviceLine}
Wenn sich in der Zwischenzeit etwas ändert, antworten Sie einfach auf diese E-Mail. Sie erreicht uns direkt.

Das Stackbinary Team
${BRAND.site}`;
}
