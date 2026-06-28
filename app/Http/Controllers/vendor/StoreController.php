<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Services\StoreService;
use App\Traits\UploadsToCloudinary;
use Inertia\Inertia;

class StoreController extends Controller
{
    use UploadsToCloudinary;

    public function __construct(protected StoreService $storeService) {}



    public function CreateStorePage()
    {
        return Inertia::render('vendor/create-store/index');
    }

    // ─── Store a new store ────────────────────────────────────────────────────

    public function store(StoreStoreRequest $request)
    {
        $this->storeService->createStore($request);
        return redirect()->route('vendor.dashboard');
    }

    // ─── Vendor dashboard ─────────────────────────────────────────────────────

    public function dashboard()
    {
        $data = $this->storeService->getVendorDashboardData();
        if (! $data) {
            return redirect()->route('create-store.page');
        }
        return Inertia::render('vendor/dashboard/index', $data);
    }

    // ─── Settings page ────────────────────────────────────────────────────────

    public function settingsPage()
    {
        $data = $this->storeService->getSettingsData();

        if (! $data) {
            return redirect()->route('create-store.page');
        }

        return Inertia::render(
            'vendor/settings/index',
            $data
        );
    }

    // ─── Update store ─────────────────────────────────────────────────────────

    public function updateStore(UpdateStoreRequest $request)
    {
       $store = $this->storeService
            ->updateStore($request);


        if (! $store) {
            return response()->json([
                'error' => 'No store found'
            ],403);
        }


        return back();

    }
}
