<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderStoreRequest;
use App\Http\Requests\UpdateOrderStoreRequest;
use App\Models\OrderStore;

class OrderStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderStoreRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderStore $orderStore)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderStore $orderStore)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderStoreRequest $request, OrderStore $orderStore)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderStore $orderStore)
    {
        //
    }
}
