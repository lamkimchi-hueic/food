import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';

export default function About() {
    const [banners, setBanners] = useState({});

    useEffect(() => {
        api.get('/banners').then((r) => {
            const bMap = {};
            r.data.forEach(b => bMap[b.key] = b);
            setBanners(bMap);
        }).catch(() => {});
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-10 py-20 w-full">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h1 className="text-6xl font-bold mb-6">Hãy bắt đầu một <br /><span className="text-[#FF6600]">cuộc trò chuyện</span><br /> về hương vị.</h1>
                        <p className="text-gray-400 leading-relaxed max-w-lg">Tại Mix Curry House, mỗi món ăn là một tác phẩm nghệ thuật được tạo nên từ tình yêu, niềm đam mê và kinh nghiệm nhiều năm. Chúng tôi tin tưởng vào việc phục vụ nhiều hơn là chỉ thức ăn; chúng tôi phục vụ những kỷ niệm trên đĩa, mang mọi người lại gần nhau thông qua hương vị đặc biệt.</p>
                    </div>
                    <div className="relative">
                        <div className="w-full h-96 bg-[#1A1A1E] rounded-3xl overflow-hidden border border-gray-800 relative z-10 shadow-2xl">
                            <img src={banners.about?.media_url || "/storage/products/CIb9Zix74Rh4LXsQgRco6gDmYy1XDDsOt3td3aB6.jpg"} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF6600]/20 rounded-full blur-[80px] z-0"></div>
                    </div>
                </section>

                <section className="bg-[#141416] p-16 rounded-[3rem] border border-gray-800/50 mb-24 text-center">
                    <h2 className="text-3xl font-bold mb-6">Di sản của chúng tôi</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">Bắt đầu từ một xe đồ ăn nhỏ vào năm 1999, hành trình ẩm thực của chúng tôi luôn được dẫn dắt bởi những công thức gia truyền và gia vị đích thực. Ngày nay, chúng tôi đã phát triển thành một điểm đến ăn uống hiện đại mà không đánh mất cái hồn của nấu ăn truyền thống.</p>
                </section>

                <section>
                        <h2 className="text-3xl font-bold mb-10 text-center">Gặp gỡ những người có tầm nhìn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: banners.about_chef_1?.title || 'John Maker', role: banners.about_chef_1?.content || 'Bếp trưởng', img: banners.about_chef_1?.media_url || '/storage/products/OUyhAXmIG9dAdaJle0Vj5BbXwAcMV52b0cKjr4Wu.jpg' },
                                { name: banners.about_chef_2?.title || 'Anna Smith', role: banners.about_chef_2?.content || 'Đầu bếp bánh ngọt', img: banners.about_chef_2?.media_url || '/storage/products/afnLJSxk1FsQGVzZAMWAE5AW0jdy1uvC3ajOrjwn.jpg' },
                                { name: banners.about_chef_3?.title || 'Tom Holland', role: banners.about_chef_3?.content || 'Bếp phó', img: banners.about_chef_3?.media_url || '/storage/products/X6UH4hnQ0uC4Yh998gofsBJe5bG6LQFor2ZPXod7.jpg' },
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
