import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "@/components/privacidade";

const titlePrivacidade = "Política de Privacidade | Andréia Siqueira";
const descriptionPrivacidade =
  "Leia a Política de Privacidade do site oficial da Deputada Federal Andréia Siqueira.";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: titlePrivacidade },
      { name: "description", content: descriptionPrivacidade },
      { property: "og:title", content: titlePrivacidade },
      { property: "og:description", content: descriptionPrivacidade },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPolicy,
});