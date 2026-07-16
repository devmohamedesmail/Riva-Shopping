<?php

namespace App\Services;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;

class OrderService
{
    public function create_order(StoreOrderRequest $request)
    {

    dd($request);
        $order = new Order();
        $order->user_id = $request->user_id;
        $order->store_id = 2;
        $order->name = $request->name;
        $order->phone = $request->phone;
        $order->address = $request->address;
        $order->notes = $request->notes;
        $order->payment_method = $request->payment_method;
        $order->save();
        return $order;
    }
}
