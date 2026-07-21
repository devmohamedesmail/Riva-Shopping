<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Services\OrderService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Throwable;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService) {}

    /**
     * Handle an incoming checkout submission.
     * Creates the order and redirects the user to a success page.
     */
    public function create_order(StoreOrderRequest $request)
    {
        try {
            $order = $this->orderService->create_order($request);

            return redirect()->back()->with([
                'success'      => true,
                'order_number' => $order->order_number,
            ]);
        } catch (Throwable $e) {
            Log::error('Order creation failed', [
                'user_id' => Auth::user()->id ?? null,
                'error'   => $e->getMessage(),
            ]);

            return redirect()->back()->withErrors([
                'order' => 'Something went wrong while placing your order. Please try again.',
            ]);
        }
    }
}