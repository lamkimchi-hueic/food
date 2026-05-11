import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import { getImageUrl, formatCurrency } from '../../utils/cart';
import { toast } from '../../components/Toast';

export default function AdminProducts() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ category_id: '', name: '', desc: '', price: '' });
    const [imgFile, setImgFile] = useState(null);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 1) { navigate('/'); return; }
        load();
        api.get('/categories').then((r) => setCategories(r.data));
    }, [user]);

    const load = () => api.get('/products?per_page=100').then((r) => setProducts(r.data.data || r.data));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const fd = new FormData();
            fd.append('category_id', form.category_id);
            fd.append('name', form.name);
            fd.append('desc', form.desc);
            fd.append('price', form.price);
            if (imgFile) fd.append('img', imgFile);

            if (editId) {
                fd.append('_method', 'PUT');
                await api.post(`/admin/products/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast('Cập nhật sản phẩm thành công');
            } else {
                await api.post('/admin/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast('Tạo sản phẩm thành công');
            }
            resetForm();
            load();
        } catch (err) {
            toast('Thao tác thất bại', 'error');
        }
    };

    const resetForm = () => {
        setForm({ category_id: '', name: '', desc: '', price: '' });
        setImgFile(null);
        setEditId(null);
    };

    const handleEdit = (p) => {
        setEditId(p.id);
        setForm({ category_id: p.category_id, name: p.name, desc: p.desc || '', price: p.price });
    };

    const handleDelete = async (id) => {
        if (!confirm('Xóa sản phẩm này?')) return;
        try {
            await api.delete(`/admin/products/${id}`);
            toast('Xóa sản phẩm thành công');
            load();
        } catch (err) {
            toast('Xóa thất bại', 'error');
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
                <h1 className="text-3xl font-bold mb-8">Quản lý <span className="text-[#FF6600]">Sản phẩm</span></h1>

                <form onSubmit={handleSubmit} className="bg-[#1A1A1E] p-6 rounded-2xl border border-gray-800 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} required className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition">
                        <option value="">Chọn danh mục</option>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <input type="text" placeholder="Tên" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition" />
                    <input type="text" placeholder="Mô tả" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition" />
                    <input type="number" step="0.01" placeholder="Giá" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition" />
                    <input type="file" accept="image/*" onChange={(e) => setImgFile(e.target.files[0])} className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 transition file:mr-4 file:rounded-lg file:border-0 file:bg-[#FF6600] file:text-black file:font-bold file:px-4 file:py-1" />
                    <div className="flex space-x-2">
                        <button type="submit" className="flex-grow bg-[#FF6600] text-black font-bold rounded-xl py-3 hover:bg-orange-600 transition">{editId ? 'Cập nhật' : 'Tạo mới'}</button>
                        {editId && <button type="button" onClick={resetForm} className="px-4 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">Hủy</button>}
                    </div>
                </form>

                <div className="space-y-4">
                    {products.map((p) => (
                        <div key={p.id} className="bg-[#1A1A1E] p-4 rounded-2xl border border-gray-800 flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-900 flex-shrink-0">
                                <img src={getImageUrl(p)} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop'; }} />
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold">{p.name}</h3>
                                <p className="text-gray-400 text-sm">{p.category?.name} &bull; {formatCurrency(p.price)}</p>
                            </div>
                            <div className="flex space-x-3">
                                <button onClick={() => handleEdit(p)} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-[#FF6600] hover:text-black transition text-sm font-bold">Sửa</button>
                                <button onClick={() => handleDelete(p.id)} className="px-4 py-2 bg-gray-800 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition text-sm font-bold">Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
