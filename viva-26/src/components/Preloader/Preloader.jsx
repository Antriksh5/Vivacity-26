import React, { useState, useEffect } from 'react';
import DesktopGif from '../../assets/PreLoader/Main.gif';
import MobileGif from '../../assets/PreLoader/Main_Vertical.gif';
import './Preloader.css';

const Preloader = ({ isLoading }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        checkMobile();

        // Add listener
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black animate-fade-in">
            <img
                src={isMobile ? MobileGif : DesktopGif}
                alt="Loading..."
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Preloader;
