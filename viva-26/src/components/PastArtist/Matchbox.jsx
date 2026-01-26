import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LeftTopCorner from '../../assets/PastArtist/LeftTopCorner.png';
import RightTopCorner from '../../assets/PastArtist/RightTopCorner.png';
import LeftBottomCorner from '../../assets/PastArtist/LeftBottomCorner.png';
import RightBottomCorner from '../../assets/PastArtist/RightBottomCorner.png';
import MatchBoxOpen from '../../assets/PastArtist/MatchBoxOpen.png';

const Matchbox = ({ color, artistName, image, delay = 0, isOpen = true }) => {
    const containerRef = useRef(null);
    const trayRef = useRef(null);

    useEffect(() => {
        if (trayRef.current) {
            gsap.to(trayRef.current, {
                y: isOpen ? '70%' : '0%',
                duration: 0.9,
                ease: 'power2.out',
                delay: isOpen ? 0.6 : 0.3, // More delay when opening (after card appears)
            });
        }
    }, [delay, isOpen]);

    return (
        <div ref={containerRef} className="relative w-full max-w-[16rem] md:max-w-[18rem] h-[24rem] sm:h-[30rem] flex justify-center shrink-0 transition-all duration-300">
            <div
                ref={trayRef}
                className="absolute w-full h-[50%] top-0 z-0 flex items-end justify-center pb-4"
                style={{
                    backgroundImage: `url(${MatchBoxOpen})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <span className="text-[#790000] rumble-brave text-lg sm:text-2xl drop-shadow-md mb-2 uppercase font-[500] text-center px-2 leading-tight">{artistName}</span>
            </div>

            {/* Three-color border frame */}
            <div
                className="absolute top-0 left-0 w-full h-[70%] z-10 p-1"
                style={{ backgroundColor: color }}
            >
                {/* Blue middle border */}
                <div className="w-full h-full p-1 bg-[#1E3A8A]">
                    {/* Yellow inner border */}
                    <div className="w-full h-full p-1 bg-[#F4D06F] relative overflow-hidden">
                        {image && (
                            <img
                                src={image}
                                alt={artistName}
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* Inner gold border decoration */}
                        <div className="absolute inset-1 border-2 border-[#F4D06F] opacity-50 z-10 pointer-events-none"></div>

                        {/* Corner Decorations */}
                        <img src={LeftTopCorner} alt="" className="absolute top-1 left-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                        <img src={RightTopCorner} alt="" className="absolute top-1 right-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                        <img src={LeftBottomCorner} alt="" className="absolute bottom-1 left-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                        <img src={RightBottomCorner} alt="" className="absolute bottom-1 right-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Matchbox;
