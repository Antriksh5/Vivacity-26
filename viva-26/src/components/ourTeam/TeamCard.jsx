import { leftBorder, rightBorder } from '../../assets/ourTeam'

const TeamCard = ({ imageUrl, footerText }) => {
    return (
        <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-4 lg:gap-5 xl:gap-6">
            <div className="relative flex items-center bg-white p-[1.5px] sm:p-[2.5px] md:p-[3px] rounded-[15px] sm:rounded-[20px] md:rounded-[25px] shadow-xl">
                <img src={leftBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -left-3 sm:-left-4 md:-left-5 lg:-left-[20px]" alt="" />
                <div className="w-[65vw] sm:w-[70vw] md:w-[62vw] lg:w-[48vw] xl:w-[35vw] 2xl:w-[30vw] aspect-[16/9] overflow-hidden relative rounded-[13px] sm:rounded-[18px] md:rounded-[23px]">
                    <img src={imageUrl} alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <img src={rightBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -right-3 sm:-right-4 md:-right-5 lg:-right-[20px]" alt="" />
            </div>
            {footerText && (
                <div className="mentor-footer-text font-sans font-normal text-[#213547] text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] lg:text-[0.75rem] xl:text-[0.85rem] 2xl:text-[1rem] tracking-wide sm:tracking-wider text-center uppercase whitespace-normal break-words w-[65vw] sm:w-[70vw] md:w-[65vw] lg:w-[70vw] xl:w-[65vw] 2xl:w-[60vw] max-w-[750px] px-2" style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
                    {footerText}
                </div>
            )}
        </div>
    )
}

export default TeamCard
