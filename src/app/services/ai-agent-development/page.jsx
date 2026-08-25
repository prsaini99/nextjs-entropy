import { notFound } from "next/navigation";
import { getAiServicePage } from "@/data/aiServicesPages";
import { aiServiceMetadata, aiServiceJsonLd } from "@/lib/aiServiceRoute";
import AIServicePage from "@/components/pages/AIServices/AIServicePage";
import RelatedInsights from "@/components/RelatedInsights";

const SLUG = "ai-agent-development";

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
        slugs={["ai-agent-vs-chatbot", "n8n-vs-zapier-cost-comparison", "ai-voice-agent-platforms-compared"]}
        heading="When an agent is the right answer, and when it is not"
      />
    </>
  );
}
