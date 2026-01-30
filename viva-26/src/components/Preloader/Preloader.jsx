import React, { useState, useEffect, memo } from 'react';

// Import GIFs directly for faster bundling (Vite will optimize)
import MainGif from '../../assets/PreLoader/Main.gif';
import MainVerticalGif from '../../assets/PreLoader/Main_Vertical.gif';

const Preloader = memo(({ isLoading }) => {
    const [gifKey, setGifKey] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Force GIF restart when loading state changes
    useEffect(() => {
        if (isLoading) {
            setGifKey(prev => prev + 1);
        }
    }, [isLoading]);

    // Check for mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Select appropriate GIF based on device
    const gifSrc = isMobile ? MainVerticalGif : MainGif;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black ${
                isLoading ? 'opacity-100 cursor-none' : 'opacity-0 pointer-events-none transition-opacity duration-500'
            }`}
        >
            <img
                key={gifKey}
                src={gifSrc}
                alt="Loading..."
                className="w-full h-full object-cover"
                decoding="async"
                fetchPriority="high"
            />
        </div>
    );
});

export default Preloader;
