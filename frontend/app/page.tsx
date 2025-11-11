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
  const [bannerIndex, setBannerIndex] = useState(0);
  const router = useRouter();

  // banners que você vai substituir depois com as imagens reais
  const banners = [
    "/banners/banner1.png",
    "/banners/banner2.png",
    "/banners/banner3.png",
  ];

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erro:", err))
      .finally(() => setLoading(false));
  }, []);

  // ciclo automático dos banners
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleViewDetails = (id: number) => router.push(`/product/${id}`);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700 mb-3"></div>
        <p>Carregando produtos...</p>
      </div>
    );

  return (
    <div className="bg-[#faf9f6] min-h-screen text-gray-800">

      {/* 🎞️ Banner rotativo */}
      <section className="relative w-full h-[500px] overflow-hidden">
        {banners.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Banner ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === bannerIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Indicadores do carrossel */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === bannerIndex ? "bg-[#4b6043]" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 🪴 Categorias */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
          {[
            "Cerâmica",
            "Tecidos",
            "Velas",
            "Bijuterias",
            "Decoração",
            "Pintura",
          ].map((cat) => (
            <div
              key={cat}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all hover:-translate-y-1 py-8 flex flex-col justify-center items-center cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#6b8b5f] to-[#4b6043] rounded-full mb-3"></div>
              <p className="font-semibold text-gray-700 tracking-tight">
                {cat}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🧵 Faixa promocional / institucional */}
      <section className="bg-[#f5f4f0] py-14 text-center border-y border-gray-200">
        <h2 className="text-4xl font-extrabold text-[#3e4a33] mb-4 leading-tight">
          Artesanato que transforma pessoas e comunidades
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-lg">
          Compre com propósito. Valorize o trabalho artesanal, promova o comércio justo e incentive a sustentabilidade.
        </p>
        <button
          onClick={() => router.push("/#produtos")}
          className="bg-[#4b6043] hover:bg-[#3e4a33] text-white px-8 py-3 rounded-full font-medium transition"
        >
          Saiba mais
        </button>
      </section>

      {/* 🛍️ Produtos */}
      <section id="produtos" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#3e4a33]">
            Produtos em Destaque
          </h2>
          <a
            href="#"
            className="text-[#4b6043] font-medium hover:underline text-sm"
          >
            Ver todos
          </a>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum produto cadastrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src={
                      p.image_url ||
                      "https://placehold.co/400x400?text=Produto+sem+imagem"
                    }
                    alt={p.name}
                    className="w-full h-56 object-cover"
                  />
                  {p.stock <= 0 && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Indisponível
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-[#3e4a33] mb-1">
                      {p.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-[#4b6043] font-bold text-lg">
                      R$ {Number(p.price).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {p.stock > 0
                        ? `Estoque: ${p.stock} un.`
                        : "Indisponível"}
                    </p>

                    <button
                      onClick={() => handleViewDetails(p.id)}
                      className="mt-3 w-full bg-[#4b6043] text-white text-center font-medium py-2 rounded-lg hover:bg-[#3e4a33] transition"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ⚫ Rodapé */}
      <footer className="bg-[#4b6043] text-white text-center py-10">
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} MicroLoja Artesanal — feito com carinho por Wendel Muniz
        </p>
      </footer>
    </div>
  );
}
