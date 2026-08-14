import { createFileRoute } from "@tanstack/react-router";
// Substitua o caminho abaixo pelo componente real da sua página de eleições
import Eleicoes2026 from "@/components/eleicoes2026";

const titleEleicoes = "Eleições 2026 | Andréia Siqueira";
const descriptionEleicoes =
  "Acompanhe a campanha e conheça as propostas de Andréia Siqueira para Deputada Federal pelo Pará nas Eleições de 2026.";

export const Route = createFileRoute("/eleicoes2026")({
  head: () => ({
    meta: [
      { title: titleEleicoes },
      { name: "description", content: descriptionEleicoes },
      { property: "og:title", content: titleEleicoes },
      { property: "og:description", content: descriptionEleicoes },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Eleicoes2026,
});
