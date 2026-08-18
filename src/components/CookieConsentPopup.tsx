import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

export default function CookieConsentModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já aceitou os termos anteriormente
    const consent = localStorage.getItem("privacy_consent_accepted");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacy_consent_accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    // Fundo escuro (backdrop) que bloqueia a tela inteira e impede cliques no site
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      {/* Caixa do Modal centralizada */}
      <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 animate-scale-up">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Sua Privacidade Importa
            </h3>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2.5 py-1 rounded-full font-semibold">
              LGPD
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Utilizamos cookies e tecnologias de rastreamento para melhorar sua experiência,
            personalizar conteúdos e analisar o tráfego do nosso site. Para continuar navegando, por
            favor, aceite nossa{" "}
            <Link
              to="/privacidade"
              className="text-blue-600 dark:text-blue-400 underline font-medium hover:text-blue-800"
            >
              Política de Privacidade
            </Link>
            .
          </p>

          <div className="flex items-center justify-end pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleAccept}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
            >
              Aceitar e Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
