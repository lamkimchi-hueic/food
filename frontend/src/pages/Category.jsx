import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';

export default function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get('/categories').then((r) => setCategories(r.data));
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-10 py-16 w-full">
                <h1 className="text-5xl font-bold mb-4 text-center">Tìm kiếm theo <span className="text-[#FF6600]">Danh mục</span></h1>
                <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">Khám phá nhiều loại món ăn đa dạng của chúng tôi được chia thành các nhóm hoàn hảo để thỏa mãn bất kỳ cơn thèm nào bạn có thể có hôm nay.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link key={cat.id} to={`/menu?category=${cat.id}`} className="bg-[#1A1A1E] rounded-[2rem] p-8 border border-gray-800/50 hover:border-[#FF6600]/50 transition duration-300 group hover:-translate-y-2 shadow-lg flex flex-col justify-center items-center text-center h-64 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#FF6600]/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-6 text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-black transition duration-300 z-10">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-2 group-hover:text-[#FF6600] transition z-10">{cat.name}</h2>
                            <p className="text-gray-400 text-sm z-10 line-clamp-2">{cat.desc || 'Khám phá những lựa chọn thơm ngon trong danh mục này.'}</p>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
