import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useGaleria } from "../components/galeria/GaleriaContext";
import { ImagemCarregavel, LoadingSpinner } from "../components/galeria/shared";

export const Route = createFileRoute("/galeria/")({
  component: GaleriaIndex,
});

function GaleriaIndex() {
  const { secoes, loading, erroCarregamento, apiKey } = useGaleria();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="relative min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (erroCarregamento) {
    return (
      <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm text-center max-w-md mx-auto">
        {erroCarregamento}
      </div>
    );
  }

  if (secoes.length === 0) {
    return (
      <p className="text-center text-andreia-light">Nenhuma subpasta com fotos foi encontrada.</p>
    );
  }

  return (
    <section className="animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {secoes.map((secao, index) => {
          // O número da rota corresponde à posição da pasta na lista
          // (ordenada por data de criação, mais recente primeiro).
          // Ex: 1ª pasta -> /galeria/1, 2ª pasta -> /galeria/2, etc.
          const numero = index + 1;
          const capa = secao.photos[0];
          const miniaturaCapa = capa?.thumbnailLink
            ? capa.thumbnailLink.replace("=s220", "=w500")
            : capa
              ? `https://www.googleapis.com/drive/v3/files/${capa.id}?alt=media&key=${apiKey}`
              : "";

          return (
            <button
              key={secao.folderId}
              onClick={() =>
                navigate({ to: "/galeria/$folderId", params: { folderId: String(numero) } })
              }
              className="group flex flex-col text-left rounded-lg overflow-hidden border border-andreia/20 bg-andreia-dark/30 hover:border-andreia/60 hover:-translate-y-1 transition-all duration-300 shadow-md"
            >
              <div className="relative w-full aspect-square bg-andreia-darkest/50 overflow-hidden">
                {miniaturaCapa && (
                  <ImagemCarregavel
                    src={miniaturaCapa}
                    alt={secao.folderName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                )}
                <div className="absolute inset-0 bg-andreia-darkest/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="w-full px-3 py-3">
                <h3 className="text-sm md:text-base font-display font-semibold uppercase text-white truncate">
                  {secao.folderName}
                </h3>
                <p className="text-xs text-andreia-light mt-1">
                  {secao.photos.length} foto{secao.photos.length !== 1 ? "s" : ""}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
