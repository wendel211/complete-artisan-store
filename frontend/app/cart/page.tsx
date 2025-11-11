"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // 🔄 Evita erro de hidratação e garante leitura segura do localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const persistCart = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    persistCart(updated);
  };

  const updateQuantity = (id: number, amount: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    persistCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!mounted)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando carrinho...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
        🛒 Seu Carrinho
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="mb-6">Seu carrinho está vazio.</p>
          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Voltar à Loja
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white shadow-sm hover:shadow-md p-4 rounded-xl transition"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={
                      item.image_url ||
                      "https://placehold.co/100x100?text=Produto"
                    }
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-green-700 font-bold">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-lg font-bold text-gray-600 hover:text-green-700"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-lg font-bold text-gray-600 hover:text-green-700"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t pt-6">
            <p className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
              Total:{" "}
              <span className="text-green-700 font-bold">
                R$ {total.toFixed(2)}
              </span>
            </p>
            <Link
              href="/checkout"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition"
            >
              Finalizar Pedido
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
