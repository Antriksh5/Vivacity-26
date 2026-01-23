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
    prEventsBanner
} from '../../assets/ourTeam'
import TeamCard from './TeamCard'
import PhotoCard from './PhotoCard'
import CulturalCouncilCard from './CulturalCouncilCard'

export const getSections = (refs) => {
    const {
        section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref, section7Ref, section8Ref,
        banner1Ref, banner2Ref, banner3Ref, banner4Ref, banner6Ref, banner7Ref, banner8Ref,
        vogue1Ref, vogue2Ref, vogue3Ref, vogue4Ref, vogue5Ref, vogue6Ref,
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
                    <div ref={banner1Ref} className="fixed top-2 sm:top-4 md:top-8 left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={mentorsBanner} alt="Our Mentors" className="h-[85px] sm:h-[110px] md:h-[140px] lg:h-[150px] xl:h-[160px] 2xl:h-[185px] w-auto" />
                        </div>
                    </div>
                    <img
                        ref={vogue1Ref}
                        src={vogue1}
                        className="vogue-img left-6 sm:left-10 md:left-14 lg:left-16 fixed bottom-10 sm:bottom-14 md:bottom-8 h-[90px] sm:h-[110px] md:h-[120px] lg:h-[160px] xl:h-[210px] 2xl:h-[15vw] w-auto pointer-events-none z-50 will-change-transform opacity-0"
                        alt=""
                    />
                    <img
                        ref={vogue2Ref}
                        src={vogue2}
                        className="right-6 sm:right-10 md:right-14 lg:right-16 fixed bottom-10 sm:bottom-14 md:bottom-8 h-[90px] sm:h-[110px] md:h-[120px] lg:h-[160px] xl:h-[210px] 2xl:h-[15vw] w-auto pointer-events-none z-50 will-change-transform opacity-0"
                        alt=""
                    />
                </>
            ),
            content: (
                <div className="flex flex-col justify-center items-center w-full -mt-2 md:-mt-4">
                    <TeamCard
                        imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                        footerText="OUR MENTORS - AJAY RAJ, PRATHMESH, MANAS, VANSH, HARSH, MRADUL"
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
                    <div ref={banner2Ref} className="fixed top-2 sm:top-4 md:top-8 left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-0">
                        <div className="swing-banner">
                            <img src={festheadBanner} alt="Fest Head" className="h-[85px] sm:h-[110px] md:h-[140px] lg:h-[150px] xl:h-[160px] 2xl:h-[185px] w-auto" />
                        </div>
                    </div>
                    <div className="fixed top-[20px] sm:top-[25px] md:top-[30px] lg:top-[40px] left-0 right-0 w-full px-5 sm:px-8 md:px-14 lg:px-20 xl:px-28 flex justify-between pointer-events-none z-30">
                        <img ref={lanternLeftRef} src={lantern} className="lantern-swing h-[130px] sm:h-[170px] md:h-[210px] lg:h-[260px] xl:h-[300px] 2xl:h-[22vw] w-auto" alt="Lantern" />
                        <img ref={lanternRightRef} src={lantern} className="lantern-swing h-[130px] sm:h-[170px] md:h-[210px] lg:h-[260px] xl:h-[300px] 2xl:h-[22vw] w-auto " alt="Lantern" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col md:flex-row gap-16 sm:gap-24 md:gap-16 lg:gap-32 xl:gap-32 justify-center items-center mt-12 sm:mt-14 md:mt-20 lg:mt-24 relative z-[2]">
                    <PhotoCard
                        imageUrl="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop"
                        name="VEDANT WADHWA"
                        role="FEST HEAD"
                        size="small"
                    />
                    <PhotoCard
                        imageUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
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
                <div ref={banner3Ref} className="fixed top-2 sm:top-4 md:top-8 left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-0">
                    <div className="swing-banner">
                        <img src={culturalSign} alt="Cultural Council" className="h-[85px] sm:h-[110px] md:h-[140px] lg:h-[150px] xl:h-[160px] 2xl:h-[185px] w-auto" />
                    </div>
                </div>
            ),
            content: (
                <>
                    <div className="flex flex-col md:flex-row gap-16 sm:gap-20 md:gap-16 lg:gap-24 xl:gap-32 justify-center items-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 flex-wrap relative z-[2]">
                        <CulturalCouncilCard imageUrl={memberImage} name="KANISHQ SINGHAL" role="GENERAL SECRETARY" />
                        <CulturalCouncilCard imageUrl={memberImage} name="ISHITA KHANDELWAL" role="ASSOCIATE G. SEC" />
                        <CulturalCouncilCard imageUrl={memberImage} name="TANMAY JAIN" role="FINANCE CONVENOR" />
                    </div>
                    <div className="absolute bottom-[-4%] left-6 sm:left-10 md:left-14 lg:left-20 right-6 sm:right-10 md:right-14 lg:right-20 w-auto flex justify-between items-end pointer-events-none z-10">
                        <img ref={rickshawLeftRef} src={rickshaw} style={{ transform: "scaleX(-1)" }} className="h-[60px] sm:h-[75px] md:h-[100px] lg:h-[110px] w-auto drop-shadow-xl transition-all" alt="Rickshaw" />
                        <img ref={rickshawRightRef} src={rickshaw} className="h-[60px] sm:h-[75px] md:h-[100px] lg:h-[110px] w-auto drop-shadow-xl transform transition-all" alt="Rickshaw" />
                    </div>
                </>
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
                    <div ref={banner6Ref} className="fixed top-2 sm:top-4 md:top-8 left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-0">
                        <div className="swing-banner">
                            <img src={developmentBanner} alt="Development Team" className="h-[85px] sm:h-[110px] md:h-[140px] lg:h-[150px] xl:h-[160px] 2xl:h-[185px] w-auto" />
                        </div>
                    </div>
                    <img
                        ref={vogue3Ref}
                        src={vogue1}
                        className="vogue-img left-[-20px] sm:left-[-10px] md:left-0 fixed bottom-[-20px] sm:bottom-[-10px] md:bottom-0 h-[100px] sm:h-[130px] md:h-[160px] lg:h-[200px] xl:h-[250px] 2xl:h-[18vw] w-auto pointer-events-none z-50 opacity-0"
                        alt=""
                    />
                    <img
                        ref={vogue4Ref}
                        src={vogue2}
                        className="right-[-20px] sm:right-[-10px] md:right-0 fixed bottom-[-20px] sm:bottom-[-10px] md:bottom-0 h-[100px] sm:h-[130px] md:h-[160px] lg:h-[200px] xl:h-[250px] 2xl:h-[18vw] w-auto pointer-events-none z-50 opacity-0"
                        alt=""
                    />
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-24 sm:mt-28 md:mt-32 lg:mt-40">
                    <div className="flex flex-col md:flex-row gap-16 sm:gap-24 md:gap-16 lg:gap-32 xl:gap-32 justify-center items-center">
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop" name="KANISHQ SINGHAL" role="GENERAL SECRETARY" size="small" theme="orange" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" name="ISHITA KHANDELWAL" role="ASSOCIATE G. SEC" size="small" theme="orange" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" name="TANMAY JAIN" role="FINANCE CONVENOR" size="small" theme="orange" />
                    </div>
                    <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 text-center max-w-[90vw] px-4 mb-20">
                        <p className="font-sans font-normal text-[#3d1c10] text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1000px] mx-auto opacity-90">
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
            vogueHands: (
                <>
                    <div ref={banner4Ref} className="fixed top-2 sm:top-4 md:top-8 left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-0">
                        <div className="swing-banner">
                            <img src={sponsorBanner} alt="Sponsorship Team" className="h-[85px] sm:h-[110px] md:h-[140px] lg:h-[150px] xl:h-[160px] 2xl:h-[185px] w-auto" />
                        </div>
                    </div>
                    <div className="fixed top-[20px] sm:top-[25px] md:top-[30px] lg:top-[40px] left-0 right-0 w-full px-5 sm:px-8 md:px-14 lg:px-20 xl:px-28 flex justify-between pointer-events-none z-30">
                        <img ref={lanternLeftSponsorRef} src={lantern} className="lantern-swing h-[130px] sm:h-[170px] md:h-[210px] lg:h-[260px] xl:h-[300px] 2xl:h-[22vw] w-auto" alt="Lantern" />
                        <img ref={lanternRightSponsorRef} src={lantern} className="lantern-swing h-[130px] sm:h-[170px] md:h-[210px] lg:h-[260px] xl:h-[300px] 2xl:h-[22vw] w-auto " alt="Lantern" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-24 sm:mt-28 md:mt-32 lg:mt-40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24 sm:gap-x-20 sm:gap-y-28 md:gap-x-24 md:gap-y-32 lg:gap-x-24 lg:gap-y-32 justify-items-center w-full max-w-[1200px] px-4">
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
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-12 sm:mt-14 md:mt-16 lg:mt-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24 sm:gap-x-20 sm:gap-y-28 md:gap-x-24 md:gap-y-32 lg:gap-x-24 lg:gap-y-32 justify-items-center w-full max-w-[1200px] px-4">
                        <PhotoCard imageUrl={memberImage} name="KARTIKEYA SINGH GAUR" role="SPONSORSHIP HEAD" size="small" />
                        <PhotoCard imageUrl={memberImage} name="SAJAL JAGGI" role="SPONSORSHIP HEAD" size="small" />
                        <PhotoCard imageUrl={memberImage} name="JAYESH JHAMNANI" role="SPONSORSHIP HEAD" size="small" />
                    </div>
                    <div className="mt-24 sm:mt-28 md:mt-32 lg:mt-40 text-center max-w-[90vw] px-4 mb-20">
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
                <div ref={banner7Ref} className="fixed top-2 sm:top-4 md:top-8 left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-0">
                    <div className="swing-banner">
                        <img src={creativeBanner} alt="Creative Team" className="h-[85px] sm:h-[110px] md:h-[140px] lg:h-[150px] xl:h-[160px] 2xl:h-[185px] w-auto" />
                    </div>
                </div>
            ),
            content: (
                <>
                    <div className="flex flex-col items-center w-full relative z-[2] mt-24 sm:mt-28 md:mt-32 lg:mt-40">
                        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap w-full gap-4 sm:gap-6 md:gap-8 justify-evenly items-center px-4">
                            <PhotoCard imageUrl="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop" name="RISHABH SRIVASTAVA" role="CREATIVE HEAD" size="small" theme="purple" />
                            <PhotoCard imageUrl="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400&auto=format&fit=crop" name="ADITYA MEHTA" role="CREATIVE HEAD" size="small" theme="purple" />
                            <PhotoCard imageUrl="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=400&auto=format&fit=crop" name="PRASOON AGARWAL" role="CREATIVE HEAD" size="small" theme="purple" />
                            <PhotoCard imageUrl="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=400&auto=format&fit=crop" name="KRISHNA GOPAL RATHI" role="CREATIVE HEAD" size="small" theme="purple" />
                        </div>
                        <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 text-center max-w-[90vw] px-4 mb-20">
                            <p className="font-sans font-normal text-white text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1000px] mx-auto opacity-90">
                                TEAM MEMBERS - ANJALI WADHWA, KINJAL BHARIL, PARAS GUPTA, ARUSH DAKHERA, KRISH SHANDILYA, KSHITIZE SINGH, RUTWIK RAHUL NAIK, ANISH KOTHARI, PARTH SHARMA
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-[-4%] left-6 sm:left-10 md:left-14 lg:left-20 right-6 sm:right-10 md:right-14 lg:right-20 w-auto flex justify-between items-end pointer-events-none z-10">
                        <img ref={rickshawLeft7Ref} src={rickshaw} style={{ transform: "scaleX(-1)" }} className="h-[60px] sm:h-[75px] md:h-[100px] lg:h-[110px] w-auto drop-shadow-xl transition-all" alt="Rickshaw" />
                        <img ref={rickshawRight7Ref} src={rickshaw} className="h-[60px] sm:h-[75px] md:h-[100px] lg:h-[110px] w-auto drop-shadow-xl transform transition-all" alt="Rickshaw" />
                    </div>
                </>
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
                    <div ref={banner8Ref} className="fixed top-2 sm:top-4 md:top-8 left-1/2 -translate-x-1/2 z-[40] pointer-events-none opacity-0">
                        <div className="swing-banner">
                            <img src={prEventsBanner} alt="PR and Events Team" className="h-[85px] sm:h-[110px] md:h-[140px] lg:h-[150px] xl:h-[160px] 2xl:h-[185px] w-auto" />
                        </div>
                    </div>
                    <img
                        ref={vogue5Ref}
                        src={vogue1}
                        className="vogue-img left-[-20px] sm:left-[-10px] md:left-0 fixed bottom-[-20px] sm:bottom-[-10px] md:bottom-0 h-[100px] sm:h-[130px] md:h-[160px] lg:h-[200px] xl:h-[250px] 2xl:h-[18vw] w-auto pointer-events-none z-50 opacity-0"
                        alt=""
                    />
                    <img
                        ref={vogue6Ref}
                        src={vogue2}
                        className="right-[-20px] sm:right-[-10px] md:right-0 fixed bottom-[-20px] sm:bottom-[-10px] md:bottom-0 h-[100px] sm:h-[130px] md:h-[160px] lg:h-[200px] xl:h-[250px] 2xl:h-[18vw] w-auto pointer-events-none z-50 opacity-0"
                        alt=""
                    />
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-24 sm:mt-28 md:mt-32 lg:mt-40">
                    <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap w-full gap-4 sm:gap-6 md:gap-8 justify-evenly items-center px-4">
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop" name="VIKRANT SINGH RATHORE" role="EVENTS HEAD" size="small" theme="orange" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400&auto=format&fit=crop" name="RAGHAV PATHAK" role="EVENTS HEAD" size="small" theme="orange" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=400&auto=format&fit=crop" name="PARTH GOYAL" role="EVENTS HEAD" size="small" theme="orange" />
                        <PhotoCard imageUrl="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=400&auto=format&fit=crop" name="TAVISHI VERMA" role="EVENTS HEAD" size="small" theme="orange" />
                    </div>
                    <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 text-center max-w-[90vw] px-4 mb-20">
                        <p className="font-sans font-normal text-[#3d1c10] text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1000px] mx-auto opacity-90">
                            TEAM MEMBERS - PALLAV SURANA, AADYA RASTOGI, CHINMAY CHANDALIYA, MARDAV JAIN, HARSH MAURYA, MIHIR KUMAWAT, MADHUSUDAN SINGLA, VIDIT PAREKH, ANTRIKSH NAHAR, PALOMA JAIN, LAMIA KHAN, ARJAV JAIN, SHIVIKA BANSAL, ISHIKA, ARNAV DUBEY, SANSKRITI TRIPATHI, AKANSHA GARG, MADHUR JAIN
                        </p>
                    </div>
                </div>
            )
        }
    ]
}
