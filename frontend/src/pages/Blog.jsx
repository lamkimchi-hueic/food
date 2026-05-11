import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';

export default function Blog() {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        api.get('/banners/blog').then(r => setBanner(r.data.media_url)).catch(() => {});
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-10 py-16 w-full">
                <h1 className="text-5xl font-bold mb-10 text-center">Your Pantry <br /><span className="text-[#FF6600]">Insights &amp; Articles</span></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <a href="#" className="bg-[#1A1A1E] rounded-3xl overflow-hidden group shadow-lg border border-gray-800 hover:border-[#FF6600]/30 transition block md:col-span-2 lg:col-span-1">
                        <div className="h-64 overflow-hidden relative">
                            <img src={banner || "/storage/products/gQ0Rnd9Jg3vcvJulDy7XbsFuPHXA0CInrOPErO9R.jpg"} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <div className="absolute top-4 left-4 bg-[#FF6600] text-black font-bold px-3 py-1 rounded-full text-xs">Featured</div>
                        </div>
                        <div className="p-8">
                            <p className="text-sm text-gray-500 font-semibold mb-2">SPICES &amp; HERBS &bull; 5 MIN READ</p>
                            <h2 className="text-3xl font-bold mb-4 group-hover:text-[#FF6600] transition line-clamp-2">Top 10 Spices for Your Indian Pantry</h2>
                            <p className="text-gray-400 mb-6">Discover the essential aromatic spices that form the backbone of any authentic Indian kitchen. From Turmeric to Garam Masala...</p>
                            <span className="text-[#FF6600] font-bold">Read Article &rarr;</span>
                        </div>
                    </a>
                    <div className="flex flex-col gap-10">
                        <a href="#" className="bg-[#1A1A1E] rounded-3xl overflow-hidden group shadow-lg border border-gray-800 hover:border-[#FF6600]/30 transition flex flex-row">
                            <div className="w-1/3 overflow-hidden">
                                <img src="/storage/products/frLCRNcPsx3BfygA73zo7q9NlNqeequFCKT7L1LZ.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-6 w-2/3">
                                <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Kitchen Hacks</p>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF6600] transition">Complete your order with essential oils</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">Why olive oil vs avocado oil matters when cooking high-heat curries.</p>
                            </div>
                        </a>
                        <a href="#" className="bg-[#1A1A1E] rounded-3xl overflow-hidden group shadow-lg border border-gray-800 hover:border-[#FF6600]/30 transition flex flex-row">
                            <div className="w-1/3 overflow-hidden">
                                <img src="/storage/products/hFHl54YpHtBEw8msqi9PLqU7DiHuTOWRbF7x7WtK.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-6 w-2/3">
                                <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Chef's Secret</p>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF6600] transition">The Secret to Perfect Basmati</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">Washing, soaking, and the exact water ratio for fluffy rice every time.</p>
                            </div>
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
