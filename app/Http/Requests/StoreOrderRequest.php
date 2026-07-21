<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Only authenticated users may place orders.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for the checkout form.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Shipping details
            'name'           => ['required', 'string', 'max:255'],
            'phone'          => ['required', 'string', 'max:30'],
            'address'        => ['required', 'string', 'max:500'],
            'notes'          => ['nullable', 'string', 'max:1000'],

            // Payment
            'payment_method' => ['required', 'string', 'in:cash,card,paypal'],

            // Cart items — must have at least one
            'items'                          => ['required', 'array', 'min:1'],
            'items.*.product_id'             => ['required', 'integer', 'exists:products,id'],
            'items.*.store_id'               => ['required', 'integer', 'exists:stores,id'],
            'items.*.quantity'               => ['required', 'integer', 'min:1'],
            'items.*.price'                  => ['required', 'numeric', 'min:0'],
            'items.*.variant_id'             => ['nullable', 'integer', 'exists:variants,id'],
            'items.*.selected_options'       => ['nullable', 'array'],
        ];
    }
}