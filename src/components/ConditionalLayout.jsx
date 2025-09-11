'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith('/admin');
  
  return (
    <>
      {/* Only show Header, Footer, and FloatingChat on non-admin pages */}
      {!isAdminPage && <Header />}
      
      {children}
      
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingChat />}
    </>
  );
}