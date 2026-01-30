import React, { useState, useEffect, memo } from 'react';

// Lazy load GIFs only when needed to avoid blocking initial render
const Preloader = memo(({ isLoading }) => {
    const [gifKey, setGifKey] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [gifSrc, setGifSrc] = useState(null);

    useEffect(() => {
        if (isLoading) {
            setGifKey(prev => prev + 1);
        }
    }, [isLoading]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Lazy load GIF after component mounts to not block initial render
    useEffect(() => {
        const loadGif = async () => {
            if (isMobile) {
                const gif = await import('../../assets/PreLoader/Main_Vertical.gif');
                setGifSrc(gif.default);
            } else {
                const gif = await import('../../assets/PreLoader/Main.gif');
                setGifSrc(gif.default);
            }
        };
        loadGif();
    }, [isMobile]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black ${isLoading ? 'opacity-100 cursor-none' : 'opacity-0 pointer-events-none transition-opacity duration-500'}`}
        >
            {gifSrc ? (
                <img
                    key={gifKey}
                    src={gifSrc}
                    alt="Loading..."
                    className="w-full h-full object-cover"
                    decoding="async"
                />
            ) : (
                <div className="text-white text-2xl font-bold animate-pulse">Loading...</div>
            )}
        </div>
    );
});

export default Preloader;
