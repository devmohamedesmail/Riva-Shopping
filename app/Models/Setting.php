<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /** @use HasFactory<\Database\Factories\SettingFactory> */
    use HasFactory;

        protected $fillable = [
        'site_name_ar',
        'site_name_en',
        'site_description_ar',
        'site_description_en',
        'logo',
        'favicon',
        'currency_ar',
        'currency_en',
        'timezone',
        'maintenance_mode',
        'registration_enabled',
        'vendor_registration_enabled',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'email',
        'address',
        'phone',
        'support',
        'facebook',
        'instgram',
    ];

    protected $casts = [
        'maintenance_mode' => 'boolean',
        'registration_enabled' => 'boolean',
        'vendor_registration_enabled' => 'boolean',
    ];
}
