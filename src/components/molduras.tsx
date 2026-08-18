import React, { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Upload, Download } from "lucide-react";

// Defina aqui o caminho da sua única moldura (coloque o arquivo na pasta public/molduras)
const MOLDURA_PADRAO = "/molduras/moldura-1.png";

const INITIAL_CROP: Crop = {
  unit: "%",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
};

// Centraliza e expande o corte inicial para pegar 100% da área possível
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 100 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}

export default function Molduras() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>(INITIAL_CROP);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | undefined>();
  const [scale, setScale] = useState<number>(1);
  const [bgColor, setBgColor] = useState<string>("transparent");
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Lida com o upload da foto do usuário
  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Selecione um arquivo de imagem válido.");
      e.target.value = "";
      return;
    }

    setCrop(INITIAL_CROP);
    setCompletedCrop(undefined);
    const reader = new FileReader();
    reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    imgRef.current = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1)); // Força proporção quadrada 1:1
  }

  // Função exata para o Canvas não vazar a foto da linha branca
  const handleDownload = () => {
    if (!imgRef.current) {
      alert("Por favor, faça o upload de uma foto primeiro.");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const OUTPUT_SIZE = 1080;

    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;

    // A. Desenha o fundo da imagem final (Branco ou Transparente)
    if (bgColor === "white") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
    } else {
      ctx.clearRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
    }

    ctx.save();
    ctx.beginPath();

    // B. CORTE (MÁSCARA): Ajustado para 15 pixels de recuo
    const radius = OUTPUT_SIZE / 2 - 15;
    ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, radius, 0, 2 * Math.PI);
    ctx.clip();

    // C. Aplica o Zoom (scale) exatamente a partir do centro
    ctx.translate(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2);
    ctx.scale(scale, scale);
    ctx.translate(-OUTPUT_SIZE / 2, -OUTPUT_SIZE / 2);

    const image = imgRef.current;

    // D. Pega exatamente a área que o usuário arrastou/selecionou no corte
    if (completedCrop && completedCrop.width > 0 && completedCrop.height > 0) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        OUTPUT_SIZE,
        OUTPUT_SIZE,
      );
    } else {
      const imgAspect = image.naturalWidth / image.naturalHeight;

      let sx = 0;
      let sy = 0;
      let sWidth = image.naturalWidth;
      let sHeight = image.naturalHeight;

      if (imgAspect > 1) {
        // Imagem horizontal: corta laterais para manter 1:1 sem distorcer
        sWidth = image.naturalHeight;
        sx = (image.naturalWidth - sWidth) / 2;
      } else if (imgAspect < 1) {
        // Imagem vertical: corta topo/base para manter 1:1 sem distorcer
        sHeight = image.naturalWidth;
        sy = (image.naturalHeight - sHeight) / 2;
      }

      ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
    }

    ctx.restore();

    // E. Desenha a moldura por cima cobrindo a beirada da foto
    const frameImg = new Image();
    frameImg.crossOrigin = "anonymous";

    frameImg.onload = () => {
      ctx.drawImage(frameImg, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

      const link = document.createElement("a");
      link.download = "andreia-siqueira-4010.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    frameImg.onerror = () => {
      alert(
        "Erro ao aplicar a moldura. Verifique se o arquivo 'moldura-1.png' existe na pasta public/molduras.",
      );
    };

    frameImg.src = MOLDURA_PADRAO;
  };

  return (
    <div className="min-h-screen bg-andreia-darkest text-white font-sans flex items-center section-pad">
      {/* Estilo embutido para remover bordas sujas e esconder os puxadores */}
      <style>{`
        .ReactCrop__crop-selection {
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
        .ReactCrop__drag-handle {
          display: none !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6 md:px-12">
        {/* Coluna da Esquerda: Textos e Controles */}
        <div className="space-y-6">
          <div className="bg-accent text-accent-foreground inline-block px-5 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
            MOLDURA OFICIAL
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight text-white">
            Sua foto com a <span className="text-gradient-andreia">4010</span>
          </h1>

          <p className="text-xl text-andreia-light font-medium">
            Escolha uma foto, ajuste dentro do círculo e baixe pronta para usar no seu perfil.
          </p>

          <p className="text-sm text-andreia-light/80">
            Arraste a foto para posicionar • pinça ou rolagem para o zoom
          </p>

          <div className="bg-andreia-dark p-8 rounded-radius-2xl shadow-card border border-andreia space-y-6">
            {/* Ajuste de Zoom e Botões */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-andreia-light mb-4">
                AJUSTAR
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <button
                  className="text-3xl text-andreia-light hover:text-white transition-colors"
                  onClick={() => setScale((s) => Math.max(1, s - 0.2))}
                >
                  -
                </button>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={scale}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setScale(Number(e.target.value))
                  }
                  className="w-full h-2 bg-andreia-darkest rounded-full appearance-none cursor-pointer accent-accent"
                />
                <button
                  className="text-3xl text-andreia-light hover:text-white transition-colors"
                  onClick={() => setScale((s) => Math.min(3, s + 0.2))}
                >
                  +
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() =>
                    setCrop(
                      centerAspectCrop(
                        imgRef.current?.width || 100,
                        imgRef.current?.height || 100,
                        1,
                      ),
                    )
                  }
                  className="bg-transparent border-2 border-andreia py-3.5 rounded-radius-lg font-semibold text-white hover:bg-andreia transition-colors"
                >
                  Centralizar
                </button>
                <label className="bg-transparent border-2 border-andreia py-3.5 rounded-radius-lg font-semibold text-white text-center cursor-pointer hover:bg-andreia transition-colors flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5 text-andreia-light" /> Trocar foto
                  <input type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full bg-accent text-accent-foreground py-4 rounded-radius-xl font-bold text-lg hover:shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={!imgSrc}
          >
            <Download className="w-6 h-6" /> Baixar foto
          </button>
        </div>

        {/* Coluna da Direita: Preview Visual */}
        <div className="flex justify-center relative">
          <div className="relative w-full max-w-md aspect-square rounded-full flex items-center justify-center m-0 p-0 shadow-card bg-transparent border-4 border-andreia-dark">
            {/* 1. Camada de Fundo */}
            <div
              className={`absolute inset-0 w-full h-full rounded-full ${bgColor === "white" ? "bg-white" : "bg-transparent"}`}
            ></div>

            {/* 2. Camada da Foto com clip-path */}
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden rounded-full"
              style={{ clipPath: "circle(48% at 50% 50%)" }}
            >
              {!imgSrc ? (
                <label className="w-full h-full flex flex-col items-center justify-center text-andreia-light cursor-pointer hover:bg-andreia-darkest/50 transition-colors z-20">
                  <Upload className="w-16 h-16 mb-4 opacity-50" />
                  <span className="font-semibold text-lg">Clique para subir sua foto</span>
                  <input type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
                </label>
              ) : (
                <ReactCrop
                  crop={crop}
                  onChange={(c: Crop) => setCrop(c)}
                  onComplete={(c: PixelCrop) => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    ref={imgRef}
                    alt="Sua foto"
                    src={imgSrc}
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: "center",
                    }}
                    onLoad={onImageLoad}
                    className="max-w-full max-h-full mx-auto"
                  />
                </ReactCrop>
              )}
            </div>

            {/* 3. Camada da Moldura Perfeita e Tratada */}
            <img
              src={MOLDURA_PADRAO}
              alt="Moldura Visualização"
              crossOrigin="anonymous"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 m-0 p-0"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                (e.target as HTMLImageElement).style.display = "none"; // Se não achar a moldura-1.png oculta do preview
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
