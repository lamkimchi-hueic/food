import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import { toast } from '../../components/Toast';

export default function AdminOrders() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user || user.role !== 1) { navigate('/'); return; }
        load();
    }, [user]);

    const load = () => api.get('/admin/orders').then((r) => setOrders(r.data));

    const handleDelete = async (id) => {
        if (!confirm('Delete this order?')) return;
        try {
            await api.delete(`/admin/orders/${id}`);
            toast('Xóa đơn hàng thành công');
            load();
        } catch (err) {
            toast('Xóa thất bại', 'error');
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await api.put(`/admin/orders/${id}`, { status });
            toast('Cập nhật trạng thái thành công');
            load();
        } catch (err) {
            toast('Cập nhật thất bại', 'error');
        }
    };

    const statusLabels = { 0: 'Đang chờ', 1: 'Đã xác nhận', 2: 'Đã giao hàng', 3: 'Đã hủy' };
    const statusColors = { 0: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20', 1: 'text-blue-500 bg-blue-500/10 border-blue-500/20', 2: 'text-green-500 bg-green-500/10 border-green-500/20', 3: 'text-red-500 bg-red-500/10 border-red-500/20' };

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
                <h1 className="text-3xl font-bold mb-8">Quản lý <span className="text-[#FF6600]">Đơn hàng</span></h1>

                <div className="space-y-4">
                    {orders.length === 0 && <p className="text-gray-400 text-center py-10">Chưa có đơn hàng nào.</p>}
                    {orders.map((order) => (
                        <div key={order.id} className="bg-[#1A1A1E] p-6 rounded-2xl border border-gray-800">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">Đơn hàng #{order.id}</h3>
                                    <p className="text-gray-400 text-sm">Người nhận: {order.receiver} &bull; Người dùng: {order.user?.name || 'N/A'}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, parseInt(e.target.value))}
                                        className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[order.status] || statusColors[0]} bg-transparent`}
                                    >
                                        <option value={0}>Đang chờ</option>
                                        <option value={1}>Đã xác nhận</option>
                                        <option value={2}>Đã giao hàng</option>
                                        <option value={3}>Đã hủy</option>
                                    </select>
                                    <button onClick={() => handleDelete(order.id)} className="px-4 py-2 bg-gray-800 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition text-sm font-bold">Xóa</button>
                                </div>
                            </div>
                            {order.order_items && order.order_items.length > 0 && (
                                <div className="bg-[#0F0F11] rounded-xl p-4 space-y-2">
                                    {order.order_items.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="text-gray-300">{item.product?.name || `Product #${item.product_id}`}</span>
                                            <span className="text-gray-400">x{item.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
