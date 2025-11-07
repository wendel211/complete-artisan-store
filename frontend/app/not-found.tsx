"use client";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-gray-700">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Página não encontrada.</p>
      <a
        href="/"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        Voltar ao Início
      </a>
    </div>
  );
}
