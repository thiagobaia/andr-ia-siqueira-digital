import { createFileRoute } from "@tanstack/react-router";
import { GaleriaDrive } from "@/components/galeria";

const titleGaleria = "Galeria de Fotos | Andréia Siqueira";
const descriptionGaleria =
  "Veja as fotos da campanha de Andréia Siqueira organizadas por pastas do Google Drive.";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: titleGaleria },
      { name: "description", content: descriptionGaleria },
      { property: "og:title", content: titleGaleria },
      { property: "og:description", content: descriptionGaleria },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GaleriaDrive,
});
