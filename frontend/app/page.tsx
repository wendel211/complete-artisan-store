"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts } from "../lib/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  stock: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erro:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mb-3"></div>
        <p>Carregando produtos...</p>
      </div>
    );

  const handleViewDetails = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        🛍️ Produtos Artesanais
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto cadastrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              <img
                src={
                  p.image_url ||
                  "https://placehold.co/400x400?text=Produto+sem+imagem"
                }
                alt={p.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {p.description}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-green-700 font-bold text-lg">
                    R$ {Number(p.price).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {p.stock > 0
                      ? `Estoque: ${p.stock} un.`
                      : "Indisponível"}
                  </p>

                  <button
                    onClick={() => handleViewDetails(p.id)}
                    className="mt-3 w-full bg-green-600 text-white text-center font-medium py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
