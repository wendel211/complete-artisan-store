"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts, getCategories } from "../lib/api";
import { useSearch } from "../context/SearchContext"; // ✅ Importa o contexto de busca global

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

interface Category {
  id: number;
  name: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();
  const { searchQuery } = useSearch(); // ✅ Pega texto da busca da Navbar

  const banners = [
    "/banners/banner1.png",
    "/banners/banner2.png",
    "/banners/banner3.png",
  ];

  // 🚀 Carrega categorias e produtos ao iniciar
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 🔁 Quando muda a categoria selecionada, filtra novamente
  useEffect(() => {
    if (selectedCategory !== null) {
      setLoading(true);
      getProducts(selectedCategory)
        .then(setProducts)
        .catch((err) => console.error("Erro ao filtrar produtos:", err))
        .finally(() => setLoading(false));
    }
  }, [selectedCategory]);

  // 🎠 Rotação dos banners
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleViewDetails = (id: number) => router.push(`/product/${id}`);

  // 🔍 Filtro local: busca global + categoria selecionada
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      !selectedCategory || p.category?.name === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 🌀 Tela de carregamento
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#faf9f6] to-[#f5f4f0]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#4b6043] border-t-transparent"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-[#4b6043] opacity-20"></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium">Carregando produtos...</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-[#faf9f6] via-white to-[#f5f4f0] min-h-screen text-gray-800">
      {/* 🖼️ Banner rotativo */}
      <section className="relative w-full h-[600px] overflow-hidden bg-gray-100">
        <div className="relative w-full h-full">
          {banners.map((src, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                i === bannerIndex
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-105 z-0"
              }`}
            >
              <img
                src={src}
                alt={`Banner ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Conteúdo sobreposto */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Artesanato Autêntico
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-white/90 leading-relaxed">
            Descubra peças únicas feitas à mão com amor e dedicação
          </p>
          <button
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#4b6043] transition-all duration-300 hover:scale-105"
          >
            Explorar Categorias
          </button>
        </div>
      </section>

      {/* 🧭 Barra de categorias */}
      <section className="sticky top-0 z-40 bg-black text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            <button
              onClick={() => {
                setSelectedCategory(null);
              }}
              className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap font-medium transition-colors border-b-2 ${
                selectedCategory === null
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              TODA LOJA
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-6 py-4 whitespace-nowrap font-medium transition-all duration-300 border-b-2 ${
                  selectedCategory === cat.name
                    ? "border-white text-white"
                    : "border-transparent text-gray-400 hover:text-white hover:border-gray-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🛍️ Produtos */}
      <section id="produtos" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-[#3e4a33] mb-2">
              {selectedCategory
                ? selectedCategory
                : searchQuery
                ? `Resultados para: "${searchQuery}"`
                : "Produtos em Destaque"}
            </h2>
            <p className="text-gray-600">
              {selectedCategory
                ? `Mostrando produtos de ${selectedCategory}`
                : searchQuery
                ? "Resultados baseados na sua busca"
                : "Peças únicas selecionadas especialmente para você"}
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado {searchQuery && `para "${searchQuery}"`}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#4b6043] hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={
                      p.image_url ||
                      "https://placehold.co/400x400?text=Produto+sem+imagem"
                    }
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {p.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                        Indisponível
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-semibold text-[#4b6043] uppercase tracking-wide mb-2">
                    {p.category?.name || "Sem categoria"}
                  </span>

                  <h3 className="font-bold text-xl text-[#3e4a33] mb-2 group-hover:text-[#4b6043] transition-colors line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                    {p.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Preço</p>
                        <p className="text-2xl font-bold text-[#4b6043]">
                          R$ {Number(p.price).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {p.stock > 0 ? `${p.stock} em estoque` : "Esgotado"}
                      </p>
                    </div>

                    <button
                      onClick={() => handleViewDetails(p.id)}
                      className="w-full bg-gradient-to-r from-[#4b6043] to-[#5a7350] text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
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
    </div>
  );
}
