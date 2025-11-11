"use client"; // 👈 Permite usar componentes client-side dentro do layout

import "./tailwind.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import { SearchProvider } from "../context/SearchContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // 🧭 Rotas que não devem mostrar o layout completo
  const hideLayoutRoutes = ["/login", "/register"];
  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-800 flex flex-col min-h-screen font-sans">
        {/* ✅ Agora o provider envolve tudo */}
        <SearchProvider>
          {/* Header */}
          {!shouldHideLayout && <Navbar />}

          {/* Conteúdo principal */}
          <main className={`flex-grow ${!shouldHideLayout ? "pt-24" : ""}`}>
            {children}
          </main>

          {/* Footer */}
          {!shouldHideLayout && (
            <footer className="bg-gradient-to-br from-[#3e4a33] via-[#4b6043] to-[#3e4a33] text-white">
              <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">MicroLoja</h3>
                    <p className="text-white/80 text-sm">
                      Conectando artesãos talentosos com pessoas que valorizam o
                      trabalho manual autêntico.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Links Rápidos</h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>
                        <a href="#" className="hover:text-white transition">
                          Sobre Nós
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition">
                          Política de Privacidade
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition">
                          Termos de Uso
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Contato</h4>
                    <p className="text-sm text-white/80">
                      contato@microloja.com.br
                      <br />
                      Feira de Santana, BA
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
                  © {new Date().getFullYear()} MicroLoja Artesanal — Desenvolvido
                  com dedicação por Wendel Muniz
                </div>
              </div>
            </footer>
          )}
        </SearchProvider>
      </body>
    </html>
  );
}
