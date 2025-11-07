import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "MicroLoja Artesanal",
  description: "E-commerce artesanal com Next.js + Laravel",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-800 font-sans">
        {/* Navbar */}
        <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-green-700">
              🛍️ MicroLoja
            </Link>
            <nav className="space-x-6">
              <Link href="/" className="hover:text-green-700 font-medium">Início</Link>
              <Link href="/cart" className="hover:text-green-700 font-medium">Carrinho</Link>
              <Link href="/login" className="hover:text-green-700 font-medium">Entrar</Link>
            </nav>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="pt-24 pb-12 px-6 min-h-screen">{children}</main>

        {/* Rodapé */}
        <footer className="bg-white border-t text-center py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} MicroLoja Artesanal · Criado por{" "}
          <span className="font-semibold text-green-700">Wendel Muniz</span>
        </footer>
      </body>
    </html>
  );
}
