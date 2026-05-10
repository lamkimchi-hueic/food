import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ToastContainer, { toast } from '../components/Toast';
import api from '../api';
import { addToCart, getImageUrl } from '../utils/cart';

export default function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/products/${id}`).then((r) => setProduct(r.data));
    }, [id]);

    if (!product) return <div className="flex items-center justify-center min-h-screen"><div className="text-gray-400">Loading...</div></div>;

    const imageUrl = getImageUrl(product);

    const handleAdd = () => {
        const name = addToCart(product.id, product.name, product.price, imageUrl);
        toast(name + ' added to Cart!');
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <ToastContainer />
            <main className="flex-grow max-w-7xl mx-auto px-10 py-16 w-full">
                <Link to="/menu" className="text-gray-400 hover:text-[#FF6600] mb-8 inline-flex items-center text-sm font-semibold transition">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Menu
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mt-4">
                    <div className="w-full h-[500px] bg-[#1A1A1E] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl relative">
                        <img src={imageUrl} className="w-full h-full object-cover" />
                        <div className="absolute top-6 left-6 bg-[#FF6600] text-black font-bold px-4 py-2 rounded-full text-sm">
                            {product.category?.name || 'Special'}
                        </div>
                    </div>

                    <div>
                        <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
                        <p className="text-[#FF6600] text-4xl font-bold mb-8">${parseFloat(product.price).toFixed(2)}</p>
                        <p className="text-gray-400 leading-relaxed mb-10 text-lg">{product.desc}</p>

                        <div className="flex items-center space-x-6">
                            <button onClick={handleAdd} className="flex-grow py-5 bg-[#FF6600] text-black font-bold rounded-2xl hover:bg-orange-600 transition text-lg flex justify-center items-center">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                Add to Cart
                            </button>
                            <button className="w-16 h-16 bg-[#1A1A1E] border border-gray-800 rounded-2xl flex items-center justify-center hover:text-[#FF6600] transition">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            </button>
                        </div>

                        <div className="mt-12 bg-[#141416] p-6 rounded-2xl border border-gray-800">
                            <h3 className="font-bold text-lg mb-4">Nutritional Information</h3>
                            <div className="space-y-3 text-sm text-gray-400">
                                <div className="flex justify-between border-b border-gray-800 pb-2"><span>Calories</span><span className="text-white">450 kcal</span></div>
                                <div className="flex justify-between border-b border-gray-800 pb-2"><span>Carbohydrates</span><span className="text-white">45g</span></div>
                                <div className="flex justify-between border-b border-gray-800 pb-2"><span>Protein</span><span className="text-white">25g</span></div>
                                <div className="flex justify-between"><span>Fat</span><span className="text-white">18g</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
