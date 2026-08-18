import { createFileRoute } from "@tanstack/react-router";
import StickerGallery from "@/components/StickerGallery";

const titleStickerGallery = "Galeria de Figurinhas | Andréia Siqueira";
const descriptionStickerGallery =
  "Acesse a galeria de figurinhas da campanha de Andréia Siqueira e compartilhe no WhatsApp.";

export const Route = createFileRoute("/sticker-gallery")({
  head: () => ({
    meta: [
      { title: titleStickerGallery },
      { name: "description", content: descriptionStickerGallery },
      { property: "og:title", content: titleStickerGallery },
      { property: "og:description", content: descriptionStickerGallery },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StickerGallery,
});
