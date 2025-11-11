<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Retorna todos os produtos (GET /api/products)
     * Suporta filtro opcional por categoria: /api/products?category=Cerâmica
     */
    public function index(Request $request)
    {
        $query = Product::with('category');

        // 🔍 Se a requisição tiver ?category=NomeDaCategoria, filtra
        if ($request->has('category')) {
            $categoryName = $request->query('category');
            $query->whereHas('category', function ($q) use ($categoryName) {
                $q->where('name', $categoryName);
            });
        }

        return response()->json($query->get(), 200);
    }

    /**
     * Cria um novo produto (POST /api/products)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image_url' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::create($validated);

        return response()->json($product->load('category'), 201);
    }

    /**
     * Retorna um produto específico (GET /api/products/{id})
     */
    public function show(Product $product)
    {
        $product->load('category');
        return response()->json($product, 200);
    }

    /**
     * Atualiza um produto existente (PUT /api/products/{id})
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric',
            'stock' => 'sometimes|integer',
            'image_url' => 'nullable|string|max:255',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        $product->update($validated);

        return response()->json($product->load('category'), 200);
    }

    /**
     * Remove um produto (DELETE /api/products/{id})
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Produto removido com sucesso.'], 200);
    }
}
