<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->controller(OrderController::class)->group(function () {
    Route::post('/create/order', 'create_order')->name('order.create');
});