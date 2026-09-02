'use client';
import { useState } from 'react';
import {
  trackEvent,
  trackFormInteraction,
  trackConversion,
  ANALYTICS_EVENTS,
} from '@/lib/analytics';

// German contact form. Posts to the same /api/contact endpoint as the English
// form so every lead lands in ONE leads table, but stamped lead_source
// 'de-kontakt' so German enquiries route straight to the German sales
// colleague and are countable on their own in the Monday report.
//
// Service values are prefixed "DE:" on purpose: the lead scorer keys off the
// English service titles and would score German ones zero anyway; the prefix
// makes the German pipeline unmistakable in Supabase instead of pretending to
// be scored.

const LEISTUNGEN = [
  'DE: Individualsoftware',
  'DE: KI Entwicklung',
  'DE: KI-Agenten',
  'DE: KI im Kundenservice',
  'DE: KI Beratung',
  'DE: Sonstiges',
];

const STATUS = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' };

export default function DeKontaktForm() {
  const [form, setForm] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    service: '',
    projectSummary: '',
  });
  const [status, setStatus] = useState(STATUS.IDLE);

  const [hasStarted, setHasStarted] = useState(false);

  const set = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    // Same funnel events as the English form so GA4 and the Ads conversion
    // read both markets on one instrument, split by form_location.
    if (!hasStarted) {
      setHasStarted(true);
      trackFormInteraction('contact_form', 'start', {
        form_location: 'de_kontakt',
        first_field: e.target.name,
      });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus(STATUS.LOADING);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timeline: 'Not specified',
          privacyConsent: true,
          lead_source: 'de-kontakt',
          landing_page: window.location.pathname,
          referrer: document.referrer || 'direct',
        }),
      });
      if (res.ok) {
        trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT, {
          form_location: 'de_kontakt',
          service_interest: form.service,
          lead_source: 'de-kontakt',
        });
        trackConversion('contact_form_submit', null, 'INR', {
          form_location: 'de_kontakt',
          lead_source: 'de-kontakt',
        });
        setStatus(STATUS.SUCCESS);
      } else {
        trackFormInteraction('contact_form', 'error', {
          form_location: 'de_kontakt',
          error_type: 'submission_failed',
        });
        setStatus(STATUS.ERROR);
      }
    } catch {
      setStatus(STATUS.ERROR);
    }
  };

  const input =
    'w-full p-3 border border-[#17171A]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-[#17171A]';

  if (status === STATUS.SUCCESS) {
    return (
      <div className="border border-[#17171A]/10 rounded-lg p-8 bg-white text-center">
        <div className="text-2xl mb-3">✓</div>
        <div className="text-size-large text-weight-medium mb-2">
          Vielen Dank für Ihre Anfrage
        </div>
        <p className="opacity-80">
          Ihr deutschsprachiger Ansprechpartner meldet sich innerhalb eines
          Werktags bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-size-small text-weight-medium mb-2">Name *</label>
          <input name="fullName" required value={form.fullName} onChange={set} className={input} />
        </div>
        <div>
          <label className="block text-size-small text-weight-medium mb-2">
            Geschäftliche E-Mail *
          </label>
          <input type="email" name="workEmail" required value={form.workEmail} onChange={set} className={input} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-size-small text-weight-medium mb-2">
            Telefon (optional)
          </label>
          <input name="phone" value={form.phone} onChange={set} className={input} />
        </div>
        <div>
          <label className="block text-size-small text-weight-medium mb-2">Leistung *</label>
          <select name="service" required value={form.service} onChange={set} className={input}>
            <option value="">Bitte wählen</option>
            {LEISTUNGEN.map((l) => (
              <option key={l} value={l}>{l.replace('DE: ', '')}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-size-small text-weight-medium mb-2">
          Ihr Vorhaben (optional)
        </label>
        <textarea
          name="projectSummary"
          rows={4}
          value={form.projectSummary}
          onChange={set}
          className={input}
          placeholder="Was möchten Sie bauen oder automatisieren?"
        />
      </div>

      {status === STATUS.ERROR && (
        <p className="text-[#E0362C] text-size-small">
          Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder
          schreiben Sie an contact@stackbinary.io.
        </p>
      )}

      <button
        type="submit"
        disabled={status === STATUS.LOADING}
        className="primary-button w-inline-block disabled:opacity-40 disabled:cursor-not-allowed self-start"
      >
        <div className="relative">
          <div className="text-size-small text-weight-bold">
            {status === STATUS.LOADING ? 'Wird gesendet...' : 'Anfrage senden'}
          </div>
        </div>
        <div className="button-elipse"></div>
      </button>

      <p className="text-size-small opacity-60">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben gemäß
        unserer <a href="/de/datenschutz" className="text-link">Datenschutzerklärung</a> zu.
      </p>
    </form>
  );
}
