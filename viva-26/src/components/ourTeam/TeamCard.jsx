import { leftBorder, rightBorder } from '../../assets/ourTeam'

const TeamCard = ({ imageUrl, footerText }) => {
    return (
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-[40px]">
            <div className="relative flex items-center bg-white p-[1.5px] sm:p-[2.5px] md:p-[3px] rounded-[15px] sm:rounded-[20px] md:rounded-[25px] shadow-xl">
                <img src={leftBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -left-3 sm:-left-4 md:-left-5 lg:-left-[20px]" alt="" />
                <div className="w-[70vw] sm:w-[75vw] md:w-[65vw] lg:w-[540px] 2xl:w-[35vw] aspect-[16/9] overflow-hidden relative rounded-[13px] sm:rounded-[18px] md:rounded-[23px]">
                    <img src={imageUrl} alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <img src={rightBorder} className="h-[106%] absolute top-[-3%] w-auto z-[2] pointer-events-none -right-3 sm:-right-4 md:-right-5 lg:-right-[20px]" alt="" />
            </div>
            {footerText && (
                <div className="font-sans font-normal text-[#213547] text-[0.75rem] sm:text-[0.85rem] md:text-sm lg:text-[1rem] 2xl:text-[1.2rem] tracking-wide sm:tracking-wider text-center uppercase max-w-[95vw] px-2">
                    {footerText}
                </div>
            )}
        </div>
    )
}

export default TeamCard
