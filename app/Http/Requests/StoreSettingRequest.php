<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'site_name_ar' => ['nullable', 'string', 'max:255'],
            'site_name_en' => ['nullable', 'string', 'max:255'],

            'site_description_ar' => ['nullable', 'string'],
            'site_description_en' => ['nullable', 'string'],

            'logo' => ['nullable', 'image'],
            'favicon' => ['nullable', 'image'],

            'currency_ar' => ['nullable', 'string', 'max:20'],
            'currency_en' => ['nullable', 'string', 'max:20'],

            'timezone' => ['nullable', 'string'],

            'maintenance_mode' => ['boolean'],
            'registration_enabled' => ['boolean'],
            'vendor_registration_enabled' => ['boolean'],

            'meta_title' => ['nullable', 'string'],
            'meta_description' => ['nullable', 'string'],
            'meta_keywords' => ['nullable', 'string'],

            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string'],
            'support' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],

            'facebook' => ['nullable', 'url'],
            'instagram' => ['nullable', 'url'],
        ];
    }
}
