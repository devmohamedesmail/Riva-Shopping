<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
             'title'              => 'required|string|max:255',

            'description'        => 'nullable|string',

            'price'              => 'required|numeric|min:0',

            'sale_price'         => 'nullable|numeric|min:0',

            'product_type'       => 'required|in:simple,variant',

            'product_kind'       => 'required|in:physical,digital',

            'stock'              => 'nullable|integer|min:0',

            'sku'                => 'nullable|string|max:100',

            'is_active'          => 'boolean',

            'is_popular'         => 'boolean',

            'is_featured'        => 'boolean',

            'weight'             => 'nullable|numeric|min:0',

            'length'             => 'nullable|numeric|min:0',

            'width'              => 'nullable|numeric|min:0',

            'height'             => 'nullable|numeric|min:0',

            'tax'                => 'nullable|numeric|min:0',

            'shipping_cost'      => 'nullable|numeric|min:0',

            'category_id'        => 'required|exists:categories,id',

            'images.*'           => 'nullable|image|max:2048',

            'product_attributes' => 'nullable|array',

            'variants'           => 'nullable|array',
        ];
    }
}
