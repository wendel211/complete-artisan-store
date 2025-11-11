"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Campos do formulário
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    cep: "",
    payment: "Pix",
  });

  // 🔄 Carrega dados iniciais
  useEffect(() => {
    setMounted(true);

    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsLogged(true);
    } catch {
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 📦 Confirma pedido e salva no localStorage
  const handleConfirm = () => {
    if (!form.address || !form.city || !form.state || !form.cep) {
      alert("Por favor, preencha todos os campos de endereço!");
      return;
    }

    const orderNumber = `#MLA-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderCode(orderNumber);
    setOrderPlaced(true);

    localStorage.removeItem("cart");

    const newOrder = {
      user,
      items: cart,
      total,
      address: form,
      code: orderNumber,
      date: new Date().toLocaleString("pt-BR"),
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  if (!mounted)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );

  if (!isLogged)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Redirecionando para login...
      </div>
    );

  // 🎉 Tela de confirmação
  if (orderPlaced)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-3xl font-bold text-[#4b6043] mb-4">
          🎉 Pedido Confirmado!
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Obrigado pela sua compra,{" "}
          <span className="font-semibold">{user?.name}</span>!
        </p>
        <p className="text-gray-600 mb-6">
          Número do pedido:{" "}
          <span className="font-semibold">{orderCode}</span>
        </p>
        <Link
          href="/"
          className="bg-gradient-to-r from-[#4b6043] to-[#5a7350] hover:from-[#5a7350] hover:to-[#4b6043] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
        >
          Voltar à Loja
        </Link>
      </div>
    );

  // 🧾 Tela principal
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🧾 Finalizar Pedido
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* 🛍️ Resumo do Carrinho */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Itens do Carrinho
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              Seu carrinho está vazio.
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        item.image_url ||
                        "https://placehold.co/80x80?text=Produto"
                      }
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#4b6043] font-semibold">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="border-t pt-4 mt-4 text-right">
                <p className="text-lg font-semibold text-gray-800">
                  Total:{" "}
                  <span className="text-[#4b6043]">
                    R$ {total.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 📦 Formulário de Endereço */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Endereço de Entrega
          </h2>

          <div className="space-y-3">
            <input
              name="address"
              placeholder="Rua, número e complemento"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4b6043] outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="city"
                placeholder="Cidade"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4b6043] outline-none"
              />
              <input
                name="state"
                placeholder="Estado"
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4b6043] outline-none"
              />
            </div>
            <input
              name="cep"
              placeholder="CEP"
              value={form.cep}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4b6043] outline-none"
            />

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Forma de Pagamento
              </label>
              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#4b6043] outline-none"
              >
                <option>Pix</option>
                <option>Cartão de Crédito</option>
                <option>Dinheiro na Entrega</option>
              </select>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-gradient-to-r from-[#4b6043] to-[#5a7350] hover:from-[#5a7350] hover:to-[#4b6043] text-white font-semibold py-3 rounded-lg mt-4 transition-all duration-300 hover:scale-105"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
