import AnimatedInViewDiv from '@/components/Animate/AppearInView';

// The site's single privacy policy. The older /privacy page (which held the
// fuller, recruitment-aware text) was merged into this URL in July 2026 because
// this is the address the footer and the contact form consent line have always
// pointed to; /privacy now redirects here via next.config.js.
//
// The Analytics section below describes what the site actually runs: GA4,
// Microsoft Clarity (including session recordings) and Google Ads click
// identifiers stored client-side for attribution. If the tracking stack
// changes, this page must change with it.

export const metadata = {
  title: "Privacy Policy | StackBinary",
  description:
    "How StackBinary collects, uses and protects your personal information, including enquiry, analytics and recruitment data.",
  alternates: { canonical: 'https://stackbinary.io/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | StackBinary',
    description: 'How StackBinary collects, uses and protects your personal information.',
    url: 'https://stackbinary.io/privacy-policy',
    siteName: 'StackBinary',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <section>
        <div className="padding-global py-20">
          <div className="w-layout-blockcontainer container w-container">
            <AnimatedInViewDiv className="max-w-4xl mx-auto">
              <h1 className="heading-2 text-weight-bold mb-8">Privacy Policy</h1>

              <div className="text-size-small opacity-85 mb-8">Last updated: July 2026</div>

              <div className="prose prose-lg max-w-none space-y-8">
                <AnimatedInViewDiv delay={0.1}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Introduction</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    StackBinary™ (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
                    privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your
                    information when you visit our website, contact us about a project, use our chat assistant,
                    subscribe to updates, or apply for a job.
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.2}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Information We Collect</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed space-y-4">
                    <div>
                      <h3 className="text-size-large text-weight-medium mb-2">Enquiries and leads</h3>
                      <p>When you contact us through a form, the chat assistant or email, we may collect:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Name, email address, phone number and company</li>
                        <li>The service you are interested in, budget range and timeline you choose to share</li>
                        <li>The content of your messages, including chat conversations with our assistant</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-size-large text-weight-medium mb-2">Job applications</h3>
                      <p>When you apply for a role, we may additionally collect:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Professional experience, education and skills</li>
                        <li>Resume, portfolio and other application materials</li>
                        <li>Work authorization status, salary expectations and availability</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-size-large text-weight-medium mb-2">Automatically collected information</h3>
                      <p>When you browse the site, we automatically collect certain technical information:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>IP address, browser type and device information</li>
                        <li>Pages visited, time spent, scrolling and interaction data, and referring URLs</li>
                        <li>Campaign parameters (such as UTM tags) and advertising click identifiers, described below</li>
                      </ul>
                    </div>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.3}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Analytics, Session Recordings and Advertising Measurement</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed space-y-4">
                    <p>We use the following tools to understand how the site is used and whether our advertising works:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Google Analytics 4</strong> measures page views, traffic sources and on-site events
                        (for example, opening a product demo or starting a form) in aggregate.
                      </li>
                      <li>
                        <strong>Microsoft Clarity</strong> records anonymized session replays and heatmaps of how
                        visitors scroll, click and navigate. Text you type into contact and lead forms is masked
                        and is not visible in recordings.
                      </li>
                      <li>
                        <strong>Advertising click identifiers.</strong> If you arrive from an ad, the click
                        identifier in the URL (such as Google&apos;s gclid) is stored in your browser&apos;s local
                        storage for up to 90 days. If you later submit an enquiry, we associate that identifier
                        with your enquiry so we can tell which advertising brought you to us.
                      </li>
                    </ul>
                    <p>
                      We use this measurement to improve the website and our own marketing. We do not use it to
                      build profiles of you across other websites.
                    </p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.4}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">How We Use Your Information</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Respond to your enquiry and discuss your project</li>
                      <li>Process job applications and evaluate candidates</li>
                      <li>Understand which pages, content and advertising perform, and improve them</li>
                      <li>Comply with legal obligations and maintain records</li>
                      <li>Send you updates about our company, only with your consent</li>
                    </ul>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.5}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Legal Basis for Processing</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">We process your personal data based on:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Legitimate interest:</strong> responding to enquiries, recruitment, and measuring our own website and advertising</li>
                      <li><strong>Contract:</strong> evaluating your job application or preparing a proposal you requested</li>
                      <li><strong>Consent:</strong> marketing communications, where applicable</li>
                      <li><strong>Legal obligation:</strong> compliance with applicable laws, including India&apos;s Digital Personal Data Protection Act</li>
                    </ul>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.6}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Information Sharing</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">We may share your information with:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Our team members who handle enquiries or hiring</li>
                      <li>
                        Service providers that run parts of our infrastructure, such as website hosting, our
                        database, email delivery, and the analytics and advertising tools named above, each
                        processing data on our behalf
                      </li>
                      <li>Legal authorities when required by law</li>
                    </ul>
                    <p className="mt-4">
                      We do not sell, rent or trade your personal information to third parties for marketing
                      purposes.
                    </p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.7}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Data Retention</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">We retain information for as long as it is needed for the purpose it was collected:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Enquiries and leads: for the life of the business discussion or relationship</li>
                      <li>Successful candidates: as required for employment records</li>
                      <li>Unsuccessful candidates: up to 2 years, for future opportunities</li>
                      <li>Website analytics: up to 26 months</li>
                      <li>Advertising click identifiers: up to 90 days in your browser</li>
                    </ul>
                    <p className="mt-4">You can request deletion of your data at any time by contacting us.</p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.8}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Your Rights</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access the personal data we hold about you</li>
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Delete your personal data</li>
                      <li>Object to or restrict processing</li>
                      <li>Receive your data in a structured, portable format</li>
                      <li>Withdraw consent for marketing communications at any time</li>
                    </ul>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.9}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Data Security</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p>
                      We implement appropriate technical and organizational measures to protect your personal
                      information against unauthorized access, alteration, disclosure or destruction, including
                      access controls on our lead database. However, no internet transmission is completely
                      secure, and we cannot guarantee absolute security.
                    </p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={1.0}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Cookies and Local Storage</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">Our website uses cookies and browser local storage to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Remember preferences and enable site functionality</li>
                      <li>Analyze traffic and performance through the tools described above</li>
                      <li>Attribute enquiries to the campaign or advertisement that brought you here</li>
                    </ul>
                    <p className="mt-4">You can control cookies and clear local storage through your browser settings.</p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={1.1}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Changes to This Policy</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p>
                      We may update this Privacy Policy periodically. We will post any material changes on this
                      page with an updated &quot;Last updated&quot; date.
                    </p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={1.2}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Contact Us</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">
                      If you have questions about this Privacy Policy or want to exercise your rights, please
                      contact us:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p><strong>Email:</strong> contact@stackbinary.io</p>
                      <p><strong>Subject line:</strong> Privacy Policy Inquiry</p>
                      <p><strong>Response time:</strong> we will respond within 30 days</p>
                    </div>
                  </div>
                </AnimatedInViewDiv>
              </div>
            </AnimatedInViewDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
