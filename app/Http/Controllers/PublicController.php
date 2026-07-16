<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Store;

use Inertia\Inertia;

class PublicController extends Controller
{
    public function HomePage()
    {
        $stores           = Store::paginate(5);
        $products         = Product::where('is_active', true)->with(['category', 'images'])->paginate(12);
        $featuredProducts = Product::where('is_active', true)->where('is_featured', true)->with(['category', 'images'])->take(8)->get();
        if ($featuredProducts->isEmpty()) {
            $featuredProducts = Product::where('is_active', true)->with(['category', 'images'])->inRandomOrder()->take(8)->get();
        }
        return Inertia::render('home/index', [
            "stores"           => $stores,
            "products"         => $products,
            "featuredProducts" => $featuredProducts,
        ]);
    }

    public function shop_page()
    {
        return Inertia::render('shop/index');
    }

    public function cart_page()
    {
        return Inertia::render('cart/index');
    }
    public function wishlist_page()
    {
        return Inertia::render('users/wishlist/index');
    }
    public function checkout_page()
    {
        return Inertia::render('checkout/index');
    }
}
