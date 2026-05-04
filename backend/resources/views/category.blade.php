<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Categories - MIX CURRY HOUSE</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#0F0F11] text-white antialiased font-sans flex flex-col min-h-screen">
    <!-- Navbar -->
    <nav class="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <a href="/" class="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY</a>
        <div class="space-x-8 text-sm font-semibold text-gray-300 hidden md:flex">
            <a href="/" class="hover:text-white transition">Home</a>
            <a href="/category" class="text-[#FF6600]">Category</a>
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
                @if(auth()->user()->role == 1)
                    <a href="/admin" class="text-sm font-bold text-[#FF6600] hover:underline transition">Admin Panel</a>
                @endif
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
        <h1 class="text-5xl font-bold mb-4 text-center">Browse by <span class="text-[#FF6600]">Categories</span></h1>
        <p class="text-gray-400 text-center mb-16 max-w-2xl mx-auto">Explore our wide variety of dishes divided into perfect groupings to satisfy any craving you might have today.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach($categories as $index => $cat)
            <a href="/menu?category={{ $cat->id }}" class="bg-[#1A1A1E] rounded-[2rem] p-8 border border-gray-800/50 hover:border-[#FF6600]/50 transition duration-300 group hover:-translate-y-2 shadow-lg flex flex-col justify-center items-center text-center h-64 relative overflow-hidden">
                <div class="absolute inset-0 bg-[#FF6600]/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div class="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-6 text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-black transition duration-300 z-10">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <h2 class="text-2xl font-bold mb-2 group-hover:text-[#FF6600] transition z-10">{{ $cat->name }}</h2>
                <p class="text-gray-400 text-sm z-10 line-clamp-2">{{ $cat->desc ?? 'Explore delicious options in this category.' }}</p>
            </a>
            @endforeach
        </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-800/50 py-10 mt-auto bg-[#0a0a0b]">
        <div class="max-w-7xl mx-auto px-10 text-center text-gray-500 text-sm">
            © 2026 Mix Curry. All rights reserved.
        </div>
    </footer>
    <script>
        function updateCartCount() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let count = cart.reduce((sum, item) => sum + item.amount, 0);
            let badge = document.getElementById('cart-count');
            if(badge) badge.innerText = count;
        }
        document.addEventListener('DOMContentLoaded', updateCartCount);
    </script>
</body>
</html>
