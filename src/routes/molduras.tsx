import { createFileRoute } from "@tanstack/react-router";
import Molduras from "@/components/molduras";

const titleMolduras = "Moldura Oficial | Andréia Siqueira";
const descriptionMolduras =
  "Crie sua foto com a moldura oficial da campanha de Andréia Siqueira e baixe em PNG para usar no perfil.";

export const Route = createFileRoute("/molduras")({
  head: () => ({
    meta: [
      { title: titleMolduras },
      { name: "description", content: descriptionMolduras },
      { property: "og:title", content: titleMolduras },
      { property: "og:description", content: descriptionMolduras },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Molduras,
});
