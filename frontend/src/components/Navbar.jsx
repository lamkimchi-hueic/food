import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartCount(cart.reduce((sum, item) => sum + item.amount, 0));
        };
        updateCount();
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    const isActive = (path) => location.pathname === path ? 'text-[#FF6600]' : 'hover:text-white transition';

    return (
        <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
            <Link to="/" className="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY</Link>
            <div className="space-x-8 text-sm font-semibold text-gray-300 hidden md:flex">
                <Link to="/" className={isActive('/')}>Home</Link>
                <Link to="/category" className={isActive('/category')}>Category</Link>
                <Link to="/menu" className={isActive('/menu')}>Product</Link>
                <Link to="/menu" className={isActive('/menu')}>Menu</Link>
                <Link to="/blog" className={isActive('/blog')}>Blog</Link>
                <Link to="/about" className={isActive('/about')}>About Us</Link>
            </div>
            <div className="flex items-center space-x-6">
                <Link to="/cart" className="relative hover:text-[#FF6600] transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="absolute -top-2 -right-2 bg-[#FF6600] text-[#0F0F11] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
                </Link>
                {user ? (
                    <>
                        {user.role === 1 && (
                            <Link to="/admin" className="text-sm font-bold text-[#FF6600] hover:underline transition">Admin Panel</Link>
                        )}
                        <span className="text-sm font-bold text-gray-300 hidden md:inline">Hi, {user.name}</span>
                        <button onClick={logout} className="text-sm font-bold text-gray-300 hover:text-red-500 transition">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-sm font-bold text-gray-300 hover:text-[#FF6600] transition">Login</Link>
                        <Link to="/register" className="px-5 py-2.5 bg-[#FF6600] text-black text-sm font-bold rounded-full hover:bg-orange-600 transition">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
