import React from "react";

// O Vite mapeia todos os arquivos da pasta public/sticker automaticamente
const stickerFiles = import.meta.glob("/public/sticker/*.{png,webp,jpg,jpeg,gif}");

// Extraímos apenas os nomes dos arquivos do caminho completo
const stickersList: string[] = Object.keys(stickerFiles).map((path) =>
  path.replace("/public/sticker/", ""),
);

export default function StickerGallery() {
  const stickers: string[] = stickersList;

  // Função para COPIAR com fundo transparente
  const handleCopy = async (fileName: string): Promise<void> => {
    try {
      const imageUrl = `/sticker/${fileName}`;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Falha ao criar contexto 2D");

      // GARANTE que o canvas esteja 100% transparente antes de desenhar
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert("Erro ao processar a imagem.");
          return;
        }

        try {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          alert("Copiado sem fundo! Dê Ctrl+V no WhatsApp.");
        } catch (err) {
          console.error("Erro ao acessar a área de transferência:", err);
          alert("Erro: Seu navegador não suporta cópia direta.");
        }
      }, "image/png");
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      alert("Falha ao copiar a figurinha.");
    }
  };

  // Função para BAIXAR o arquivo original (ideal para enviar como Figurinha Real)
  const handleDownload = (fileName: string): void => {
    const link = document.createElement("a");
    link.href = `/sticker/${fileName}`;
    link.download = fileName; // Força o download com o nome original
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-andreia-darkest text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Galeria de Figurinhas</h2>

        {stickers.length === 0 ? (
          <p className="text-white text-center col-span-full">
            Nenhuma figurinha encontrada na pasta public/sticker.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stickers.map((sticker, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-lg p-4 flex flex-col items-center shadow-sm bg-black/10 hover:shadow-md transition-shadow"
              >
                <img
                  src={`/sticker/${sticker}`}
                  alt={`Figurinha ${sticker}`}
                  className="w-32 h-32 object-contain mb-4 drop-shadow-sm"
                />

                <div className="flex flex-col gap-2 w-full">
                  <button
                    onClick={() => handleDownload(sticker)}
                    className="bg-andreia hover:opacity-90 text-white font-medium py-2 px-4 rounded w-full flex justify-center items-center transition-opacity text-sm"
                  >
                    Baixar Sticker
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
