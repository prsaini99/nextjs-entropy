import { notFound } from "next/navigation";
import { getAiServicePage } from "@/data/aiServicesPages";
import { aiServiceMetadata, aiServiceJsonLd } from "@/lib/aiServiceRoute";
import AIServicePage from "@/components/pages/AIServices/AIServicePage";
import RelatedInsights from "@/components/RelatedInsights";

const SLUG = "ai-voice-agent-development";

export const metadata = aiServiceMetadata(SLUG);

export default function Page() {
  const page = getAiServicePage(SLUG);
  if (!page) notFound();
  return (
    <>
      {aiServiceJsonLd(SLUG).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AIServicePage page={page} slug={SLUG} />
      <RelatedInsights
        slugs={["voice-ai-pricing-per-minute-2026", "ai-answering-service-small-business-cost", "ai-voice-agent-platforms-compared"]}
        heading="What the voice platforms actually cost, verified this month"
      />
    </>
  );
}
