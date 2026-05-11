import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, LineChart, Line, Area, AreaChart
} from 'recharts';

const COLORS = ['#FF6600', '#FF8533', '#FFa366', '#FFC199', '#FFD9BF', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AdminAnalytics() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [interest, setInterest] = useState([]);
    const [catPopularity, setCatPopularity] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [trends, setTrends] = useState([]);
    const [topCustomers, setTopCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 1) { navigate('/'); return; }
        loadAll();
    }, [user]);

    const loadAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const [r1, r2, r3, r4, r5] = await Promise.all([
                api.get('/admin/analytics/customer-interest'),
                api.get('/admin/analytics/category-popularity'),
                api.get('/admin/analytics/revenue-by-category'),
                api.get('/admin/analytics/order-trends'),
                api.get('/admin/analytics/top-customers'),
            ]);
            setInterest(r1.data);
            setCatPopularity(r2.data);
            setRevenue(r3.data);
            setTrends(r4.data);
            setTopCustomers(r5.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Không thể tải dữ liệu phân tích. Hãy đảm bảo Python API đang chạy trên port 8001.');
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
                <Link to="/admin" className="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY <span className="text-white text-xs ml-2 border border-gray-700 px-2 py-0.5 rounded">ADMIN</span></Link>
                <div className="flex items-center space-x-6">
                    <Link to="/admin" className="text-sm font-bold text-gray-400 hover:text-white transition">Bảng điều khiển</Link>
                    <button onClick={logout} className="text-sm font-bold text-gray-400 hover:text-red-500 transition">Đăng xuất</button>
                </div>
            </nav>

            <main className="flex-grow max-w-7xl mx-auto px-10 py-12 w-full">
                <h1 className="text-4xl font-bold mb-10">Phân tích <span className="text-[#FF6600]">Dữ liệu</span></h1>

                {loading && <div className="text-center py-20 text-gray-400 text-lg">Đang tải dữ liệu phân tích...</div>}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8">
                        <p className="text-red-400 font-bold mb-2">Lỗi kết nối</p>
                        <p className="text-red-300 text-sm">{error}</p>
                        <button onClick={loadAll} className="mt-4 px-6 py-2 bg-[#FF6600] text-black font-bold rounded-xl hover:bg-orange-600 transition text-sm">Thử lại</button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="space-y-10">
                        {/* Top sản phẩm được đặt nhiều nhất */}
                        <section className="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800">
                            <h2 className="text-xl font-bold mb-6">Sản phẩm được quan tâm nhất</h2>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={interest.slice(0, 10)} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="product_name" tick={{ fill: '#9CA3AF', fontSize: 11 }} angle={-20} textAnchor="end" height={80} />
                                    <YAxis tick={{ fill: '#9CA3AF' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1A1A1E', border: '1px solid #333', borderRadius: '12px', color: '#fff' }} />
                                    <Bar dataKey="total_quantity" fill="#FF6600" name="Số lượng đặt" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </section>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Danh mục phổ biến (Pie Chart) */}
                            <section className="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800">
                                <h2 className="text-xl font-bold mb-6">Danh mục phổ biến</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={catPopularity} dataKey="total_sold" nameKey="category_name" cx="50%" cy="50%" outerRadius={100} label={({ category_name, percentage }) => `${category_name} (${percentage}%)`}>
                                            {catPopularity.map((_, i) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#1A1A1E', border: '1px solid #333', borderRadius: '12px', color: '#fff' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </section>

                            {/* Doanh thu theo danh mục */}
                            <section className="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800">
                                <h2 className="text-xl font-bold mb-6">Doanh thu theo danh mục</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={revenue} layout="vertical" margin={{ left: 80 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis type="number" tick={{ fill: '#9CA3AF' }} />
                                        <YAxis type="category" dataKey="category_name" tick={{ fill: '#9CA3AF', fontSize: 12 }} width={80} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1A1A1E', border: '1px solid #333', borderRadius: '12px', color: '#fff' }} formatter={(val) => `$${val}`} />
                                        <Bar dataKey="total_revenue" fill="#10B981" name="Doanh thu ($)" radius={[0, 8, 8, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </section>
                        </div>

                        {/* Xu hướng đơn hàng */}
                        {trends.length > 0 && (
                            <section className="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800">
                                <h2 className="text-xl font-bold mb-6">Xu hướng đơn hàng</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={trends} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                        <defs>
                                            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#FF6600" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#FF6600" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis dataKey="order_date" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                                        <YAxis tick={{ fill: '#9CA3AF' }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1A1A1E', border: '1px solid #333', borderRadius: '12px', color: '#fff' }} />
                                        <Area type="monotone" dataKey="order_count" stroke="#FF6600" fill="url(#colorOrders)" name="Số đơn hàng" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </section>
                        )}

                        {/* Top khách hàng */}
                        <section className="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800">
                            <h2 className="text-xl font-bold mb-6">Top khách hàng</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-800">
                                            <th className="py-3 px-4 text-gray-400 text-sm font-semibold">#</th>
                                            <th className="py-3 px-4 text-gray-400 text-sm font-semibold">Tên</th>
                                            <th className="py-3 px-4 text-gray-400 text-sm font-semibold">Username</th>
                                            <th className="py-3 px-4 text-gray-400 text-sm font-semibold text-right">Đơn hàng</th>
                                            <th className="py-3 px-4 text-gray-400 text-sm font-semibold text-right">Tổng SP</th>
                                            <th className="py-3 px-4 text-gray-400 text-sm font-semibold text-right text-[#10B981]">Giá trị TB</th>
                                            <th className="py-3 px-4 text-gray-400 text-sm font-semibold text-right text-[#10B981]">Doanh thu</th>
                                            <th className="py-3 px-4 text-gray-400 text-sm font-semibold text-right">Đơn gần nhất</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topCustomers.map((c, i) => (
                                            <tr key={c.user_id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                                                <td className="py-3 px-4 text-[#FF6600] font-bold">{i + 1}</td>
                                                <td className="py-3 px-4 font-semibold">{c.customer_name}</td>
                                                <td className="py-3 px-4 text-gray-400">@{c.username}</td>
                                                <td className="py-3 px-4 text-right font-bold">{c.total_orders}</td>
                                                <td className="py-3 px-4 text-right font-bold text-[#FF6600]">{c.total_items}</td>
                                                <td className="py-3 px-4 text-right font-bold text-[#10B981]">${parseFloat(c.avg_order_value || 0).toFixed(2)}</td>
                                                <td className="py-3 px-4 text-right font-bold text-[#10B981]">${parseFloat(c.total_revenue || 0).toFixed(2)}</td>
                                                <td className="py-3 px-4 text-right text-xs text-gray-500">{c.last_order_at || '---'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                )}
            </main>

            <footer className="border-t border-gray-800/50 py-8 mt-auto bg-[#0a0a0b]">
                <div className="max-w-7xl mx-auto px-10 text-center text-gray-500 text-sm">&copy; 2026 Mix Curry Admin Panel.</div>
            </footer>
        </div>
    );
}
