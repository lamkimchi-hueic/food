<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - MIX CURRY HOUSE</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#0F0F11] text-white antialiased font-sans flex flex-col min-h-screen">
    <!-- Navbar -->
    <nav class="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <a href="/" class="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY</a>
        <div class="space-x-8 text-sm font-semibold text-gray-300 hidden md:flex">
            <a href="/" class="hover:text-white transition">Home</a>
            <a href="/category" class="hover:text-white transition">Category</a>
            <a href="/menu" class="hover:text-white transition">Product</a>
            <a href="/menu" class="hover:text-white transition">Menu</a>
            <a href="/blog" class="hover:text-white transition">Blog</a>
            <a href="/about" class="text-[#FF6600]">About Us</a>
        </div>
        <div class="flex items-center space-x-6">
            <a href="/cart" class="relative hover:text-[#FF6600] transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
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

    <main class="flex-grow max-w-7xl mx-auto px-10 py-20 w-full">
        <section class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
                <h1 class="text-6xl font-bold mb-6">Let's start a <br><span class="text-[#FF6600]">conversation</span><br> about taste.</h1>
                <p class="text-gray-400 leading-relaxed max-w-lg">At Mix Curry House, every dish is an artform crafted with love, passion, and years of experience. We believe in serving more than just food; we serve memories on a plate, bringing people together through exceptional taste.</p>
            </div>
            <div class="relative">
                <div class="w-full h-96 bg-[#1A1A1E] rounded-3xl overflow-hidden border border-gray-800 relative z-10 shadow-2xl">
                    <img src="/images/hero.png" class="w-full h-full object-cover">
                </div>
                <div class="absolute -top-10 -right-10 w-64 h-64 bg-[#FF6600]/20 rounded-full blur-[80px] z-0"></div>
            </div>
        </section>

        <!-- Our Heritage -->
        <section class="bg-[#141416] p-16 rounded-[3rem] border border-gray-800/50 mb-24 text-center">
            <h2 class="text-3xl font-bold mb-6">Our Heritage</h2>
            <p class="text-gray-400 max-w-2xl mx-auto leading-relaxed">Starting from a tiny food cart in 1999, our culinary journey has always been guided by family recipes and authentic spices. Today, we've evolved into a modern dining destination without losing the soul of traditional cooking.</p>
        </section>

        <!-- Team -->
        <section>
            <h2 class="text-3xl font-bold mb-10 text-center">Meet the Visionaries</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Chef 1 -->
                <div class="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800 text-center">
                    <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-900 border-2 border-[#FF6600]">
                        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400" class="w-full h-full object-cover grayscale opacity-80">
                    </div>
                    <h3 class="text-xl font-bold">John Maker</h3>
                    <p class="text-[#FF6600] text-sm">Head Chef</p>
                </div>
                 <!-- Chef 2 -->
                <div class="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800 text-center">
                    <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-900 border-2 border-[#FF6600]">
                        <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400" class="w-full h-full object-cover grayscale opacity-80">
                    </div>
                    <h3 class="text-xl font-bold">Anna Smith</h3>
                    <p class="text-[#FF6600] text-sm">Pastry Chef</p>
                </div>
                 <!-- Chef 3 -->
                <div class="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800 text-center">
                    <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-900 border-2 border-[#FF6600]">
                        <img src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400" class="w-full h-full object-cover grayscale opacity-80">
                    </div>
                    <h3 class="text-xl font-bold">Tom Holland</h3>
                    <p class="text-[#FF6600] text-sm">Sous Chef</p>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-800/50 py-10 mt-auto bg-[#0a0a0b]">
        <div class="max-w-7xl mx-auto px-10 text-center text-gray-500 text-sm">
            © 2026 Mix Curry. All rights reserved.
        </div>
    </footer>
</body>
</html>
