<?php

namespace App\Services;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use App\Services\CloudinaryService;
use App\Traits\UploadsToCloudinary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class StoreService
{
    use UploadsToCloudinary;
    public function __construct(protected CloudinaryService $cloudinaryService) {}

    public function createStore(StoreStoreRequest $request)
    {
        // Unique slug
        $base = Str::slug($request->name);
        $slug = $base;
        $i    = 1;
        while (Store::where('slug', $slug)->exists()) {
            $slug = $base . '-' . $i++;
        }

        $logo_result  = null;
        $cover_result = null;

        if ($request->hasFile('logo')) {
            // $logoUrl = $this->uploadToCloudinary($request->file('logo'), 'stores/logos');
            $logo_result = $this->cloudinaryService->uploadToCloudinary($request->file('logo'), 'stores/logos');
        }

        if ($request->hasFile('cover')) {
            // $coverUrl = $this->uploadToCloudinary($request->file('cover'), 'stores/covers');
            $cover_result = $this->uploadToCloudinary($request->file('cover'), 'stores/covers');
        }

        $store = Store::create([
            'name'        => $request->name,
            'slug'        => $slug,
            'description' => $request->description,
            'phone'       => $request->phone,
            'email'       => $request->email,
            'address'     => $request->address,
            'city'        => $request->city,
            'state'       => $request->state,
            'zip'         => $request->zip,
            'country'     => $request->country,
            'country_id'     => $request->integer('country_id'),
            'currency'    => $request->currency ?? 'USD',
            'timezone'    => $request->timezone ?? 'UTC',
            'logo'        => $logo_result['url'] ?? null,
            'public_logo_id'        => $logo_result['public_id'] ?? null,
            'cover'       => $cover_result["url"] ?? null,
            'public_cover_id'       => $cover_result["public_id"] ?? null,
            'status'      => 'active',
            'user_id'     => Auth::id(),
        ]);

        

        $user = Auth::user();

        if ($user instanceof \App\Models\User) {
            $user->update([
                'role_id' => 2,
            ]);
        }

        if ($request->categories) {
            $store->categories()->sync($request->categories);
        }

        return $store;
    }


    public function getVendorDashboardData()
    {
        $store = Store::where('user_id', Auth::id())
            ->with('categories')
            ->first();

        if (! $store) {
            return null;
        }

        return [
            'store' => $store,
            'productCount' => Product::where('store_id', $store->id)->count(),
            'categoryCount' => $store->categories->count(),
        ];
    }


    public function getSettingsData()
    {
        $store = Store::where('user_id', Auth::id())
            ->first();

        if (! $store) {
            return null;
        }

        return [
            'store' => $store,

            'categories' => Category::where('is_active', true)
                ->get([
                    'id',
                    'name_en',
                    'name_ar',
                    'parent_id'
                ]),

            'storeCategories' => $store->categories()
                ->pluck('categories.id')
                ->toArray(),
        ];
    }



    public function updateStore(UpdateStoreRequest $request)
    {
        $store = Store::where('user_id', Auth::id())
            ->first();

        if (! $store) {
            return null;
        }


        $data = $request->validated();


        if ($request->hasFile('logo')) {

            $data['logo'] = $this->uploadToCloudinary(
                $request->file('logo'),
                'stores/logos'
            );
        }


        if ($request->hasFile('cover')) {

            $data['cover'] = $this->uploadToCloudinary(
                $request->file('cover'),
                'stores/covers'
            );
        }


        $store->update($data);


        if (isset($data['categories'])) {

            $store->categories()
                ->sync($data['categories']);
        }


        return $store;
    }
}
