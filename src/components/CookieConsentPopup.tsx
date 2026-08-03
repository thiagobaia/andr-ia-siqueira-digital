import React, { useState, useEffect } from 'react';

export default function CookieConsentPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já aceitou os termos anteriormente
    const consent = localStorage.getItem('privacy_consent_accepted');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacy_consent_accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl p-5 animate-slide-in">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Sua Privacidade Importa
          </h3>
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full font-medium">
            LGPD
          </span>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
          Utilizamos cookies e tecnologias de rastreamento para melhorar sua experiência e analisar o tráfego do nosso site. Para saber mais, acesse nossa{' '}
          <a 
            href="/privacidade"
            className="text-blue-600 dark:text-blue-400 underline font-medium hover:text-blue-800"
          >
            Política de Privacidade
          </a>.
        </p>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleAccept}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Aceitar e Continuar
          </button>
        </div>
      </div>
    </div>
  );
}