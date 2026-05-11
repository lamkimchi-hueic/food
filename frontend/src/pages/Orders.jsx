import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { formatCurrency } from '../utils/cart';

export default function Orders() {
    const { user, loading } = useAuth();
    const [orders, setOrders] = useState([]);
    const [fetching, setFetching] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
            return;
        }
        if (user) {
            api.get('/my-orders').then(r => {
                setOrders(r.data);
                setFetching(false);
            }).catch(() => setFetching(false));
        }
    }, [user, loading, navigate]);

    const getStatusLabel = (status) => {
        switch(status) {
            case 0: return { text: 'Đang chờ', class: 'bg-yellow-500/10 text-yellow-500' };
            case 1: return { text: 'Đang xử lý', class: 'bg-blue-500/10 text-blue-500' };
            case 2: return { text: 'Đã hoàn thành', class: 'bg-green-500/10 text-green-500' };
            case 3: return { text: 'Đã hủy', class: 'bg-red-500/10 text-red-500' };
            default: return { text: 'Không xác định', class: 'bg-gray-500/10 text-gray-500' };
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-10 py-16 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                    <div>
                        <h1 className="text-5xl font-black mb-2 tracking-tighter uppercase">Lịch sử đơn hàng</h1>
                        <p className="text-gray-400">Theo dõi và quản lý các trải nghiệm ăn uống gần đây của bạn.</p>
                    </div>
                    <Link to="/menu" className="mt-6 md:mt-0 px-8 py-3 bg-gray-800 text-white font-bold rounded-full hover:bg-[#FF6600] hover:text-black transition">Đơn hàng mới</Link>
                </div>

                {fetching ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600]"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-[#1A1A1E] rounded-[3rem] border border-gray-800">
                        <svg className="w-20 h-20 mx-auto mb-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        <h3 className="text-2xl font-bold mb-2">Không tìm thấy đơn hàng nào</h3>
                        <p className="text-gray-400 mb-8">Bạn chưa đặt đơn hàng nào. Hãy bắt đầu khám phá thực đơn thơm ngon của chúng tôi!</p>
                        <Link to="/menu" className="px-10 py-4 bg-[#FF6600] text-black font-black rounded-full hover:bg-orange-600 transition uppercase tracking-widest text-sm">Xem thực đơn</Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => {
                            const status = getStatusLabel(order.status);
                            const total = order.order_items?.reduce((sum, item) => sum + (item.amount * (item.product?.price || 0)), 0) || 0;
                            
                            return (
                                <div key={order.id} className="bg-[#1A1A1E] rounded-[2.5rem] overflow-hidden border border-gray-800 hover:border-[#FF6600]/30 transition duration-500 shadow-2xl">
                                    <div className="p-8 md:p-10">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                                            <div className="flex items-center space-x-6">
                                                <div className="w-16 h-16 bg-[#FF6600]/10 rounded-2xl flex items-center justify-center text-[#FF6600]">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 font-black uppercase tracking-widest mb-1">Mã đơn hàng #{order.id}</div>
                                                    <h3 className="text-2xl font-bold">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest ${status.class}`}>
                                                    {status.text}
                                                </span>
                                                <div className="text-right">
                                                    <div className="text-xs text-gray-500 font-black uppercase tracking-widest mb-1">Tổng số tiền</div>
                                                    <div className="text-2xl font-black text-[#FF6600]">{formatCurrency(total)}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <h4 className="text-xs text-gray-500 font-black uppercase tracking-widest mb-4">Sản phẩm đã đặt</h4>
                                                {order.order_items?.map((item, idx) => (
                                                    <div key={idx} className="flex items-center space-x-4 bg-[#141416] p-4 rounded-2xl border border-gray-800/50">
                                                        <Link to={`/product/${item.product_id}`} className="w-12 h-12 rounded-xl overflow-hidden bg-gray-900 border border-gray-800 flex-shrink-0">
                                                            <img src={item.product?.media_url || "/storage/products/default.jpg"} className="w-full h-full object-cover" alt={item.product?.name} />
                                                        </Link>
                                                        <div className="flex-grow">
                                                            <Link to={`/product/${item.product_id}`}><div className="font-bold text-sm line-clamp-1 hover:text-[#FF6600] transition">{item.product?.name}</div></Link>
                                                            <div className="text-gray-500 text-xs">SL: {item.amount} &bull; {formatCurrency(item.product?.price || 0)} ea</div>
                                                        </div>
                                                        <div className="font-black text-[#FF6600] text-sm">{formatCurrency(item.amount * (item.product?.price || 0))}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="bg-[#141416] p-8 rounded-3xl border border-gray-800/50 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6600]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#FF6600]/10 transition duration-700"></div>
                                                <h4 className="text-xs text-gray-500 font-black uppercase tracking-widest mb-6">Chi tiết giao hàng</h4>
                                                <div className="space-y-6">
                                                    <div className="flex items-start space-x-4">
                                                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 text-gray-400">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-1">Người nhận</div>
                                                            <div className="text-sm font-bold text-white">{order.receiver}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start space-x-4">
                                                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 text-gray-400">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-1">Điện thoại</div>
                                                            <div className="text-sm font-bold text-white">{order.phone}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start space-x-4">
                                                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 text-gray-400">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-1">Địa chỉ</div>
                                                            <div className="text-sm font-bold text-white leading-relaxed">{order.address}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#1A1A1E] border-t border-gray-800 px-10 py-5 flex justify-between items-center">
                                        <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">Cảm ơn bạn đã ủng hộ chúng tôi</div>
                                        <button onClick={() => window.print()} className="text-[#FF6600] text-xs font-black uppercase tracking-widest hover:underline transition">In hóa đơn</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
