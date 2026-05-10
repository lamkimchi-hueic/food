import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ToastContainer, { toast } from '../components/Toast';
import api from '../api';
import { addToCart, getImageUrl } from '../utils/cart';

export default function Menu() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const activeCategory = searchParams.get('category') || '';

    useEffect(() => {
        api.get('/categories').then((r) => setCategories(r.data));
    }, []);

    useEffect(() => {
        setSearch(searchParams.get('search') || '');
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (activeCategory) params.set('category', activeCategory);
        if (searchParams.get('search')) params.set('search', searchParams.get('search'));
        if (searchParams.get('page')) params.set('page', searchParams.get('page'));
        api.get(`/products?${params.toString()}`).then((r) => {
            setProducts(r.data.data);
            setPagination(r.data);
        });
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (search) params.set('search', search); else params.delete('search');
        params.delete('page');
        setSearchParams(params);
    };

    const setCategory = (catId) => {
        const params = new URLSearchParams(searchParams);
        if (catId) params.set('category', catId); else params.delete('category');
        params.delete('page');
        setSearchParams(params);
    };

    const handleAdd = (p) => {
        const name = addToCart(p.id, p.name, p.price, getImageUrl(p));
        toast(name + ' added to cart!');
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <ToastContainer />
            <main className="flex-grow max-w-7xl mx-auto px-10 py-12 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h1 className="text-4xl font-bold">Our Full Menu</h1>
                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for dishes..." className="w-full bg-[#1A1A1E] border border-gray-800 text-white rounded-full pl-6 pr-12 py-3 focus:outline-none focus:border-[#FF6600] transition" />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#FF6600] transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </form>
                </div>

                <div className="flex mb-10 overflow-x-auto space-x-4 pb-2">
                    <button onClick={() => setCategory('')} className={`px-6 py-2 rounded-full font-semibold transition whitespace-nowrap ${!activeCategory ? 'bg-[#FF6600] text-black' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>All Items</button>
                    {categories.map((cat) => (
                        <button key={cat.id} onClick={() => setCategory(cat.id)} className={`px-6 py-2 rounded-full font-semibold transition whitespace-nowrap ${activeCategory == cat.id ? 'bg-[#FF6600] text-black' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>{cat.name}</button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
                    {products.map((product) => (
                        <div key={product.id} className="bg-[#1A1A1E] rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-300 shadow-lg border border-gray-800/50 flex flex-col h-full hover:border-[#FF6600]/30 group">
                            <Link to={`/product/${product.id}`} className="h-48 overflow-hidden block">
                                <img src={getImageUrl(product)} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                            </Link>
                            <div className="p-6 flex flex-col flex-grow">
                                <Link to={`/product/${product.id}`}><h3 className="text-xl font-bold mb-2">{product.name}</h3></Link>
                                <p className="text-gray-400 text-sm mb-6 flex-grow">{product.desc?.substring(0, 60)}</p>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-[#FF6600] font-bold text-xl">${parseFloat(product.price).toFixed(2)}</span>
                                    <button onClick={() => handleAdd(product)} className="w-12 h-12 bg-gray-800 hover:bg-[#FF6600] hover:text-black text-white font-semibold rounded-full transition flex justify-center items-center group-hover:rotate-90">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {pagination.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                            <button key={page} onClick={() => { const p = new URLSearchParams(searchParams); p.set('page', page); setSearchParams(p); }} className={`px-4 py-2 rounded-lg font-bold transition ${pagination.current_page === page ? 'bg-[#FF6600] text-black' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>{page}</button>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
