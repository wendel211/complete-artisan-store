"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // 🔄 Atualiza automaticamente quando o nome for alterado no perfil
  useEffect(() => {
    const loadUser = () => {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : null);
    };

    loadUser();

    // Ouvinte para capturar mudanças de user em outras abas ou updates
    window.addEventListener("storage", loadUser);

    // Atualiza também quando voltar do profile sem reload
    window.addEventListener("user-updated", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("user-updated", loadUser);
    };
  }, []);

  const handleLogout = () => {
    if (confirm("Deseja sair da sua conta?")) {
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-extrabold text-green-700 hover:text-green-800 transition-colors"
        >
          🛍️ MicroLoja
        </Link>

        <nav className="hidden md:flex items-center space-x-8 font-medium">
          <Link href="/" className="hover:text-green-700 transition-colors">
            Início
          </Link>

          {/* ✅ Carrinho e Perfil só aparecem se o usuário estiver logado */}
          {user && (
            <>
              <Link
                href="/cart"
                className="hover:text-green-700 transition-colors"
              >
                Carrinho
              </Link>
              <Link
                href="/profile"
                className="hover:text-green-700 transition-colors"
              >
                Perfil
              </Link>
            </>
          )}

          {/* ✅ Exibição dinâmica do nome e opções */}
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-green-700 font-semibold">
                Olá, {user.name.split(" ")[0]} 👋
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-600 transition"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hover:text-green-700 transition-colors"
            >
              Entrar
            </Link>
          )}
        </nav>

        {/* 🔸 Menu Mobile (pode ser implementado futuramente) */}
        <div className="md:hidden">
          <button
            type="button"
            className="p-2 text-gray-600 hover:text-green-700 transition"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
