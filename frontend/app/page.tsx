"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Dados simulados – futuramente virão da API Laravel
    setProducts([
      {
        id: 1,
        name: "Vaso de Cerâmica Artesanal",
        description:
          "Feito à mão com argila natural e acabamento esmaltado. Uma peça única para decoração.",
        price: 89.9,
        image_url: "https://placehold.co/400x400?text=Vaso+Artesanal",
      },
      {
        id: 2,
        name: "Bolsa de Crochê Sustentável",
        description:
          "Produzida com fio ecológico e design exclusivo. Ideal para o dia a dia.",
        price: 129.9,
        image_url: "https://placehold.co/400x400?text=Bolsa+Croch%C3%AA",
      },
      {
        id: 3,
        name: "Sabonete Natural Vegano",
        description:
          "Com óleos essenciais e fragrâncias suaves, perfeito para cuidados diários.",
        price: 19.9,
        image_url: "https://placehold.co/400x400?text=Sabonete+Vegano",
      },
      {
        id: 4,
        name: "Quadro Decorativo em Madeira",
        description:
          "Trabalho artesanal em madeira de reflorestamento, ideal para ambientes rústicos.",
        price: 210.0,
        image_url: "https://placehold.co/400x400?text=Quadro+Decorativo",
      },
    ]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-green-50 to-green-100 rounded-3xl shadow-sm mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4">
          Bem-vindo à MicroLoja Artesanal
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
          Produtos únicos feitos à mão com amor 💚 Apoie o trabalho artesanal e
          leve autenticidade para o seu dia a dia.
        </p>
        <a
          href="#produtos"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition"
        >
          Explorar Produtos
        </a>
      </section>

      {/* Grade de produtos */}
      <section id="produtos" className="pb-12">
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
                  <p className="text-green-700 font-bold text-lg mb-2">
                    R$ {p.price.toFixed(2)}
                  </p>

                  <Link
                    href={`/product/${p.id}`}
                    className="inline-block w-full bg-green-600 text-white text-center font-medium py-2 rounded-lg hover:bg-green-700 transition"
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
