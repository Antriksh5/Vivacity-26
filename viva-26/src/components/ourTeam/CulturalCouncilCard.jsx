import { useLayoutEffect, useRef, useState } from 'react'
import {
    leftBorder,
    rightBorder
} from '../../assets/ourTeam'
import purpleInsta from '../../assets/ourTeam/purple_insta.png'
import purpleGmail from '../../assets/ourTeam/purple_gmail.png'

const CulturalCouncilCard = ({ imageUrl, name, role }) => {
    const cardRef = useRef(null);
    const [labelWidth, setLabelWidth] = useState('auto');

    const imageWidthClasses = "w-[85px] sm:w-[105px] md:w-[105px] lg:w-[125px] xl:w-[12vw] 2xl:w-[14vw]";

    const bottomClasses = "-bottom-[38px] sm:-bottom-[50px] md:-bottom-[45px] lg:-bottom-[50px] xl:-bottom-[75px] 2xl:-bottom-[95px]";

    const iconWidthClasses = "w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-[2.5vw] xl:h-[2.5vw] 2xl:w-[3vw] 2xl:h-[3vw]";

    const nameTextSize = "text-[0.55rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] xl:text-[0.9vw] 2xl:text-[1.1vw]";
    const roleTextSize = "text-[0.45rem] sm:text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] xl:text-[0.7vw] 2xl:text-[0.9vw]";

    useLayoutEffect(() => {
        if (cardRef.current) {
            setLabelWidth(cardRef.current.offsetWidth * 1.2);
        }
        const handleResize = () => {
            if (cardRef.current) {
                setLabelWidth(cardRef.current.offsetWidth * 1.2);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative flex flex-col items-center">
            <div ref={cardRef} className="relative flex items-center bg-white p-[1.5px] sm:p-[2px] md:p-[2.5px] rounded-[12px] sm:rounded-[15px] md:rounded-[18px] shadow-xl transition-transform hover:scale-105 duration-300">
                <img src={leftBorder} className="h-[96%] absolute top-[-3%] w-auto z-[2] pointer-events-none -left-3 sm:-left-4 md:-left-5 lg:-left-[24px]" alt="" />
                <div className={`${imageWidthClasses} aspect-[16/24] overflow-hidden relative rounded-[10.5px] sm:rounded-[13px] md:rounded-[16px]`}>
                    <img src={imageUrl} alt={name || "Cultural Council Member"} className="w-full h-full object-cover" />
                </div>
                <img src={rightBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -right-3 sm:-right-4 md:-right-5 lg:-right-[24px]" alt="" />
            </div>

            <div className={`absolute ${bottomClasses} flex items-center gap-0.5 sm:gap-1 md:gap-1.5 z-10`}>
                <a href="#" className={`${iconWidthClasses} flex items-center justify-center transition-transform hover:scale-110`}>
                    <img src={purpleInsta} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Instagram" />
                </a>

                <div
                    className="label-pill-ticket-purple label-pill-compact"
                    style={{ width: labelWidth }}
                >
                    <div className={`${nameTextSize} text-white font-semibold tracking-wider leading-[1.1] uppercase font-sans whitespace-nowrap`}>
                        {name}
                    </div>
                    <div className={`${roleTextSize} text-white/95 font-normal tracking-[0.12em] uppercase font-sans leading-tight text-center`}>
                        {role}
                    </div>
                </div>

                <a href="#" className={`${iconWidthClasses} flex items-center justify-center transition-transform hover:scale-110`}>
                    <img src={purpleGmail} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Email" />
                </a>
            </div>
        </div>
    )
}

export default CulturalCouncilCard
