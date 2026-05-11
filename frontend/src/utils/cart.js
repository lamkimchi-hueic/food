export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(id, name, price, img) {
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (item) {
        item.amount += 1;
    } else {
        cart.push({ id, name, price, img, amount: 1 });
    }
    saveCart(cart);
    return name;
}

export function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

export function updateCartAmount(index, change) {
    const cart = getCart();
    if (cart[index].amount + change > 0) {
        cart[index].amount += change;
    } else {
        cart.splice(index, 1);
    }
    saveCart(cart);
}

export function clearCart() {
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cart-updated'));
}

export function formatCurrency(value) {
    return parseFloat(value || 0).toLocaleString('vi-VN') + ' đ';
}

export function getImageUrl(item) {
    const FALLBACK = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop';

    // If item is an object with media_url (from Spatie MediaLibrary)
    if (item && typeof item === 'object' && item.media_url) {
        return fixBackendUrl(item.media_url);
    }
    
    // Legacy path check
    const img = typeof item === 'string' ? item : (item?.img || null);
    
    // If no image, return a high-quality placeholder
    if (!img) {
        return FALLBACK;
    }

    if (img.startsWith('http')) return fixBackendUrl(img);
    
    // Return backend storage URL
    return getBackendUrl(`/storage/${img}`);
}

// Fix URLs that point to localhost/127.0.0.1 to either real backend (prod) or relative (dev for Vite proxy)
function fixBackendUrl(url) {
    if (!url) return url;
    const apiUrl = import.meta.env.VITE_API_URL || '';
    const localPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/;
    if (apiUrl) {
        const backendBase = apiUrl.replace(/\/api\/?$/, '');
        return url.replace(localPattern, backendBase);
    }
    // Dev mode: strip the host so /storage/... goes through Vite proxy
    return url.replace(localPattern, '');
}

function getBackendUrl(path) {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    if (apiUrl) {
        const backendBase = apiUrl.replace(/\/api\/?$/, '');
        return backendBase + path;
    }
    return path;
}
