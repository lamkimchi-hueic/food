<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MIX CURRY HOUSE - Home</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#0F0F11] text-white antialiased font-sans flex flex-col min-h-screen">
    <!-- Navbar -->
    <nav class="flex items-center justify-between px-10 py-8 max-w-7xl mx-auto w-full">
        <a href="/" class="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY</a>
        <div class="space-x-8 text-sm font-semibold text-gray-300 hidden md:flex">
            <a href="/" class="text-[#FF6600]">Home</a>
            <a href="/category" class="hover:text-white transition">Category</a>
            <a href="/menu" class="hover:text-white transition">Product</a>
            <a href="/menu" class="hover:text-white transition">Menu</a>
            <a href="#" class="hover:text-white transition">Blog</a>
            <a href="#" class="hover:text-white transition">About Us</a>
        </div>
        <div class="flex items-center space-x-6">
            <a href="/cart" class="relative hover:text-[#FF6600] transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span id="cart-count" class="absolute -top-2 -right-2 bg-[#FF6600] text-[#0F0F11] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
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

    <!-- Hero Section -->
    <main class="flex-grow">
        <section class="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 class="text-6xl lg:text-7xl font-bold leading-tight mb-6">The Art of <br><span class="text-[#FF6600] font-serif italic text-7xl">Saffron Risotto.</span></h1>
                <p class="text-gray-400 text-sm mb-10 max-w-sm leading-relaxed">Experience the rich, aromatic flavors of our signature Saffron Risotto, crafted with the finest ingredients for a truly unforgettable dining experience.</p>
                <div class="flex items-center space-x-6">
                    <a href="/menu" class="px-8 py-4 bg-[#FF6600] text-black font-bold rounded-full hover:bg-orange-600 transition inline-block">Order Now</a>
                    <a href="/menu" class="text-sm font-semibold hover:text-[#FF6600] transition flex items-center">
                        Explore Menu
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </a>
                </div>
            </div>
            <div class="flex justify-end relative mt-10 lg:mt-0">
                <div class="w-80 h-80 md:w-[28rem] md:h-[28rem] bg-gray-800 rounded-full overflow-hidden border-4 border-[#1A1A1E] shadow-[0_0_50px_rgba(255,102,0,0.15)] relative">
                    <img src="/images/hero.png" onerror="this.src='https://images.unsplash.com/photo-1544025162-83b482dfaed0?w=600'" alt="Signature" class="w-full h-full object-cover">
                </div>
                <div class="absolute top-10 right-0 bg-[#FF6600]/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#FF6600]/20 flex items-center space-x-3">
                    <div class="w-2 h-2 bg-[#FF6600] rounded-full"></div>
                    <span class="text-white font-semibold text-sm">Signature dish</span>
                </div>
            </div>
        </section>

        <!-- Trending Ideas (Dynamic) -->
        <section class="max-w-7xl mx-auto px-10 py-20 mt-10">
            <div class="flex justify-between items-end mb-10 border-b border-gray-800/50 pb-6">
                <div>
                     <h2 class="text-3xl font-bold mb-2">Trending Ideas</h2>
                     <p class="text-gray-500 text-sm">Discover what our community is loving today.</p>
                </div>
                <a href="/menu" class="text-[#FF6600] text-sm font-semibold hover:underline flex items-center">See all <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                @foreach($trending as $item)
                @php
                    $trendingUrl = $item->img ? (str_contains($item->img, 'http') ? $item->img : asset('storage/' . $item->img)) : 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop';
                @endphp
                <div class="bg-[#1A1A1E] rounded-[2rem] p-6 flex items-center space-x-6 hover:shadow-xl hover:shadow-[#FF6600]/10 transition duration-300 group cursor-pointer border border-transparent hover:border-[#FF6600]/20">
                    <div class="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src="{{ $trendingUrl }}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                    </div>
                    <div class="flex-grow w-full">
                        <div class="text-xs text-[#FF6600] font-bold mb-2 uppercase tracking-wide">{{ $item->category->name ?? 'Featured' }}</div>
                        <h3 class="text-xl font-bold mb-2 group-hover:text-[#FF6600] transition line-clamp-1">{{ $item->name }}</h3>
                        <p class="text-gray-400 text-sm mb-4 line-clamp-1">{{ $item->desc }}</p>
                        <div class="flex justify-between items-center mt-auto">
                            <span class="font-bold text-lg">{{ number_format($item->price, 0, ',', '.') }} đ</span>
                            <button onclick="addToCart({{ $item->id }}, '{{ addslashes($item->name) }}', {{ $item->price }}, '{{ $trendingUrl }}')" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF6600] hover:text-black transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </section>
        
        <!-- Chef's Specials (Dynamic) -->
         <section class="bg-[#141416] py-20 border-y border-gray-800/50">
            <div class="max-w-7xl mx-auto px-10">
                <h2 class="text-3xl font-bold mb-10 text-center">Chef's Specials</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    @foreach($specials as $special)
                    @php
                        $specialUrl = $special->img ? (str_contains($special->img, 'http') ? $special->img : asset('storage/' . $special->img)) : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
                    @endphp
                    <div class="bg-[#1A1A1E] border border-gray-800/50 rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-300 flex flex-col group h-full cursor-pointer hover:border-[#FF6600]/30 shadow-lg relative">
                        <div class="h-40 overflow-hidden">
                            <img src="{{ $specialUrl }}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                        </div>
                        <div class="p-6 flex flex-col flex-grow">
                            <h3 class="font-bold mb-2 line-clamp-1">{{ $special->name }}</h3>
                            <p class="text-gray-400 text-xs mb-6 line-clamp-2">{{ $special->desc }}</p>
                            <div class="mt-auto flex justify-between items-center">
                                <span class="text-[#FF6600] font-bold text-lg">{{ number_format($special->price, 0, ',', '.') }} đ</span>
                                <button onclick="addToCart({{ $special->id }}, '{{ addslashes($special->name) }}', {{ $special->price }}, '{{ $specialUrl }}')" class="w-10 h-10 bg-gray-800 hover:bg-[#FF6600] hover:text-black text-white font-semibold rounded-full transition flex justify-center items-center group-hover:rotate-90">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    @endforeach
                    <div onclick="window.location='/menu'" class="bg-[#1A1A1E] border border-[#FF6600]/30 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 min-h-[300px] cursor-pointer hover:bg-[#FF6600] group transition duration-300">
                        <div class="w-16 h-16 rounded-full border border-[#FF6600] group-hover:bg-black group-hover:border-black flex items-center justify-center mb-4 transition text-[#FF6600]">
                            <svg class="w-8 h-8 group-hover:text-[#FF6600] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </div>
                        <h3 class="font-bold text-center text-[#FF6600] group-hover:text-black transition">Explore Full<br>Menu Collection</h3>
                    </div>
                </div>
            </div>
         </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-800/50 py-12 mt-auto bg-[#0a0a0b]">
        <div class="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
            <div>
                <div class="text-[#FF6600] font-bold text-xl mb-2 tracking-wider">MIX CURRY HOUSE</div>
                <p class="text-gray-500 text-sm">© 2026 Mix Curry. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        function addToCart(id, name, price, img) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let item = cart.find(i => i.id == id);
            if(item) {
                item.amount += 1;
            } else {
                cart.push({id, name, price, img, amount: 1});
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // Simple visual feedback
            let toast = document.createElement('div');
            toast.className = "fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl outline-none z-50 font-bold transition duration-500";
            toast.innerText = name + " added!";
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
