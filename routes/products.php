<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;




Route::controller(ProductController::class)->group(function () {
    Route::get('/vendor/products/page', 'vendor_products_page');
    Route::get('/products', 'index')->name('products.index');
    Route::post('/vendor/products',  'store')->name('products.store');
    Route::put('/vendor/products/{product}',  'update')->name('products.update');
    Route::delete('vendor/products/{product}', 'destroy')->name('products.destroy');
    Route::get('/product/details/{slug}/product/{id}', 'product_details')->name('product.details');
    Route::get('/vendor/delete/all/products/{id}', 'delete_store_products')->name('delete.store.products');

});
