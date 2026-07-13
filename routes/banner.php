<?php

use App\Http\Controllers\BannerController;
use Illuminate\Support\Facades\Route;

Route::controller(BannerController::class)->group(function () {
    Route::get('admin/banners/page' ,'show_banners_page');
    Route::post('banner/store' ,'store_banner');
});
