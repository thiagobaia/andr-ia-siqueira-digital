import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Flags } from "@/components/Flags";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import CookieConsentPopup from "@/components/CookieConsentPopup";

const titleIndex = "Andréia Siqueira | Deputada Federal — A Federal da Nossa Gente";
const descriptionIndex =
  "Do Baixo Tocantins até Brasília: conheça a trajetória, as bandeiras de luta e os projetos sociais da Deputada Federal Andréia Siqueira pelo Pará.";

// 1. Rota Principal (Home: "/")
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: titleIndex },
      { name: "description", content: descriptionIndex },
      { property: "og:title", content: titleIndex },
      { property: "og:description", content: descriptionIndex },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Flags />
        <Projects />
        <Contact />
        <CookieConsentPopup />
      </main>
      <Footer />
    </div>
  );
}

