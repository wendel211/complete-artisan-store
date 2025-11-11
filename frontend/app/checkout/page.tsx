"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const confirmOrder = () => {
    localStorage.removeItem("cart");
    setConfirmed(true);
  };

  if (confirmed)
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Pedido Confirmado!
        </h1>
        <p className="text-gray-600 mb-6">
          Obrigado por comprar conosco. Seu pedido será processado em breve.
        </p>
        <Link
          href="/"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Voltar à Loja
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        💳 Finalizar Pedido
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
          <div className="bg-white shadow rounded-xl p-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-3 text-gray-700"
              >
                <span>{item.name}</span>
                <span>
                  {item.quantity}x R$ {item.price.toFixed(2)}
                </span>
              </div>
            ))}
            <p className="text-right text-xl font-semibold mt-6">
              Total:{" "}
              <span className="text-green-700">
                R$ {total.toFixed(2)}
              </span>
            </p>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={confirmOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg font-medium transition"
            >
              Confirmar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}
