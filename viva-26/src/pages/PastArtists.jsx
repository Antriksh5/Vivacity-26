import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/PastArtist.css';
import Matchbox from '../components/PastArtist/Matchbox';
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
// Import Corner Images
import TopLeftCornerPurple from '../assets/PastArtist/TopLeftCornerPurple.png';
import TopRightCornerPurple from '../assets/PastArtist/TopRightCornerPurple.png';
import BottomLeftCornerPurple from '../assets/PastArtist/BottomLeftCornerPurple.png';
import BottomRightCornerPurple from '../assets/PastArtist/BottomRightCornerPurple.png';

import TopLeftCornerYellow from '../assets/PastArtist/TopLeftCornerYellow.png';
import TopRightCornerYellow from '../assets/PastArtist/TopRightCornerYellow.png';
import BottomLeftCornerYellow from '../assets/PastArtist/BottomLeftCornerYellow.png';
import BottomRightCornerYellow from '../assets/PastArtist/BottomRightCornerYellow.png';

import LeftTopCorner from '../assets/PastArtist/LeftTopCorner.png';
import RightTopCorner from '../assets/PastArtist/RightTopCorner.png';
import LeftBottomCorner from '../assets/PastArtist/LeftBottomCorner.png';
import RightBottomCorner from '../assets/PastArtist/RightBottomCorner.png';
import Raftaar from '../assets/PastArtist/Raftaar.jpg';
const PastArtists = () => {
    console.log("PastArtists Component Rendered");
    const artists = [
        {
            name: 'Amit Trivedi',
            color1: '#D91472',
            color2: '#FBC43F',
            color3: '#F75D02',
            image: AmitTrivedi,
            corners: {
                topLeft: LeftTopCorner,
                topRight: RightTopCorner,
                bottomLeft: LeftBottomCorner,
                bottomRight: RightBottomCorner
            }
        },
        {
            name: 'Raftaar',
            color1: '#F75D02',
            color2: '#FBC43F',
            image: Raftaar,
            corners: {
                topLeft: TopLeftCornerYellow,
                topRight: TopRightCornerYellow,
                bottomLeft: BottomLeftCornerYellow,
                bottomRight: BottomRightCornerYellow
            }
        },
        {
            name: 'Jubin Nautyal',
            color1: '#00CA91',
            color2: '#FBC43F',
            image: JubinNautyal,
            corners: {
                topLeft: TopLeftCornerPurple,
                topRight: TopRightCornerPurple,
                bottomLeft: BottomLeftCornerPurple,
                bottomRight: BottomRightCornerPurple
            }
        },
        {
            name: 'Darshan Raval',
            color1: '#D91472',
            color2: '#FBC43F',
            color3: '#F75D02',
            image: DarshanRaval,
            corners: {
                topLeft: LeftTopCorner,
                topRight: RightTopCorner,
                bottomLeft: LeftBottomCorner,
                bottomRight: RightBottomCorner
            }
        },
        {
            name: 'Mohit Chauhan',
            color1: '#00CA91',
            color2: '#FBC43F',
            image: MohitChauhan,
            corners: {
                topLeft: TopLeftCornerPurple,
                topRight: TopRightCornerPurple,
                bottomLeft: BottomLeftCornerPurple,
                bottomRight: BottomRightCornerPurple
            }
        },
        {
            name: 'Asees Kaur',
            color1: '#F75D02',
            color2: '#FBC43F',
            image: AssesKaur,
            corners: {
                topLeft: TopLeftCornerYellow,
                topRight: TopRightCornerYellow,
                bottomLeft: BottomLeftCornerYellow,
                bottomRight: BottomRightCornerYellow
            }
        },
        {
            name: 'Kullu',
            color1: '#D91472',
            color2: '#FBC43F',
            color3: '#F75D02',
            image: Kullu,
            corners: {
                topLeft: LeftTopCorner,
                topRight: RightTopCorner,
                bottomLeft: LeftBottomCorner,
                bottomRight: RightBottomCorner
            }
        },
        {
            name: 'Ritviz',
            color1: '#00CA91',
            color2: '#FBC43F',
            image: Ritviz,
            corners: {
                topLeft: TopLeftCornerPurple,
                topRight: TopRightCornerPurple,
                bottomLeft: BottomLeftCornerPurple,
                bottomRight: BottomRightCornerPurple
            }
        },
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
    const gridRef = useRef(null);
    const directionRef = useRef('next');

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

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavigation = (direction) => {
        if (isAnimating) return;

        setIsAnimating(true);
        directionRef.current = direction;
        setIsDrawerOpen(false);

        setTimeout(() => {
            const xOffset = direction === 'next' ? -50 : 50;

            if (gridRef.current) {
                gsap.to(gridRef.current, {
                    x: xOffset,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => {
                        if (direction === 'next') {
                            setStartIndex((prev) => (prev + visibleCount) % artists.length);
                        } else {
                            setStartIndex((prev) => (prev - visibleCount + artists.length) % artists.length);
                        }
                    }
                });
            }
        }, 900);
    };

    useEffect(() => {
        if (isAnimating && gridRef.current) {
            const xStart = directionRef.current === 'next' ? 50 : -50;
            gsap.fromTo(gridRef.current, {
                x: xStart,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                    setIsDrawerOpen(true);
                    setIsAnimating(false);
                }
            });
        }
    }, [startIndex]);

    const handleNext = () => handleNavigation('next');
    const handlePrev = () => handleNavigation('prev');

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
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
            className='w-full h-screen overflow-hidden flex justify-center items-center p-1 transition-colors duration-300'
            style={{ backgroundColor: border }}
        >

            <div
                className='relative w-full max-w-[100vw] h-[calc(100vh-2rem)] max-h-[100vh] stamp-border-past p-5 md:p-7 flex flex-col box-border'
                style={{ '--stamp-color': border, backgroundColor: '#787E3C' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="stamp-inner-line-past z-30"></div>

                <div className='relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col grow z-20  sm:pt-10 md:pt-0'>
                    <img
                        src={BackgroundImage}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-40"
                    />

                    <div className="relative z-10 flex flex-col items-center py-2 md:py-4 w-full h-full">

                        <h1
                            className="rumble-brave text-5xl sm:text-6xl md:text-8xl mb-[6vh] lg:mb-[10vh] z-20 relative text-center tracking-wider"
                            style={{
                                color: '#FFD900',
                                textShadow: '3px 3px 0px #FF8000, 6px 6px 0px rgba(0,0,0,0.2)'
                            }}
                        >
                            PAST ARTISTS
                        </h1>


                        <div className="relative w-full max-w-7xl px-4 flex items-center justify-center z-20">

                            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 px-12 md:px-20 justify-items-center w-full">
                                {getVisibleArtists().map((artist, index) => (
                                    <Matchbox
                                        key={`${artist.name}-${startIndex}-${index}`}
                                        artistName={artist.name}
                                        color1={artist.color1}
                                        color2={artist.color2}
                                        color3={artist.color3}
                                        image={artist.image}
                                        corners={artist.corners}
                                        delay={index * 0.15}
                                        isOpen={isDrawerOpen}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>

                    <button
                        onClick={handlePrev}
                        disabled={isAnimating}
                        className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-40 transition-transform active:scale-95 hover:scale-105 disabled:opacity-50"
                    >
                        <img src={LeftButton} alt="Previous" className="w-10 sm:w-12 md:w-16 h-auto" />
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={isAnimating}
                        className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-40 transition-transform active:scale-95 hover:scale-105 disabled:opacity-50"
                    >
                        <img src={RightButton} alt="Next" className="w-10 sm:w-12 md:w-16 h-auto" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PastArtists;
