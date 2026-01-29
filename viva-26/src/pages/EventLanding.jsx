import React, { useState, useEffect, useRef } from 'react';
import '../styles/EventLanding.css';
import SideBorder from '../assets/EventLanding/SideBorder.png';
import BottomBorder from '../assets/EventLanding/Bottom Border.png';
import BackgroundImage from '../assets/EventLanding/Backgound.png';
import HandImage from '../assets/EventLanding/Hand.png';
import EyesGif from '../assets/EventLanding/AakheGIF.gif';
import MusicImage from '../assets/Events/MusicEvent/First/BattleOfBands.png';
import DramaImage from '../assets/Events/DramaEvent/First/Rangshala_1.png';
import FashionImage from '../assets/EventLanding/FashionImage.jpg';
import DanceImage from '../assets/EventLanding/Dance1.jpg';
import ArtImage from '../assets/EventLanding/ArtImage.jpg';
import PhotoGraphyImage from '../assets/EventLanding/PhotoGraphyImage.jpg';
import SpeakingImage from '../assets/EventLanding/SpeakingImage.jpg';
import SocialImage from '../assets/EventLanding/SocialImage.jpg';
import ExcitingImage from '../assets/EventLanding/ExcitingImage.jpg';
import QuizEventImage from '../assets/EventLanding/QuizEvent.jpg';

const eventsData = [
    {
        id: 'dance',
        title: 'Dance Event',
        prize: '2.5 LAKH+',
        mainImage: DanceImage,
        color: '#FF1744', // Red/Pink
        subEvents: [
            'RAZZMATAZZ (GROUP DANCE)',
            'Taal Tarang (Classical Group Dance)',
            'STREET DANCE',
            'Let\'s Tangle',
            'Mudra',
            'Pump It Up'
        ]
    },
    {
        id: 'music',
        title: 'Music Event',
        prize: '1.5 LAKH+',

        mainImage: MusicImage,
        color: '#FFAB00', // Amber
        subEvents: [
            'BATTLE OF BANDS',
            'Gully War',
            'Malhaar',
            'Bandish',
            'Aaroh'
        ]
    },
    {
        id: 'drama',
        title: 'Drama Event',
        prize: '2.0 LAKH+',
        mainImage: DramaImage,
        color: '#D500F9', // Purple
        subEvents: [
            'Rangshala',
            'Hunkaar',
            'Mukhauta',
            'Paddhati'
        ]
    },
    {
        id: 'photography',
        title: 'Photography Event',
        prize: '1.5 Lakh +',
        mainImage: PhotoGraphyImage,
        color: '#FFAB00', // Amber
        subEvents: [
            'FMC',
            'Photobooth',
            'Image Hunt',
            'Pixels',
        ]

    },
    {
        id: 'fashion',
        title: 'Fashion Event',
        prize: '2.0 LAKH+',
        mainImage: FashionImage,
        color: '#00E5FF', // Cyan
        subEvents: [
            'FASHION PARADE',
            'MR & MS VIVACITY'
        ]
    },
    {
        id: 'art',
        title: 'Art Event',
        prize: '1.0 Lakh +',
        mainImage: ArtImage,
        color: '#FFAB00', // Amber
        subEvents: [
            'Tattoo Tales',
            'Splash',
            'Eclectic',
            'Hue-niverse',
            'Contrasto',

        ]

    },
    {
        id: 'Speaking',
        title: 'Speaking Event',
        prize: '1.0 Lakh +',
        mainImage: SpeakingImage,
        color: '#FFAB00', // Amber
        subEvents: [
            'Duologue',
            'Family Feud',
            'Potpourii',
            'Dare to Spell',
            'Spotlight',
            'Afreen',
            'Open Discussion'

        ]


    },
    {
        id: 'Social',
        title: 'Social Event',
        mainImage: SocialImage,
        color: '#FFAB00', // Amber
        subEvents: [
            'Sahyog',

        ]


    },
    {
        id: 'Quizzing',
        title: 'Quizzing Event',
        prize: '20K +',
        mainImage: QuizEventImage,
        color: '#FFAB00', // Amber
        subEvents: [
            'Bamboozled',
            'Movie Auction',

        ]


    },
    {
        id: 'Exciting',
        title: 'Exciting Event',
        mainImage: ExcitingImage,
        color: '#FFAB00', // Amber
        subEvents: [
            'Prom Night',
            'Silent Disco',
            'Jamming Night',
            'Stage Spectrum',


        ]


    }

];

const EventLanding = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const border = '#fddec0';

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % eventsData.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length);
    };

    // Auto-scroll functionality
    const handleNextRef = useRef(handleNext);
    handleNextRef.current = handleNext;

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextRef.current();
        }, 3500);
        return () => clearInterval(interval);
    }, [activeIndex]);

    // Touch swipe handlers for mobile
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) handleNext();
        if (isRightSwipe) handlePrev();
    };

    const currentEvent = eventsData[activeIndex];

    // Dynamic title size based on length
    const getTitleSize = (title) => {
        const length = title.length;
        if (length <= 8) return 'text-4xl md:text-5xl';
        if (length <= 12) return 'text-4xl md:text-5xl';
        if (length <= 16) return 'text-4xl md:text-4xl';
        return 'text-2xl md:text-3xl';
    };

    return (
        <div
            className='w-full h-screen overflow-x-hidden overflow-y-hidden flex items-center justify-center duration-300 p-1'
            style={{ backgroundColor: border }}
        >
            <div
                className='relative w-full  h-full stamp-border-past p-[2vh] md:p-[4vh] flex flex-col items-center '
                style={{ '--stamp-color': border, backgroundColor: '#692A40' }}
            >
                <div className="stamp-inner-line-past z-30 pointer-events-none"></div>

                {/* Background Pattern */}
                <div className="absolute inset-[14px] md:inset-[25px] lg:inset-[28px] rounded-[1rem] md:rounded-[1.3rem] lg:rounded-[2rem] overflow-hidden z-0">
                    <img
                        src={BackgroundImage}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 w-[80%] md:w-[60%] h-full flex flex-col items-center gap-[2vh] md:gap-[3vh]">

                    {/* Main Title */}
                    <h1
                        className="rumble-brave text-[7vh] md:text-[10vh] lg:text-[13vh] text-center tracking-widest drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)] transform -rotate-1"
                        style={{
                            color: '#F7A219',
                            textShadow: '3px 3px 0px white'
                        }}
                    >
                        EVENTS
                    </h1>

                    {/* Content Container */}
                    <div
                        className="w-full lg:w-[90%] bg-black border-4 border-white flex flex-col lg:flex-row-reverse relative flex-grow h-0 lg:mb-[6vh]"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >

                        {/* RIGHT CONTENT (First on Mobile, Right on Desktop via row-reverse) */}
                        <div className="w-full lg:w-2/3 flex flex-col relative h-full">

                            {/* Header & Prize Grid Wrapper */}
                            <div className="flex bg-black relative z-20">

                                {/* LEFT COLUMN: Title (Top) + Prize (Bottom) */}
                                <div className="flex-grow flex flex-col min-w-0 overflow-hidden">

                                    {/* Row 1: Event Title */}
                                    <div className="h-[8vh] md:h-[9vh] flex items-center justify-center overflow-hidden bg-black  relative">
                                        <h2
                                            className={`w-full text-center ${getTitleSize(currentEvent.title)} rumble-brave md:pb-[0.7vh] lg:pb-[2vh] tracking-widest  leading-none whitespace-nowrap`}
                                            style={{
                                                color: currentEvent.color,
                                                textShadow: '1px 0px 0 #7B02E7'
                                            }}
                                        >
                                            {currentEvent.title}
                                        </h2>
                                    </div>

                                    {/* Row 2: Prize Bar */}
                                    <div className="h-[6vh] md:h-[9vh] lg:h-[10vh] flex bg-gray-900">
                                        {/* Left: Hand + Text */}
                                        <div className="bg-[#FD9F19] flex items-center relative overflow-hidden w-1/2">
                                            {/* Hand Image */}
                                            <img
                                                src={HandImage}
                                                alt="Hand"
                                                className="h-[110%] w-[40%] md:w-[50%] lg:w-[60%] object-contain mix-blend-multiply -ml-2 md:-ml-4 lg:-ml-6"
                                            />

                                            {/* Prize Text */}
                                            <div className="flex flex-col justify-center leading-none text-[#5C1A4E] rumble-brave text-[2vh] md:text-[3vh] lg:text-[4vh] tracking-widest lg:p-4 z-10 relative ">
                                                <span>PRIZE</span>
                                                <span className="text-[2.5vh] md:text-[3vh] lg:text-[4vh] ">WORTH</span>
                                            </div>
                                        </div>

                                        {/* Right: Amount */}
                                        <div className="bg-[#7B02E7] text-white w-1/2 flex items-center justify-center font-bold text-[2.5vh] md:text-[3vh] lg:text-[5vh] tracking-widest uppercase rumble-brave whitespace-nowrap px-2">
                                            {currentEvent.prize}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: Desktop Navigation Arrows (Hidden on Mobile) */}
                                <div className="hidden lg:flex w-[10vw] flex-shrink-0 bg-[#FFAB00] flex-col items-center justify-center gap-[1vh] relative overflow-hidden">
                                    {/* Left ZigZag Border Asset */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[1.5vw] z-10">
                                        <img src={SideBorder} alt="Border" className="w-full h-full object-cover" />
                                    </div>

                                    {/* Right ZigZag Border Asset */}
                                    <div className="absolute right-0 top-0 bottom-0 w-[1.5vw] z-10">
                                        <img src={SideBorder} alt="Border" className="w-full h-full object-cover " />
                                    </div>

                                    {/* Bottom Border Asset */}
                                    <div className="absolute left-0 right-0 bottom-0 h-[3vh] z-10">
                                        <img src={BottomBorder} alt="Border" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex gap-[2vh] z-20">
                                        <button
                                            onClick={handlePrev}
                                            className="w-[5vh] h-[5vh] md:w-[6vh] md:h-[6vh] rounded-full bg-[#F7A219] border-[5px] border-[#7B02E7] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="#7B02E7" className="w-[3vh] h-[3vh] md:w-[4vh] md:h-[4vh]">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="w-[5vh] h-[5vh] md:w-[6vh] md:h-[6vh] rounded-full bg-[#FFAB00] border-[5px] border-[#7B02E7] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="#7B02E7" className="w-[3vh] h-[3vh] md:w-[4vh] md:h-[4vh]">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Main Event Image */}
                            <div className="relative flex-grow h-0 overflow-hidden group">
                                <img
                                    src={currentEvent.mainImage}
                                    alt={currentEvent.title}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                            </div>
                        </div>

                        {/* LEFT SIDEBAR: Sub-events List (Second on Mobile, Left on Desktop via row-reverse) */}
                        <div className="w-full lg:w-1/3 bg-[#6A1B9A] lg:border-r-4 border-black flex flex-col relative  custom-scrollbar pt-[0.1vh]">
                            {/* Zigzag decoration top/bottom if desired, keeping simple for now */}

                            <div className="flex-grow p-[1vh] md:p-[1vh] lg:p-[2vh] w-full flex flex-col justify-center gap-[0.5vh] md:gap-[1vh] lg:gap-[2vh]">
                                <ul className="space-y-[0.05vh] md:space-y-[0.2vh] lg:space-y-[2vh] text-white w-full">
                                    {currentEvent.subEvents.map((event, idx) => (
                                        <li key={idx} className={`flex items-start text-[1.5vh] sm:text-[2.2vh] md:text-[1.6vh] lg:text-[2vh] tracking-wider ${idx >= 4 ? 'hidden lg:flex' : ''}`}>
                                            <span className="mr-[0.5vw] text-[1.5vh]">•</span>
                                            <span className="uppercase">{event}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Desktop "Know More" Button Area (Hidden on Mobile) */}
                            <div className="hidden lg:flex relative h-[12vh] lg:h-[16vh] bg-[#FE55B2] border-t-4 border-black flex-col items-center justify-between p-0 overflow-hidden cursor-pointer group">
                                <div className="w-full h-[60%] relative overflow-hidden">
                                    <img
                                        src={EyesGif}
                                        alt="Eyes"
                                        className="w-full h-full object-cover scale-125"
                                    />
                                </div>
                                <div className="w-full bg-[#FE55B2] pb-[1vh] flex justify-center items-center z-10">
                                    <span className="font-bold  lg:text-[5vh] text-white tracking-widest rumble-brave uppercase leading-none text-center w-full">
                                        KNOW MORE
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* MOBILE FOOTER: Know More + Navigation (Visible only on Mobile) */}
                        <div className="flex lg:hidden w-full border-t-4 border-black h-[10vh]">
                            {/* Know More Button */}
                            <div className="w-1/2 bg-[#FE55B2] border-r-4 border-black flex flex-col items-center justify-between relative overflow-hidden cursor-pointer">
                                <div className="w-full h-[60%] overflow-hidden">
                                    <img src={EyesGif} alt="Eyes" className="w-full h-full object-cover scale-150" />
                                </div>
                                <div className="w-full h-[40%] flex items-center justify-center bg-[#FE55B2]">
                                    <span className="font-bold text-[2vh] md:text-[2.4vh] lg:text-[4vh] text-white drop-shadow-[1px_1px_0_#000] tracking-widest rumble-brave uppercase leading-none">
                                        KNOW MORE
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="w-1/2 bg-[#FFAB00] flex items-center justify-center gap-3 md:gap-4 relative overflow-hidden">
                                <div className="flex gap-3 md:gap-4 z-10">
                                    <button onClick={handlePrev} className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#FFAB00] border-[4px] md:border-[5px] border-[#7B02E7] flex items-center justify-center active:scale-95 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="#7B02E7" className="w-6 h-6 md:w-8 md:h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                        </svg>
                                    </button>
                                    <button onClick={handleNext} className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#FFAB00] border-[4px] md:border-[5px] border-[#7B02E7] flex items-center justify-center active:scale-95 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="#7B02E7" className="w-6 h-6 md:w-8 md:h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
};

export default EventLanding;

