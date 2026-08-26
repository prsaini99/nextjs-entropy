import DeKontaktForm from "@/components/de/DeKontaktForm";

export const metadata = {
  title: "Kontakt | Stackbinary",
  description:
    "Kostenloses Erstgespräch mit Ihrem deutschsprachigen Ansprechpartner: Individualsoftware, KI Entwicklung und Automatisierung. Antwort innerhalb eines Werktags.",
  alternates: { canonical: "https://stackbinary.io/de/kontakt" },
  // Same review gate as the rest of /de.
  robots: { index: false },
};

export default function DeKontakt() {
  return (
    <div lang="de">
      <section>
        <div className="padding-global">
          <div className="w-layout-blockcontainer container w-container">
            <div className="max-w-3xl mx-auto mt-[15vh] mb-24">
              <h1 className="heading-4 text-weight-bold mb-4">
                Kostenloses Erstgespräch vereinbaren
              </h1>
              <p className="opacity-80 mb-10">
                Beschreiben Sie kurz Ihr Vorhaben. Ihr deutschsprachiger
                Ansprechpartner meldet sich innerhalb eines Werktags, mit einer
                ehrlichen Einschätzung statt einer Verkaufspräsentation.
              </p>
              <DeKontaktForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
