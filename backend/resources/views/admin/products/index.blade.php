<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Products - MIX CURRY ADMIN</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#0F0F11] text-white antialiased font-sans flex flex-col min-h-screen">
    <nav class="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <a href="/admin" class="text-[#FF6600] font-bold text-xl tracking-wider flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            BACK TO DASHBOARD
        </a>
        <div class="flex items-center space-x-6">
            <a href="{{ route('products.create') }}" class="px-6 py-2.5 bg-[#FF6600] text-black font-bold rounded-full hover:bg-orange-600 transition shadow-lg shadow-[#FF6600]/20">
                + ADD PRODUCT
            </a>
        </div>
    </nav>

    <main class="flex-grow max-w-7xl mx-auto px-10 py-12 w-full">
        <div class="flex justify-between items-center mb-10">
            <h1 class="text-4xl font-bold">Manage <span class="text-[#FF6600]">Products</span></h1>
        </div>

        @if(session('success'))
            <div class="bg-green-500/10 border border-green-500/20 text-green-500 px-6 py-4 rounded-2xl mb-8 font-semibold">
                {{ session('success') }}
            </div>
        @endif

        <div class="bg-[#1A1A1E] border border-gray-800 rounded-[2rem] overflow-hidden shadow-2xl">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-black/40 text-[#FF6600] text-xs font-black uppercase tracking-widest">
                        <th class="px-8 py-6">Img</th>
                        <th class="px-8 py-6">Name</th>
                        <th class="px-8 py-6">Category</th>
                        <th class="px-8 py-6">Price</th>
                        <th class="px-8 py-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-800/50">
                    @foreach($products as $product)
                    <tr class="hover:bg-white/5 transition duration-200">
                        <td class="px-8 py-4">
                            <div class="w-12 h-12 rounded-xl overflow-hidden bg-gray-800">
                                <img src="{{ $product->img ? (str_contains($product->img, 'http') ? $product->img : asset('storage/' . $product->img)) : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100' }}" class="w-full h-full object-cover">
                            </div>
                        </td>
                        <td class="px-8 py-6">
                            <div class="font-bold text-lg">{{ $product->name }}</div>
                            <div class="text-gray-500 text-xs">{{ $product->slug }}</div>
                        </td>
                        <td class="px-8 py-6">
                            <span class="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-bold">{{ $product->category->name ?? 'Uncategorized' }}</span>
                        </td>
                        <td class="px-8 py-6 font-bold text-[#FF6600] text-lg">${{ number_format($product->price, 2) }}</td>
                        <td class="px-8 py-6 text-right">
                            <div class="flex justify-end items-center space-x-4">
                                <a href="{{ route('products.edit', $product->slug) }}" class="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </a>
                                <form action="{{ route('products.destroy', $product->slug) }}" method="POST" class="inline m-0" onsubmit="return confirm('Are you sure you want to delete this product?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </main>

    <footer class="border-t border-gray-800/50 py-8 mt-auto bg-[#0a0a0b]">
        <div class="max-w-7xl mx-auto px-10 text-center text-gray-500 text-sm">
            © 2026 Mix Curry Admin Panel.
        </div>
    </footer>
</body>
</html>
