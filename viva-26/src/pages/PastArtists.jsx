import React, { useState } from 'react';
import Matchbox from '../components/PastArtist/Matchbox';
import PastArtistHeader from '../assets/PastArtist/PastArtistHeader.png';
import BackgroundImage from '../assets/PastArtist/PastArtistBackgroundImage.png';
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

    const [startIndex, setStartIndex] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const visibleCount = 3;

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

    const getVisibleArtists = () => {
        let visible = [];
        for (let i = 0; i < visibleCount; i++) {
            visible.push(artists[(startIndex + i) % artists.length]);
        }
        return visible;
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center py-10 overflow-hidden relative">

            <img
                src={BackgroundImage}
                alt="Background"
                className="absolute top-1/2 left-1/2 w-[100vh] h-[100vw] object-cover -translate-x-1/2 -translate-y-1/2 rotate-90 z-0 pointer-events-none"
            />


            <img
                src={PastArtistHeader}
                alt="Past Artist"
                className="w-[80%] max-w-2xl mb-16 z-20 drop-shadow-xl relative"
            />


            <button
                onClick={handlePrev}
                disabled={isAnimating}
                className="fixed left-8 top-1/2 -translate-y-1/2 z-30 transition-transform active:scale-95 hover:scale-105 disabled:opacity-50"
            >
                <img src={LeftButton} alt="Previous" className="w-20 h-auto" />
            </button>


            <div className="relative w-full max-w-7xl px-4 flex items-center justify-center z-20">


                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 justify-items-center w-full">
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
            </div>


            <button
                onClick={handleNext}
                disabled={isAnimating}
                className="fixed right-8 top-1/2 -translate-y-1/2 z-30 transition-transform active:scale-95 hover:scale-105 disabled:opacity-50"
            >
                <img src={RightButton} alt="Next" className="w-20 h-auto" />
            </button>


            <div className="border-8 border-[#F4D06F] rounded-3xl absolute top-4 bottom-4 left-4 right-4 pointer-events-none z-10 hidden md:block opacity-60"></div>
        </div>
    );
};

export default PastArtists;
