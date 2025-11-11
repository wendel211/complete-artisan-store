"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  password?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<User>({ name: "", email: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("user");
    if (!saved) {
      router.push("/login");
    } else {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setForm(parsed);
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(form));
    setUser(form);
    setEditing(false);
    alert("Perfil atualizado com sucesso!");
      window.dispatchEvent(new Event("user-updated"));
  };

  const handleLogout = () => {
    const confirmLogout = confirm("Deseja realmente sair da sua conta?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      router.push("/login");
    }
  };

  if (!mounted)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-600">
        <p>Você não está logado.</p>
        <Link
          href="/login"
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Fazer login
        </Link>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 mt-16">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        👤 Meu Perfil
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome completo
          </label>
          <input
            type="text"
            name="name"
            disabled={!editing}
            value={form.name}
            onChange={handleChange}
            className={`w-full border ${
              editing ? "border-green-600" : "border-gray-300"
            } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            disabled={!editing}
            value={form.email}
            onChange={handleChange}
            className={`w-full border ${
              editing ? "border-green-600" : "border-gray-300"
            } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600`}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Salvar
            </button>
            <button
              onClick={() => {
                setForm(user);
                setEditing(false);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Editar
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Sair
            </button>
          </>
        )}
      </div>
    </div>
  );
}
