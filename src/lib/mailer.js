// One transport decision for all outbound mail, shared by every API route.
//
// Priority mirrors the careers route (where this chain was first proven):
// RESEND_API_KEY (host/user are fixed for Resend, the key alone is enough)
// > generic SMTP_* (any transactional provider) > SES_SMTP_* (kept for the
// pending AWS reconsideration) > the Gmail account. Gmail is last because it
// shares one 2,000/day cap across everything sent from this account — the
// coupling that forced the 2026-08-03 careers kill switch.
//
// Transport is a pure env decision so switching providers never needs a
// deploy.

import nodemailer from "nodemailer";

export function mailConfigured() {
  return !!(
    process.env.RESEND_API_KEY ||
    (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) ||
    (process.env.SES_SMTP_USER && process.env.SES_SMTP_PASS) ||
    (process.env.EMAIL && process.env.EMAIL_PASSWORD)
  );
}

export function buildMailTransport() {
  if (process.env.RESEND_API_KEY) {
    return nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 587,
      secure: false,
      auth: { user: "resend", pass: process.env.RESEND_API_KEY },
    });
  }
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  if (process.env.SES_SMTP_USER && process.env.SES_SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SES_SMTP_HOST || "email-smtp.ap-south-1.amazonaws.com",
      port: 587,
      secure: false, // STARTTLS on 587; SES rejects implicit TLS here
      auth: { user: process.env.SES_SMTP_USER, pass: process.env.SES_SMTP_PASS },
    });
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
  });
}
