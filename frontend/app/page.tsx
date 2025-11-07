"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulação inicial (depois vamos integrar com Laravel)
    setProducts([
      {
        id: 1,
        name: "Vaso de Cerâmica Artesanal",
        description: "Feito à mão com argila natural e acabamento esmaltado.",
        price: 89.9,
        stock: 12,
        image_url: "https://placehold.co/400x400?text=Vaso+Artesanal",
      },
      {
        id: 2,
        name: "Bolsa de Crochê",
        description: "Crochê artesanal feito com fio sustentável.",
        price: 129.5,
        stock: 8,
        image_url: "https://placehold.co/400x400?text=Bolsa+Crochê",
      },
      {
        id: 3,
        name: "Sabonete Vegano Natural",
        description: "Produzido com óleos vegetais e essências naturais.",
        price: 19.9,
        stock: 20,
        image_url: "https://placehold.co/400x400?text=Sabonete+Vegano",
      },
      {
        id: 4,
        name: "Quadro Decorativo em Madeira",
        description: "Design rústico com acabamento artesanal exclusivo.",
        price: 210.0,
        stock: 5,
        image_url: "https://placehold.co/400x400?text=Quadro+Decorativo",
      },
    ]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-green-50 to-green-100 rounded-3xl shadow-sm mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
          Bem-vindo à MicroLoja Artesanal
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Produtos únicos, feitos à mão com amor 💚  
          Apoie o trabalho artesanal e leve autenticidade para o seu dia a dia.
        </p>
        <a
          href="#produtos"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition"
        >
          Explorar Produtos
        </a>
      </section>

      {/* Produtos */}
      <section id="produtos" className="py-6">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
          Produtos em Destaque
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              <img
                src={p.image_url}
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
                    R$ {p.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {p.stock > 0
                      ? `Estoque: ${p.stock} unidades`
                      : "Indisponível"}
                  </p>

                  <Link
                    href={`/product/${p.id}`}
                    className="mt-3 inline-block w-full bg-green-600 text-white text-center font-medium py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
