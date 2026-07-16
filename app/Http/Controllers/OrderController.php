<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Services\OrderService;


class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService){}
    public function create_order(StoreOrderRequest $request)
    {
       $this->orderService->create_order($request);
       return redirect()->back();
    }
}
