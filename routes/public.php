<?php

use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

Route::controller(PublicController::class)->group(function () {
  Route::get('/', 'HomePage')->name('home');
  Route::get('/cart/page', 'cart_page')->name('cart_page');
  Route::get('/shop/page/{categoryId?}', 'shop_page')->name('shop.page');
  Route::get('/wishlist/page', 'wishlist_page')->name('wishlist_page');
  Route::get('/checkout/page', 'checkout_page')->name('checkout_page');
});
