<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - MIX CURRY HOUSE</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#0F0F11] text-white antialiased font-sans flex flex-col min-h-screen">
    <nav class="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <a href="/" class="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY <span class="text-white text-xs ml-2 border border-gray-700 px-2 py-0.5 rounded">ADMIN</span></a>
        <div class="flex items-center space-x-6">
            <a href="/" class="text-sm font-bold text-gray-400 hover:text-white transition">Back to Site</a>
            <form method="POST" action="{{ route('logout') }}" class="inline m-0">
                @csrf
                <button type="submit" class="text-sm font-bold text-gray-400 hover:text-red-500 transition">Logout</button>
            </form>
        </div>
    </nav>

    <main class="flex-grow max-w-7xl mx-auto px-10 py-12 w-full">
        <h1 class="text-4xl font-bold mb-10">Admin <span class="text-[#FF6600]">Dashboard</span></h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <!-- Categories -->
            <a href="{{ route('categories.index') }}" class="bg-[#1A1A1E] p-8 rounded-3xl border border-gray-800 hover:border-[#FF6600]/50 transition group shadow-lg">
                <div class="w-12 h-12 rounded-2xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600] mb-6 group-hover:bg-[#FF6600] group-hover:text-black transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                </div>
                <div class="text-3xl font-bold mb-1">{{ $categoryCount }}</div>
                <div class="text-gray-400 text-sm font-medium">Categories</div>
                <div class="mt-4 text-[#FF6600] text-xs font-bold uppercase tracking-wider group-hover:underline">Manage &rarr;</div>
            </a>

            <!-- Products -->
            <a href="{{ route('products.index') }}" class="bg-[#1A1A1E] p-8 rounded-3xl border border-gray-800 hover:border-[#FF6600]/50 transition group shadow-lg">
                <div class="w-12 h-12 rounded-2xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600] mb-6 group-hover:bg-[#FF6600] group-hover:text-black transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                </div>
                <div class="text-3xl font-bold mb-1">{{ $productCount }}</div>
                <div class="text-gray-400 text-sm font-medium">Products</div>
                <div class="mt-4 text-[#FF6600] text-xs font-bold uppercase tracking-wider group-hover:underline">Manage &rarr;</div>
            </a>

            <!-- Users -->
            <a href="{{ route('users.index') }}" class="bg-[#1A1A1E] p-8 rounded-3xl border border-gray-800 hover:border-[#FF6600]/50 transition group shadow-lg">
                <div class="w-12 h-12 rounded-2xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600] mb-6 group-hover:bg-[#FF6600] group-hover:text-black transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <div class="text-3xl font-bold mb-1">{{ $userCount }}</div>
                <div class="text-gray-400 text-sm font-medium">Users</div>
                <div class="mt-4 text-[#FF6600] text-xs font-bold uppercase tracking-wider group-hover:underline">Manage &rarr;</div>
            </a>

            <!-- Orders -->
            <a href="{{ route('orders.index') }}" class="bg-[#1A1A1E] p-8 rounded-3xl border border-gray-800 hover:border-[#FF6600]/50 transition group shadow-lg">
                <div class="w-12 h-12 rounded-2xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600] mb-6 group-hover:bg-[#FF6600] group-hover:text-black transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <div class="text-3xl font-bold mb-1">{{ $orderCount }}</div>
                <div class="text-gray-400 text-sm font-medium">Orders</div>
                <div class="mt-4 text-[#FF6600] text-xs font-bold uppercase tracking-wider group-hover:underline">Manage &rarr;</div>
            </a>
        </div>

        <div class="bg-[#1A1A1E] border border-gray-800 rounded-3xl p-10">
            <h2 class="text-xl font-bold mb-4">Welcome to the Control Panel</h2>
            <p class="text-gray-400 leading-relaxed mb-6">Select a category above to begin managing your website content. You can add new items, update existing ones, or remove content as needed.</p>
            <div class="flex items-center space-x-4">
                <div class="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg text-xs font-bold uppercase tracking-widest border border-green-500/20">System Online</div>
                <div class="px-4 py-2 bg-[#FF6600]/10 text-[#FF6600] rounded-lg text-xs font-bold uppercase tracking-widest border border-[#FF6600]/20">v1.0.0</div>
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
