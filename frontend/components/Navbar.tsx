"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
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
          <Link href="/cart" className="hover:text-green-700 transition-colors">
            Carrinho
          </Link>

          {user ? (
            <>
              <span className="text-green-700 font-semibold">
                Olá, {user.name.split(" ")[0]} 👋
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-600 transition"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hover:text-green-700 transition-colors"
            >
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
