import React, { useState, useEffect } from 'react';
import '../styles/PastArtist.css';
import Matchbox from '../components/PastArtist/Matchbox';
import PastArtistHeader from '../assets/PastArtist/PastArtistHeader.png';
import BackgroundImage from '../assets/PastArtist/PastArtistBackGround.png';
import LeftButton from '../assets/PastArtist/LeftButton.png';
import RightButton from '../assets/PastArtist/RightButton.png';

// Import Artist Images
import AmitTrivedi from '../assets/PastArtist/AmitTrivedi.png';
import DarshanRaval from '../assets/PastArtist/DarshanRaval.png';
import JubinNautyal from '../assets/PastArtist/JubinNautyal.jpg';
import MohitChauhan from '../assets/PastArtist/MohitChauhan.png';
import AssesKaur from '../assets/PastArtist/AssesKaur.png';
import Kullu from '../assets/PastArtist/Kullu.png';
import Ritviz from '../assets/PastArtist/Ritviz.png';

const PastArtists = () => {
    console.log("PastArtists Component Rendered");
    const artists = [
        { name: 'Amit Trivedi', color: '#E85F24', image: AmitTrivedi },
        { name: 'Darshan Raval', color: '#C01579', image: DarshanRaval },
        { name: 'Jubin Nautyal', color: '#00A98F', image: JubinNautyal },
        { name: 'Mohit Chauhan', color: '#E85F24', image: MohitChauhan },
        { name: 'Asees Kaur', color: '#C01579', image: AssesKaur },
        { name: 'Kullu', color: '#00A98F', image: Kullu },
        { name: 'Ritviz', color: '#E85F24', image: Ritviz },
    ];

    const getVisibleArtists = () => {
        let visible = [];
        for (let i = 0; i < visibleCount; i++) {
            visible.push(artists[(startIndex + i) % artists.length]);
        }
        return visible;
    };

    const [startIndex, setStartIndex] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setVisibleCount(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCount(2);
            } else {
                setVisibleCount(3);
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavigation = (direction) => {
        if (isAnimating) return; // Prevent clicks during animation

        setIsAnimating(true);
        setIsDrawerOpen(false); // Close drawer first

        setTimeout(() => {
            if (direction === 'next') {
                setStartIndex((prev) => (prev + 1) % artists.length);
            } else {
                setStartIndex((prev) => (prev - 1 + artists.length) % artists.length);
            }

            setTimeout(() => {
                setIsDrawerOpen(true);
                setIsAnimating(false);
            }, 100);
        }, 1500);
    };

    const handleNext = () => handleNavigation('next');
    const handlePrev = () => handleNavigation('prev');

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe || isRightSwipe) {
            if (isLeftSwipe) handleNext();
            else handlePrev();
        }
    };

    const border = '#fddec0';

    return (
        <div
            className='p-2 sm:p-3 md:p-4 w-full min-h-screen transition-colors duration-300'
            style={{ backgroundColor: border }}
        >
            {/* Stamp Border Wrapper */}
            <div
                className='relative w-full min-h-[calc(80vh-2rem)] md:min-h-[calc(80vh-5rem)] stamp-border-past p-5 md:p-7 flex flex-col'
                style={{ '--stamp-color': border, backgroundColor: '#787E3C' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="stamp-inner-line-past z-30"></div>

                {/* Inner Content Container */}
                <div className='relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col grow z-20'>
                    {/* Background Image inside inner container */}
                    <img
                        src={BackgroundImage}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-40"
                    />

                    <div className="relative z-10 flex flex-col items-center py-4 md:py-8 w-full h-full">

                        <img
                            src={PastArtistHeader}
                            alt="Past Artist"
                            className="w-full max-w-[200px] md:max-w-lg mb-8 z-20 drop-shadow-xl relative"
                        />


                        <div className="relative w-full max-w-7xl px-4 flex items-center justify-center z-20">
                            <button
                                onClick={handlePrev}
                                disabled={isAnimating}
                                className="absolute left-1 sm:left-2 md:left-5 top-1/2 -translate-y-1/2 z-30 transition-transform active:scale-95 hover:scale-105 disabled:opacity-50"
                            >
                                <img src={LeftButton} alt="Previous" className="w-10 sm:w-12 md:w-16 h-auto" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 px-12 md:px-20 justify-items-center w-full">
                                {getVisibleArtists().map((artist, index) => (
                                    <Matchbox
                                        key={`${artist.name}-${startIndex}-${index}`}
                                        artistName={artist.name}
                                        color={artist.color}
                                        image={artist.image}
                                        delay={index * 0.15}
                                        isOpen={isDrawerOpen}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={isAnimating}
                                className="absolute right-1 sm:right-2 md:right-5 top-1/2 -translate-y-1/2 z-30 transition-transform active:scale-95 hover:scale-105 disabled:opacity-50"
                            >
                                <img src={RightButton} alt="Next" className="w-10 sm:w-12 md:w-16 h-auto" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PastArtists;
