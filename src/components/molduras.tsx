import React, { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

// Defina aqui o caminho da sua única moldura (coloque o arquivo na pasta public/imagens-molduras)
const MOLDURA_PADRAO = "/imagens-molduras/moldura-1.png";

export default function Molduras() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [bgColor, setBgColor] = useState<string>("transparent");

  // Estados para controlar o arrastar (Pan)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

    // Reseta posição e zoom ao subir nova imagem
    setPosition({ x: 0, y: 0 });
    setScale(1);

    const reader = new FileReader();
    reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  // Eventos de Toque / Mouse para mover a foto
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    // Captura o ponteiro para continuar arrastando mesmo se o dedo sair rápido do elemento
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Função para centralizar a foto novamente
  const centerImage = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Função que converte o visual da tela em 1080x1080
  const handleDownload = () => {
    if (!imgRef.current || !containerRef.current) {
      alert("Por favor, faça o upload de uma foto primeiro.");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // GARANTIA: Saída estritamente em 1080x1080
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

    // B. CORTE (MÁSCARA CIRULAR): Ajustado para 15 pixels de recuo da moldura
    const radius = OUTPUT_SIZE / 2 - 15;
    ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, radius, 0, 2 * Math.PI);
    ctx.clip();

    // Referências para o cálculo
    const image = imgRef.current;
    const containerW = containerRef.current.clientWidth;

    // C. Calcula a proporção entre a tela do usuário e os 1080px finais
    const ratio = OUTPUT_SIZE / containerW;

    // Move o eixo do Canvas para o centro exato (540, 540)
    ctx.translate(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2);

    // Aplica o Arrastar (Pan) convertido da tela para a escala de 1080
    ctx.translate(position.x * ratio, position.y * ratio);

    // Aplica o Zoom (Scale)
    ctx.scale(scale, scale);

    // D. Calcula o tamanho "object-fit: cover" para o Canvas
    const scaleFactor = Math.max(
      OUTPUT_SIZE / image.naturalWidth,
      OUTPUT_SIZE / image.naturalHeight,
    );
    const drawW = image.naturalWidth * scaleFactor;
    const drawH = image.naturalHeight * scaleFactor;

    // Desenha a imagem exatamente centralizada antes das transformações agirem
    ctx.drawImage(image, -drawW / 2, -drawH / 2, drawW, drawH);
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
        "Erro ao aplicar a moldura. Verifique se o arquivo 'moldura-1.png' existe na pasta public/imagens-molduras.",
      );
    };

    frameImg.src = MOLDURA_PADRAO;
  };

  return (
    <div className="min-h-screen bg-andreia-darkest text-white font-sans flex items-center section-pad">
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
            Arraste a foto com o dedo para posicionar • Use a barra para o zoom
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
                  onClick={centerImage}
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

        {/* Coluna da Direita: Preview Visual Interativo */}
        <div className="flex justify-center relative">
          <div
            ref={containerRef}
            // `touch-none` é obrigatório para evitar que o mobile role a tela ao arrastar a foto
            className="relative w-full max-w-md aspect-square rounded-full flex items-center justify-center m-0 p-0 shadow-card border-4 border-andreia-dark overflow-hidden touch-none"
            style={{
              backgroundColor: bgColor === "white" ? "#FFFFFF" : "transparent",
              cursor: imgSrc ? (isDragging ? "grabbing" : "grab") : "default",
            }}
            onPointerDown={imgSrc ? handlePointerDown : undefined}
            onPointerMove={imgSrc ? handlePointerMove : undefined}
            onPointerUp={imgSrc ? handlePointerUp : undefined}
            onPointerCancel={imgSrc ? handlePointerUp : undefined}
          >
            {/* 1. Camada da Foto */}
            {!imgSrc ? (
              <label className="w-full h-full flex flex-col items-center justify-center text-andreia-light cursor-pointer hover:bg-andreia-darkest/50 transition-colors z-20">
                <Upload className="w-16 h-16 mb-4 opacity-50" />
                <span className="font-semibold text-lg">Clique para subir sua foto</span>
                <input type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
              </label>
            ) : (
              <img
                ref={imgRef}
                alt="Sua foto arrastável"
                src={imgSrc}
                // O pointer-events-none repassa o clique do mouse/toque para a div Container gerenciar o movimento
                className="absolute max-w-none pointer-events-none select-none"
                style={{
                  top: "50%",
                  left: "50%",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Garante preenchimento total da moldura
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
                }}
              />
            )}

            {/* 2. Camada da Moldura Fixa por Cima */}
            <img
              src={MOLDURA_PADRAO}
              alt="Moldura Visualização"
              crossOrigin="anonymous"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 m-0 p-0 select-none"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
