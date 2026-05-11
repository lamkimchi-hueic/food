import { useState, useEffect } from 'react';

let showToastFn = null;

export function toast(message, type = 'success') {
    if (showToastFn) showToastFn(message, type);
}

export default function ToastContainer() {
    const [data, setData] = useState(null);

    useEffect(() => {
        showToastFn = (message, type) => {
            setData({ message, type });
            setTimeout(() => setData(null), 3500);
        };
        return () => { showToastFn = null; };
    }, []);

    if (!data) return null;

    const isError = data.type === 'error';

    return (
        <div className={`fixed bottom-10 right-10 ${isError ? 'bg-red-600' : 'bg-green-600'} text-white px-8 py-4 rounded-2xl shadow-2xl z-[9999] font-bold transform animate-bounce transition-all duration-500 hover:scale-105 border border-white/20 backdrop-blur-sm`}>
            <div className="flex items-center space-x-3">
                {isError ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                )}
                <span>{data.message}</span>
            </div>
        </div>
    );
}
