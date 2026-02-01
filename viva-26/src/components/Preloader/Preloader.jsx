import React, { useState, useEffect, memo, useRef } from 'react';
import { S3Assets } from '../../utils/cloudinaryUrls';
import loaderAudio from '../../assets/PreLoader/loader.mp3';

// CDN-hosted preloader GIFs from AWS S3
const MainGif = S3Assets.mainGif;
const MainVerticalGif = S3Assets.mainVerticalGif;

// Create a singleton audio instance outside the component to keep it alive across renders
const globalAudio = new Audio(loaderAudio);
globalAudio.preload = 'auto';

const Preloader = memo(({ isLoading }) => {
    const [gifKey, setGifKey] = useState(0);

    // Force GIF restart
    useEffect(() => {
        if (isLoading) {
            setGifKey(prev => prev + 1);
        }
    }, [isLoading]);

    // Attempt Playback
    useEffect(() => {
        if (isLoading) {
            globalAudio.currentTime = 0;
            globalAudio.play().catch(() => {
                // Silently fails if blocked, waiting for interaction fallback below
            });
        } else {
            globalAudio.pause();
            globalAudio.currentTime = 0;
        }
    }, [isLoading]);

    // THE "AUTO-UNBLOCKER"
    // This triggers sound on ANY movement (mouse, scroll, touch) 
    // satisfies the browser's 'user gesture' requirement without a forced click.
    useEffect(() => {
        const unblockAudio = () => {
            if (isLoading && globalAudio.paused) {
                globalAudio.play().catch(() => { });
            }
        };

        if (isLoading) {
            const events = ['mousedown', 'mousemove', 'touchstart', 'scroll', 'wheel', 'keydown'];
            events.forEach(e => window.addEventListener(e, unblockAudio, { once: true }));

            return () => {
                events.forEach(e => window.removeEventListener(e, unblockAudio));
            };
        }
    }, [isLoading]);

    // Responsive Check
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const gifSrc = isMobile ? MainVerticalGif : MainGif;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${isLoading ? 'opacity-100 cursor-none' : 'opacity-0 pointer-events-none'
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
