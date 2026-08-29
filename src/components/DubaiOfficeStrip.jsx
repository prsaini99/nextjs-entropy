// Dubai contact strip, rendered ONLY on the two /services/*-dubai pages
// (owner rule 2026-08-29: Dubai address and phone appear in the Dubai
// context only, never sitewide, and never in page body text).
export default function DubaiOfficeStrip() {
  return (
    <section>
      <div className="padding-global pb-16">
        <div className="w-layout-blockcontainer container w-container">
          <div className="border border-gray-200 rounded-lg p-8 bg-[#F7F7F5] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
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
                href="tel:+971525891213"
                className="text-size-medium text-weight-medium hover:text-[#E0362C] transition-colors"
              >
                +971 52 589 1213
              </a>
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
