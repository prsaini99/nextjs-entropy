import { GetStarted } from "@/components/Buttons";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="padding-global py-10">
        <div className="w-layout-blockcontainer container small w-container">
          <div className="align-middle">
            <div className="instruction-content-wrapper">
              <div className="instruction-heading">
                <div className="max-width-50ch">
                  <div className="heading-2-instruction text-weight-bold">
                    Privacy Policy
                  </div>
                </div>
                <div className="margin-top-description">
                  <p>
                    Welcome to <span className="text-primary">Stackbinary.io</span>. We are committed to protecting your privacy. This privacy policy explains how we collect, use, and safeguard your personal information when you interact with our website and services.
                  </p>
                </div>
              </div>

              <div className="instructions-wrapper">
                <div className="instructions">
                  <div>Information We Collect:</div>
                  <ul role="list">
                    <Instruction
                      title={"Personal Information"}
                      description={"When you contact us through our website’s contact form or subscribe to our newsletter, we collect personal details such as your name and email address."}
                    />
                    <Instruction
                      title={"Messages"}
                      description={"Any messages or inquiries you send us are stored to address your requests and improve our services."}
                    />
                  </ul>
                </div>
                <Divider />
                <div className="instructions">
                  <div>How We Use Your Information:</div>
                  <ul role="list">
                    <Instruction
                      title={"Communication"}
                      description={"To respond to your inquiries and provide information about our services."}
                    />
                    <Instruction
                      title={"Newsletter"}
                      description={"To send you updates, news, and promotional materials related to our services. You can opt out at any time by following the unsubscribe link in our emails."}
                    />
                    <Instruction
                      title={"Service Improvement"}
                      description={"To analyze feedback and improve our offerings."}
                    />
                  </ul>
                </div>
                <Divider />
                <div className="instructions">
                  <div className="text-size-small text-weight-medium caps">
                    Data Sharing and Disclosure
                  </div>
                  <div>
                    We do not sell or rent your personal information to third parties. We may share your information with:
                  </div>
                  <ul role="list">
                    <Instruction
                      title={"Service Providers"}
                      description={"Trusted partners who assist us in operating our website and conducting our business, provided they agree to keep your information confidential."}
                    />
                    <Instruction
                      title={"Legal Obligations"}
                      description={"Authorities when required by law or to protect our rights."}
                    />
                  </ul>
                </div>
                <Divider />
                <div className="instructions">
                  <div className="text-size-small text-weight-medium caps">
                    Data Security
                  </div>
                  <div>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.
                  </div>
                </div>
                <Divider />
                <div className="instructions">
                  <div className="text-size-small text-weight-medium caps">
                    Your Rights
                  </div>
                  <div>
                    Depending on your jurisdiction, you may have the right to:
                  </div>
                  <ul role="list">
                    <Instruction
                      description={"Access the personal information we hold about you."}
                    />
                    <Instruction
                      description={"Request corrections to inaccurate or incomplete data."}
                    />
                    <Instruction
                      description={"Request deletion of your personal information."}
                    />
                    <Instruction
                      description={"Object to or restrict the processing of your data."}
                    />
                  </ul>
                  <div>
                    To exercise these rights, please contact us at <Link href={ROUTES.CONTACT} className="text-link">contact@stackbinary.io</Link>
                  </div>
                </div>
                <Divider />
                <div className="instructions">
                  <div className="text-size-small text-weight-medium caps">
                    Cookies and Tracking Technologies
                  </div>
                  <div>
                    Our website may use cookies to enhance user experience. You can set your browser to refuse cookies or alert you when cookies are being sent. However, some parts of the site may not function properly without cookies.
                  </div>
                </div>
                <Divider />
                <div className="instructions">
                  <div className="text-size-small text-weight-medium caps">
                    Third-Party Links
                  </div>
                  <div>
                    Our website may contain links to external sites not operated by us. We are not responsible for the content or privacy practices of these sites. We encourage you to review their privacy policies.
                  </div>
                </div>
                <Divider />
                <div className="instructions">
                  <div className="text-size-small text-weight-medium caps">
                    Changes to This Privacy Policy
                  </div>
                  <div>
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. Changes are effective immediately upon posting.
                  </div>
                </div>
                <Divider />
                <div className="instructions">
                  <div className="text-size-small text-weight-medium caps">
                    Contact Us
                  </div>
                  <div>
                    If you have any questions or concerns about this privacy policy, please contact us at: <Link href={ROUTES.CONTACT} className="text-link">contact@stackbinary.io</Link>
                  </div>
                </div>
              </div>
              <GetStarted />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Divider = () => <div className="divider-line-instructions"></div>

const Instruction = ({ title, description }) => <li>{title && <strong>{title}: </strong>}{description}</li>