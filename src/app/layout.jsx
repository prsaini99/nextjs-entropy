import "./globals.css";
import "./style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import Analytics from "@/components/Analytics";
import Script from "next/script";
import Head from "next/head";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata = {
  title: "Stackbinary.io - Custom Software Development & IT Solutions",
  description: "Leading IT consulting firm specializing in custom software development, cloud solutions, AI/ML, cybersecurity, and digital transformation services. Transform your business with cutting-edge technology.",
  keywords: "custom software development, IT consulting, cloud solutions, AI development, cybersecurity, digital transformation, web development, mobile app development",
  authors: [{ name: "Stackbinary.io" }],
  openGraph: {
    title: "Stackbinary.io - Custom Software Development & IT Solutions",
    description: "Leading IT consulting firm specializing in custom software development, cloud solutions, AI/ML, cybersecurity, and digital transformation services.",
    type: "website",
    locale: "en_US",
    siteName: "Stackbinary.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stackbinary.io - Custom Software Development & IT Solutions",
    description: "Leading IT consulting firm specializing in custom software development, cloud solutions, AI/ML, cybersecurity, and digital transformation services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=66f30c8d2ac082d2aee64be2"
          strategy="beforeInteractive" // Loads the script before the page renders
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"
        />
        <Script type="text/javascript" src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/js/webflow.e856b9eae.js" />
      </Head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T7LVKHS7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <Analytics />
        {/* Example of adding local scripts */}
        <Header />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
