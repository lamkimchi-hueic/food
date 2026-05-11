import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ categoryCount: 0, productCount: 0, userCount: 0, orderCount: 0 });

    useEffect(() => {
        if (!user || user.role !== 1) { navigate('/'); return; }
        api.get('/admin/dashboard').then((r) => setStats(r.data)).catch(() => navigate('/'));
    }, [user]);

    const cards = [
        { label: 'Danh mục', count: stats.categoryCount, link: '/admin/categories', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
        { label: 'Sản phẩm', count: stats.productCount, link: '/admin/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { label: 'Người dùng', count: stats.userCount, link: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { label: 'Đơn hàng', count: stats.orderCount, link: '/admin/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
        { label: 'Banner', count: '🖼️', link: '/admin/banners', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { label: 'Phân tích', count: '📊', link: '/admin/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    ];

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
                <Link to="/" className="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY <span className="text-white text-xs ml-2 border border-gray-700 px-2 py-0.5 rounded">ADMIN</span></Link>
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-sm font-bold text-gray-400 hover:text-white transition">Quay lại trang web</Link>
                    <button onClick={logout} className="text-sm font-bold text-gray-400 hover:text-red-500 transition">Đăng xuất</button>
                </div>
            </nav>

            <main className="flex-grow max-w-7xl mx-auto px-10 py-12 w-full">
                <h1 className="text-4xl font-bold mb-10">Bảng <span className="text-[#FF6600]">Quản trị</span></h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {cards.map((c) => (
                        <Link key={c.label} to={c.link} className="bg-[#1A1A1E] p-8 rounded-3xl border border-gray-800 hover:border-[#FF6600]/50 transition group shadow-lg">
                            <div className="w-12 h-12 rounded-2xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600] mb-6 group-hover:bg-[#FF6600] group-hover:text-black transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={c.icon} /></svg>
                            </div>
                            <div className="text-3xl font-bold mb-1">{c.count}</div>
                            <div className="text-gray-400 text-sm font-medium">{c.label}</div>
                            <div className="mt-4 text-[#FF6600] text-xs font-bold uppercase tracking-wider group-hover:underline">Quản lý &rarr;</div>
                        </Link>
                    ))}
                </div>

                <div className="bg-[#1A1A1E] border border-gray-800 rounded-3xl p-10">
                    <h2 className="text-xl font-bold mb-4">Chào mừng đến với Bảng điều khiển</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">Chọn một danh mục phía trên để bắt đầu quản lý nội dung trang web của bạn. Bạn có thể thêm các mục mới, cập nhật các mục hiện có hoặc xóa nội dung nếu cần.</p>
                    <div className="flex items-center space-x-4">
                        <div className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg text-xs font-bold uppercase tracking-widest border border-green-500/20">Hệ thống Trực tuyến</div>
                        <div className="px-4 py-2 bg-[#FF6600]/10 text-[#FF6600] rounded-lg text-xs font-bold uppercase tracking-widest border border-[#FF6600]/20">v1.0.0</div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-gray-800/50 py-8 mt-auto bg-[#0a0a0b]">
                <div className="max-w-7xl mx-auto px-10 text-center text-gray-500 text-sm">&copy; 2026 Mix Curry Admin Panel.</div>
            </footer>
        </div>
    );
}
