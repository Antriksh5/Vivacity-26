import {
    mentorsBanner,
    festheadBanner,
    lantern,
    vogue1,
    vogue2,
    rickshaw,
    culturalSign,
    memberImage,
    sponsorBanner,
    developmentBanner,
    creativeBanner,
    prEventsBanner,
    mentorImage,
    festhead1,
    festhead2,
    cultural1,
    cultural2,
    cultural3
} from '../../assets/ourTeam'
import TeamCard from './TeamCard'
import PhotoCard from './PhotoCard'
import CulturalCouncilCard from './CulturalCouncilCard'

export const getSections = (refs) => {
    const {
        section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref, section7Ref, section8Ref,
        banner1Ref, banner2Ref, banner3Ref, banner4Ref, banner6Ref, banner7Ref, banner8Ref,
        vogue1Ref, vogue2Ref, vogue3Ref, vogue4Ref, vogue5Ref, vogue6Ref, vogue7Ref, vogue8Ref,
        lanternLeftRef, lanternRightRef, lanternLeftSponsorRef, lanternRightSponsorRef,
        rickshawLeftRef, rickshawRightRef, rickshawLeft7Ref, rickshawRight7Ref
    } = refs

    return [
        {
            id: 'section1',
            ref: section1Ref,
            theme: 'orange-theme',
            bannerImage: mentorsBanner,
            bannerAlt: 'Our Mentors',
            showHeader: true,
            bannerRef: banner1Ref,
            vogueHands: (
                <>
                    <div ref={banner1Ref} className="absolute top-[35px] left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={mentorsBanner} alt="Our Mentors" className="h-[110px] sm:h-[140px] md:h-[180px] lg:h-[200px] xl:h-[220px] 2xl:h-[250px] w-auto" />
                        </div>
                    </div>
                    <img
                        ref={vogue1Ref}
                        src={vogue1}
                        className="vogue-img left-4 sm:left-6 md:left-8 lg:left-10 absolute bottom-10 sm:bottom-14 md:bottom-11 h-[80px] sm:h-[100px] md:h-[110px] lg:h-[140px] xl:h-[180px] 2xl:h-[12vw] w-auto pointer-events-none z-50 will-change-transform opacity-0"
                        alt=""
                    />
                    <img
                        ref={vogue2Ref}
                        src={vogue2}
                        className="right-4 sm:right-6 md:right-8 lg:right-10 absolute bottom-10 sm:bottom-14 md:bottom-11 h-[80px] sm:h-[100px] md:h-[110px] lg:h-[140px] xl:h-[180px] 2xl:h-[12vw] w-auto pointer-events-none z-50 will-change-transform opacity-0"
                        alt=""
                    />
                </>
            ),
            content: (
                <div className="flex flex-col justify-center items-center w-full -mt-2 md:-mt-4">
                    <TeamCard
                        imageUrl={mentorImage}
                        footerText="OUR MENTORS - Shubhanshu, dhanesha, samkit, prateek, vineet, divyansh, ankur, bhavyam, chirag, bhupesh, guneet, abde, divya, saurav, karan"
                    />
                </div>
            )
        },
        {
            id: 'section2',
            ref: section2Ref,
            theme: 'blue-theme',
            bannerImage: festheadBanner,
            bannerAlt: 'Fest Head',
            showHeader: false,
            bannerRef: banner2Ref,
            vogueHands: (
                <>
                    <div ref={banner2Ref} className="absolute top-[35px] left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={festheadBanner} alt="Fest Head" className="h-[100px] sm:h-[125px] md:h-[150px] lg:h-[170px] xl:h-[190px] 2xl:h-[220px] w-auto" />
                        </div>
                    </div>
                    <div className="absolute top-[40px] sm:top-[45px] md:top-[50px] lg:top-[60px] left-0 right-0 w-full px-10 sm:px-12 md:px-14 lg:px-20 xl:px-28 flex justify-between pointer-events-none z-30">
                        <img ref={lanternLeftRef} src={lantern} className="lantern-swing h-[110px] sm:h-[140px] md:h-[170px] lg:h-[210px] xl:h-[250px] 2xl:h-[18vw] w-auto" alt="Lantern" />
                        <img ref={lanternRightRef} src={lantern} className="lantern-swing h-[110px] sm:h-[140px] md:h-[170px] lg:h-[210px] xl:h-[250px] 2xl:h-[18vw] w-auto " alt="Lantern" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col md:flex-row gap-28 sm:gap-24 md:gap-16 lg:gap-32 xl:gap-32 justify-center items-center mt-6 sm:mt-4 md:mt-6 lg:mt-8 relative z-[2]">
                    <PhotoCard
                        imageUrl={festhead1}
                        name="VEDANT WADHWA"
                        role="FEST HEAD"
                        size="small"
                    />
                    <PhotoCard
                        imageUrl={festhead2}
                        name="VEDANG DIXIT"
                        role="FEST HEAD"
                        size="small"
                    />
                </div>
            )
        },
        {
            id: 'section3',
            ref: section3Ref,
            theme: 'purple-theme',
            bannerImage: culturalSign,
            bannerAlt: 'Cultural Council',
            showHeader: false,
            bannerRef: banner3Ref,
            vogueHands: (
                <>
                    <div ref={banner3Ref} className="absolute top-[35px] left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={culturalSign} alt="Cultural Council" className="h-[95px] sm:h-[125px] md:h-[155px] lg:h-[165px] xl:h-[180px] 2xl:h-[210px] w-auto" />
                        </div>
                    </div>
                    <div className="absolute bottom-[45px] left-8 sm:left-12 md:left-16 lg:left-20 right-8 sm:right-12 md:right-16 lg:right-20 w-auto flex justify-between items-end pointer-events-none z-30">
                        <img ref={rickshawLeftRef} src={rickshaw} style={{ transform: "scaleX(-1)" }} className="h-[75px] sm:h-[90px] md:h-[115px] lg:h-[135px] w-auto drop-shadow-xl transition-all" alt="Rickshaw" />
                        <img ref={rickshawRightRef} src={rickshaw} className="h-[75px] sm:h-[90px] md:h-[115px] lg:h-[135px] w-auto drop-shadow-xl transform transition-all" alt="Rickshaw" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-8 sm:mt-18 md:mt-24 lg:mt-32">
                    <div className="flex flex-col md:flex-row gap-8 sm:gap-24 md:gap-20 lg:gap-32 xl:gap-40 justify-center items-center mt-6 sm:mt-10 md:mt-12 lg:mt-16 flex-wrap relative z-[2]">
                        <CulturalCouncilCard imageUrl={cultural1} name="KANISHQ SINGHAL" role="GENERAL SECRETARY" />
                        <CulturalCouncilCard imageUrl={cultural2} name="ISHITA KHANDELWAL" role="ASSOCIATE G. SEC" />
                        <CulturalCouncilCard imageUrl={cultural3} name="TANMAY JAIN" role="FINANCE CONVENOR" />
                    </div>
                    <div className="mt-10 sm:mt-20 md:mt-24 lg:mt-28 text-center max-w-[90vw] px-4 mb-20">
                        <p className="font-sans font-normal text-black text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1000px] mx-auto">
                            TEAM MEMBERS - Aadya Rastogi, Harshil Agarwal, Gourav Bansal, Madhur Jain, Shriman Bhagat
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'section6',
            ref: section6Ref,
            theme: 'orange-theme',
            bannerImage: developmentBanner,
            bannerAlt: 'Development Team',
            showHeader: false,
            bannerRef: banner6Ref,
            vogueHands: (
                <>
                    <div ref={banner6Ref} className="absolute top-[35px] left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={developmentBanner} alt="Development Team" className="h-[85px] sm:h-[115px] md:h-[145px] lg:h-[155px] xl:h-[170px] 2xl:h-[195px] w-auto" />
                        </div>
                    </div>
                    <img
                        ref={vogue3Ref}
                        src={vogue1}
                        className="vogue-img left-3 sm:left-4 md:left-6 lg:left-8 absolute bottom-[45px] h-[80px] sm:h-[100px] md:h-[110px] lg:h-[140px] xl:h-[180px] 2xl:h-[12vw] w-auto pointer-events-none z-50 opacity-0"
                        alt=""
                    />
                    <img
                        ref={vogue4Ref}
                        src={vogue2}
                        className="right-3 sm:right-4 md:right-6 lg:right-8 absolute bottom-[45px] h-[80px] sm:h-[100px] md:h-[110px] lg:h-[140px] xl:h-[180px] 2xl:h-[12vw] w-auto pointer-events-none z-50 opacity-0"
                        alt=""
                    />
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-8 sm:mt-18 md:mt-24 lg:mt-32">
                    <div className="flex flex-col md:flex-row gap-8 sm:gap-24 md:gap-20 lg:gap-32 xl:gap-40 justify-center items-center mt-6 sm:mt-10 md:mt-12 lg:mt-16 relative z-[2]">
                        <PhotoCard imageUrl={cultural1} name="KANISHQ SINGHAL" role="GENERAL SECRETARY" size="small" theme="orange" />
                        <PhotoCard imageUrl={cultural2} name="ISHITA KHANDELWAL" role="ASSOCIATE G. SEC" size="small" theme="orange" />
                        <PhotoCard imageUrl={cultural3} name="TANMAY JAIN" role="FINANCE CONVENOR" size="small" theme="orange" />
                    </div>
                    <div className="mt-10 sm:mt-20 md:mt-24 lg:mt-28 text-center max-w-[90vw] px-4 mb-10 sm:mb-20">
                        <p className="font-sans font-normal text-black text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1000px] mx-auto">
                            TEAM MEMBERS - SHUBHANSHU, DHANESHA, SAMKIT, PRATEEK, VINEET, DIVYANSH, ANKUR, BHAVYAM, CHIRAG, BHUPESH, GUNEET, ABDE, DIVYA, SAURAV, KARAN
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'section4',
            ref: section4Ref,
            theme: 'blue-theme',
            bannerImage: sponsorBanner,
            bannerAlt: 'Sponsorship Team',
            showHeader: false,
            bannerRef: banner4Ref,
            extraClasses: "section-no-bottom-border pb-0 md:pb-0",
            vogueHands: (
                <>
                    <div ref={banner4Ref} className="absolute top-[35px] left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={sponsorBanner} alt="Sponsorship Team" className="h-[125px] sm:h-[150px] md:h-[180px] lg:h-[190px] xl:h-[200px] 2xl:h-[225px] w-auto" />
                        </div>
                    </div>
                    <img
                        ref={vogue7Ref}
                        src={vogue1}
                        className="vogue-img left-4 sm:left-6 md:left-8 lg:left-10 absolute bottom-10 sm:bottom-14 md:bottom-11 h-[80px] sm:h-[100px] md:h-[110px] lg:h-[140px] xl:h-[180px] 2xl:h-[12vw] w-auto pointer-events-none z-50 will-change-transform opacity-0"
                        alt=""
                    />
                    <img
                        ref={vogue8Ref}
                        src={vogue2}
                        className="right-4 sm:right-6 md:right-8 lg:right-10 absolute bottom-10 sm:bottom-14 md:bottom-11 h-[80px] sm:h-[100px] md:h-[110px] lg:h-[140px] xl:h-[180px] 2xl:h-[12vw] w-auto pointer-events-none z-50 will-change-transform opacity-0"
                        alt=""
                    />
                    <div className="absolute top-[40px] sm:top-[45px] md:top-[50px] lg:top-[60px] left-0 right-0 w-full px-10 sm:px-12 md:px-14 lg:px-20 xl:px-28 flex justify-between pointer-events-none z-30">
                        <img ref={lanternLeftSponsorRef} src={lantern} className="lantern-swing h-[110px] sm:h-[140px] md:h-[170px] lg:h-[210px] xl:h-[250px] 2xl:h-[18vw] w-auto" alt="Lantern" />
                        <img ref={lanternRightSponsorRef} src={lantern} className="lantern-swing h-[110px] sm:h-[140px] md:h-[170px] lg:h-[210px] xl:h-[250px] 2xl:h-[18vw] w-auto " alt="Lantern" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-6 sm:mt-20 md:mt-24 lg:mt-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-x-20 sm:gap-y-28 md:gap-x-24 md:gap-y-32 lg:gap-x-24 lg:gap-y-32 justify-items-center w-full max-w-[1200px] px-4">
                        <PhotoCard imageUrl={memberImage} name="VIDIT SHARMA" role="SPONSORSHIP HEAD" size="small" />
                        <PhotoCard imageUrl={memberImage} name="RUDRA BANERJEE" role="SPONSORSHIP HEAD" size="small" />
                        <PhotoCard imageUrl={memberImage} name="ANURAG YADAV" role="SPONSORSHIP HEAD" size="small" />
                    </div>
                </div>
            )
        },
        {
            id: 'section5',
            ref: section5Ref,
            theme: 'blue-theme',
            showHeader: false,
            extraClasses: "section-no-top-border pt-0 md:pt-0",
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-8 sm:mt-14 md:mt-16 lg:mt-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-x-20 sm:gap-y-28 md:gap-x-24 md:gap-y-32 lg:gap-x-24 lg:gap-y-32 justify-items-center w-full max-w-[1200px] px-4">
                        <PhotoCard imageUrl={memberImage} name="KARTIKEYA SINGH GAUR" role="SPONSORSHIP HEAD" size="small" />
                        <PhotoCard imageUrl={memberImage} name="SAJAL JAGGI" role="SPONSORSHIP HEAD" size="small" />
                        <PhotoCard imageUrl={memberImage} name="JAYESH JHAMNANI" role="SPONSORSHIP HEAD" size="small" />
                    </div>
                    <div className="mt-12 sm:mt-28 md:mt-32 lg:mt-40 text-center max-w-[90vw] px-4 mb-10 sm:mb-20">
                        <p className="font-sans font-normal text-[#3d1c10] text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1000px] mx-auto opacity-90">
                            TEAM MEMBERS - TEJAS MISHRA, AMRENDRA VIKRAM SINGH, SHUBH KAPOOR, AYUSH RAJ, SNEHIT RAJ, MUKUND MAHESHWARI, BHAVYA SARAN, HARSH VARDHAN THAKUR, HARSHIL AGARWAL, RITISH NAGPAL, AYUSH SAINI, YATISH SINGHAL, TANISHQ GANGWANI
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'section7',
            ref: section7Ref,
            theme: 'purple-theme',
            bannerImage: creativeBanner,
            bannerAlt: 'Creative Team',
            showHeader: false,
            bannerRef: banner7Ref,
            vogueHands: (
                <>
                    <div ref={banner7Ref} className="absolute top-[35px] left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={creativeBanner} alt="Creative Team" className="h-[85px] sm:h-[110px] md:h-[140px] lg:h-[150px] xl:h-[160px] 2xl:h-[185px] w-auto" />
                        </div>
                    </div>
                    <div className="absolute bottom-[45px] left-8 sm:left-12 md:left-16 lg:left-20 right-8 sm:right-12 md:right-16 lg:right-20 w-auto flex justify-between items-end pointer-events-none z-30">
                        <img ref={rickshawLeft7Ref} src={rickshaw} style={{ transform: "scaleX(-1)" }} className="h-[75px] sm:h-[90px] md:h-[115px] lg:h-[135px] w-auto drop-shadow-xl transition-all" alt="Rickshaw" />
                        <img ref={rickshawRight7Ref} src={rickshaw} className="h-[75px] sm:h-[90px] md:h-[115px] lg:h-[135px] w-auto drop-shadow-xl transform transition-all" alt="Rickshaw" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-12 sm:mt-28 md:mt-32 lg:mt-40">
                    <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap w-full gap-4 sm:gap-6 md:gap-8 justify-evenly items-center px-4">
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop" name="RISHABH SRIVASTAVA" role="CREATIVE HEAD" size="small" theme="purple" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400&auto=format&fit=crop" name="ADITYA MEHTA" role="CREATIVE HEAD" size="small" theme="purple" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=400&auto=format&fit=crop" name="PRASOON AGARWAL" role="CREATIVE HEAD" size="small" theme="purple" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=400&auto=format&fit=crop" name="KRISHNA GOPAL RATHI" role="CREATIVE HEAD" size="small" theme="purple" />
                    </div>
                    <div className="mt-10 sm:mt-24 md:mt-28 lg:mt-32 text-center max-w-[90vw] px-4 mb-10 sm:mb-20">
                        <p className="font-sans font-normal text-white text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1000px] mx-auto opacity-90">
                            TEAM MEMBERS - ANJALI WADHWA, KINJAL BHARIL, PARAS GUPTA, ARUSH DAKHERA, KRISH SHANDILYA, KSHITIZE SINGH, RUTWIK RAHUL NAIK, ANISH KOTHARI, PARTH SHARMA
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'section8',
            ref: section8Ref,
            theme: 'orange-theme',
            bannerImage: prEventsBanner,
            bannerAlt: 'PR and Events Team',
            showHeader: false,
            bannerRef: banner8Ref,
            vogueHands: (
                <>
                    <div ref={banner8Ref} className="absolute top-[35px] left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={prEventsBanner} alt="PR and Events Team" className="h-[85px] sm:h-[110px] md:h-[140px] lg:h-[150px] xl:h-[160px] 2xl:h-[185px] w-auto" />
                        </div>
                    </div>
                    <img
                        ref={vogue5Ref}
                        src={vogue1}
                        className="vogue-img left-4 sm:left-6 md:left-8 lg:left-10 absolute bottom-10 sm:bottom-14 md:bottom-11 h-[80px] sm:h-[100px] md:h-[110px] lg:h-[140px] xl:h-[180px] 2xl:h-[12vw] w-auto pointer-events-none z-50 opacity-0"
                        alt=""
                    />
                    <img
                        ref={vogue6Ref}
                        src={vogue2}
                        className="right-4 sm:right-6 md:right-8 lg:right-10 absolute bottom-10 sm:bottom-14 md:bottom-11 h-[80px] sm:h-[100px] md:h-[110px] lg:h-[140px] xl:h-[180px] 2xl:h-[12vw] w-auto pointer-events-none z-50 opacity-0"
                        alt=""
                    />
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-12 sm:mt-28 md:mt-32 lg:mt-40">
                    <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap w-full gap-4 sm:gap-6 md:gap-8 justify-evenly items-center px-4">
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop" name="VIKRANT SINGH RATHORE" role="EVENTS HEAD" size="small" theme="orange" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400&auto=format&fit=crop" name="RAGHAV PATHAK" role="EVENTS HEAD" size="small" theme="orange" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=400&auto=format&fit=crop" name="PARTH GOYAL" role="EVENTS HEAD" size="small" theme="orange" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=400&auto=format&fit=crop" name="TAVISHI VERMA" role="EVENTS HEAD" size="small" theme="orange" />
                    </div>
                    <div className="mt-10 sm:mt-24 md:mt-28 lg:mt-32 text-center max-w-[90vw] px-4 mb-10 sm:mb-20">
                        <p className="font-sans font-normal text-[#3d1c10] text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1000px] mx-auto opacity-90">
                            TEAM MEMBERS - PALLAV SURANA, AADYA RASTOGI, CHINMAY CHANDALIYA, MARDAV JAIN, HARSH MAURYA, MIHIR KUMAWAT, MADHUSUDAN SINGLA, VIDIT PAREKH, ANTRIKSH NAHAR, PALOMA JAIN, LAMIA KHAN, ARJAV JAIN, SHIVIKA BANSAL, ISHIKA, ARNAV DUBEY, SANSKRITI TRIPATHI, AKANSHA GARG, MADHUR JAIN
                        </p>
                    </div>
                </div>
            )
        }
    ]
}
