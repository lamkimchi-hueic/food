<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cart - MIX CURRY HOUSE</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body class="bg-[#0F0F11] text-white antialiased font-sans flex flex-col min-h-screen">
    <nav class="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
        <a href="/" class="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY</a>
        <div class="space-x-8 text-sm font-semibold text-gray-300 hidden md:flex">
            <a href="/" class="hover:text-white transition">Home</a>
            <a href="/category" class="hover:text-white transition">Category</a>
            <a href="/menu" class="hover:text-white transition">Product</a>
            <a href="/menu" class="hover:text-white transition">Menu</a>
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

    <main class="flex-grow max-w-7xl mx-auto px-10 py-12 w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2">
            <h1 class="text-4xl font-bold mb-8">Shopping Cart</h1>
            <div id="cart-items" class="space-y-6">
                <!-- Cart items rendered by JS -->
            </div>
            <div id="empty-cart" class="hidden text-center py-20 text-gray-500">
                <svg class="w-20 h-20 mx-auto mb-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <h3 class="text-2xl font-bold text-white mb-2">Cart is Empty</h3>
                <p class="mb-6">Looks like you haven't added anything to your cart yet.</p>
                <a href="/menu" class="px-8 py-3 bg-[#FF6600] text-black font-bold rounded-full hover:bg-orange-600 transition inline-block">Browse Menu</a>
            </div>
        </div>

        <div class="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800/50 h-fit">
            <h2 class="text-2xl font-bold mb-6 border-b border-gray-800 pb-4">Checkout</h2>
            
            <div class="flex justify-between items-center mb-4">
                <span class="text-gray-400">Total Items:</span>
                <span id="summary-count" class="font-bold">0</span>
            </div>
            <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-800">
                <span class="text-gray-400">Order Total:</span>
                <span id="summary-total" class="font-bold text-[#FF6600] text-3xl">0 đ</span>
            </div>

            <form id="checkout-form" class="space-y-5">
                <div>
                    <label class="block mb-2 text-sm text-gray-400 font-semibold" for="receiver">Receiver Name *</label>
                    <input required type="text" id="receiver" class="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF6600] transition">
                </div>
                <div>
                    <label class="block mb-2 text-sm text-gray-400 font-semibold" for="phone">Phone Number</label>
                    <input type="text" id="phone" class="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF6600] transition">
                </div>
                <button type="submit" class="w-full py-4 bg-[#FF6600] text-black font-bold rounded-xl hover:bg-orange-600 transition text-lg mt-6">
                    Place Order
                </button>
            </form>
        </div>
    </main>

    <script>
        function loadCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const container = document.getElementById('cart-items');
            const emptyState = document.getElementById('empty-cart');
            
            if(cart.length === 0) {
                container.innerHTML = '';
                emptyState.classList.remove('hidden');
                document.getElementById('summary-count').innerText = '0';
                document.getElementById('summary-total').innerText = '0 đ';
                return;
            }

            emptyState.classList.add('hidden');
            let total = 0;
            let count = 0;
            container.innerHTML = '';

            cart.forEach((item, index) => {
                total += item.price * item.amount;
                count += item.amount;

                let row = document.createElement('div');
                let imgFallback = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200';
                row.className = "flex items-center space-x-6 bg-[#141416] p-4 rounded-2xl border border-gray-800";
                row.innerHTML = `
                    <div class="w-24 h-24 rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
                        <img src="${item.img || imgFallback}" onerror="this.src='${imgFallback}'" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-grow">
                        <h3 class="text-xl font-bold line-clamp-1">${item.name}</h3>
                        <p class="text-[#FF6600] font-bold text-lg mt-1">${parseFloat(item.price).toLocaleString('vi-VN')} đ</p>
                    </div>
                    <div class="flex items-center space-x-4 bg-[#0F0F11] px-4 py-2 rounded-full border border-gray-800">
                        <button onclick="updateAmount(${index}, -1)" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF6600] hover:text-black transition">
                            <svg class="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12H4"></path></svg>
                        </button>
                        <span class="font-bold w-4 text-center">${item.amount}</span>
                        <button onclick="updateAmount(${index}, 1)" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF6600] hover:text-black transition">
                            <svg class="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg>
                        </button>
                    </div>
                    <div>
                        <button onclick="removeItem(${index})" class="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                `;
                container.appendChild(row);
            });

            document.getElementById('summary-count').innerText = count;
            document.getElementById('summary-total').innerText = total.toLocaleString('vi-VN') + ' đ';
        }

        function updateAmount(index, change) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            if(cart[index].amount + change > 0) {
                cart[index].amount += change;
            } else {
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }

        function removeItem(index) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }

        document.getElementById('checkout-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if(cart.length === 0) return alert('Cart is empty!');

            const btn = e.target.querySelector('button[type="submit"]');
            btn.innerText = 'Processing...';
            btn.disabled = true;

            const payload = {
                receiver: document.getElementById('receiver').value,
                phone: document.getElementById('phone').value,
                items: cart.map(i => ({ id: i.id, amount: i.amount }))
            };

            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            try {
                const res = await fetch('/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                
                const data = await res.json();
                if(data.success) {
                    alert('Đặt hàng thành công!');
                    localStorage.removeItem('cart');
                    window.location.href = '/';
                } else {
                    alert('Failed: ' + (data.message || 'Validation error'));
                    btn.innerText = 'Place Order';
                    btn.disabled = false;
                }
            } catch(e) {
                alert('Connection Error!');
                btn.innerText = 'Place Order';
                btn.disabled = false;
            }
        });

        document.addEventListener('DOMContentLoaded', loadCart);
    </script>
</body>
</html>
