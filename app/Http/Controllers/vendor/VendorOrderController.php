<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorOrderController extends Controller
{
    //
    public function show_orders(){
        try{
              $store = Store::where('user_id', auth()->id())->first();

            if (! $store) {
                return redirect()->route('create-store.page');
            }

            return Inertia::render('vendor/orders/index', [
                'store' => $store,
            ]);
        }catch(Exception $e){}
    }
}
