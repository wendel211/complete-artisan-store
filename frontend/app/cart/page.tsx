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

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQuantity = (id: number, amount: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        🛒 Seu Carrinho
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          Seu carrinho está vazio.
          <div className="mt-6">
            <Link
              href="/"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Voltar à Loja
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white shadow p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.image_url ||
                      "https://placehold.co/100x100?text=Produto"
                    }
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
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

                <div className="flex items-center gap-4 mt-3 md:mt-0">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-lg font-bold text-gray-600 hover:text-green-700"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-lg font-bold text-gray-600 hover:text-green-700"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <p className="text-xl font-semibold mb-4 text-gray-800">
              Total:{" "}
              <span className="text-green-700">
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
