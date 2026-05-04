<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Product - MIX CURRY ADMIN</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#0F0F11] text-white antialiased font-sans flex flex-col min-h-screen">
    <nav class="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <a href="{{ route('products.index') }}" class="text-[#FF6600] font-bold text-xl tracking-wider flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            BACK TO LIST
        </a>
    </nav>

    <main class="flex-grow max-w-4xl mx-auto px-10 py-12 w-full">
        <h1 class="text-4xl font-bold mb-10">Edit <span class="text-[#FF6600]">Product</span></h1>

        <form action="{{ route('products.update', $product->slug) }}" method="POST" enctype="multipart/form-data" class="bg-[#1A1A1E] border border-gray-800 rounded-[2rem] p-10 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
            @csrf
            @method('PUT')
            <div class="space-y-8">
                <div>
                    <label class="block text-[#FF6600] text-xs font-black uppercase tracking-widest mb-3">Product Name</label>
                    <input type="text" name="name" value="{{ $product->name }}" required placeholder="e.g. Spicy Curry" class="w-full bg-black/50 border border-gray-800 text-white rounded-2xl px-6 py-4 focus:outline-none focus:border-[#FF6600] transition font-bold">
                    @error('name') <p class="text-red-500 text-xs mt-2">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-[#FF6600] text-xs font-black uppercase tracking-widest mb-3">Category</label>
                    <select name="category_id" required class="w-full bg-black/50 border border-gray-800 text-white rounded-2xl px-6 py-4 focus:outline-none focus:border-[#FF6600] transition appearance-none">
                        @foreach($categories as $cat)
                            <option value="{{ $cat->id }}" {{ $product->category_id == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                        @endforeach
                    </select>
                    @error('category_id') <p class="text-red-500 text-xs mt-2">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-[#FF6600] text-xs font-black uppercase tracking-widest mb-3">Price ($)</label>
                    <input type="number" step="0.01" name="price" value="{{ $product->price }}" required placeholder="0.00" class="w-full bg-black/50 border border-gray-800 text-white rounded-2xl px-6 py-4 focus:outline-none focus:border-[#FF6600] transition font-bold">
                    @error('price') <p class="text-red-500 text-xs mt-2">{{ $message }}</p> @enderror
                </div>
            </div>

            <div class="space-y-8">
                <div>
                    <label class="block text-[#FF6600] text-xs font-black uppercase tracking-widest mb-3">Product Image</label>
                    @if($product->img)
                        <div class="mb-4 w-32 h-32 rounded-xl overflow-hidden border border-gray-800">
                            <img src="{{ str_contains($product->img, 'http') ? $product->img : asset('storage/' . $product->img) }}" class="w-full h-full object-cover">
                        </div>
                    @endif
                    <input type="file" name="img" class="w-full bg-black/50 border border-gray-800 text-white rounded-2xl px-6 py-4 focus:outline-none focus:border-[#FF6600] transition text-sm">
                    @error('img') <p class="text-red-500 text-xs mt-2">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-[#FF6600] text-xs font-black uppercase tracking-widest mb-3">Description</label>
                    <textarea name="desc" rows="4" placeholder="Describe this dish..." class="w-full bg-black/50 border border-gray-800 text-white rounded-2xl px-6 py-4 focus:outline-none focus:border-[#FF6600] transition text-gray-300">{{ $product->desc }}</textarea>
                    @error('desc') <p class="text-red-500 text-xs mt-2">{{ $message }}</p> @enderror
                </div>
            </div>

            <div class="md:col-span-2 pt-4">
                <button type="submit" class="w-full py-5 bg-[#FF6600] text-black font-black rounded-2xl hover:bg-orange-600 transition shadow-xl shadow-[#FF6600]/20 uppercase tracking-widest">
                    Update Product
                </button>
            </div>
        </form>
    </main>

    <footer class="border-t border-gray-800/50 py-8 mt-auto bg-[#0a0a0b]">
        <div class="max-w-7xl mx-auto px-10 text-center text-gray-500 text-sm">
            © 2026 Mix Curry Admin Panel.
        </div>
    </footer>
</body>
</html>
