<?php

namespace App\Providers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Country;
use App\Models\Product;
use App\Models\Setting;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        Inertia::share('categories', fn() => Category::whereNull('parent_id')->with('children')->get());
        Inertia::share('auth', fn() => Auth::user());
        Inertia::share('settings', fn() => Setting::first());
        Inertia::share('countries', fn() => Country::all());
        Inertia::share('products', fn() => Product::where('is_active', true)->with(['category', 'store.country', 'images'])->paginate(12));
        Inertia::share('brands', fn() => Brand::all());
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn(): ?Password => app()->isProduction()
                ? Password::min(6)
                // ->mixedCase()
                // ->letters()
                // ->numbers()
                // ->symbols()
                // ->uncompromised()
                : null,
        );
    }
}