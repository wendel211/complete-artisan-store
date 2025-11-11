"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 🔒 Validação simples (futura integração com API)
    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    // Simula autenticação local
    if (email === "demo@microloja.com" && password === "123456") {
      const user = { name: "Cliente Demo", email };

      // ✅ Salva usuário e notifica Navbar/Profile
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("user-updated"));

      alert("Login realizado com sucesso!");
      router.push("/");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  if (!mounted)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Entrar na MicroLoja
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="text-green-700 font-medium hover:underline"
          >
            Criar conta
          </Link>
        </p>

        <p className="text-xs text-gray-400 text-center mt-4">
          Acesse com: demo@microloja.com / 123456
        </p>
      </div>
    </div>
  );
}
