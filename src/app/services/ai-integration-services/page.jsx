import { notFound } from "next/navigation";
import { getAiServicePage } from "@/data/aiServicesPages";
import { aiServiceMetadata, aiServiceJsonLd } from "@/lib/aiServiceRoute";
import AIServicePage from "@/components/pages/AIServices/AIServicePage";
import RelatedInsights from "@/components/RelatedInsights";

const SLUG = "ai-integration-services";

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
        slugs={["n8n-vs-zapier-cost-comparison", "hubspot-alternatives-rent-vs-own", "ai-agent-vs-chatbot"]}
        heading="Build, buy or integrate: the maths on each"
      />
    </>
  );
}
