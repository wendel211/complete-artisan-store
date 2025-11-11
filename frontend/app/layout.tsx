import "./tailwind.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "MicroLoja Artesanal",
  description: "E-commerce artesanal desenvolvido com Next.js e Laravel",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-800 flex flex-col min-h-screen font-sans">
        <Navbar />

        <main className="flex-grow pt-24">{children}</main>

        <footer className="bg-white border-t border-gray-200 mt-10">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-green-700">
                MicroLoja Artesanal
              </span>{" "}
              — feito com ❤️ por Wendel Muniz
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <Link href="#" className="hover:text-green-700 transition-colors">
                Termos
              </Link>
              <Link href="#" className="hover:text-green-700 transition-colors">
                Privacidade
              </Link>
              <Link href="#" className="hover:text-green-700 transition-colors">
                Contato
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
