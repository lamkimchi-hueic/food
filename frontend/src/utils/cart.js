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

export function getImageUrl(item) {
    // If item is an object with media_url (from MediaLibrary)
    if (item && typeof item === 'object' && item.media_url) {
        return item.media_url;
    }
    // If item is a string (legacy img path)
    const img = typeof item === 'string' ? item : (item?.img || null);
    if (!img) return getBackendUrl('/storage/products/JLjycLfZsULUhhGSG7uLXduGl7N8kBNVzpmkIu6x.jpg');
    if (img.startsWith('http')) return img;
    return getBackendUrl(`/storage/${img}`);
}

function getBackendUrl(path) {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    if (apiUrl) {
        const backendBase = apiUrl.replace(/\/api\/?$/, '');
        return backendBase + path;
    }
    return path;
}
