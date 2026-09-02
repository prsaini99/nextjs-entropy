'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import DeHeader from "@/components/de/DeHeader";
import DeFooter from "@/components/de/DeFooter";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith('/admin');

  // The homepage runs chrome-less: the scroll film owns the viewport and
  // the page composes its own nav, dock, footer and chat.
  const isV2Page = pathname === '/';

  // German section gets its own slim chrome: an English navbar over a German
  // page reads as a translated microsite, which undercuts the deutschsprachiger
  // Ansprechpartner positioning. The chatbot stays off /de too: it converses
  // in English, and an English bot greeting on a German page is the same
  // mismatch in animated form.
  const isDePage = pathname?.startsWith('/de');

  if (isAdminPage || isV2Page) {
    return <>{children}</>;
  }

  if (isDePage) {
    return (
      <>
        <DeHeader />
        {children}
        <DeFooter />
        {/* Same bot, German mode: greeting, starter questions and replies in
            German (the chat API gets locale='de'), leads tagged chatbot-de. */}
        <FloatingChat locale="de" />
      </>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingChat />
    </>
  );
}
