<?php

namespace App\Http\Controllers;

use App\Services\BannerService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function __construct(protected BannerService $bannerService){}
    public function show_banners_page()
    {
        return Inertia::render('banners/index');
    }

    public function store_banner(Request $request){
        $this->bannerService->store($request);
    }
}
