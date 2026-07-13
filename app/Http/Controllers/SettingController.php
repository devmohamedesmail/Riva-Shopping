<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSettingRequest;
use App\Services\SettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function __construct(
        protected SettingService $settingService
    ) {}

    public function update_settings(UpdateSettingRequest $request): RedirectResponse
    {

        $this->settingService->createOrUpdate($request);
        return redirect()->back();
    }


    public function settings_page()
    {

        return Inertia::render('settings/platform-settings');
    }
}
