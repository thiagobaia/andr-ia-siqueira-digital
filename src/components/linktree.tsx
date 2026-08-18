import React from "react";
// Importações do lucid-react mantidas e utilizadas
import { Share2, Sparkles, ChevronRight } from "lucide-react";
import perfil from "../assets/FOTO-PERFIL.png"; // Importando os links de um arquivo separado

// Defina os links da sua campanha aqui
// A propriedade 'iconUrl' não é mais usada para renderizar imagens à esquerda na lista,
// mas foi mantida para não quebrar a estrutura de dados existente.
const LINKS = [
  {
    id: "1",
    title: (
      <>
        WHATSAPP <br /> ASCOM ANDRÉIA SIQUEIRA
      </>
    ),
    url: "https://wa.me/559493095185",
  },
  {
    id: "2",
    title: "FIGURINHAS DO WHATSAPP",
    url: "https://andreiasiqueira2026.com.br/sticker-gallery",
  },
  {
    id: "3",
    title: "EDITAR FOTO DE PERFIL - MOLDURA",
    url: "https://andreiasiqueira2026.com.br/molduras",
  },
  {
    id: "4",

    title: "SITE OFICIAL",
    url: "https://andreiasiqueira2026.com.br",
  },
];

export default function Linktree() {
  return (
    <div className="relative min-h-screen bg-andreia-darkest font-sans flex flex-col items-center overflow-hidden">
      {/* ==================================================== */}
      {/* BACKGROUND (Fundo com gradiente, foto e número 4010) */}
      {/* ==================================================== */}
      <div className="absolute inset-0 z-0 flex flex-col justify-end">
        {/* Gradiente principal do tema */}
        <div className="absolute inset-0 bg-gradient-andreia opacity-90 z-10" />

        {/* Substitua o src abaixo pela foto da Andreia recortada sem fundo */}
        <img
          src="/foto-andreia-fundo.png"
          alt="Fundo"
          className="w-full h-full object-cover object-bottom z-0 opacity-40 mix-blend-overlay"
        />
      </div>

      {/* ==================================================== */}
      {/* CONTEÚDO PRINCIPAL                                    */}
      {/* ==================================================== */}
      <div className="relative z-20 w-full max-w-md px-16 pt-8 pb-12 flex flex-col min-h-screen">
        {/* HEADER: Botões do topo */}
        <div className="w-full flex justify-between items-center mb-6">
          <button className="w-11 h-11 rounded-full bg-black/30 flex items-center justify-center backdrop-blur-md border border-white/10 text-white hover:bg-black/50 transition-colors shadow-lg">
            <Sparkles className="w-5 h-5" />
          </button>
          <button className="w-11 h-11 rounded-full bg-black/30 flex items-center justify-center backdrop-blur-md border border-white/10 text-white hover:bg-black/50 transition-colors shadow-lg">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* PERFIL: Foto, Badge e Nomes */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            {/* Foto de Perfil Redonda */}
            <img
              src={perfil}
              alt="Andreia Siqueira"
              className="w-80  rounded-md object-cover object-bottom border-[3px] border-transparent shadow-xl"
            />
          </div>
        </div>

        {/* LISTA DE LINKS: Glassmorphism */}
        <div className="w-full space-y-4 flex-1 flex flex-col justify-start">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full h-[68px] flex items-center rounded-radius-xl bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all group shadow-card overflow-hidden"
            >
              {/* MODIFICAÇÃO AQUI: */}
              {/* Ícone da Esquerda - img substituída por ChevronRight */}
              <div className="w-[68px] h-[68px] flex-shrink-0 flex items-center justify-center z-10 text-white/90">
                <ChevronRight className="w-8 h-8 drop-shadow-md" />
              </div>

              {/* Texto Centralizado Absoluto */}
              <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-[15px] pointer-events-none px-16 leading-tight drop-shadow-md centered-axis-x text-center">
                {link.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
