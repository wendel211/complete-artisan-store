// frontend/lib/api.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/products`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Erro ao carregar produtos');
  }
  return res.json();
}

export async function createProduct(data: any) {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Erro ao criar produto');
  }
  return res.json();
}
