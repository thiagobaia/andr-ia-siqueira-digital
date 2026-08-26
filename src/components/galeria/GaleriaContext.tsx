import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { DriveFile, GaleriaSection } from "@/components/galeria/shared";

interface GaleriaContextValue {
  secoes: GaleriaSection[];
  loading: boolean;
  erroCarregamento: string | null;
  apiKey: string;
}

const GaleriaContext = createContext<GaleriaContextValue | null>(null);

export function useGaleria() {
  const ctx = useContext(GaleriaContext);
  if (!ctx) {
    throw new Error("useGaleria deve ser usado dentro de <GaleriaProvider>");
  }
  return ctx;
}

export function GaleriaProvider({ children }: { children: ReactNode }) {
  const [secoes, setSecoes] = useState<GaleriaSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState<string | null>(null);

  const apiKey = import.meta.env["VITE_GOOGLE_DRIVE_API_KEY"];
  const pastaMaeId = import.meta.env["VITE_ID_PASTA_MAE"];

  // REMOVIDO: cache em sessionStorage.
  // Antes, uma vez que os dados eram salvos no sessionStorage, o
  // componente parava de consultar a API do Google Drive e passava a
  // usar sempre a versão antiga — então pastas novas criadas dentro da
  // pasta raiz nunca apareciam até o cache expirar manualmente.
  // Agora, toda vez que o navegador é atualizado (F5) ou a página é
  // aberta, buscamos os dados direto na API, então qualquer subpasta
  // nova criada dentro da pasta raiz aparece automaticamente e já
  // ganha sua própria rota numérica (/galeria/1, /galeria/2, ...)
  // de acordo com a posição dela na lista ordenada por data de criação.
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

  return (
    <GaleriaContext.Provider value={{ secoes, loading, erroCarregamento, apiKey }}>
      {children}
    </GaleriaContext.Provider>
  );
}
