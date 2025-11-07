<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Listar todos os produtos.
     */
    public function index()
    {
        $products = Product::orderBy('id', 'desc')->get();

        return response()->json($products, Response::HTTP_OK);
    }

    /**
     * Criar um novo produto.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|url'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação.',
                'errors' => $validator->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $product = Product::create($validator->validated());

        return response()->json([
            'message' => 'Produto criado com sucesso!',
            'data' => $product
        ], Response::HTTP_CREATED);
    }

    /**
     * Exibir um produto específico.
     */
    public function show(Product $product)
    {
        return response()->json($product, Response::HTTP_OK);
    }

    /**
     * Atualizar um produto.
     */
    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'image_url' => 'nullable|url'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação.',
                'errors' => $validator->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $product->update($validator->validated());

        return response()->json([
            'message' => 'Produto atualizado com sucesso!',
            'data' => $product
        ], Response::HTTP_OK);
    }

    /**
     * Excluir um produto.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Produto removido com sucesso!'
        ], Response::HTTP_OK);
    }
}
