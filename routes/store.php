<?php

use App\Http\Controllers\StoreController;
use Illuminate\Support\Facades\Route;

Route::controller(StoreController::class)->group(function () {
    Route::get('/create-store/page', 'CreateStorePage')->name('create-store.page');
    Route::post('/create-store', 'store')->name('create-store.store');
    Route::get('/update/store/page',  'update_store_page')->name('settings');
    Route::patch('/update/store/submit',  'update_store')->name('settings.update');
    Route::get('/vendor/dashboard', 'vendor_store_dashboard')->name('vendor.dashboard');
    Route::get('/store/{storeId}', 'view_vendor_store')->name('view.vendor.store');
});
