import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';

export default function About() {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        api.get('/banners/about').then(r => setBanner(r.data.media_url)).catch(() => {});
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-10 py-20 w-full">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h1 className="text-6xl font-bold mb-6">Let's start a <br /><span className="text-[#FF6600]">conversation</span><br /> about taste.</h1>
                        <p className="text-gray-400 leading-relaxed max-w-lg">At Mix Curry House, every dish is an artform crafted with love, passion, and years of experience. We believe in serving more than just food; we serve memories on a plate, bringing people together through exceptional taste.</p>
                    </div>
                    <div className="relative">
                        <div className="w-full h-96 bg-[#1A1A1E] rounded-3xl overflow-hidden border border-gray-800 relative z-10 shadow-2xl">
                            <img src={banner || "/storage/products/CIb9Zix74Rh4LXsQgRco6gDmYy1XDDsOt3td3aB6.jpg"} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF6600]/20 rounded-full blur-[80px] z-0"></div>
                    </div>
                </section>

                <section className="bg-[#141416] p-16 rounded-[3rem] border border-gray-800/50 mb-24 text-center">
                    <h2 className="text-3xl font-bold mb-6">Our Heritage</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">Starting from a tiny food cart in 1999, our culinary journey has always been guided by family recipes and authentic spices. Today, we've evolved into a modern dining destination without losing the soul of traditional cooking.</p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-10 text-center">Meet the Visionaries</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'John Maker', role: 'Head Chef', img: '/storage/products/OUyhAXmIG9dAdaJle0Vj5BbXwAcMV52b0cKjr4Wu.jpg' },
                            { name: 'Anna Smith', role: 'Pastry Chef', img: '/storage/products/afnLJSxk1FsQGVzZAMWAE5AW0jdy1uvC3ajOrjwn.jpg' },
                            { name: 'Tom Holland', role: 'Sous Chef', img: '/storage/products/X6UH4hnQ0uC4Yh998gofsBJe5bG6LQFor2ZPXod7.jpg' },
                        ].map((chef) => (
                            <div key={chef.name} className="bg-[#1A1A1E] rounded-3xl p-8 border border-gray-800 text-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-900 border-2 border-[#FF6600]">
                                    <img src={chef.img} className="w-full h-full object-cover grayscale opacity-80" />
                                </div>
                                <h3 className="text-xl font-bold">{chef.name}</h3>
                                <p className="text-[#FF6600] text-sm">{chef.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
