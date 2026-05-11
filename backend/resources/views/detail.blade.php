<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $product->name }} - MIX CURRY HOUSE</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#0F0F11] text-white antialiased font-sans flex flex-col min-h-screen">
    <nav class="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <a href="/" class="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY</a>
        <div class="space-x-8 text-sm font-semibold text-gray-300 hidden md:flex">
            <a href="/" class="hover:text-white transition">Home</a>
            <a href="/category" class="hover:text-white transition">Category</a>
            <a href="/menu" class="hover:text-white transition">Product</a>
            <a href="/menu" class="hover:text-white transition">Menu</a>
            <a href="/blog" class="hover:text-white transition">Blog</a>
            <a href="/about" class="hover:text-white transition">About Us</a>
        </div>
        <div class="flex items-center space-x-6">
            <a href="/cart" class="relative hover:text-[#FF6600] transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span id="cart-count" class="absolute -top-2 -right-2 bg-[#FF6600] text-[#0F0F11] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </a>
            @auth
                <span class="text-sm font-bold text-gray-300 hidden md:inline">Hi, {{ auth()->user()->name }}</span>
                <form method="POST" action="{{ route('logout') }}" class="inline m-0">
                    @csrf
                    <button type="submit" class="text-sm font-bold text-gray-300 hover:text-red-500 transition">Logout</button>
                </form>
            @endauth
            @guest
                <a href="{{ route('login') }}" class="text-sm font-bold text-gray-300 hover:text-[#FF6600] transition">Login</a>
                <a href="{{ route('register') }}" class="px-5 py-2.5 bg-[#FF6600] text-black text-sm font-bold rounded-full hover:bg-orange-600 transition">Register</a>
            @endguest
        </div>
    </nav>

    <main class="flex-grow max-w-7xl mx-auto px-10 py-16 w-full">
        <a href="/menu" class="text-gray-400 hover:text-[#FF6600] mb-8 inline-block flex items-center text-sm font-semibold transition">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Menu
        </a>

        @php
            $imageUrl = $product->img ? (str_contains($product->img, 'http') ? $product->img : asset('storage/' . $product->img)) : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
        @endphp
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div class="w-full h-[500px] bg-[#1A1A1E] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl relative">
                <img src="{{ $imageUrl }}" class="w-full h-full object-cover">
                <div class="absolute top-6 left-6 bg-[#FF6600] text-black font-bold px-4 py-2 rounded-full text-sm">
                    {{ $product->category->name ?? 'Special' }}
                </div>
            </div>

            <div>
                <h1 class="text-5xl font-bold mb-4">{{ $product->name }}</h1>
                <p class="text-[#FF6600] text-4xl font-bold mb-8">{{ number_format($product->price, 0, ',', '.') }} đ</p>
                <p class="text-gray-400 leading-relaxed mb-10 text-lg">{{ $product->desc }}</p>

                <div class="flex items-center space-x-6">
                    <button onclick="addToCartAndAlert({{ $product->id }}, '{{ addslashes($product->name) }}', {{ $product->price }}, '{{ $imageUrl }}')" class="flex-grow py-5 bg-[#FF6600] text-black font-bold rounded-2xl hover:bg-orange-600 transition text-lg flex justify-center items-center">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Add to Cart
                    </button>
                    <button class="w-16 h-16 bg-[#1A1A1E] border border-gray-800 rounded-2xl flex items-center justify-center hover:text-[#FF6600] transition">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>
                </div>

                <div class="mt-12 bg-[#141416] p-6 rounded-2xl border border-gray-800">
                    <h3 class="font-bold text-lg mb-4">Nutritional Information</h3>
                    <div class="space-y-3 text-sm text-gray-400">
                        <div class="flex justify-between border-b border-gray-800 pb-2"><span>Calories</span> <span class="text-white">450 kcal</span></div>
                        <div class="flex justify-between border-b border-gray-800 pb-2"><span>Carbohydrates</span> <span class="text-white">45g</span></div>
                        <div class="flex justify-between border-b border-gray-800 pb-2"><span>Protein</span> <span class="text-white">25g</span></div>
                        <div class="flex justify-between"><span>Fat</span> <span class="text-white">18g</span></div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="border-t border-gray-800/50 py-10 mt-auto bg-[#0a0a0b]">
        <div class="max-w-7xl mx-auto px-10 text-center text-gray-500 text-sm">
            © 2026 Mix Curry. All rights reserved.
        </div>
    </footer>

    <script>
        function addToCartAndAlert(id, name, price, img) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let item = cart.find(i => i.id == id);
            if(item) {
                item.amount += 1;
            } else {
                cart.push({id, name, price, img, amount: 1});
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            let toast = document.createElement('div');
            toast.className = "fixed bottom-5 right-5 bg-[#FF6600] text-black px-8 py-4 rounded-xl shadow-xl outline-none z-50 font-bold transition duration-200";
            toast.innerText = name + " added to Cart!";
            document.body.appendChild(toast);
            setTimeout(() => { toast.classList.add('opacity-0'); setTimeout(() => toast.remove(), 500); }, 2000);
        }

        function updateCartCount() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let count = cart.reduce((sum, item) => sum + item.amount, 0);
            document.getElementById('cart-count').innerText = count;
        }

        document.addEventListener('DOMContentLoaded', updateCartCount);
    </script>
</body>
</html>
