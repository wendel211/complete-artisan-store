const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080/api";

/**
 * Busca todos os produtos
 */
export async function getProducts() {
  const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

/**
 * Busca um produto pelo ID
 */
export async function getProductById(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar produto");
  return res.json();
}
