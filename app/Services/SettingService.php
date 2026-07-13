<?php

namespace App\Services;

use App\Models\Setting;
use App\Services\CloudinaryService;
use Illuminate\Http\Request;

class SettingService
{
     public function __construct(
        protected CloudinaryService $cloudinaryService
    ) {}


    public function createOrUpdate(Request $request): Setting
    {
        $setting = Setting::first() ?? new Setting();

        $data = $request->except([
            'logo',
            'favicon',
        ]);

        if ($request->hasFile('logo')) {
            $logo = $this->cloudinaryService
                ->uploadToCloudinary($request->file('logo'), 'settings/logo');

            if ($logo) {
                $data['logo'] = $logo;
            }
        }

        if ($request->hasFile('favicon')) {
            $favicon = $this->cloudinaryService
                ->uploadToCloudinary($request->file('favicon'), 'settings/favicon');

            if ($favicon) {
                $data['favicon'] = $favicon;
            }
        }

        $setting->fill($data);
        $setting->save();

        return $setting->fresh();
    }
}
