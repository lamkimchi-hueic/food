import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { toast } from '../components/Toast';
import { getCart, saveCart, removeFromCart, updateCartAmount, clearCart, getImageUrl, formatCurrency } from '../utils/cart';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [receiver, setReceiver] = useState(''); // This will now hold the phone number for the first field
    const [address, setAddress] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const reload = () => setCart(getCart());

    useEffect(() => {
        reload();
        window.addEventListener('cart-updated', reload);
        return () => window.removeEventListener('cart-updated', reload);
    }, []);

    // Pre-fill receiver name and phone from logged-in user once loading is finished
    useEffect(() => {
        if (user) {
            if (!receiver && user.phone) setReceiver(user.phone);
            if (!address && user.address) setAddress(user.address);
        }
    }, [user, receiver, address]);

    const total = cart.reduce((s, i) => s + i.price * i.amount, 0);
    const count = cart.reduce((s, i) => s + i.amount, 0);

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert('Giỏ hàng trống!');
        if (!user) return navigate('/login');

        setSubmitting(true);
        try {
            const res = await api.post('/checkout', {
                receiver: user?.name || 'Guest', // Keep the actual name for receiver record
                phone: receiver,    // Use the edited phone number from the first field
                address,
                items: cart.map((i) => ({ id: i.id, amount: i.amount })),
            });
            if (res.data.success) {
                toast('Đặt hàng thành công!', 'success');
                clearCart();
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (err) {
            toast(err.response?.data?.message || 'Lỗi khi đặt hàng', 'error');
        }
        setSubmitting(false);
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-10 py-12 w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <h1 className="text-4xl font-bold mb-8">Giỏ hàng</h1>
                    {cart.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <svg className="w-20 h-20 mx-auto mb-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <h3 className="text-2xl font-bold text-white mb-2">Giỏ hàng trống</h3>
                            <p className="mb-6">Có vẻ như bạn chưa thêm gì vào giỏ hàng.</p>
                            <Link to="/menu" className="px-8 py-3 bg-[#FF6600] text-black font-bold rounded-full hover:bg-orange-600 transition inline-block">Xem thực đơn</Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item, index) => (
                                <div key={index} className="flex items-center space-x-6 bg-[#141416] p-4 rounded-2xl border border-gray-800">
                                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
                                        <img src={item.img || getImageUrl(null)} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold line-clamp-1">{item.name}</h3>
                                        <p className="text-[#FF6600] font-bold text-lg mt-1">{formatCurrency(item.price)}</p>
                                    </div>
                                    <div className="flex items-center space-x-4 bg-[#0F0F11] px-4 py-2 rounded-full border border-gray-800">
                                        <button onClick={() => { updateCartAmount(index, -1); reload(); }} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF6600] hover:text-black transition">
                                            <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" /></svg>
                                        </button>
                                        <span className="font-bold w-4 text-center">{item.amount}</span>
                                        <button onClick={() => { updateCartAmount(index, 1); reload(); }} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF6600] hover:text-black transition">
                                            <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                                        </button>
                                    </div>
                                    <button onClick={() => { removeFromCart(index); reload(); }} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800/50 h-fit">
                    <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-4">Thanh toán</h2>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400">Tổng sản phẩm:</span>
                        <span className="font-bold">{count}</span>
                    </div>
                    <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-800">
                        <span className="text-gray-400">Tổng cộng:</span>
                        <span className="font-bold text-[#FF6600] text-3xl">{formatCurrency(total)}</span>
                    </div>
                    <form onSubmit={handleCheckout} className="space-y-5">
                        <div>
                            <label className="block mb-2 text-sm text-gray-400 font-semibold">Số điện thoại *</label>
                            <input required type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} className="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF6600] transition" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm text-gray-400 font-semibold">Địa chỉ *</label>
                            <input required type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF6600] transition" />
                        </div>
                        <button type="submit" disabled={submitting} className="w-full py-4 bg-[#FF6600] text-black font-bold rounded-xl hover:bg-orange-600 transition text-lg mt-6 disabled:opacity-50">
                            {submitting ? 'Đang xử lý...' : 'Đặt hàng'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
