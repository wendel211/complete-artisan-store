<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Retorna todas as categorias
     */
    public function index()
    {
        return response()->json(Category::all(), 200);
    }
}
