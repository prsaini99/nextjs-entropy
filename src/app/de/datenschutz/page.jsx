import Link from "next/link";

// ENTWURF. Factually accurate to what the site actually runs (Vercel
// hosting, Google Analytics 4, Microsoft Clarity, contact form to Supabase,
// E-Mail via Resend, controller in India = Drittland transfer under Art. 44
// ff. DSGVO), but a German privacy notice is legal text and must be checked
// by someone qualified before it ships. noindex until then.

export const metadata = {
  title: "Datenschutzerklärung | Stackbinary",
  description: "Datenschutzerklärung für die deutschsprachigen Seiten von stackbinary.io.",
  alternates: { canonical: "https://stackbinary.io/de/datenschutz" },
  robots: { index: false },
};

const Abschnitt = ({ titel, children }) => (
  <div>
    <h2 className="text-size-large text-weight-medium mb-2">{titel}</h2>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

export default function Datenschutz() {
  return (
    <div lang="de">
      <section>
        <div className="padding-global">
          <div className="w-layout-blockcontainer container w-container">
            <div className="max-w-3xl mx-auto mt-[15vh] mb-24">
              <h1 className="heading-4 text-weight-bold mb-2">Datenschutzerklärung</h1>
              <p className="text-size-small opacity-60 mb-8">
                Stand: August 2026. Entwurf, rechtliche Prüfung ausstehend.
              </p>

              <div className="flex flex-col gap-8 opacity-90">
                <Abschnitt titel="1. Verantwortlicher">
                  <p>
                    Gursat Software IT Solutions Private Limited, vertreten durch den
                    Director Prateek Saini, Flat No. 1002,
                    Spring Grove, CTS 171/1A/60, Akurli Road, Kandivali East,
                    Mumbai 400101, Maharashtra, Indien. E-Mail:
                    contact@stackbinary.io.
                  </p>
                  <p>
                    Der Verantwortliche hat seinen Sitz außerhalb des
                    Europäischen Wirtschaftsraums. Eine Übermittlung
                    personenbezogener Daten in ein Drittland im Sinne der Art.
                    44 ff. DSGVO findet daher statt, soweit Sie mit uns in
                    Kontakt treten. Wir sichern diese Übermittlung durch
                    Standardvertragsklauseln und Datenminimierung ab.
                  </p>
                </Abschnitt>

                <Abschnitt titel="2. Hosting">
                  <p>
                    Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133,
                    Walnut, CA 91789, USA gehostet. Beim Aufruf der Seiten
                    verarbeitet Vercel technisch notwendige Daten
                    (IP-Adresse, Zeitpunkt, aufgerufene Seite) in
                    Server-Logdateien. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
                    DSGVO (berechtigtes Interesse am sicheren Betrieb). Mit
                    Vercel besteht ein Auftragsverarbeitungsvertrag;
                    Übermittlungen in die USA stützen sich auf
                    Standardvertragsklauseln.
                  </p>
                </Abschnitt>

                <Abschnitt titel="3. Webanalyse">
                  <p>
                    Wir setzen Google Analytics 4 (Google Ireland Ltd.) und
                    Microsoft Clarity (Microsoft Ireland Operations Ltd.) ein,
                    um die Nutzung der Website auszuwerten und sie zu
                    verbessern. Dabei werden pseudonymisierte Nutzungsdaten
                    verarbeitet; IP-Adressen werden gekürzt verarbeitet.
                    Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1
                    lit. a DSGVO, soweit sie erforderlich ist; sie kann
                    jederzeit mit Wirkung für die Zukunft widerrufen werden.
                  </p>
                </Abschnitt>

                <Abschnitt titel="4. Kontaktaufnahme">
                  <p>
                    Wenn Sie unser Kontaktformular nutzen oder uns per E-Mail
                    schreiben, verarbeiten wir die von Ihnen angegebenen Daten
                    (Name, E-Mail-Adresse, Telefonnummer, Nachricht) zur
                    Bearbeitung Ihrer Anfrage. Die Daten werden in unserer
                    Kundendatenbank (Supabase) gespeichert;
                    Bestätigungs-E-Mails versenden wir über den Dienstleister
                    Resend. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
                    (Anbahnung eines Vertragsverhältnisses). Wir löschen
                    Anfragedaten, sobald sie für die Bearbeitung nicht mehr
                    erforderlich sind und keine gesetzlichen
                    Aufbewahrungspflichten bestehen.
                  </p>
                </Abschnitt>

                <Abschnitt titel="5. Ihre Rechte">
                  <p>
                    Sie haben das Recht auf Auskunft (Art. 15 DSGVO),
                    Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung
                    der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20)
                    und Widerspruch gegen Verarbeitungen auf Grundlage
                    berechtigter Interessen (Art. 21). Wenden Sie sich dazu an
                    contact@stackbinary.io. Zudem steht Ihnen ein
                    Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.
                  </p>
                </Abschnitt>

                <Abschnitt titel="6. Änderungen">
                  <p>
                    Wir passen diese Erklärung an, wenn sich die eingesetzten
                    Dienste oder die Rechtslage ändern. Es gilt die jeweils
                    hier veröffentlichte Fassung.
                  </p>
                </Abschnitt>

                <p className="text-size-small opacity-60">
                  <Link href="/de" className="text-link">Zurück zur Übersicht</Link>
                  {" · "}
                  <Link href="/de/impressum" className="text-link">Impressum</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
