import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import { getImageUrl } from '../../utils/cart';
import Toast from '../../components/Toast';

export default function AdminCategories() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: '', desc: '' });
    const [imgFile, setImgFile] = useState(null);
    const [editSlug, setEditSlug] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 1) { navigate('/'); return; }
        load();
    }, [user]);

    const load = () => api.get('/categories').then((r) => setCategories(r.data));

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('desc', form.desc || '');
            if (imgFile) {
                formData.append('img', imgFile);
            }

            if (editSlug) {
                formData.append('_method', 'PUT');
                await api.post(`/admin/categories/${editSlug}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                setToast({ type: 'success', message: 'Category updated successfully' });
            } else {
                await api.post('/admin/categories', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                setToast({ type: 'success', message: 'Category created successfully' });
            }
            setForm({ name: '', desc: '' });
            setImgFile(null);
            setEditSlug(null);
            load();
        } catch (err) {
            console.error('Category save error:', err.response?.data || err);
            setToast({ type: 'error', message: err.response?.data?.message || 'Operation failed' });
        }
    };

    const handleEdit = (cat) => {
        setEditSlug(cat.slug);
        setForm({ name: cat.name, desc: cat.desc || '' });
        setImgFile(null);
    };

    const handleDelete = async (slug) => {
        if (!confirm('Delete this category?')) return;
        try {
            await api.delete(`/admin/categories/${slug}`);
            setToast({ type: 'success', message: 'Category deleted successfully' });
            load();
        } catch (err) {
            setToast({ type: 'error', message: 'Delete failed' });
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full border-b border-gray-800">
                <Link to="/admin" className="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY <span className="text-white text-xs ml-2 border border-gray-700 px-2 py-0.5 rounded">ADMIN</span></Link>
                <div className="flex items-center space-x-6">
                    <Link to="/admin" className="text-sm font-bold text-gray-400 hover:text-white transition">Dashboard</Link>
                    <button onClick={logout} className="text-sm font-bold text-gray-400 hover:text-red-500 transition">Logout</button>
                </div>
            </nav>

            <main className="flex-grow max-w-7xl mx-auto px-10 py-12 w-full">
                <h1 className="text-3xl font-bold mb-8">Manage <span className="text-[#FF6600]">Categories</span></h1>

                <form onSubmit={handleSubmit} className="bg-[#1A1A1E] p-6 rounded-2xl border border-gray-800 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition" />
                    <input type="text" placeholder="Description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition" />
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-2">Category Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setImgFile(e.target.files[0])} className="bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] transition w-full" />
                    </div>
                    <div className="md:col-span-2 flex space-x-2">
                        <button type="submit" className="flex-grow bg-[#FF6600] text-black font-bold rounded-xl py-3 hover:bg-orange-600 transition">{editSlug ? 'Update' : 'Create'}</button>
                        {editSlug && <button type="button" onClick={() => { setEditSlug(null); setForm({ name: '', desc: '' }); setImgFile(null); }} className="px-6 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">Cancel</button>}
                    </div>
                </form>

                <div className="space-y-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-[#1A1A1E] p-5 rounded-2xl border border-gray-800 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {cat.img && (
                                    <img src={getImageUrl(cat.img)} alt={cat.name} className="w-16 h-16 rounded-xl object-cover border border-gray-700" />
                                )}
                                <div>
                                    <h3 className="font-bold text-lg">{cat.name}</h3>
                                    <p className="text-gray-400 text-sm">{cat.desc}</p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button onClick={() => handleEdit(cat)} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-[#FF6600] hover:text-black transition text-sm font-bold">Edit</button>
                                <button onClick={() => handleDelete(cat.slug)} className="px-4 py-2 bg-gray-800 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition text-sm font-bold">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        </div>
    );
}
