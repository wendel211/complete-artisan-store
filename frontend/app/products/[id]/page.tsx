"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string | null;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getProductById(Number(id))
      .then((data) => setProduct(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    const current = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = current.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      current.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(current));
    alert(`${product.name} foi adicionado ao carrinho!`);
    router.push("/cart");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p>Carregando produto...</p>
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-16 text-gray-500">
        Produto não encontrado.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src={
            product.image_url ||
            "https://placehold.co/600x400?text=Produto+sem+imagem"
          }
          alt={product.name}
          className="w-full h-96 object-cover rounded-2xl shadow-md"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-green-700 text-2xl font-semibold mb-8">
            R$ {Number(product.price).toFixed(2)}
          </p>

          <button
            onClick={addToCart}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition w-full md:w-auto"
          >
            Adicionar ao Carrinho 🛒
          </button>
        </div>
      </div>
    </div>
  );
}
