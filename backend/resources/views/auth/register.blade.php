<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MIX CURRY HOUSE - Register</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#0F0F11] text-white antialiased font-sans flex flex-col min-h-screen">
    
    <!-- Navbar -->
    <nav class="flex items-center justify-between px-10 py-8 max-w-7xl mx-auto w-full">
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
            <a href="/login" class="text-sm font-bold text-gray-300 hover:text-[#FF6600] transition">Login</a>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow flex items-center justify-center px-6 py-12">
        <div class="w-full max-w-md bg-[#1A1A1E] rounded-[2rem] p-10 border border-gray-800/50 shadow-2xl relative overflow-hidden">
            <!-- decorative blur -->
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-[#FF6600] opacity-10 rounded-full blur-3xl point-events-none"></div>

            <div class="relative z-10">
                <h1 class="text-3xl font-bold mb-2">Create Account</h1>
                <p class="text-gray-400 text-sm mb-8">Join MIX CURRY HOUSE today.</p>

                @if($errors->any())
                <div class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    <ul class="list-disc pl-5">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
                @endif

                <form method="POST" action="{{ route('register') }}" class="space-y-5">
                    @csrf
                    
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input type="text" name="name" id="name" value="{{ old('name') }}" required autofocus class="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] transition text-sm">
                    </div>

                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input type="text" name="username" id="username" value="{{ old('username') }}" required class="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] transition text-sm">
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input type="password" name="password" id="password" required class="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] transition text-sm">
                    </div>

                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                        <input type="password" name="password_confirmation" id="password_confirmation" required class="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] transition text-sm">
                    </div>

                    <div class="pt-4">
                        <button type="submit" class="w-full bg-[#FF6600] text-black font-bold py-3.5 rounded-xl hover:bg-orange-600 transition shadow-[0_0_20px_rgba(255,102,0,0.3)]">
                            Sign Up
                        </button>
                    </div>
                </form>

                <div class="mt-8 text-center text-sm text-gray-400">
                    Already have an account? 
                    <a href="{{ route('login') }}" class="text-[#FF6600] font-semibold hover:underline">Sign In</a>
                </div>
            </div>
        </div>
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
</body>
</html>
