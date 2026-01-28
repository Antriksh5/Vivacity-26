import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LeftTopCorner from '../../assets/PastArtist/LeftTopCorner.png';
import RightTopCorner from '../../assets/PastArtist/RightTopCorner.png';
import LeftBottomCorner from '../../assets/PastArtist/LeftBottomCorner.png';
import RightBottomCorner from '../../assets/PastArtist/RightBottomCorner.png';
import MatchBoxOpen from '../../assets/PastArtist/MatchBoxOpen.png';

const Matchbox = ({ color1, color2, color3, artistName, image, delay = 0, isOpen = true, corners }) => {
    const containerRef = useRef(null);
    const trayRef = useRef(null);

    // Dynamic font size based on name length
    const getNameFontSize = (name) => {
        const length = name.length;
        if (length <= 6) return 'text-2xl sm:text-4xl'; // Very short names (e.g., "Kullu", "Ritviz")
        if (length <= 10) return 'text-xl sm:text-3xl'; // Short names (e.g., "Asees Kaur")
        if (length <= 14) return 'text-lg sm:text-2xl'; // Medium names (e.g., "Amit Trivedi")
        return 'text-base sm:text-xl'; // Longer names (e.g., "Mohit Chauhan")
    };

    const {
        topLeft = LeftTopCorner,
        topRight = RightTopCorner,
        bottomLeft = LeftBottomCorner,
        bottomRight = RightBottomCorner
    } = corners || {};

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
        <div ref={containerRef} className="relative w-full max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem] h-[19rem] sm:h-[30rem] flex justify-center shrink-0 transition-all duration-300">
            <div
                ref={trayRef}
                className="absolute w-full h-[50%] top-0 z-0 flex items-end justify-center pb-4"
                style={{
                    backgroundImage: `url(${MatchBoxOpen})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <span className={`text-[#790000] rumble-brave ${getNameFontSize(artistName)} drop-shadow-md md:mb-1 uppercase font-[500] text-center px-2 leading-tight`}>{artistName}</span>
            </div>

            {/* Three-color border frame */}
            <div
                className="absolute top-0 left-0 w-full h-[70%] z-10 p-1 border-3 border-black "
                style={{ backgroundColor: color1 }}
            >
                <div className="w-full h-full p-1 border-3 border-white"
                    style={{
                        backgroundColor: color2,
                        position: !color3 ? 'relative' : undefined,
                        overflow: !color3 ? 'hidden' : undefined
                    }}>

                    {color3 ? (
                        <div className="w-full h-full p-1 relative overflow-hidden border-3 border-black"
                            style={{ backgroundColor: color3 }}>
                            {image && (
                                <img
                                    src={image}
                                    alt={artistName}
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute inset-1 opacity-50 z-10 pointer-events-none"></div>
                            <img src={topLeft} alt="" className="absolute top-1 left-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                            <img src={topRight} alt="" className="absolute top-1 right-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                            <img src={bottomLeft} alt="" className="absolute bottom-1 left-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                            <img src={bottomRight} alt="" className="absolute bottom-1 right-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                        </div>
                    ) : (
                        <>
                            {image && (
                                <img
                                    src={image}
                                    alt={artistName}
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute inset-1 opacity-50 z-10 pointer-events-none"></div>
                            <img src={topLeft} alt="" className="absolute top-1 left-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                            <img src={topRight} alt="" className="absolute top-1 right-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                            <img src={bottomLeft} alt="" className="absolute bottom-1 left-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                            <img src={bottomRight} alt="" className="absolute bottom-1 right-1 w-8 h-8 sm:w-12 sm:h-12 z-20" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Matchbox;
