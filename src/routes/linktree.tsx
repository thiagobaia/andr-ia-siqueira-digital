import { createFileRoute } from "@tanstack/react-router";
import Linktree from "@/components/linktree";

const titleLinktree = "Linktree | Andréia Siqueira";
const descriptionLinktree = "Acesse os links oficiais de Andréia Siqueira em um só lugar.";

export const Route = createFileRoute("/linktree")({
  head: () => ({
    meta: [
      { title: titleLinktree },
      { name: "description", content: descriptionLinktree },
      { property: "og:title", content: titleLinktree },
      { property: "og:description", content: descriptionLinktree },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Linktree,
});
