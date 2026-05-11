<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'orderItems.product'])->latest()->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:45',
            'desc' => 'nullable|string|max:45',
            'status' => 'nullable|integer',
            'receiver' => 'required|string|max:45',
        ]);

        $order = Order::create($validated);

        return response()->json($order->load(['user', 'orderItems']), 201);
    }

    public function show(Order $order)
    {
        return response()->json($order->load(['user', 'orderItems.product']));
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'name' => 'sometimes|string|max:45',
            'desc' => 'nullable|string|max:45',
            'status' => 'nullable|integer',
            'receiver' => 'sometimes|string|max:45',
        ]);

        $order->update($validated);

        return response()->json($order->load(['user', 'orderItems']));
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->noContent();
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'receiver' => 'required|string|max:45',
            'phone' => 'nullable|string|max:45',
            'address' => 'required|string|max:255',
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id',
            'items.*.amount' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        $order = Order::create([
            'user_id' => $user->id,
            'name' => 'Order for ' . $request->receiver,
            'status' => 0,
            'receiver' => $request->receiver,
            'phone' => $request->phone,
            'address' => $request->address,
            'desc' => 'Web order',
        ]);

        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'amount' => $item['amount'],
            ]);
        }

        return response()->json([
            'success' => true,
            'order_id' => $order->id,
        ], 201);
    }

    public function myOrders(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with(['orderItems.product'])
            ->latest()
            ->get();
        return response()->json($orders);
    }
}
