import { useRef } from 'react'
import {
    leftBorder,
    rightBorder
} from '../../assets/ourTeam'
import purpleInsta from '../../assets/ourTeam/purple_insta.png'
import purpleGmail from '../../assets/ourTeam/purple_gmail.png'

const CulturalCouncilCard = ({ imageUrl, name, role, instagram, email }) => {
    const cardRef = useRef(null);

    const imageWidthClasses = "w-[24vw] sm:w-[20vw] md:w-[18vw] lg:w-[12vw] xl:w-[11.5vw] 2xl:w-[13vw]";

    const bottomClasses = "-bottom-[32px] min-[370px]:max-[450px]:-bottom-[44px] sm:-bottom-[58px] md:-bottom-[58px] lg:-bottom-[48px] xl:-bottom-[75px] 2xl:-bottom-[95px]";

    const iconWidthClasses = "w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-[2.5vw] xl:h-[2.5vw] 2xl:w-[3vw] 2xl:h-[3vw]";

    const nameTextSize = "text-[0.6rem] sm:text-[0.75rem] md:text-[0.9rem] lg:text-[1.05rem] xl:text-[1.15vw] 2xl:text-[1.4vw]";
    const roleTextSize = "text-[0.35rem] sm:text-[0.45rem] md:text-[0.55rem] lg:text-[0.6rem] xl:text-[0.55vw] 2xl:text-[0.75vw]";



    const isLongName = name && name.length >= 11;
    const nameDisplaySize = isLongName
        ? "text-[0.5rem] sm:text-[0.65rem] md:text-[0.75rem] lg:text-[0.85rem] xl:text-[0.95vw] 2xl:text-[1.25vw]"
        : nameTextSize;

    return (
        <div className="relative flex flex-col items-center">
            <div ref={cardRef} className="relative flex items-center bg-white p-[1.5px] sm:p-[2px] md:p-[2.5px] rounded-[12px] sm:rounded-[15px] md:rounded-[18px] shadow-xl transition-transform hover:scale-105 duration-300">
                <img src={leftBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -left-3 sm:-left-4 md:-left-5 lg:-left-[24px]" alt="" />
                <div className={`${imageWidthClasses} aspect-[16/24] overflow-hidden relative rounded-[10.5px] sm:rounded-[13px] md:rounded-[16px]`}>
                    <img src={imageUrl} alt={name || "Cultural Council Member"} className="w-full h-full object-cover" />
                </div>
                <img src={rightBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -right-3 sm:-right-4 md:-right-5 lg:-right-[24px]" alt="" />
            </div>

            <div className={`absolute ${bottomClasses} flex items-center gap-0.5 sm:gap-1 md:gap-1.5 z-10`}>
                <a
                    href={instagram || "#"}
                    target={instagram ? "_blank" : "_self"}
                    rel={instagram ? "noopener noreferrer" : ""}
                    className={`${iconWidthClasses} flex items-center justify-center transition-transform hover:scale-110`}
                >
                    <img src={purpleInsta} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Instagram" />
                </a>

                <div
                    className={`label-pill-ticket-purple label-pill-compact px-4 text-center ${isLongName ? 'label-wide' : ''}`}
                >
                    <div className={`${nameDisplaySize} text-white font-normal tracking-wider leading-[1.1] uppercase whitespace-nowrap`} style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
                        {name}
                    </div>
                    <div className={`${roleTextSize} text-white/95 font-normal tracking-[0.12em] uppercase leading-tight text-center`} style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
                        {role}
                    </div>
                </div>

                <a
                    href={email ? `mailto:${email}` : "#"}
                    className={`${iconWidthClasses} flex items-center justify-center transition-transform hover:scale-110`}
                >
                    <img src={purpleGmail} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Email" />
                </a>
            </div>
        </div>
    )
}

export default CulturalCouncilCard
