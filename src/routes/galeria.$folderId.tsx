import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useGaleria } from "../components/galeria/GaleriaContext";
import { ImagemCarregavel } from "../components/galeria/shared";

// "$folderId" é um segmento dinâmico: essa ÚNICA rota casa com
// /galeria/1, /galeria/2, /galeria/57... sem precisar de um arquivo
// novo por pasta. Colar esse link direto no navegador funciona porque
// o TanStack Router resolve o parâmetro em tempo de execução.
export const Route = createFileRoute("/galeria/$folderId")({
  component: GaleriaPasta,
});

function GaleriaPasta() {
  const { folderId } = Route.useParams();
  const { secoes, loading, apiKey } = useGaleria();
  const navigate = useNavigate();

  // O número na URL corresponde à posição da pasta na lista (1-indexed).
  const indice = Number(folderId) - 1;
  const secaoAtual = Number.isInteger(indice) ? secoes[indice] : undefined;

  const [visivel, setVisivel] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [baixando, setBaixando] = useState<Record<string, boolean>>({});
  const [erroDownload, setErroDownload] = useState<string | null>(null);
  const [linkCopiado, setLinkCopiado] = useState(false);

  // Ao trocar de pasta (usuário navega para outro número), reinicia o
  // lote de fotos visíveis e o índice do lightbox.
  useEffect(() => {
    setVisivel(8);
    setCurrentIndex(0);
  }, [folderId]);

  const fotos = secaoAtual ? secaoAtual.photos : [];
  const fotosVisiveis = fotos.slice(0, visivel);
  const temMais = fotos.length > visivel;

  const lightboxSlides = useMemo(
    () =>
      fotos.map((foto) => ({
        src: `https://www.googleapis.com/drive/v3/files/${foto.id}?alt=media&key=${apiKey}`,
        alt: foto.name,
        downloadUrl: foto.id,
        downloadMime: foto.mimeType,
      })),
    [fotos, apiKey],
  );

  const abrirModal = (fotoId: string) => {
    const index = fotos.findIndex((f) => f.id === fotoId);
    if (index !== -1) {
      setCurrentIndex(index);
      setModalOpen(true);
    }
  };

  // Problema original: quando o fetch falhava, o catch chamava
  // window.open() depois de um await — a maioria dos navegadores
  // bloqueia esse popup por não estar mais dentro do gesto síncrono
  // do clique do usuário, então o botão "não fazia nada" em caso de erro.
  // Agora: mostramos loading, tratamos erro visivelmente (sem popup
  // bloqueado) e garantimos que o arquivo baixado tenha extensão.
  const baixarFoto = async (id: string, name: string, mimeType?: string) => {
    setErroDownload(null);
    setBaixando((prev) => ({ ...prev, [id]: true }));

    const url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);

      const blob = await response.blob();

      let nomeArquivo = name || "foto";
      if (!/\.[a-zA-Z0-9]+$/.test(nomeArquivo)) {
        const ext = mimeType?.split("/")[1]?.split("+")[0] || "jpg";
        nomeArquivo = `${nomeArquivo}.${ext}`;
      }

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = nomeArquivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Falha ao baixar foto:", error);
      setErroDownload(
        "Não foi possível baixar a foto. Verifique se o arquivo está compartilhado como 'Qualquer pessoa com o link' no Google Drive, ou tente novamente.",
      );
    } finally {
      setBaixando((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Copia a URL completa e navegável da pasta (ex.: https://seusite.com/galeria/3).
  // Como a rota é dinâmica, colar esse link no navegador abre direto nesta pasta.
  const copiarLink = async () => {
    const url = `${window.location.origin}/galeria/${folderId}`;
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopiado(true);
      setTimeout(() => setLinkCopiado(false), 2000);
    } catch (error) {
      console.error("Falha ao copiar link da pasta:", error);
      setErroDownload("Não foi possível copiar o link da pasta.");
    }
  };

  if (loading) {
    return <div className="min-h-[60vh]" />;
  }

  if (!secaoAtual) {
    return (
      <div className="text-center py-24 space-y-4">
        <p className="text-andreia-light">Esta pasta não existe ou não está mais disponível.</p>
        <button
          onClick={() => navigate({ to: "/galeria" })}
          className="text-white underline underline-offset-4"
        >
          Voltar para a galeria
        </button>
      </div>
    );
  }

  return (
    <section className="animate-fade-in flex flex-col min-h-[60vh]">
      {erroDownload && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-md text-center flex items-center gap-3">
          <span>{erroDownload}</span>
          <button
            onClick={() => setErroDownload(null)}
            className="font-bold text-lg leading-none"
            aria-label="Fechar aviso"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mb-6 border-b border-andreia/20 pb-4">
        <button
          onClick={() => navigate({ to: "/galeria" })}
          className="flex items-center gap-2 text-andreia-light hover:text-white transition-colors text-sm font-medium shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Voltar
        </button>

        <div className="text-base md:text-2xl font-display font-bold uppercase text-white text-center flex-1 truncate">
          {secaoAtual.folderName}
        </div>

        {/* Botão de copiar o link real e navegável da pasta */}
        <button
          onClick={copiarLink}
          className="flex items-center gap-2 bg-andreia-dark hover:bg-andreia/20 text-andreia-light hover:text-white px-3 py-2 rounded-full border border-andreia/30 shadow-md transition-all text-xs md:text-sm font-medium shrink-0"
          title="Copiar link da pasta"
        >
          {linkCopiado ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="hidden sm:inline">Copiado!</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span className="hidden sm:inline">Copiar link</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 grow">
        {fotosVisiveis.map((foto) => {
          const miniaturaOtimizada = foto.thumbnailLink
            ? foto.thumbnailLink.replace("=s220", "=w500")
            : `https://www.googleapis.com/drive/v3/files/${foto.id}?alt=media&key=${apiKey}`;

          const estaBaixando = !!baixando[foto.id];

          return (
            <div
              key={foto.id}
              className="overflow-hidden flex flex-col  transition-all group relative"
            >
              {/* Botão de Download Discreto no Cantinho Superior Direito */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evita abrir o modal ao clicar no botão
                  baixarFoto(foto.id, foto.name, foto.mimeType);
                }}
                disabled={estaBaixando}
                className="absolute top-2 md:top-2 xl:top-2 right-1 z-30 hover:bg-andreia-darkest text-andreia-light hover:text-white p-2 rounded-full backdrop-blur-sm transition-all border border-andreia/30 shadow-md disabled:opacity-50 disabled:cursor-wait"
                title="Baixar foto"
              >
                {estaBaixando ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                )}
              </button>

              {/* Imagem clicável para abrir o Modal */}
              <div
                onClick={() => abrirModal(foto.id)}
                className="cursor-pointer rounded-sm overflow-hidden relative h-96 lg:h-76 bg-andreia-darkest/50 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-andreia-darkest/20 group-hover:bg-transparent transition-colors z-20" />
                <ImagemCarregavel
                  src={miniaturaOtimizada}
                  alt={foto.name}
                  className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>
            </div>
          );
        })}
      </div>

      {temMais && (
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={() => setVisivel((v) => v + 4)}
            className="bg-transparent hover:bg-andreia-dark text-white font-sans font-medium py-3 px-8 rounded-full border border-andreia/50 transition-all active:scale-95 shadow-md flex items-center gap-2 group"
          >
            Carregar mais fotos desta pasta
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-y-1 transition-transform"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}

      {/* LIGHTBOX MODERNA INTEGRADA */}
      <Lightbox
        open={modalOpen}
        close={() => setModalOpen(false)}
        index={currentIndex}
        slides={lightboxSlides}
        plugins={[Download, Zoom]}
        on={{ view: ({ index }) => setCurrentIndex(index) }}
        download={{
          download: ({ slide }) => {
            baixarFoto(
              slide.downloadUrl as string,
              slide.alt || "foto.jpg",
              (slide as any).downloadMime,
            );
          },
        }}
        styles={{ container: { backgroundColor: "rgba(10, 10, 10, 0.95)" } }}
      />
    </section>
  );
}
