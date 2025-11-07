"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    getProductById(Number(id)).then(setProduct).catch(console.error);
  }, [id]);

  if (!product)
    return (
      <div className="text-center text-gray-500 mt-20">Produto não encontrado.</div>
    );

  return (
    <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-6">
      <img
        src={product.image_url || "https://placehold.co/600x400"}
        alt={product.name}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-green-700 text-2xl font-bold mb-6">
        R$ {Number(product.price).toFixed(2)}
      </p>

      <button
        onClick={() => alert(`${product.name} adicionado ao carrinho!`)}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
