<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::controller(OrderController::class)->group(function(){
    Route::post('/create/order', 'create_order');
});