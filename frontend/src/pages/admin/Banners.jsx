import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import { toast } from '../../components/Toast';

export default function AdminBanners() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);
    const [forms, setForms] = useState({});

    const predefined = [
        { key: 'hero', label: 'Phần Hero (Trang chủ)', desc: 'Banner chính trên trang chủ' },
        { key: 'newsletter', label: 'Nền Bản tin', desc: 'Hình nền cho phần bản tin' },
        { key: 'blog', label: 'Bài viết Blog Nổi bật (Bài 1)', desc: 'Hình ảnh chính cho bài viết blog nổi bật' },
        { key: 'blog_2', label: 'Bài viết Blog 2', desc: 'Hình ảnh cho bài viết blog thứ hai' },
        { key: 'blog_3', label: 'Bài viết Blog 3', desc: 'Hình ảnh cho bài viết blog thứ ba' },
        { key: 'about', label: 'Trang Giới thiệu chính', desc: 'Hình ảnh chính cho trang giới thiệu' },
        { key: 'about_chef_1', label: 'Đầu bếp 1', desc: 'Hình ảnh và thông tin cho đầu bếp thứ nhất' },
        { key: 'about_chef_2', label: 'Đầu bếp 2', desc: 'Hình ảnh và thông tin cho đầu bếp thứ hai' },
        { key: 'about_chef_3', label: 'Đầu bếp 3', desc: 'Hình ảnh và thông tin cho đầu bếp thứ ba' },
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
            const initialForms = {};
            r.data.forEach(b => {
                initialForms[b.key] = { title: b.title || '', content: b.content || '', link: b.link || '' };
            });
            setForms(initialForms);
        } catch (err) {
            toast('Không tải được banner', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (key, file = null) => {
        setUpdating(key);
        try {
            const formData = new FormData();
            if (file) formData.append('img', file);
            
            const form = forms[key] || {};
            formData.append('title', form.title || '');
            formData.append('content', form.content || '');
            formData.append('link', form.link || '');

            await api.post(`/admin/banners/${key}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast(`${key} đã được cập nhật thành công`);
            load();
        } catch (err) {
            toast('Cập nhật thất bại', 'error');
        } finally {
            setUpdating(null);
        }
    };

    const handleInputChange = (key, field, value) => {
        setForms(prev => ({
            ...prev,
            [key]: {
                ...(prev[key] || { title: '', content: '', link: '' }),
                [field]: value
            }
        }));
    };

    const getBanner = (key) => banners.find(b => b.key === key);

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
                <h1 className="text-3xl font-bold mb-2">Quản lý <span className="text-[#FF6600]">Banner</span></h1>
                <p className="text-gray-400 mb-10">Cập nhật hình ảnh và văn bản cho các phần khác nhau trên trang web của bạn.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {predefined.map((p) => {
                        const banner = getBanner(p.key);
                        const form = forms[p.key] || { title: '', content: '', link: '' };
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
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h3 className="font-bold text-xl mb-1">{p.label}</h3>
                                        <p className="text-gray-400 text-xs mb-4">{p.desc}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <input 
                                            type="text" 
                                            placeholder="Tiêu đề" 
                                            value={form.title} 
                                            onChange={(e) => handleInputChange(p.key, 'title', e.target.value)}
                                            className="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#FF6600] transition"
                                        />
                                        <textarea 
                                            placeholder="Nội dung" 
                                            value={form.content} 
                                            onChange={(e) => handleInputChange(p.key, 'content', e.target.value)}
                                            rows="2"
                                            className="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#FF6600] transition"
                                        ></textarea>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <label className="flex-grow">
                                            <span className="sr-only">Chọn hình ảnh</span>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={(e) => handleUpdate(p.key, e.target.files[0])}
                                                disabled={updating === p.key}
                                                className="block w-full text-xs text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-full file:border-0
                                                    file:text-xs file:font-semibold
                                                    file:bg-[#FF6600]/10 file:text-[#FF6600]
                                                    hover:file:bg-[#FF6600]/20
                                                    cursor-pointer disabled:opacity-50"
                                            />
                                        </label>
                                        <button 
                                            onClick={() => handleUpdate(p.key)}
                                            disabled={updating === p.key}
                                            className="bg-[#FF6600] text-black font-bold px-4 py-2 rounded-xl text-xs hover:bg-orange-600 transition disabled:opacity-50"
                                        >
                                            Lưu văn bản
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
