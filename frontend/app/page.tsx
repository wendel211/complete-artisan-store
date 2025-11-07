"use client";

import { useEffect, useState } from "react";
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

  if (loading) return <p className="text-center p-6">Carregando produtos...</p>;

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛍️ Micro Loja Artesanal
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto disponível.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-all p-4"
            >
              <img
                src={p.image_url || "https://placehold.co/300x300"}
                alt={p.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="font-semibold text-lg mt-3">{p.name}</h2>
              <p className="text-gray-500 text-sm">{p.description}</p>
              <p className="mt-2 font-bold text-green-700">
                R$ {p.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
