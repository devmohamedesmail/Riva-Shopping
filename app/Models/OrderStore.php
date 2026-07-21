<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStore extends Model
{
    /** @use HasFactory<\Database\Factories\OrderStoreFactory> */
    use HasFactory;

    protected $fillable = [
        'order_id',
        'store_id',
        'subtotal',
        'shipping',
        'discount',
        'total',
        'status',
        'notes',
        'accepted_at',
        'prepared_at',
        'shipped_at',
        'delivered_at',
        'cancelled_at',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'shipping' => 'decimal:2',
        'discount' => 'decimal:2',
        'total'    => 'decimal:2',
    ];

    // ── Relationships ──────────────────────────────────────────────

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * All line items belonging to this store's sub-order.
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
