<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/ping', fn() => ['message' => 'API Laravel rodando com sucesso']);


Route::apiResource('products', ProductController::class);
