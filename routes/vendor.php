<?php


use App\Http\Controllers\vendor\VendorCategoryController;
use App\Http\Controllers\vendor\VendorOrderController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

  

    // ─── Vendor dashboard ─────────────────────────────────────────────────────
    Route::prefix('vendor')->name('vendor.')->group(function () {

       
        // Categories controller 
        Route::get('/categories', [VendorCategoryController::class, 'show_categories'])->name('categories.index');

        // orders controller
        Route::get('/orders', [VendorOrderController::class, 'show_orders'])->name('orders.index');

    
       
       
    });
});
