import { Metadata } from 'next';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';

export const metadata: Metadata = {
  title: "Privacy Policy | StackBinary",
  description: "Learn how StackBinary collects, uses, and protects your personal information, including recruitment data processing.",
  alternates: { canonical: 'https://stackbinary.io/privacy' },
  openGraph: {
    title: 'Privacy Policy | StackBinary',
    description: 'Learn how StackBinary collects, uses, and protects your personal information.',
    url: 'https://stackbinary.io/privacy',
    siteName: 'StackBinary',
    type: 'website'
  }
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section>
        <div className="padding-global py-20">
          <div className="w-layout-blockcontainer container w-container">
            <AnimatedInViewDiv className="max-w-4xl mx-auto">
              <h1 className="heading-2 text-weight-bold mb-8">
                Privacy Policy
              </h1>
              
              <div className="text-size-small opacity-70 mb-8">
                Last updated: December 2024
              </div>

              <div className="prose prose-lg max-w-none space-y-8">
                <AnimatedInViewDiv delay={0.1}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Introduction</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    StackBinary ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, apply for jobs, or use our services.
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.2}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Information We Collect</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed space-y-4">
                    <div>
                      <h3 className="text-size-large text-weight-medium mb-2">Personal Information</h3>
                      <p>When you apply for a job or contact us, we may collect:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Name, email address, phone number, and location</li>
                        <li>Professional experience, education, and skills</li>
                        <li>Resume, portfolio, and other application materials</li>
                        <li>Work authorization status</li>
                        <li>Salary expectations and availability</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-size-large text-weight-medium mb-2">Automatically Collected Information</h3>
                      <p>We may automatically collect certain technical information:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>IP address, browser type, and device information</li>
                        <li>Pages visited, time spent, and referring URLs</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.3}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">How We Use Your Information</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Process job applications and evaluate candidates</li>
                      <li>Communicate with you about opportunities and our hiring process</li>
                      <li>Improve our website and recruitment processes</li>
                      <li>Comply with legal obligations and maintain records</li>
                      <li>Send you updates about our company (with your consent)</li>
                    </ul>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.4}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Legal Basis for Processing</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">We process your personal data based on:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Legitimate Interest:</strong> For recruitment and business purposes</li>
                      <li><strong>Contract:</strong> To evaluate your job application</li>
                      <li><strong>Consent:</strong> For marketing communications (where applicable)</li>
                      <li><strong>Legal Obligation:</strong> To comply with employment laws</li>
                    </ul>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.5}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Information Sharing</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">We may share your information with:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Our employees involved in the hiring process</li>
                      <li>Third-party service providers (background check companies, recruitment platforms)</li>
                      <li>Legal authorities when required by law</li>
                    </ul>
                    <p className="mt-4">We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.6}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Data Retention</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">We retain your information for:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Successful candidates: As per employment records requirements</li>
                      <li>Unsuccessful candidates: Up to 2 years for future opportunities</li>
                      <li>Website analytics: Up to 26 months</li>
                    </ul>
                    <p className="mt-4">You can request deletion of your data at any time by contacting us.</p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.7}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Your Rights</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access your personal data we hold</li>
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Delete your personal data</li>
                      <li>Object to or restrict processing</li>
                      <li>Data portability (receive your data in a structured format)</li>
                      <li>Withdraw consent for marketing communications</li>
                    </ul>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.8}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Data Security</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={0.9}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Cookies</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">Our website uses cookies to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Remember your preferences and improve user experience</li>
                      <li>Analyze website traffic and performance</li>
                      <li>Enable certain website functionality</li>
                    </ul>
                    <p className="mt-4">You can control cookies through your browser settings.</p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={1.0}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Changes to This Policy</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p>We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on our website with an updated "Last updated" date.</p>
                  </div>
                </AnimatedInViewDiv>

                <AnimatedInViewDiv delay={1.1}>
                  <h2 className="text-size-xlarge text-weight-bold mb-4">Contact Us</h2>
                  <div className="text-size-regular opacity-80 leading-relaxed">
                    <p className="mb-4">If you have questions about this Privacy Policy or want to exercise your rights, please contact us:</p>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p><strong>Email:</strong> privacy@stackbinary.io</p>
                      <p><strong>Subject Line:</strong> Privacy Policy Inquiry</p>
                      <p><strong>Response Time:</strong> We will respond within 30 days</p>
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