import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';

export default function Blog() {
    const [banners, setBanners] = useState({});

    useEffect(() => {
        api.get('/banners').then((r) => {
            const bMap = {};
            r.data.forEach(b => bMap[b.key] = b.media_url);
            setBanners(bMap);
        }).catch(() => {});
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-10 py-16 w-full">
                <h1 className="text-5xl font-bold mb-10 text-center">Kiến thức & <br /><span className="text-[#FF6600]">Bài viết về Gian bếp</span></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <a href="#" className="bg-[#1A1A1E] rounded-3xl overflow-hidden group shadow-lg border border-gray-800 hover:border-[#FF6600]/30 transition block md:col-span-2 lg:col-span-1">
                        <div className="h-64 overflow-hidden relative">
                            <img src={banners.blog || "/storage/products/gQ0Rnd9Jg3vcvJulDy7XbsFuPHXA0CInrOPErO9R.jpg"} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <div className="absolute top-4 left-4 bg-[#FF6600] text-black font-bold px-3 py-1 rounded-full text-xs">Nổi bật</div>
                        </div>
                        <div className="p-8">
                            <p className="text-sm text-gray-500 font-semibold mb-2">GIA VỊ &amp; THẢO MỘC &bull; 5 PHÚT ĐỌC</p>
                            <h2 className="text-3xl font-bold mb-4 group-hover:text-[#FF6600] transition line-clamp-2">10 loại gia vị hàng đầu cho gian bếp của bạn</h2>
                            <p className="text-gray-400 mb-6">Khám phá những loại gia vị thơm thiết yếu tạo nên linh hồn của bất kỳ căn bếp đích thực nào. Từ Nghệ đến Garam Masala...</p>
                            <span className="text-[#FF6600] font-bold">Đọc bài viết &rarr;</span>
                        </div>
                    </a>
                    <div className="flex flex-col gap-10">
                        <a href="#" className="bg-[#1A1A1E] rounded-3xl overflow-hidden group shadow-lg border border-gray-800 hover:border-[#FF6600]/30 transition flex flex-row">
                            <div className="w-1/3 overflow-hidden">
                                <img src={banners.blog_2 || "/storage/products/frLCRNcPsx3BfygA73zo7q9NlNqeequFCKT7L1LZ.jpg"} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-6 w-2/3">
                                <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Mẹo nhà bếp</p>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF6600] transition">Hoàn thiện đơn hàng của bạn với các loại dầu thiết yếu</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">Tại sao dầu ô liu và dầu bơ lại quan trọng khi nấu cà ri ở nhiệt độ cao.</p>
                            </div>
                        </a>
                        <a href="#" className="bg-[#1A1A1E] rounded-3xl overflow-hidden group shadow-lg border border-gray-800 hover:border-[#FF6600]/30 transition flex flex-row">
                            <div className="w-1/3 overflow-hidden">
                                <img src={banners.blog_3 || "/storage/products/hFHl54YpHtBEw8msqi9PLqU7DiHuTOWRbF7x7WtK.jpg"} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-6 w-2/3">
                                <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Bí mật của đầu bếp</p>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF6600] transition">Bí mật để có cơm Basmati hoàn hảo</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">Vo gạo, ngâm gạo và tỷ lệ nước chính xác để cơm luôn tơi xốp.</p>
                            </div>
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
