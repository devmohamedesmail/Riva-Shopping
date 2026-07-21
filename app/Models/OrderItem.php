<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    /** @use HasFactory<\Database\Factories\OrderItemFactory> */
    use HasFactory;

    protected $fillable = [
        'order_store_id',
        'product_id',
        'product_variant_id',
        'quantity',
        'price',
        'total',
        'selected_options',
    ];

    protected $casts = [
        'price'            => 'decimal:2',
        'total'            => 'decimal:2',
        'selected_options' => 'array',
    ];

    // ── Relationships ──────────────────────────────────────────────

    public function orderStore()
    {
        return $this->belongsTo(OrderStore::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function variant()
    {
        return $this->belongsTo(Variant::class, 'product_variant_id');
    }
}
