import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GaleriaProvider } from "../components/galeria/GaleriaContext";
import mobile from "@/assets/CELULAR.webp";
import tablet from "@/assets/TABLET.webp";
import desktop from "@/assets/DESKTOP.webp";
import fundo from "@/assets/FUNDO.webp";

const titleGaleria = "Galeria de Fotos | Andréia Siqueira";
const descriptionGaleria =
  "Confira os registros fotográficos das ações, eventos e agendas de Andréia Siqueira.";

// Rota layout: busca as pastas/fotos UMA única vez (via GaleriaProvider) e
// renderiza o cabeçalho fixo. As rotas filhas (galeria.index.tsx e
// galeria.$folderId.tsx) aparecem dentro do <Outlet />.
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
  component: GaleriaLayout,
});

function GaleriaLayout() {
  return (
    <GaleriaProvider>
      <div
        style={{ backgroundImage: `url(${fundo})` }}
        className="min-h-screen bg-andreia-darkest text-white pb-12 bg-cover bg-center bg-no-repeat"
      >
        <header className="top-0 w-full">
          <div className="flex justify-center items-center w-full p-4">
            <picture className="w-full max-w-full">
              {/* Desktop (a partir de 1024px) */}
              <source media="(min-width: 1024px)" srcSet={desktop} />

              {/* Tablet (a partir de 768px até 1023px) */}
              <source media="(min-width: 768px)" srcSet={tablet} />

              {/* Mobile (padrão para telas menores que 768px) */}
              <img
                src={mobile}
                alt="Descrição da imagem"
                className="w-full object-cover h-auto rounded-lg shadow-md"
              />
            </picture>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </GaleriaProvider>
  );
}
