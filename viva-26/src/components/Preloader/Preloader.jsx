import React, { useState, useEffect, memo, useRef } from 'react';
import MainVideo from '../../assets/PreLoader/Main.mp4';
import MainVerticalVideo from '../../assets/PreLoader/Main_Vertical.mp4';

const Preloader = memo(({ isLoading }) => {
    const videoRef = useRef(null);

    // Video playback control
    useEffect(() => {
        if (videoRef.current) {
            if (isLoading) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => {});
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isLoading]);

    // Responsive Check
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const videoSrc = isMobile ? MainVerticalVideo : MainVideo;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${isLoading ? 'opacity-100 cursor-none' : 'opacity-0 pointer-events-none'
                }`}
        >
            <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
            />
        </div>
    );
});

export default Preloader;
