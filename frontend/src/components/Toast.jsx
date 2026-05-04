import { useState, useEffect } from 'react';

let showToastFn = null;

export function toast(message) {
    if (showToastFn) showToastFn(message);
}

export default function ToastContainer() {
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        showToastFn = (message) => {
            setMsg(message);
            setTimeout(() => setMsg(null), 2500);
        };
        return () => { showToastFn = null; };
    }, []);

    if (!msg) return null;

    return (
        <div className="fixed bottom-10 right-10 bg-[#FF6600] text-black px-8 py-4 rounded-2xl shadow-[0_10px_40px_rgba(255,102,0,0.3)] z-[9999] font-bold transform transition-all duration-500 hover:scale-105 border border-white/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                <span>{msg}</span>
            </div>
        </div>
    );
}
