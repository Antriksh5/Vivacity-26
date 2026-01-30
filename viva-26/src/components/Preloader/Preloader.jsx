import React, { useState, useEffect, memo } from 'react';
import { S3Assets } from '../../utils/cloudinaryUrls';

// CDN-hosted preloader GIFs from AWS S3
const MainGif = S3Assets.mainGif;
const MainVerticalGif = S3Assets.mainVerticalGif;

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
