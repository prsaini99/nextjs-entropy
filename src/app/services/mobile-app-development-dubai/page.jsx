import { notFound } from "next/navigation";
import { getDubaiPage } from "@/data/dubaiPages";
import { dubaiMetadata, dubaiJsonLd } from "@/lib/dubaiRoute";
import AIServicePage from "@/components/pages/AIServices/AIServicePage";
import RelatedInsights from "@/components/RelatedInsights";
import DubaiOfficeStrip from "@/components/DubaiOfficeStrip";

const SLUG = "mobile-app-development-dubai";

export const metadata = dubaiMetadata(SLUG);

export default function Page() {
  const page = getDubaiPage(SLUG);
  if (!page) notFound();
  return (
    <>
      {dubaiJsonLd(SLUG).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AIServicePage page={page} slug={SLUG} />
      <DubaiOfficeStrip />
      <RelatedInsights
        slugs={["ai-receptionist-cost-comparison", "ai-voice-agent-platforms-compared", "ai-agent-vs-chatbot"]}
        heading="How we think about building products, in public"
      />
    </>
  );
}
