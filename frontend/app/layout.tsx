import { ReactNode } from "react";
import Link from "next/link";
import "./tailwind.css";


export const metadata = {
  title: "MicroLoja Artesanal",
  description: "Seu e-commerce artesanal desenvolvido com Next.js e Laravel",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-800 font-sans antialiased flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="bg-white shadow-sm fixed w-full top-0 left-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-green-700 tracking-tight">
              🛍️ MicroLoja
            </Link>

            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <Link href="/" className="text-gray-700 hover:text-green-700 transition">
                Início
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-green-700 transition">
                Carrinho
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-green-700 transition">
                Entrar
              </Link>
            </nav>

            {/* Mobile Menu Placeholder */}
            <button className="md:hidden text-gray-700 hover:text-green-700">
              ☰
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow pt-24">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t mt-10">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} MicroLoja Artesanal —{" "}
              <span className="text-green-700 font-medium">feito com ❤️ por Wendel Muniz</span>
            </p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <a href="#" className="hover:text-green-700 transition">Termos</a>
              <a href="#" className="hover:text-green-700 transition">Privacidade</a>
              <a href="#" className="hover:text-green-700 transition">Contato</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
