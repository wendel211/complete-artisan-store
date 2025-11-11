const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080/api";

/**
 * Busca todos os produtos ou filtra por categoria
 * @param categoryName (opcional) nome da categoria
 */
export async function getProducts(categoryName?: string) {
  const url = categoryName
    ? `${API_URL}/products?category=${encodeURIComponent(categoryName)}`
    : `${API_URL}/products`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

/**
 * Busca um produto específico pelo ID
 */
export async function getProductById(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar produto");
  return res.json();
}

/**
 * Busca todas as categorias disponíveis
 */
export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar categorias");
  return res.json();
}
