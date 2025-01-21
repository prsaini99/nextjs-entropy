import "./globals.css";
import "./style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import Head from "next/head";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata = {
  title: "Stackbinary.io",
  description: "App Description",
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
        {/* Example of adding local scripts */}
        <Header />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}
