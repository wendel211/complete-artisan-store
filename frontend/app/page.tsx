"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mb-4"></div>
        <p className="text-lg font-medium">Carregando produtos...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Produtos em Destaque
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum produto disponível no momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col"
            >
              <img
                src={p.image_url || "https://placehold.co/400x400"}
                alt={p.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {p.description || "Produto artesanal exclusivo"}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-green-700 font-bold text-lg">
                    R$ {Number(p.price).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {p.stock > 0
                      ? `Estoque: ${p.stock} unidades`
                      : "Indisponível"}
                  </p>

                  <Link
                    href={`/product/${p.id}`}
                    className="mt-3 inline-block w-full bg-green-600 text-white text-center font-medium py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
