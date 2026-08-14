import { createFileRoute } from "@tanstack/react-router";
import TermosDeUso from "@/components/termos-de-uso";

const titleTermos = "Termos de Uso e Aviso de Privacidade | Andréia Siqueira";
const descriptionTermos =
  "Leia os Termos de Uso e Aviso de Privacidade da página oficial de campanha da Andréia Siqueira.";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: titleTermos },
      { name: "description", content: descriptionTermos },
      { property: "og:title", content: titleTermos },
      { property: "og:description", content: descriptionTermos },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermosDeUso,
});
