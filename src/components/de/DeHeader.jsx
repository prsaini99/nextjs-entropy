'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Slim German header for the /de section. Deliberately NOT a translation of
// the global nav: only 8 pages exist in German, and German labels that lead
// to English pages would promise more than the site delivers. This keeps the
// German visitor inside the German funnel; the EN switch is the honest exit
// to the full English site.
const DE_NAV = [
  { href: '/de/individualsoftware', label: 'Individualsoftware' },
  { href: '/de/ki-entwicklung', label: 'KI Entwicklung' },
  { href: '/de/ki-agenten', label: 'KI-Agenten' },
  { href: '/de/ki-kundenservice', label: 'KI Kundenservice' },
  { href: '/de/ki-beratung', label: 'KI Beratung' },
];

export default function DeHeader() {
  const pathname = usePathname();
  return (
    <div role="banner" className="navbar w-nav" lang="de">
      <div className="padding-global">
        <div className="container w-container">
          <div className="navbar-component flex items-center justify-between gap-6 py-4">
            <Link href="/de" className="brand w-nav-brand shrink-0">
              <Image
                src="/stack-logo.png"
                width={120}
                height={32}
                alt="Stackbinary Logo"
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            {/* Full link row on large screens, spread across the middle the
                way the English navbar spreads, not clustered at the logo. */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-10">
              {DE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-size-small text-weight-medium transition-opacity ${
                    pathname === item.href ? 'text-[#E0362C]' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav className="lg:hidden">
              <Link href="/de" className="text-size-small text-weight-medium opacity-80 hover:opacity-100">
                Leistungen
              </Link>
            </nav>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/"
                className="text-size-small opacity-60 hover:opacity-100"
                title="Zur englischen Website"
              >
                EN
              </Link>
              <Link href="/de/kontakt" className="primary-button w-inline-block">
                <div className="relative">
                  <div className="text-size-small text-weight-bold">Erstgespräch</div>
                </div>
                <div className="button-elipse"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
