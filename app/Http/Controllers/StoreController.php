<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Services\StoreService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StoreController extends Controller
{


    public function __construct(protected StoreService $storeService) {}
    public function CreateStorePage()
    {

        if (Auth::check()) {
            return Inertia::render('stores/create');
        } else {
            return redirect()->route('login');
        }
    }



    public function store(StoreStoreRequest $request)
    {
        $this->storeService->createStore($request);
        return redirect()->route('vendor.dashboard');
    }


    public function update_store_page()
    {

        $data = $this->storeService->getSettingsData();
        if (! $data) {
            return redirect()->route('create-store.page');
        }
        return Inertia::render(
            'stores/update',
            $data
        );
    }


    public function update_store(UpdateStoreRequest $request)
    {
        $store = $this->storeService->updateStore($request);

        if (! $store) {
            return response()->json([
                'error' => 'No store found'
            ], 403);
        }


        return back();
    }




    public function vendor_store_dashboard()
    {
        $data = $this->storeService->getVendorDashboardData();
        if (! $data) {
            return redirect()->route('create-store.page');
        }
        return Inertia::render('vendor-dashboard/index', $data);
    }
}
