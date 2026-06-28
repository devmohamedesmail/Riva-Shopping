<?php
namespace App\Http\Controllers\users;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RedirectController extends Controller
{
    //

    public function index()
    {
        $stores           = Store::paginate(5);
        $products         = Product::where('is_active', true)->with(['category', 'images'])->paginate(12);
        $featuredProducts = Product::where('is_active', true)->where('is_featured', true)->with(['category', 'images'])->take(8)->get();
        if ($featuredProducts->isEmpty()) {
            $featuredProducts = Product::where('is_active', true)->with(['category', 'images'])->inRandomOrder()->take(8)->get();
        }
        return Inertia::render('index', [
            "stores"           => $stores,
            "products"         => $products,
            "featuredProducts" => $featuredProducts,
        ]);
    }

    public function redirect_user()
    {
        try {
            $user = Auth::user();
            switch ($user->role_id) {
                case 2: // admin

                    return Inertia::render('dashboard');
                    // return redirect()->route('admin.dashboard');
                    break;

                case 1: // user
                    $stores           = Store::paginate(5);
                    $products         = Product::where('is_active', true)->with(['category', 'images'])->paginate(12);
                    $featuredProducts = Product::where('is_active', true)->where('is_featured', true)->with(['category', 'images'])->take(8)->get();
                    if ($featuredProducts->isEmpty()) {
                        $featuredProducts = Product::where('is_active', true)->with(['category', 'images'])->inRandomOrder()->take(8)->get();
                    }
                    return Inertia::render('index', [
                        "stores"           => $stores,
                        "products"         => $products,
                        "featuredProducts" => $featuredProducts,
                    ]);
                    break;

                case 3: // vendor
                    return Inertia::render('vendor/dashboard/index');
                    break;

                default:
                    return Inertia::render('index');
                    // return redirect()->route('login');
            }
        } catch (\Throwable $th) {
            return Inertia::render("404/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }
}
