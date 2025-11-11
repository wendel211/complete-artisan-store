"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProductById } from "../../../lib/api"; // já existente

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
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Verifica login
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Carregando produto...
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-20 text-gray-500">
        Produto não encontrado.
        <div className="mt-4">
          <Link
            href="/"
            className="text-green-700 hover:underline font-semibold"
          >
            Voltar à loja
          </Link>
        </div>
      </div>
    );

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
            className="w-full h-auto rounded-2xl shadow-md max-w-md object-cover"
          />
        </div>

        {/* 📋 Detalhes */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <p className="text-green-700 text-2xl font-semibold mb-2">
            R$ {Number(product.price).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {product.stock > 0
              ? `Em estoque: ${product.stock} unidades`
              : "Produto indisponível"}
          </p>

          <button
            onClick={addToCart}
            disabled={product.stock <= 0}
            className={`w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition ${
              product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Adicionar ao Carrinho 🛒
          </button>

          <div className="mt-6">
            <Link
              href="/"
              className="text-green-700 hover:underline text-sm font-medium"
            >
              ← Voltar à loja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
