<?php

namespace App\Services;

use App\Models\Banner;
use App\Services\CloudinaryService;
use Illuminate\Http\Request;

class BannerService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected CloudinaryService $cloudinaryService) {}

    public function store(Request $request)
    {
        $banner = new Banner();
        $banner->title_ar = $request->title_ar;
        $banner->title_en = $request->title_en;
        $banner->description_ar = $request->description_ar;
        $banner->description_en = $request->description_en;

        if ($request->hasFile('image')) {
            $logo = $this->cloudinaryService
                ->uploadToCloudinary($request->file('image'), 'banners');

            if ($logo) {
                $banner->image = $logo;
            }
        }
        $banner->save();
        return $banner;
    }
}
