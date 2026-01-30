import React, { useState, useEffect } from 'react';
import DesktopGif from '../../assets/PreLoader/Main.gif';
import MobileGif from '../../assets/PreLoader/Main_Vertical.gif';


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

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <img
                src={isMobile ? MobileGif : DesktopGif}
                alt="Loading..."
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Preloader;
