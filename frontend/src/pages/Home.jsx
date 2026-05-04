import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ToastContainer, { toast } from '../components/Toast';
import api from '../api';
import { addToCart, getImageUrl } from '../utils/cart';

export default function Home() {
    const [trending, setTrending] = useState([]);
    const [specials, setSpecials] = useState([]);

    useEffect(() => {
        api.get('/products?random=1&limit=2').then((r) => setTrending(r.data));
        api.get('/products?random=1&limit=4').then((r) => setSpecials(r.data));
    }, []);

    const handleAdd = (item) => {
        const name = addToCart(item.id, item.name, item.price, getImageUrl(item.img));
        toast(name + ' added!');
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <ToastContainer />
            <main className="flex-grow">
                {/* Hero */}
                <section className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-6">The Art of <br /><span className="text-[#FF6600] font-serif italic text-7xl">Saffron Risotto.</span></h1>
                        <p className="text-gray-400 text-sm mb-10 max-w-sm leading-relaxed">Experience the rich, aromatic flavors of our signature Saffron Risotto, crafted with the finest ingredients for a truly unforgettable dining experience.</p>
                        <div className="flex items-center space-x-6">
                            <Link to="/menu" className="px-8 py-4 bg-[#FF6600] text-black font-bold rounded-full hover:bg-orange-600 transition inline-block">Order Now</Link>
                            <Link to="/menu" className="text-sm font-semibold hover:text-[#FF6600] transition flex items-center">
                                Explore Menu
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-end relative mt-10 lg:mt-0">
                        <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] bg-gray-800 rounded-full overflow-hidden border-4 border-[#1A1A1E] shadow-[0_0_50px_rgba(255,102,0,0.15)] relative">
                            <img src="/storage/products/JLjycLfZsULUhhGSG7uLXduGl7N8kBNVzpmkIu6x.jpg" alt="Signature" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-10 right-0 bg-[#FF6600]/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#FF6600]/20 flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#FF6600] rounded-full"></div>
                            <span className="text-white font-semibold text-sm">Signature dish</span>
                        </div>
                    </div>
                </section>

                {/* Trending */}
                <section className="max-w-7xl mx-auto px-10 py-20 mt-10">
                    <div className="flex justify-between items-end mb-10 border-b border-gray-800/50 pb-6">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Trending Ideas</h2>
                            <p className="text-gray-500 text-sm">Discover what our community is loving today.</p>
                        </div>
                        <Link to="/menu" className="text-[#FF6600] text-sm font-semibold hover:underline flex items-center">See all <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {trending.map((item) => (
                            <div key={item.id} className="bg-[#1A1A1E] rounded-[2rem] p-6 flex items-center space-x-6 hover:shadow-xl hover:shadow-[#FF6600]/10 transition duration-300 group cursor-pointer border border-transparent hover:border-[#FF6600]/20">
                                <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                                    <img src={getImageUrl(item.img)} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                </div>
                                <div className="flex-grow w-full">
                                    <div className="text-xs text-[#FF6600] font-bold mb-2 uppercase tracking-wide">{item.category?.name || 'Featured'}</div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF6600] transition line-clamp-1">{item.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-1">{item.desc}</p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className="font-bold text-lg">${parseFloat(item.price).toFixed(2)}</span>
                                        <button onClick={() => handleAdd(item)} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF6600] hover:text-black transition">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Specials */}
                <section className="bg-[#141416] py-20 border-y border-gray-800/50">
                    <div className="max-w-7xl mx-auto px-10">
                        <h2 className="text-3xl font-bold mb-10 text-center">Chef's Specials</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {specials.map((s) => (
                                <div key={s.id} className="bg-[#1A1A1E] border border-gray-800/50 rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-300 flex flex-col group h-full cursor-pointer hover:border-[#FF6600]/30 shadow-lg relative">
                                    <div className="h-40 overflow-hidden">
                                        <img src={getImageUrl(s.img)} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="font-bold mb-2 line-clamp-1">{s.name}</h3>
                                        <p className="text-gray-400 text-xs mb-6 line-clamp-2">{s.desc}</p>
                                        <div className="mt-auto flex justify-between items-center">
                                            <span className="text-[#FF6600] font-bold text-lg">${parseFloat(s.price).toFixed(2)}</span>
                                            <button onClick={() => handleAdd(s)} className="w-10 h-10 bg-gray-800 hover:bg-[#FF6600] hover:text-black text-white font-semibold rounded-full transition flex justify-center items-center group-hover:rotate-90">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div onClick={() => window.location.href = '/menu'} className="bg-[#1A1A1E] border border-[#FF6600]/30 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 min-h-[300px] cursor-pointer hover:bg-[#FF6600] group transition duration-300">
                                <div className="w-16 h-16 rounded-full border border-[#FF6600] group-hover:bg-black group-hover:border-black flex items-center justify-center mb-4 text-[#FF6600]">
                                    <svg className="w-8 h-8 group-hover:text-[#FF6600] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                                <h3 className="font-bold text-center text-[#FF6600] group-hover:text-black transition">Explore Full<br />Menu Collection</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
