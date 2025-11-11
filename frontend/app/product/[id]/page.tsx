"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProductById } from "../../../lib/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  stock: number;
  category: {
    id: number;
    name: string;
  };
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Verifica se o usuário está logado (exemplo simples)
    const user = localStorage.getItem("user");
    setIsLogged(!!user);

    if (!id) return;
    getProductById(Number(id))
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    if (!isLogged) {
      alert("Você precisa estar logado para adicionar produtos ao carrinho.");
      router.push("/login");
      return;
    }

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
  };

  // Estado: carregando
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#faf9f6] to-[#f5f4f0] text-gray-600">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#4b6043] border-t-transparent"></div>
        <p className="mt-6 font-medium">Carregando produto...</p>
      </div>
    );

  // Estado: não encontrado
  if (!product)
    return (
      <div className="text-center py-20 text-gray-500">
        Produto não encontrado.
        <div className="mt-4">
          <Link href="/" className="text-[#4b6043] hover:underline font-semibold">
            ← Voltar à loja
          </Link>
        </div>
      </div>
    );

  // Exibição principal
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* 🖼️ Imagem */}
        <div className="flex justify-center">
          <img
            src={
              product.image_url ||
              "https://placehold.co/600x400?text=Produto+sem+imagem"
            }
            alt={product.name}
            className="w-full h-auto rounded-2xl shadow-lg max-w-md object-cover"
          />
        </div>

        {/* 📋 Detalhes */}
        <div>
          <div className="mb-2">
            <span className="inline-block bg-[#4b6043]/10 text-[#4b6043] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {product.category?.name || "Sem categoria"}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description || "Produto artesanal único e exclusivo."}
          </p>

          <p className="text-[#4b6043] text-3xl font-extrabold mb-3">
            R$ {Number(product.price).toFixed(2)}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            {product.stock > 0
              ? `Em estoque: ${product.stock} unidade${
                  product.stock > 1 ? "s" : ""
                }`
              : "Produto indisponível"}
          </p>

          <button
            onClick={addToCart}
            disabled={product.stock <= 0}
            className={`w-full md:w-auto bg-gradient-to-r from-[#4b6043] to-[#5a7350] hover:from-[#5a7350] hover:to-[#4b6043] text-white font-medium py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 ${
              product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            🛒 Adicionar ao Carrinho
          </button>

          <div className="mt-8">
            <Link
              href="/"
              className="text-[#4b6043] hover:text-[#3e4a33] hover:underline text-sm font-semibold transition-colors"
            >
              ← Voltar à loja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
