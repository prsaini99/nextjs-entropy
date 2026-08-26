import Link from "next/link";

// § 5 DDG requires provider identification once a site commercially targets
// the German market, which /de unambiguously does. A non-EU company can be
// fully compliant; what §5 demands is identifiability, not an EU seat.
//
// Company facts sourced from the signed Entity Locker authorization letter
// (owner-provided, 2026-08-26): CIN, GSTIN, director and DIN. The Aadhaar
// number on that letter is deliberately NOT published anywhere.

export const metadata = {
  title: "Impressum | Stackbinary",
  description: "Anbieterkennzeichnung gemäß § 5 DDG für stackbinary.io/de.",
  alternates: { canonical: "https://stackbinary.io/de/impressum" },
  robots: { index: false },
};

export default function Impressum() {
  return (
    <div lang="de">
      <section>
        <div className="padding-global">
          <div className="w-layout-blockcontainer container w-container">
            <div className="max-w-3xl mx-auto mt-[15vh] mb-24">
              <h1 className="heading-4 text-weight-bold mb-8">Impressum</h1>

              <div className="flex flex-col gap-6 opacity-90">
                <div>
                  <h2 className="text-size-large text-weight-medium mb-2">
                    Angaben gemäß § 5 DDG
                  </h2>
                  <p>
                    Gursat Software IT Solutions Private Limited
                    <br />
                    Flat No. 1002, Spring Grove, CTS 171/1A/60
                    <br />
                    Akurli Road, Kandivali East
                    <br />
                    Mumbai 400101, Maharashtra
                    <br />
                    Indien
                  </p>
                </div>

                <div>
                  <h2 className="text-size-large text-weight-medium mb-2">
                    Vertreten durch
                  </h2>
                  <p>Prateek Saini, Director (DIN: 11061252)</p>
                </div>

                <div>
                  <h2 className="text-size-large text-weight-medium mb-2">Kontakt</h2>
                  <p>
                    E-Mail: contact@stackbinary.io
                    <br />
                    Telefon: +91 90343 81347
                    <br />
                    Web: stackbinary.io
                  </p>
                </div>

                <div>
                  <h2 className="text-size-large text-weight-medium mb-2">
                    Registereintrag
                  </h2>
                  <p>
                    Eingetragen in Indien (Companies Act, 2013)
                    <br />
                    CIN: U62013MH2025PTC445947
                    <br />
                    Steuernummer (Indien, GSTIN): 27AALCG9671R1ZF
                  </p>
                </div>

                <div>
                  <h2 className="text-size-large text-weight-medium mb-2">
                    Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
                  </h2>
                  <p>
                    Prateek Saini
                    <br />
                    Flat No. 1002, Spring Grove, CTS 171/1A/60, Akurli Road,
                    Kandivali East, Mumbai 400101, Indien
                  </p>
                </div>

                <div>
                  <h2 className="text-size-large text-weight-medium mb-2">
                    Streitbeilegung
                  </h2>
                  <p>
                    Wir sind nicht bereit und nicht verpflichtet, an
                    Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen. Unser Angebot
                    richtet sich ausschließlich an Unternehmen.
                  </p>
                </div>

                <p className="text-size-small opacity-60">
                  <Link href="/de" className="text-link">Zurück zur Übersicht</Link>
                  {" · "}
                  <Link href="/de/datenschutz" className="text-link">
                    Datenschutzerklärung
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
