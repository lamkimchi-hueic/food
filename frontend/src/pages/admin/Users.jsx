import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import Toast from '../../components/Toast';

export default function AdminUsers() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', username: '', password: '', role: 0, phone: '', address: '' });
    const [editId, setEditId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 1) { navigate('/'); return; }
        load();
    }, [user]);

    const load = () => api.get('/admin/users').then((r) => setUsers(r.data));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...form };
            if (editId && !payload.password) delete payload.password;

            if (editId) {
                await api.put(`/admin/users/${editId}`, payload);
                setToast({ type: 'success', message: 'Cập nhật người dùng thành công' });
            } else {
                await api.post('/admin/users', payload);
                setToast({ type: 'success', message: 'Tạo người dùng thành công' });
            }
            resetForm();
            load();
        } catch (err) {
            setToast({ type: 'error', message: 'Thao tác thất bại' });
        }
    };

    const resetForm = () => {
        setForm({ name: '', username: '', password: '', role: 0, phone: '', address: '' });
        setEditId(null);
    };

    const handleEdit = (u) => {
        setEditId(u.id);
        setForm({ name: u.name, username: u.username, password: '', role: u.role, phone: u.phone || '', address: u.address || '' });
    };

    const handleDelete = async (id) => {
        if (!confirm('Xóa người dùng này?')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            setToast({ type: 'success', message: 'Xóa người dùng thành công' });
            load();
        } catch (err) {
            setToast({ type: 'error', message: 'Xóa thất bại' });
        }
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
                <h1 className="text-3xl font-bold mb-8">Quản lý <span className="text-[#FF6600]">Người dùng</span></h1>

                <form onSubmit={handleSubmit} className="bg-[#1A1A1E] p-6 rounded-2xl border border-gray-800 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Tên" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition" />
                    <input type="text" placeholder="Tên đăng nhập" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition" />
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder={editId ? 'Mật khẩu mới (để trống nếu không đổi)' : 'Mật khẩu'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} {...(!editId ? { required: true } : {})} className="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition pr-12" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF6600] transition">
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z" /></svg>
                            )}
                        </button>
                    </div>
                    <select value={form.role} onChange={(e) => setForm({ ...form, role: parseInt(e.target.value) })} className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition">
                        <option value={0}>Người dùng</option>
                        <option value={1}>Quản trị viên</option>
                    </select>
                    <input type="text" placeholder="Số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition" />
                    <input type="text" placeholder="Địa chỉ" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition md:col-span-2" />
                    <div className="flex space-x-2 md:col-span-2">
                        <button type="submit" className="flex-grow bg-[#FF6600] text-black font-bold rounded-xl py-3 hover:bg-orange-600 transition">{editId ? 'Cập nhật' : 'Tạo mới'}</button>
                        {editId && <button type="button" onClick={resetForm} className="px-4 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">Hủy</button>}
                    </div>
                </form>

                <div className="space-y-4">
                    {users.map((u) => (
                        <div key={u.id} className="bg-[#1A1A1E] p-5 rounded-2xl border border-gray-800 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg">{u.name}</h3>
                                <p className="text-gray-400 text-sm">@{u.username} &bull; {u.role === 1 ? 'Quản trị viên' : 'Người dùng'}</p>
                                {(u.phone || u.address) && (
                                    <p className="text-gray-500 text-xs mt-1">
                                        {u.phone && <span>📞 {u.phone} </span>}
                                        {u.address && <span>📍 {u.address}</span>}
                                    </p>
                                )}
                            </div>
                            <div className="flex space-x-3">
                                <button onClick={() => handleEdit(u)} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-[#FF6600] hover:text-black transition text-sm font-bold">Sửa</button>
                                <button onClick={() => handleDelete(u.id)} className="px-4 py-2 bg-gray-800 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition text-sm font-bold">Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        </div>
    );
}
