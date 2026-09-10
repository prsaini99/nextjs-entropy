// Dubai contact strip, rendered ONLY on the two /services/*-dubai pages
// (owner rule 2026-08-29: Dubai details appear in the Dubai context only,
// never sitewide, and never in page body text).
//
// The Dubai phone number was removed on 2026-09-10 at the owner's request,
// from here and from the LocalBusiness schema in lib/dubaiRoute.js. Enquiries
// route through the form on the page instead. Do not reinstate a number here
// without the owner asking for it.
export default function DubaiOfficeStrip() {
  return (
    <section>
      <div className="padding-global pb-16">
        <div className="w-layout-blockcontainer container w-container">
          <div className="border border-[#17171A]/10 rounded-lg p-8 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-size-medium text-weight-medium mb-2">
                Our Dubai Office
              </div>
              <div className="text-size-small opacity-80">
                Regal Tower, Office 705, Business Bay, Dubai, United Arab Emirates
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center shrink-0">
              <a
                href="https://maps.google.com/?q=Regal+Tower,+Business+Bay,+Dubai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link text-size-small"
              >
                View on Map →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
