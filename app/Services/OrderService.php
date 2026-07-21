<?php

namespace App\Services;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStore;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderService
{
   
    public function create_order(StoreOrderRequest $request): Order
    {
        return DB::transaction(function () use ($request) {

            $items = collect($request->items);

            // ── 1. Group items by store ────────────────────────────────────
            $itemsByStore = $items->groupBy('store_id');

            // ── 2. Calculate totals ────────────────────────────────────────
            $grandSubtotal = $items->sum(fn($item) => $item['price'] * $item['quantity']);
            $grandShipping = 0;   // extend here if you have shipping rules
            $grandDiscount = 0;   // extend here if you have coupon logic
            $grandTotal    = $grandSubtotal + $grandShipping - $grandDiscount;

            // ── 3. Create the parent Order ────────────────────────────────
            $order = Order::create([
                'user_id'        => Auth::user()->id,
                'order_number'   => $this->generateOrderNumber(),
                'subtotal'       => $grandSubtotal,
                'shipping'       => $grandShipping,
                'discount'       => $grandDiscount,
                'total'          => $grandTotal,
                'payment_method' => $request->payment_method,
                'payment_status' => 'pending',
                'status'         => 'pending',
            ]);

            // ── 4. Create one OrderStore per store group ──────────────────
            foreach ($itemsByStore as $storeId => $storeItems) {

                $storeSubtotal = $storeItems->sum(fn($item) => $item['price'] * $item['quantity']);
                $storeShipping = 0;
                $storeDiscount = 0;
                $storeTotal    = $storeSubtotal + $storeShipping - $storeDiscount;

                $orderStore = OrderStore::create([
                    'order_id'  => $order->id,
                    'store_id'  => $storeId,
                    'subtotal'  => $storeSubtotal,
                    'shipping'  => $storeShipping,
                    'discount'  => $storeDiscount,
                    'total'     => $storeTotal,
                    'notes'     => $request->notes,
                    'status'    => 'pending',
                ]);

                // ── 5. Create one OrderItem per line item ─────────────────
                foreach ($storeItems as $item) {
                    OrderItem::create([
                        'order_store_id'     => $orderStore->id,
                        'product_id'         => $item['product_id'],
                        'product_variant_id' => $item['variant_id'] ?? null,
                        'quantity'           => $item['quantity'],
                        'price'              => $item['price'],
                        'total'              => $item['price'] * $item['quantity'],
                        'selected_options'   => $item['selected_options'] ?? null,
                    ]);
                }
            }

            return $order;
        });
    }

    /**
     * Generate a unique, human-readable order number.
     * Format: ORD-YYYYMMDD-XXXX  (e.g. ORD-20260721-0042)
     */
    private function generateOrderNumber(): string
    {
        $date   = now()->format('Ymd');
        $count  = Order::whereDate('created_at', today())->count() + 1;
        $serial = str_pad($count, 4, '0', STR_PAD_LEFT);
        return "ORD-{$date}-{$serial}";
    }
}