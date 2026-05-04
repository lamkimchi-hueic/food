import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            const data = err.response?.data;
            if (data?.errors) {
                setErrors(Object.values(data.errors).flat());
            } else if (data?.message) {
                setErrors([data.message]);
            } else {
                setErrors(['Login failed']);
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <nav className="flex items-center justify-between px-10 py-8 max-w-7xl mx-auto w-full">
                <Link to="/" className="text-[#FF6600] font-bold text-xl tracking-wider">MIX CURRY</Link>
                <div className="space-x-8 text-sm font-semibold text-gray-300 hidden md:flex">
                    <Link to="/" className="hover:text-white transition">Home</Link>
                    <Link to="/category" className="hover:text-white transition">Category</Link>
                    <Link to="/menu" className="hover:text-white transition">Product</Link>
                    <Link to="/menu" className="hover:text-white transition">Menu</Link>
                    <Link to="/blog" className="hover:text-white transition">Blog</Link>
                    <Link to="/about" className="hover:text-white transition">About Us</Link>
                </div>
                <div className="flex items-center space-x-6">
                    <Link to="/register" className="text-sm font-bold text-gray-300 hover:text-[#FF6600] transition">Register</Link>
                </div>
            </nav>

            <main className="flex-grow flex items-center justify-center px-6">
                <div className="w-full max-w-md bg-[#1A1A1E] rounded-[2rem] p-10 border border-gray-800/50 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF6600] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-gray-400 text-sm mb-8">Please enter your credentials to login.</p>

                        {errors.length > 0 && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                <ul className="list-disc pl-5">
                                    {errors.map((e, i) => <li key={i}>{e}</li>)}
                                </ul>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus className="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] transition text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-[#0F0F11] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] transition text-sm pr-12" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF6600] transition">
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="pt-2">
                                <button type="submit" disabled={loading} className="w-full bg-[#FF6600] text-black font-bold py-3.5 rounded-xl hover:bg-orange-600 transition shadow-[0_0_20px_rgba(255,102,0,0.3)] disabled:opacity-50">
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-400">
                            Don't have an account? <Link to="/register" className="text-[#FF6600] font-semibold hover:underline">Register here</Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
