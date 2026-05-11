<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Details #{{ $order->id }} - MIX CURRY ADMIN</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#0F0F11] text-white antialiased font-sans flex flex-col min-h-screen">
    <nav class="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <a href="{{ route('orders.index') }}" class="text-[#FF6600] font-bold text-xl tracking-wider flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            BACK TO ORDERS
        </a>
    </nav>

    <main class="flex-grow max-w-5xl mx-auto px-10 py-12 w-full">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
                <h1 class="text-4xl font-bold mb-2">Order <span class="text-[#FF6600]">#{{ $order->id }}</span></h1>
                <p class="text-gray-500">Placed on {{ $order->created_at->format('M d, Y H:i') }}</p>
            </div>
            <div class="flex items-center space-x-4">
                <form action="{{ route('orders.update', $order->id) }}" method="POST" class="inline m-0">
                    @csrf
                    @method('PUT')
                    <input type="hidden" name="user_id" value="{{ $order->user_id }}">
                    <input type="hidden" name="name" value="{{ $order->name }}">
                    <input type="hidden" name="receiver" value="{{ $order->receiver }}">
                    <select name="status" onchange="this.form.submit()" class="bg-gray-800 text-white rounded-full px-6 py-3 border border-gray-700 focus:border-[#FF6600] outline-none appearance-none cursor-pointer">
                        <option value="0" {{ $order->status == 0 ? 'selected' : '' }}>Pending</option>
                        <option value="1" {{ $order->status == 1 ? 'selected' : '' }}>Processing</option>
                        <option value="2" {{ $order->status == 2 ? 'selected' : '' }}>Completed</option>
                    </select>
                </form>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
                <!-- Order Items -->
                <div class="bg-[#1A1A1E] border border-gray-800 rounded-[2rem] overflow-hidden shadow-2xl">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-black/40 text-[#FF6600] text-xs font-black uppercase tracking-widest">
                                <th class="px-8 py-4">Item</th>
                                <th class="px-8 py-4">Price</th>
                                <th class="px-8 py-4">Qty</th>
                                <th class="px-8 py-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-800/50">
                            @php $grandTotal = 0; @endphp
                            @foreach($order->orderItems as $item)
                            @php 
                                $subtotal = $item->product->price * $item->amount; 
                                $grandTotal += $subtotal;
                            @endphp
                            <tr>
                                <td class="px-8 py-6">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
                                            <img src="{{ $item->product->img ?? '' }}" class="w-full h-full object-cover">
                                        </div>
                                        <span class="font-bold">{{ $item->product->name }}</span>
                                    </div>
                                </td>
                                <td class="px-8 py-6 text-gray-400">{{ number_format($item->product->price, 0, ',', '.') }} đ</td>
                                <td class="px-8 py-6 text-gray-400">x{{ $item->amount }}</td>
                                <td class="px-8 py-6 text-right font-bold text-white">{{ number_format($subtotal, 0, ',', '.') }} đ</td>
                            </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr class="bg-black/20">
                                <td colspan="3" class="px-8 py-6 text-right text-gray-400 font-bold">Grand Total</td>
                                <td class="px-8 py-6 text-right text-2xl font-black text-[#FF6600]">{{ number_format($grandTotal, 0, ',', '.') }} đ</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div class="space-y-8">
                <!-- Customer Info -->
                <div class="bg-[#1A1A1E] border border-gray-800 rounded-[2rem] p-8 shadow-2xl">
                    <h2 class="text-xl font-bold mb-6 text-[#FF6600]">Customer Info</h2>
                    <div class="space-y-6">
                        <div>
                            <label class="block text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Receiver Name</label>
                            <div class="text-white font-bold text-lg">{{ $order->receiver }}</div>
                        </div>
                        <div>
                            <label class="block text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Phone Number</label>
                            <div class="text-white font-bold">{{ $order->phone ?? 'N/A' }}</div>
                        </div>
                        <div>
                            <label class="block text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Account</label>
                            <div class="text-white font-bold">{{ $order->user->name ?? 'Guest' }} ({{ $order->user->username ?? '' }})</div>
                        </div>
                    </div>
                </div>

                <!-- Order Meta -->
                <div class="bg-[#1A1A1E] border border-gray-800 rounded-[2rem] p-8 shadow-2xl">
                    <h2 class="text-xl font-bold mb-6 text-[#FF6600]">Internal Notes</h2>
                    <p class="text-gray-400 text-sm italic">{{ $order->desc ?? 'No internal notes provided.' }}</p>
                </div>
            </div>
        </div>
    </main>

    <footer class="border-t border-gray-800/50 py-8 mt-auto bg-[#0a0a0b]">
        <div class="max-w-7xl mx-auto px-10 text-center text-gray-500 text-sm">
            © 2026 Mix Curry Admin Panel.
        </div>
    </footer>
</body>
</html>
