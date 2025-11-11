<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;

Route::get('/ping', fn() => ['message' => 'API Laravel rodando com sucesso']);


Route::apiResource('products', ProductController::class)->only(['index', 'show', 'store', 'update', 'destroy']);


Route::get('/categories', [CategoryController::class, 'index']);
