import Link from 'next/link';
import Image from 'next/image';

// Slim German footer, same honesty rule as DeHeader: only links whose
// destinations are actually German, plus the legally required Impressum and
// Datenschutz. No English newsletter block: an English signup form under a
// German page is exactly the mismatch this chrome exists to remove.
const DE_LINKS = [
  { href: '/de/individualsoftware', label: 'Individualsoftware' },
  { href: '/de/ki-entwicklung', label: 'KI Entwicklung' },
  { href: '/de/ki-agenten', label: 'KI-Agenten' },
  { href: '/de/ki-kundenservice', label: 'KI Kundenservice' },
  { href: '/de/ki-beratung', label: 'KI Beratung' },
];

export default function DeFooter() {
  return (
    <section lang="de">
      <div className="padding-global">
        <div className="w-layout-blockcontainer container w-container">
          <div className="flex flex-col gap-8 pt-16 pb-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="flex flex-col gap-4 max-w-sm">
                <Image
                  src="/stack-logo.png"
                  width={120}
                  height={32}
                  loading="lazy"
                  alt="Stackbinary Logo"
                  className="max-w-[120px] h-auto"
                />
                <p className="text-size-small opacity-70">
                  Individualsoftware und KI-Systeme für Unternehmen in
                  Deutschland, Österreich und der Schweiz. Deutschsprachiger
                  Ansprechpartner, Quellcode in Ihrem Eigentum.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="text-size-medium text-weight-medium">Leistungen</div>
                <div className="flex flex-col items-start gap-2">
                  {DE_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} className="footer-link">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="text-size-medium text-weight-medium">Rechtliches</div>
                <div className="flex flex-col items-start gap-2">
                  <Link href="/de/impressum" className="footer-link">Impressum</Link>
                  <Link href="/de/datenschutz" className="footer-link">Datenschutzerklärung</Link>
                  <Link href="/contact-us" className="footer-link">Kontakt</Link>
                  <Link href="/" className="footer-link">English Website</Link>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <p className="paragraph text-size-small">
                © {new Date().getFullYear()} Gursat Software IT Solutions
                Private Limited. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
