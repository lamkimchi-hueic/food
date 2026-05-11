export default function Footer() {
    return (
        <footer className="bg-[#0A0A0B] text-white pt-20 pb-10 border-t border-gray-800/30">
            <div className="max-w-7xl mx-auto px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="col-span-1 lg:col-span-1">
                        <h2 className="text-2xl font-black tracking-tighter mb-6 uppercase">NOCTURNAL<br />KITCHEN</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
                            Tái định nghĩa trải nghiệm ăn uống kỹ thuật số thông qua nghệ thuật kể chuyện và bữa tiệc thị giác.
                        </p>
                        <div className="flex space-x-4 text-gray-400">
                            <a href="#" className="hover:text-[#FF6600] transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                            </a>
                            <a href="#" className="hover:text-[#FF6600] transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                            </a>
                            <a href="#" className="hover:text-[#FF6600] transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Links - Manifesto */}
                    <div>
                        <h3 className="text-[#FF6600] text-xs font-black uppercase tracking-[0.2em] mb-8">Tuyên ngôn</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Nhật ký</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Chuỗi đầu bếp</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Lớp học chuyên sâu</a></li>
                        </ul>
                    </div>

                    {/* Links - Connect */}
                    <div>
                        <h3 className="text-[#FF6600] text-xs font-black uppercase tracking-[0.2em] mb-8">Kết nối</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Chính sách bảo mật</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Điều khoản dịch vụ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Thông tin vận chuyển</a></li>
                        </ul>
                    </div>

                    {/* Links - Explore */}
                    <div>
                        <h3 className="text-[#FF6600] text-xs font-black uppercase tracking-[0.2em] mb-8">Khám phá</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Tuyển dụng</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Sơ đồ trang</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Bộ báo chí</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-gray-800/30 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                    <p>&copy; 2026 NOCTURNAL KITCHEN EDITORIAL. BẢO LƯU MỌI QUYỀN.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition">Instagram</a>
                        <a href="#" className="hover:text-white transition">Pinterest</a>
                        <a href="#" className="hover:text-white transition">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

