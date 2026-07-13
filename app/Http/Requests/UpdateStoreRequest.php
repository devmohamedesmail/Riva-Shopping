<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateStoreRequest extends FormRequest
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

       $user = Auth::user();
        $storeId = $user?->store?->id;
        return [
                'name'         => 'required',
                'description'  => 'nullable|string',
                'phone'        => 'nullable|string|max:30',
                'email'        => 'nullable|email|max:255',
                'address'      => 'nullable|string|max:255',
                'city'         => 'nullable|string|max:100',
                'state'        => 'nullable|string|max:100',
                'zip'          => 'nullable|string|max:20',
                'country'      => 'nullable|string|max:100',
                'currency'     => 'nullable|string|max:10',
                'timezone'     => 'nullable|string|max:60',
                'logo'         => 'nullable|image|max:2048',
                'cover'        => 'nullable|image|max:4096',
                'categories'   => 'nullable|array',
                'categories.*' => 'exists:categories,id',
        ];
    }
}
