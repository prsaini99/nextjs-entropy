import "./globals.css";
import "./style.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import Analytics from "@/components/Analytics";
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
  // Note: this layout deliberately loads no jQuery and no Webflow runtime.
  // A previous version listed both inside a next/head <Head>, which is a no-op
  // in the App Router — verified against production HTML: neither script was
  // ever emitted. The site's interactions are all React; the Webflow export
  // contributes CSS only.
  return (
    <html lang="en">
      <body className="antialiased">
        <Analytics />
        <ConditionalLayout>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ConditionalLayout>
      </body>
    </html>
  );
}
