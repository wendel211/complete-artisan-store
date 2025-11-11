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
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        showFrete ? "top-0" : "top-0"
      }`}
    >
      {/* 🔝 Faixa de frete grátis (some ao rolar) */}
      <div
        className={`bg-[#4b6043] text-white text-center py-2 text-sm font-medium tracking-wide transition-all duration-500 ${
          showFrete
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full h-0 overflow-hidden"
        }`}
      >
        FRETE GRÁTIS para todo o Brasil em compras acima de R$250
      </div>

      {/* 🌿 Navbar principal — sobe automaticamente para ocupar o topo */}
      <div
        className={`bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-500 ${
          showFrete ? "translate-y-0" : "translate-y-[-1px]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-[#3e4a33] hover:text-[#4b6043] transition"
          >
            MicroLoja
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
            <Link href="/" className="hover:text-[#4b6043] transition-colors">
              Início
            </Link>

            {user && (
              <>
                <Link
                  href="/cart"
                  className="hover:text-[#4b6043] transition-colors"
                >
                  Carrinho
                </Link>
                <Link
                  href="/profile"
                  className="hover:text-[#4b6043] transition-colors"
                >
                  Perfil
                </Link>
              </>
            )}

            {!user && (
              <Link
                href="/login"
                className="hover:text-[#4b6043] transition-colors"
              >
                Entrar
              </Link>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 transition"
              >
                Sair
              </button>
            )}
          </nav>

          {/* Menu Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-1 p-2 text-gray-700 hover:text-[#4b6043] transition"
            aria-label="Menu"
          >
            <span className="w-6 h-0.5 bg-current rounded"></span>
            <span className="w-6 h-0.5 bg-current rounded"></span>
            <span className="w-6 h-0.5 bg-current rounded"></span>
          </button>
        </div>
      </div>

      {/* 📱 Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-slideDown">
          <nav className="flex flex-col items-center py-6 space-y-4 font-medium text-gray-700">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#4b6043] transition"
            >
              Início
            </Link>

            {user && (
              <>
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#4b6043] transition"
                >
                  Carrinho
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#4b6043] transition"
                >
                  Perfil
                </Link>
              </>
            )}

            {!user && (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#4b6043] transition"
              >
                Entrar
              </Link>
            )}

            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-gray-500 hover:text-red-600 transition"
              >
                Sair
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
