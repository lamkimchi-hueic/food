import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import Toast from '../../components/Toast';

export default function AdminBanners() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [updating, setUpdating] = useState(null);

    const predefined = [
        { key: 'hero', label: 'Hero Section (Home)', desc: 'The main banner on the homepage' },
        { key: 'newsletter', label: 'Newsletter Background', desc: 'Background image for newsletter section' },
        { key: 'blog', label: 'Blog Featured (Post 1)', desc: 'Main image for the featured blog post' },
        { key: 'blog_2', label: 'Blog Post 2', desc: 'Image for the second blog post' },
        { key: 'blog_3', label: 'Blog Post 3', desc: 'Image for the third blog post' },
        { key: 'about', label: 'About Us Main', desc: 'Main image for the about us page' },
        { key: 'about_chef_1', label: 'Chef 1', desc: 'Image for the first chef' },
        { key: 'about_chef_2', label: 'Chef 2', desc: 'Image for the second chef' },
        { key: 'about_chef_3', label: 'Chef 3', desc: 'Image for the third chef' },
    ];

    useEffect(() => {
        if (!user || user.role !== 1) { navigate('/'); return; }
        load();
    }, [user]);

    const load = async () => {
        setLoading(true);
        try {
            const r = await api.get('/banners');
            setBanners(r.data);
        } catch (err) {
            setToast({ type: 'error', message: 'Failed to load banners' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (key, file) => {
        if (!file) return;
        setUpdating(key);
        try {
            const formData = new FormData();
            formData.append('img', file);
            await api.post(`/admin/banners/${key}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setToast({ type: 'success', message: `${key} updated successfully` });
            load();
        } catch (err) {
            setToast({ type: 'error', message: 'Update failed' });
        } finally {
            setUpdating(null);
        }
    };

    const getBanner = (key) => banners.find(b => b.key === key);

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
                <h1 className="text-3xl font-bold mb-2">Manage <span className="text-[#FF6600]">Banners</span></h1>
                <p className="text-gray-400 mb-10">Update images for various sections of your website.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {predefined.map((p) => {
                        const banner = getBanner(p.key);
                        return (
                            <div key={p.key} className="bg-[#1A1A1E] rounded-3xl border border-gray-800 overflow-hidden flex flex-col shadow-lg">
                                <div className="h-48 bg-gray-900 relative group">
                                    {banner?.media_url ? (
                                        <img src={banner.media_url + '?t=' + Date.now()} className="w-full h-full object-cover" alt={p.label} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    )}
                                    {updating === p.key && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6600]"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl mb-1">{p.label}</h3>
                                    <p className="text-gray-400 text-sm mb-6">{p.desc}</p>
                                    
                                    <label className="block">
                                        <span className="sr-only">Choose image</span>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => handleUpdate(p.key, e.target.files[0])}
                                            disabled={updating === p.key}
                                            className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-[#FF6600]/10 file:text-[#FF6600]
                                                hover:file:bg-[#FF6600]/20
                                                cursor-pointer disabled:opacity-50"
                                        />
                                    </label>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
            {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        </div>
    );
}
