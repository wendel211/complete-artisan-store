"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Dados simulados (depois virão do backend Laravel)
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Vaso de Cerâmica Artesanal",
        description:
          "Peça exclusiva feita à mão com argila natural e acabamento esmaltado. Ideal para decorar ambientes.",
        price: 89.9,
        image_url: "https://placehold.co/600x400?text=Vaso+Artesanal",
      },
      {
        id: 2,
        name: "Bolsa de Crochê Sustentável",
        description:
          "Produzida com fio ecológico, design moderno e resistente. Perfeita para o dia a dia.",
        price: 129.9,
        image_url: "https://placehold.co/600x400?text=Bolsa+Croch%C3%AA",
      },
      {
        id: 3,
        name: "Sabonete Natural Vegano",
        description:
          "Feito com óleos essenciais e fragrâncias suaves. Um cuidado natural e consciente para sua pele.",
        price: 19.9,
        image_url: "https://placehold.co/600x400?text=Sabonete+Vegano",
      },
    ];

    const found = mockProducts.find((p) => p.id === Number(id));
    setProduct(found || null);
  }, [id]);

  function addToCart() {
    if (!product) return;
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = currentCart.find((item: Product) => item.id === product.id);

    if (!exists) {
      currentCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert(`${product.name} foi adicionado ao carrinho!`);
    router.push("/cart");
  }

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
          src={product.image_url}
          alt={product.name}
          className="w-full h-96 object-cover rounded-2xl shadow-md"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-green-700 text-2xl font-semibold mb-8">
            R$ {product.price.toFixed(2)}
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
