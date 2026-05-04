<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - MIX CURRY HOUSE</title>
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
            <a href="/blog" class="text-[#FF6600] transition">Blog</a>
            <a href="/about" class="hover:text-white transition">About Us</a>
        </div>
        <div class="flex items-center space-x-6">
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
        <h1 class="text-5xl font-bold mb-10 text-center">Your Pantry <br><span class="text-[#FF6600]">Insights & Articles</span></h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <!-- Main Featured -->
            <a href="#" class="bg-[#1A1A1E] rounded-3xl overflow-hidden group shadow-lg border border-gray-800 hover:border-[#FF6600]/30 transition block md:col-span-2 lg:col-span-1">
                <div class="h-64 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <div class="absolute top-4 left-4 bg-[#FF6600] text-black font-bold px-3 py-1 rounded-full text-xs">Featured</div>
                </div>
                <div class="p-8">
                    <p class="text-sm text-gray-500 font-semibold mb-2">SPICES & HERBS • 5 MIN READ</p>
                    <h2 class="text-3xl font-bold mb-4 group-hover:text-[#FF6600] transition line-clamp-2">Top 10 Spices for Your Indian Pantry</h2>
                    <p class="text-gray-400 mb-6">Discover the essential aromatic spices that form the backbone of any authentic Indian kitchen. From Turmeric to Garam Masala...</p>
                    <span class="text-[#FF6600] font-bold">Read Article →</span>
                </div>
            </a>

            <div class="flex flex-col gap-10">
                 <!-- Article -->
                 <a href="#" class="bg-[#1A1A1E] rounded-3xl overflow-hidden group shadow-lg border border-gray-800 hover:border-[#FF6600]/30 transition flex flex-row">
                    <div class="w-1/3 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=400" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    </div>
                    <div class="p-6 w-2/3">
                        <p class="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Kitchen Hacks</p>
                        <h3 class="text-lg font-bold mb-2 group-hover:text-[#FF6600] transition">Complete your order with essential oils</h3>
                        <p class="text-gray-400 text-sm line-clamp-2">Why olive oil vs avocado oil matters when cooking high-heat curries.</p>
                    </div>
                </a>
                <!-- Article -->
                 <a href="#" class="bg-[#1A1A1E] rounded-3xl overflow-hidden group shadow-lg border border-gray-800 hover:border-[#FF6600]/30 transition flex flex-row">
                    <div class="w-1/3 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=400" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    </div>
                    <div class="p-6 w-2/3">
                        <p class="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Chef's Secret</p>
                        <h3 class="text-lg font-bold mb-2 group-hover:text-[#FF6600] transition">The Secret to Perfect Basmati</h3>
                        <p class="text-gray-400 text-sm line-clamp-2">Washing, soaking, and the exact water ratio for fluffy rice every time.</p>
                    </div>
                </a>
            </div>
        </div>
    </main>

    <footer class="border-t border-gray-800/50 py-10 mt-auto bg-[#0a0a0b]">
        <div class="max-w-7xl mx-auto px-10 text-center text-gray-500 text-sm">
            © 2026 Mix Curry. All rights reserved.
        </div>
    </footer>
</body>
</html>
