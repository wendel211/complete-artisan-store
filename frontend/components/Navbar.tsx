"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFrete, setShowFrete] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : null);
    };

    loadUser();
    window.addEventListener("user-updated", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("user-updated", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // 🎯 Detecta o scroll e esconde a faixa
  useEffect(() => {
    const handleScroll = () => {
      setShowFrete(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (confirm("Deseja sair da sua conta?")) {
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* 🔝 Faixa de frete grátis (some ao rolar) */}
      <div
        className={`bg-gradient-to-r from-[#4b6043] to-[#5a7350] text-white text-center py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
          showFrete
            ? "opacity-100 max-h-12"
            : "opacity-0 max-h-0 py-0 overflow-hidden"
        }`}
      >
        ✨ FRETE GRÁTIS para todo o Brasil em compras acima de R$250
      </div>

      {/* 🌿 Navbar principal */}
      <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo com estilo aprimorado */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-[#3e4a33] hover:text-[#4b6043] transition-all duration-300 hover:scale-105"
          >
          MicroLoja
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="relative text-gray-700 font-medium hover:text-[#4b6043] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#4b6043] after:transition-all after:duration-300 hover:after:w-full pb-1"
            >
              Início
            </Link>

            {user && (
              <>
                <Link
                  href="/cart"
                  className="relative text-gray-700 font-medium hover:text-[#4b6043] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#4b6043] after:transition-all after:duration-300 hover:after:w-full pb-1"
                >
                  🛒 Carrinho
                </Link>
                <Link
                  href="/profile"
                  className="relative text-gray-700 font-medium hover:text-[#4b6043] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#4b6043] after:transition-all after:duration-300 hover:after:w-full pb-1"
                >
                     Perfil
                </Link>
              </>
            )}

            {!user ? (
              <Link
                href="/login"
                className="px-6 py-2 bg-[#4b6043] text-white font-semibold rounded-full hover:bg-[#3e4a33] transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Entrar
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-300 hover:shadow-md"
              >
                Sair
              </button>
            )}
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 text-gray-700 hover:text-[#4b6043] transition-all duration-300"
            aria-label="Menu"
          >
            <span
              className={`w-6 h-0.5 bg-current rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-current rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-current rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* 📱 Menu Mobile */}
      <div
        className={`md:hidden bg-white border-b border-gray-200 shadow-lg transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center py-6 space-y-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 font-medium hover:text-[#4b6043] transition-colors duration-300 px-6 py-2 rounded-lg hover:bg-gray-50 w-40 text-center"
          >
            Início
          </Link>

          {user && (
            <>
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-[#4b6043] transition-colors duration-300 px-6 py-2 rounded-lg hover:bg-gray-50 w-40 text-center"
              >
                🛒 Carrinho
              </Link>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-[#4b6043] transition-colors duration-300 px-6 py-2 rounded-lg hover:bg-gray-50 w-40 text-center"
              >
                👤 Perfil
              </Link>
            </>
          )}

          {!user ? (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="px-8 py-2.5 bg-[#4b6043] text-white font-semibold rounded-full hover:bg-[#3e4a33] transition-all duration-300 hover:shadow-lg"
            >
              Entrar
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="px-8 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-300"
            >
              Sair
            </button>
          )}
        </div>
      </div>
    </header>
  );
}