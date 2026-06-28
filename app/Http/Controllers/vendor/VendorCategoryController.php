<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorCategoryController extends Controller
{
    public function show_categories(){
        try{
            $store = Store::where('user_id', auth()->id())
                ->with('categories')
                ->first();

            if (! $store) {
                return redirect()->route('create-store.page');
            }

            return Inertia::render('vendor/categories/index', [
                'store'      => $store,
                'categories' => $store->categories,
            ]);
        }catch(Exception $e){}
    }
}
