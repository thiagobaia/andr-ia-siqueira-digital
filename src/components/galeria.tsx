import { useState, useEffect } from "react";

// Imports da Yet Another React Lightbox e seus Plugins
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import mobile from "@/assets/CELULAR.webp";
import tablet from "@/assets/TABLET.webp";
import desktop from "@/assets/DESKTOP.webp";
import fundo from "@/assets/FUNDO.webp";

// Tipagens
interface DriveFile {
  id: string;
  name: string;
  createdTime?: string;
  thumbnailLink?: string;
  mimeType?: string;
}

interface GaleriaSection {
  folderId: string;
  folderName: string;
  photos: DriveFile[];
}

// Normaliza o nome da pasta para uso em caminhos (sem acentos, minúsculo,
// espaços e caracteres especiais viram hífen). Ex: "Casamento André & Ana"
// -> "casamento-andre-ana"
function normalizarNomePasta(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

// 1. Componente de Spinner isolado
const LoadingSpinner = () => (
  <div role="status" className="absolute inset-0 flex items-center justify-center z-0">
    <svg
      aria-hidden="true"
      className="w-8 h-8 text-andreia-dark animate-spin fill-andreia-light"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Carregando...</span>
  </div>
);

// 2. Componente de imagem otimizado
function ImagemCarregavel({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingSpinner />}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        decoding="async"
      />
    </>
  );
}

export function GaleriaDrive() {
  const [secoes, setSecoes] = useState<GaleriaSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState<string | null>(null);

  // Substitui a antiga paginação: agora navegamos entre a grade de pastas
  // (pastaSelecionadaId === null) e a visualização interna de uma pasta.
  const [pastaSelecionadaId, setPastaSelecionadaId] = useState<string | null>(null);
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

  // Estados do Modal Lightbox
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estados do Download (controla loading por foto e erros)
  const [baixando, setBaixando] = useState<Record<string, boolean>>({});
  const [erroDownload, setErroDownload] = useState<string | null>(null);

  // Estado do botão de copiar caminho da pasta
  const [caminhoCopiado, setCaminhoCopiado] = useState(false);

  const apiKey = import.meta.env["VITE_GOOGLE_DRIVE_API_KEY"];
  const pastaMaeId = import.meta.env["VITE_ID_PASTA_MAE"];

  // REMOVIDO: cache em sessionStorage.
  // Antes, uma vez que os dados eram salvos no sessionStorage, o
  // componente parava de consultar a API do Google Drive e passava a
  // usar sempre a versão antiga — então pastas novas criadas dentro da
  // pasta raiz nunca apareciam até o cache expirar manualmente.
  // Agora, toda vez que o navegador é atualizado (F5) ou a página é
  // aberta, o componente busca os dados direto na API, então qualquer
  // subpasta nova criada dentro da pasta raiz aparece automaticamente,
  // sem precisar de botão de atualizar.
  useEffect(() => {
    async function carregarTudo() {
      setLoading(true);
      setErroCarregamento(null);

      try {
        const queryPastas = `'${pastaMaeId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
        const urlPastas = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(queryPastas)}&key=${apiKey}&fields=files(id,name,createdTime)&pageSize=1000`;

        const resPastas = await fetch(urlPastas);
        if (!resPastas.ok) throw new Error("Erro ao buscar subpastas");
        const dataPastas = await resPastas.json();
        const subpastas: DriveFile[] = dataPastas.files || [];

        subpastas.sort((a, b) => {
          const dataA = a.createdTime ? new Date(a.createdTime).getTime() : 0;
          const dataB = b.createdTime ? new Date(b.createdTime).getTime() : 0;
          return dataB - dataA;
        });

        const galeriasCompletas = await Promise.all(
          subpastas.map(async (pasta) => {
            // Inclui "mimeType" nos fields para sabermos qual extensão
            // usar no download quando o nome do arquivo não tiver uma.
            const queryFotos = `'${pasta.id}' in parents and mimeType contains 'image/' and trashed=false`;
            const urlFotos = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(queryFotos)}&key=${apiKey}&fields=files(id,name,thumbnailLink,mimeType)&pageSize=1000`;

            const resFotos = await fetch(urlFotos);
            const dataFotos = await resFotos.json();

            return {
              folderId: pasta.id,
              folderName: pasta.name,
              photos: dataFotos.files || [],
            };
          }),
        );

        const galeriasValidas = galeriasCompletas.filter((secao) => secao.photos.length > 0);

        setSecoes(galeriasValidas);

        const initialCounts: Record<string, number> = {};
        galeriasValidas.forEach((sec) => (initialCounts[sec.folderId] = 8));
        setVisibleCounts(initialCounts);

        // Se a pasta atualmente selecionada não existir mais (ex: foi
        // removida ou ficou sem fotos), volta para a grade principal.
        setPastaSelecionadaId((atual) =>
          atual && !galeriasValidas.some((s) => s.folderId === atual) ? null : atual,
        );
      } catch (error) {
        console.error(error);
        setErroCarregamento(
          "Não foi possível carregar a galeria. Verifique sua conexão e tente novamente.",
        );
      } finally {
        setLoading(false);
      }
    }

    carregarTudo();
  }, [pastaMaeId, apiKey]);

  const carregarMaisFotos = (folderId: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [folderId]: (prev[folderId] || 8) + 4,
    }));
  };

  const abrirPasta = (folderId: string) => {
    setPastaSelecionadaId(folderId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const voltarParaGaleria = () => {
    setPastaSelecionadaId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const secaoAtual = secoes.find((s) => s.folderId === pastaSelecionadaId);
  const fotosDaSecaoAtual = secaoAtual ? secaoAtual.photos : [];

  const abrirModal = (fotoId: string) => {
    const index = fotosDaSecaoAtual.findIndex((f) => f.id === fotoId);
    if (index !== -1) {
      setCurrentIndex(index);
      setModalOpen(true);
    }
  };

  // Copia o caminho estruturado da pasta atual (ex: "galeria/casamento-2026")
  // para a área de transferência, com feedback visual rápido no botão.
  const copiarCaminhoPasta = async () => {
    if (!secaoAtual) return;

    const caminho = `galeria/${normalizarNomePasta(secaoAtual.folderName)}`;

    try {
      await navigator.clipboard.writeText(caminho);
      setCaminhoCopiado(true);
      setTimeout(() => setCaminhoCopiado(false), 2000);
    } catch (error) {
      console.error("Falha ao copiar caminho da pasta:", error);
      setErroDownload("Não foi possível copiar o caminho da pasta.");
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

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const blob = await response.blob();

      // Garante extensão no nome do arquivo, mesmo que o Drive
      // não retorne um nome com extensão.
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
      // Removido o window.open() de fallback: ele era bloqueado
      // silenciosamente pelo navegador. Em vez disso, avisamos o
      // usuário com uma mensagem visível.
      setErroDownload(
        "Não foi possível baixar a foto. Verifique se o arquivo está compartilhado como 'Qualquer pessoa com o link' no Google Drive, ou tente novamente.",
      );
    } finally {
      setBaixando((prev) => ({ ...prev, [id]: false }));
    }
  };

  const lightboxSlides = fotosDaSecaoAtual.map((foto) => ({
    src: `https://www.googleapis.com/drive/v3/files/${foto.id}?alt=media&key=${apiKey}`,
    alt: foto.name,
    downloadUrl: foto.id,
    downloadMime: foto.mimeType,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-andreia-darkest flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const limiteAtual = secaoAtual ? visibleCounts[secaoAtual.folderId] || 8 : 8;
  const fotosVisiveis = fotosDaSecaoAtual.slice(0, limiteAtual);
  const temMaisFotos = fotosDaSecaoAtual.length > limiteAtual;

  return (
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

      {/* Aviso de erro de carregamento geral da galeria */}
      {erroCarregamento && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-md text-center flex items-center gap-3">
          <span>{erroCarregamento}</span>
          <button
            onClick={() => setErroCarregamento(null)}
            className="font-bold text-lg leading-none"
            aria-label="Fechar aviso"
          >
            ×
          </button>
        </div>
      )}

      {/* Aviso de erro de download, fica fixo no topo */}
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

      <main className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        {secoes.length === 0 ? (
          <p className="text-center text-andreia-light">
            Nenhuma subpasta com fotos foi encontrada.
          </p>
        ) : !secaoAtual ? (
          /* ------------------------------------------------------------
           * GRADE DE PASTAS (página principal, sem paginação)
           * ------------------------------------------------------------ */
          <section className="animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {secoes.map((secao) => {
                const capa = secao.photos[0];
                const miniaturaCapa = capa?.thumbnailLink
                  ? capa.thumbnailLink.replace("=s220", "=w500")
                  : capa
                    ? `https://www.googleapis.com/drive/v3/files/${capa.id}?alt=media&key=${apiKey}`
                    : "";

                return (
                  <button
                    key={secao.folderId}
                    onClick={() => abrirPasta(secao.folderId)}
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
        ) : (
          /* ------------------------------------------------------------
           * VISUALIZAÇÃO INTERNA DA PASTA (fotos)
           * ------------------------------------------------------------ */
          <section className="animate-fade-in flex flex-col min-h-[60vh]">
            <div className="flex items-center justify-between gap-3 mb-6 border-b border-andreia/20 pb-4">
              <button
                onClick={voltarParaGaleria}
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

              {/* Botão de copiar caminho da pasta */}
              <button
                onClick={copiarCaminhoPasta}
                className="hidden items-center gap-2 bg-andreia-dark hover:bg-andreia/20 text-andreia-light hover:text-white px-3 py-2 rounded-full border border-andreia/30 shadow-md transition-all text-xs md:text-sm font-medium shrink-0"
                title="Copiar caminho da pasta"
              >
                {caminhoCopiado ? (
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
                    <span className="hidden sm:inline">Copiar caminho</span>
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

            {temMaisFotos && (
              <div className="flex justify-center mt-12 mb-8">
                <button
                  onClick={() => carregarMaisFotos(secaoAtual.folderId)}
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
          </section>
        )}
      </main>

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
    </div>
  );
}
