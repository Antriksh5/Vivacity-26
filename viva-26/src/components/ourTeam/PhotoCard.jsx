import { useRef } from 'react'
import { OurTeam } from '../../utils/cloudinaryUrls';

const {
    leftBorder,
    rightBorder,
    instagram: instaIcon,
    email: mailIcon,
    purpleInsta,
    purpleGmail,
    yellowInsta: orangeInsta,
    yellowEmail: orangeGmail
} = OurTeam;

const PhotoCard = ({ imageUrl, name, role, size = "normal", theme = "blue", instagram, email }) => {
    const cardRef = useRef(null);

    const getSizeClasses = () => {
        if (size === "small") {
            return {
                image: "w-[50vw] sm:w-[45vw] md:w-[18vw] lg:w-[12vw] xl:w-[11.5vw] 2xl:w-[13vw]",
                bottom: "-bottom-[65px] sm:-bottom-[65px] md:-bottom-[52px] lg:-bottom-[48px] xl:-bottom-[75px] 2xl:-bottom-[95px]",
                icon: "w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-[2.2vw] xl:h-[2.2vw] 2xl:w-[2.5vw] 2xl:h-[2.5vw]",
                name: "text-[1.05rem] sm:text-[1rem] md:text-[0.8rem] lg:text-[0.95rem] xl:text-[1.05vw] 2xl:text-[1.3vw]",
                role: "text-[0.65rem] sm:text-[0.6rem] md:text-[0.5rem] lg:text-[0.5rem] xl:text-[0.45vw] 2xl:text-[0.65vw]",
                labelClass: "label-pill-compact"
            };
        } else if (size === "operational") {
            return {
                image: "w-[50vw] sm:w-[45vw] md:w-[18vw] lg:w-[12vw] xl:w-[11.5vw] 2xl:w-[13vw]",
                bottom: "-bottom-[65px] sm:-bottom-[65px] md:-bottom-[58px] lg:-bottom-[48px] xl:-bottom-[80px] 2xl:-bottom-[105px]",
                icon: "w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-[2.4vw] xl:h-[2.4vw] 2xl:w-[2.8vw] 2xl:h-[2.8vw]",
                name: "text-[1.05rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.25rem] xl:text-[1.35vw] 2xl:text-[1.65vw]",
                role: "text-[0.65rem] sm:text-[0.65rem] md:text-[0.65rem] lg:text-[0.65rem] xl:text-[0.7vw] 2xl:text-[0.85vw]",
                labelClass: "label-pill-compact"
            };
        } else if (size === "medium") {
            return {
                image: "w-[50vw] sm:w-[50vw] md:w-[20vw] lg:w-[14vw] xl:w-[12.5vw] 2xl:w-[14vw]",
                bottom: "-bottom-[65px] sm:-bottom-[65px] md:-bottom-[58px] lg:-bottom-[48px] xl:-bottom-[80px] 2xl:-bottom-[105px]",
                icon: "w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-[2.4vw] xl:h-[2.4vw] 2xl:w-[2.8vw] 2xl:h-[2.8vw]",
                name: "text-[1.1rem] sm:text-[1.1rem] md:text-[1.1rem] lg:text-[1.25rem] xl:text-[1.35vw] 2xl:text-[1.65vw]",
                role: "text-[0.65rem] sm:text-[0.65rem] md:text-[0.65rem] lg:text-[0.65rem] xl:text-[0.7vw] 2xl:text-[0.85vw]",
                labelClass: "label-pill-compact"
            };
        } else {
            return {
                image: "w-[60vw] sm:w-[55vw] md:w-[22vw] lg:w-[16vw] xl:w-[14.5vw] 2xl:w-[17vw]",
                bottom: "-bottom-[65px] sm:-bottom-[65px] md:-bottom-[52px] lg:-bottom-[42px] xl:-bottom-[70px] 2xl:-bottom-[95px]",
                icon: "w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-[2.8vw] xl:h-[2.8vw] 2xl:w-[3.2vw] 2xl:h-[3.2vw]",
                name: "text-[1.2rem] sm:text-[1.2rem] md:text-[1.2rem] lg:text-[1.4rem] xl:text-[1.55vw] 2xl:text-[1.85vw]",
                role: "text-[0.7rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[0.8rem] xl:text-[0.9vw] 2xl:text-[1.1vw]",
                labelClass: ""
            };
        }
    };

    const classes = getSizeClasses();
    const imageWidthClasses = classes.image;
    const bottomClasses = classes.bottom;
    const iconWidthClasses = classes.icon;
    const nameTextSize = classes.name;
    const roleTextSize = classes.role;



    const getIcons = () => {
        if (theme === 'orange') {
            return { insta: orangeInsta, mail: orangeGmail };
        } else if (theme === 'purple') {
            return { insta: purpleInsta, mail: purpleGmail };
        }
        return { insta: instaIcon, mail: mailIcon };
    };

    const icons = getIcons();

    const isLongName = name && name.length >= 11;
    const nameDisplaySize = isLongName
        ? (name === "VIKRANT SINGH RATHORE" || name === "SHARDUL P CHORGHADE" || name === "KRISHNA GOPAL RATHI" || name === "SHREYANSH AGARWAL"
            ? "text-[0.85rem] sm:text-[0.85rem] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[0.9vw] 2xl:text-[1.2vw]"
            : "text-[1.05rem] sm:text-[1.0rem] md:text-[0.7rem] lg:text-[0.8rem] xl:text-[0.9vw] 2xl:text-[1.2vw]")
        : nameTextSize;

    const getLabelClass = () => {
        const baseClass = classes.labelClass;
        let themeClass = '';
        if (theme === 'orange') {
            themeClass = 'label-pill-ticket-orange';
        } else if (theme === 'purple') {
            themeClass = 'label-pill-ticket-purple';
        } else {
            themeClass = 'label-pill-ticket';
        }
        return `${themeClass} ${baseClass} ${isLongName ? 'label-wide' : ''}`;
    };

    return (
        <div className="relative flex flex-col items-center">
            <div ref={cardRef} className={`relative flex items-center bg-white p-[1.5px] sm:p-[2px] md:p-[2.5px] rounded-[12px] sm:rounded-[15px] md:rounded-[18px] shadow-xl transform transition-transform hover:scale-105`}>
                <img src={leftBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -left-5 sm:-left-4 md:-left-5 lg:-left-[24px]" alt="" />
                <div className={`${imageWidthClasses} aspect-[16/24] overflow-hidden relative rounded-[10.5px] sm:rounded-[13px] md:rounded-[16px]`}>
                    <img src={imageUrl} alt={name || "Team Member"} className="w-full h-full object-cover" />
                </div>
                <img src={rightBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -right-5 sm:-right-4 md:-right-5 lg:-right-[24px]" alt="" />
            </div>

            {(name || role) && (
                <div className={`absolute ${bottomClasses} flex items-center gap-0.5 sm:gap-1 md:gap-1.5 z-10`}>
                    <a
                        href={instagram || "#"}
                        target={instagram ? "_blank" : "_self"}
                        rel={instagram ? "noopener noreferrer" : ""}
                        className={`${iconWidthClasses} flex items-center justify-center transition-transform hover:scale-110`}
                    >
                        <img src={icons.insta} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Instagram" />
                    </a>

                    <div
                        className={`${getLabelClass()} px-4 text-center`}
                    >
                        <div className={`${nameDisplaySize} text-white font-normal tracking-wider leading-[1.1] uppercase whitespace-nowrap`} style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
                            {name}
                        </div>
                        <div className={`${roleTextSize} text-white/95 font-light tracking-[0.12em] uppercase leading-tight whitespace-nowrap`} style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
                            {role}
                        </div>
                    </div>

                    <a
                        href={email ? `mailto:${email}` : "#"}
                        className={`${iconWidthClasses} flex items-center justify-center transition-transform hover:scale-110`}
                    >
                        <img src={icons.mail} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Email" />
                    </a>
                </div>
            )}
        </div>
    )
}

export default PhotoCard
