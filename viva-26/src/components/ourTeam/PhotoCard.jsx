import { useLayoutEffect, useRef, useState } from 'react'
import {
    leftBorder,
    rightBorder,
    instaIcon,
    mailIcon
} from '../../assets/ourTeam'
import purpleInsta from '../../assets/ourTeam/purple_insta.png'
import purpleGmail from '../../assets/ourTeam/purple_gmail.png'
import orangeInsta from '../../assets/ourTeam/yellow_insta.png'
import orangeGmail from '../../assets/ourTeam/yellow_email.png'

const PhotoCard = ({ imageUrl, name, role, size = "normal", theme = "blue" }) => {
    const isSmall = size === "small";
    const cardRef = useRef(null);
    const [labelWidth, setLabelWidth] = useState('auto');

    const imageWidthClasses = isSmall
        ? "w-[80px] sm:w-[112px] md:w-[112px] lg:w-[138px] xl:w-[13vw] 2xl:w-[15vw]"
        : "w-[100px] sm:w-[130px] md:w-[130px] lg:w-[155px] xl:w-[15vw] 2xl:w-[18vw]";

    const bottomClasses = isSmall
        ? "-bottom-[38px] sm:-bottom-[50px] md:-bottom-[45px] lg:-bottom-[50px] xl:-bottom-[75px] 2xl:-bottom-[95px]"
        : "-bottom-[45px] sm:-bottom-[58px] md:-bottom-[54px] lg:-bottom-[58px] xl:-bottom-[90px] 2xl:-bottom-[115px]";

    const iconWidthClasses = isSmall
        ? "w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-[2.5vw] xl:h-[2.5vw] 2xl:w-[3vw] 2xl:h-[3vw]"
        : "w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-[3.2vw] xl:h-[3.2vw] 2xl:w-[3.8vw] 2xl:h-[3.8vw]";

    const nameTextSize = isSmall
        ? "text-[0.45rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] xl:text-[0.9vw] 2xl:text-[1.1vw]"
        : "text-[0.65rem] sm:text-[0.7rem] md:text-[0.85rem] lg:text-[1rem] xl:text-[1.1vw] 2xl:text-[1.3vw]";

    const roleTextSize = isSmall
        ? "text-[0.35rem] sm:text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] xl:text-[0.7vw] 2xl:text-[0.9vw]"
        : "text-[0.55rem] sm:text-[0.6rem] md:text-[0.75rem] lg:text-[0.85rem] xl:text-[0.9vw] 2xl:text-[1.1vw]";

    useLayoutEffect(() => {
        const updateWidth = () => {
            if (cardRef.current) {
                const multiplier = window.innerWidth < 640 ? 1.05 : 2.1;
                setLabelWidth(cardRef.current.offsetWidth * multiplier);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const getIcons = () => {
        if (theme === 'orange') {
            return { insta: orangeInsta, mail: orangeGmail };
        } else if (theme === 'purple') {
            return { insta: purpleInsta, mail: purpleGmail };
        }
        return { insta: instaIcon, mail: mailIcon };
    };

    const icons = getIcons();

    const getLabelClass = () => {
        const baseClass = isSmall ? 'label-pill-compact' : '';
        if (theme === 'orange') {
            return `label-pill-ticket-orange ${baseClass}`;
        } else if (theme === 'purple') {
            return `label-pill-ticket-purple ${baseClass}`;
        }
        return `label-pill-ticket ${baseClass}`;
    };

    return (
        <div className="relative flex flex-col items-center">
            <div ref={cardRef} className={`relative flex items-center bg-white p-[1.5px] sm:p-[2px] md:p-[2.5px] rounded-[12px] sm:rounded-[15px] md:rounded-[18px] shadow-xl transform transition-transform hover:scale-105`}>
                <img src={leftBorder} className="h-[96%] absolute top-[-3%] w-auto z-[2] pointer-events-none -left-3 sm:-left-4 md:-left-5 lg:-left-[24px]" alt="" />
                <div className={`${imageWidthClasses} aspect-[16/24] overflow-hidden relative rounded-[10.5px] sm:rounded-[13px] md:rounded-[16px]`}>
                    <img src={imageUrl} alt={name || "Team Member"} className="w-full h-full object-cover" />
                </div>
                <img src={rightBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -right-3 sm:-right-4 md:-right-5 lg:-right-[24px]" alt="" />
            </div>

            {(name || role) && (
                <div className={`absolute ${bottomClasses} flex items-center gap-0.5 sm:gap-1 md:gap-1.5 z-10`}>
                    <a href="#" className={`${iconWidthClasses} flex items-center justify-center transition-transform hover:scale-110`}>
                        <img src={icons.insta} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Instagram" />
                    </a>

                    <div
                        className={getLabelClass()}
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
                        <img src={icons.mail} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Email" />
                    </a>
                </div>
            )}
        </div>
    )
}

export default PhotoCard
