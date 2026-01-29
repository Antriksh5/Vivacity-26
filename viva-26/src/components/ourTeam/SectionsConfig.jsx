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
    d1,
    d2,
    d3,
    creativeBanner,
    prEventsBanner,
    mentorImage,
    festhead1,
    festhead2,
    cultural1,
    cultural2,
    cultural3,
    s1,
    s2,
    s4,
    s5,
    s6,
    s7,
    p1,
    p2,
    p3,
    p4,
    c1,
    c2,
    c3,
    c4,
    operationalBanner,
    o1,
    o2,
    o3,
    o4
} from '../../assets/ourTeam'
import TeamCard from './TeamCard'
import PhotoCard from './PhotoCard'
import CulturalCouncilCard from './CulturalCouncilCard'

export const getSections = (refs) => {
    const {
        section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref, section7Ref, section8Ref, section9Ref,
        banner1Ref, banner2Ref, banner3Ref, banner4Ref, banner6Ref, banner7Ref, banner8Ref, banner9Ref,
        vogue1Ref, vogue2Ref, vogue3Ref, vogue4Ref, vogue5Ref, vogue6Ref, vogue7Ref, vogue8Ref,
        lanternLeftRef, lanternRightRef, lanternLeftSponsorRef, lanternRightSponsorRef, lanternLeftOperationalRef, lanternRightOperationalRef,
        rickshawLeftRef, rickshawRightRef, rickshawLeft7Ref, rickshawRight7Ref, rickshawLeft9Ref, rickshawRight9Ref
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
            cardHeight: "h-[105vh] sm:h-[110vh] md:h-[105vh]",
            vogueHands: (
                <>
                    <div ref={banner1Ref} className="absolute top-[30px] md:top-[30px] left-1/2 -translate-x-1/2 ml-[25px] md:ml-0 z-[15] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={mentorsBanner} alt="Our Mentors" className="w-[48vw] sm:w-[38vw] md:w-[33vw] lg:w-[28vw] xl:w-[23vw] 2xl:w-[18vw] h-auto" />
                        </div>
                    </div>
                    <img
                        ref={vogue1Ref}
                        src={vogue1}
                        className="vogue-img left-10 sm:left-14 md:left-10 lg:left-13 absolute bottom-11 sm:bottom-15 md:bottom-13 h-[110px] sm:h-[145px] md:h-[155px] lg:h-[185px] xl:h-[230px] 2xl:h-[15vw] w-auto pointer-events-none z-50 will-change-transform"
                        alt=""
                    />
                    <img
                        ref={vogue2Ref}
                        src={vogue2}
                        className="right-10 sm:right-14 md:right-10 lg:right-13 absolute bottom-11 sm:bottom-15 md:bottom-13 h-[110px] sm:h-[145px] md:h-[155px] lg:h-[185px] xl:h-[230px] 2xl:h-[15vw] w-auto pointer-events-none z-50 will-change-transform"
                        alt=""
                    />
                </>
            ),
            content: (
                <div className="flex flex-col justify-center items-center w-full -mt-32 md:-mt-8">
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
            cardHeight: "h-[120vh] sm:h-[130vh] md:h-[110vh]",
            vogueHands: (
                <>
                    <div ref={banner2Ref} className="absolute top-[30px] md:top-[35px] left-1/2 -translate-x-1/2 z-[15] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={festheadBanner} alt="Fest Head" className="w-[48vw] sm:w-[38vw] md:w-[33vw] lg:w-[28vw] xl:w-[23vw] 2xl:w-[18vw] h-auto" />
                        </div>
                    </div>
                    <div className="absolute top-[33px] md:top-[53px] left-0 right-0 w-full px-10 sm:px-12 md:px-14 lg:px-20 xl:px-28 flex justify-between pointer-events-none z-[15]">
                        <img ref={lanternLeftRef} src={lantern} className="lantern-swing h-[110px] sm:h-[140px] md:h-[170px] lg:h-[210px] xl:h-[250px] 2xl:h-[18vw] w-auto" alt="Lantern" />
                        <img ref={lanternRightRef} src={lantern} className="lantern-swing h-[110px] sm:h-[140px] md:h-[170px] lg:h-[210px] xl:h-[250px] 2xl:h-[18vw] w-auto " alt="Lantern" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col sm:flex-row gap-24 sm:gap-24 md:gap-24 lg:gap-32 min-[1000px]:gap-64 min-[1200px]:gap-32 xl:gap-32 justify-center items-center -mt-20 sm:mt-4 md:mt-6 lg:mt-8 relative z-[2] flex-wrap">
                    <PhotoCard imageUrl={festhead1} name="VEDANT WADHWA" role="FEST HEAD" size="medium" instagram="https://www.instagram.com/v_edant.w28?igsh=NmVqOHZjajhmOTFk" email="23ucc612@lnmiit.ac.in" />
                    <PhotoCard imageUrl={festhead2} name="VEDANG DIXIT" role="FEST HEAD" size="medium" instagram="https://www.instagram.com/vedang_dixit?igsh=ZTlzeGxuenBmNzE2" email="23uec641@lnmiit.ac.in" />
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
            cardHeight: "h-[160vh] min-[390px]:h-[130vh] min-[450px]:h-[160vh] min-[500px]:h-[170vh] sm:h-[180vh] md:h-[125vh] lg:h-[115vh]",
            vogueHands: (
                <>
                    <div ref={banner3Ref} className="absolute top-[30px] md:top-[40px] left-1/2 -translate-x-1/2 z-[15] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={culturalSign} alt="Cultural Council" className="w-[48vw] sm:w-[38vw] md:w-[33vw] lg:w-[28vw] xl:w-[23vw] 2xl:w-[18vw] h-auto" />
                        </div>
                    </div>
                    <div className="absolute bottom-[45px] left-14 sm:left-12 md:left-16 lg:left-20 right-14 sm:right-12 md:right-16 lg:right-20 w-auto flex justify-between items-end pointer-events-none z-30">
                        <img ref={rickshawLeftRef} src={rickshaw} className="h-[75px] sm:h-[90px] md:h-[115px] lg:h-[135px] w-auto drop-shadow-xl will-change-transform" alt="Rickshaw" />
                        <img ref={rickshawRightRef} src={rickshaw} className="h-[75px] sm:h-[90px] md:h-[115px] lg:h-[135px] w-auto drop-shadow-xl will-change-transform" alt="Rickshaw" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-8 sm:mt-18 md:mt-24 lg:mt-32">
                    <div className="flex flex-col lg:flex-row gap-24 sm:gap-20 md:gap-24 lg:gap-32 xl:gap-48 justify-center items-center mt-8 min-[370px]:max-[450px]:mt-28 min-[451px]:mt-10 sm:mt-12 md:mt-16 relative z-[2] w-full">
                        <div className="flex flex-col md:flex-row gap-24 sm:gap-12 md:gap-24 lg:gap-32 xl:gap-48 justify-center items-center">
                            <CulturalCouncilCard imageUrl={cultural1} name="KANISHQ SINGHAL" role="GENERAL SECRETARY" instagram="https://www.instagram.com/kanishqsinghal?igsh=aThxa2YwdDNsMnFz" email="23ucs605@lnmiit.ac.in" />
                            <CulturalCouncilCard imageUrl={cultural2} name="ISHITA KHANDELWAL" role="ASSOCIATE G. SEC" instagram="https://www.instagram.com/_ishitaa__13?igsh=eGpzcm1mcWw4Z3Jp" email="23ucs598@lnmiit.ac.in" />

                        </div>
                        <div className="flex justify-center items-center lg:contents">
                            <CulturalCouncilCard imageUrl={cultural3} name="TANMAY JAIN" role="FINANCE CONVENOR" instagram="https://www.instagram.com/tanmay_._jain_?igsh=MXRkc2Mwb2JxZXdocw%3D%3D" email="23ucc606@lnmiit.ac.in" />
                        </div>
                    </div>
                    <div className="mt-24 min-[370px]:max-[450px]:mt-20 min-[451px]:mt-26 sm:mt-28 md:mt-32 lg:mt-40 text-center max-w-[65vw] px-4 mb-20">
                        <p className="font-sans font-normal text-black text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1000px] mx-auto" style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
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
            cardHeight: "h-[160vh] min-[390px]:h-[130vh] min-[450px]:h-[160vh] min-[500px]:h-[170vh] sm:h-[180vh] md:h-[125vh] lg:h-[115vh]",
            vogueHands: (
                <>
                    <div ref={banner6Ref} className="absolute top-[30px] md:top-[50px] left-1/2 -translate-x-1/2 z-[15] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={developmentBanner} alt="Development Team" className="w-[40vw] sm:w-[32vw] md:w-[28vw] lg:w-[24vw] xl:w-[20vw] 2xl:w-[16vw] h-auto" />
                        </div>
                    </div>
                    <img
                        ref={vogue3Ref}
                        src={vogue1}
                        className="vogue-img left-10 sm:left-14 md:left-10 lg:left-13 absolute bottom-11 sm:bottom-15 md:bottom-13 h-[100px] sm:h-[125px] md:h-[135px] lg:h-[165px] xl:h-[200px] 2xl:h-[13vw] w-auto pointer-events-none z-50 will-change-transform"
                        alt=""
                    />
                    <img
                        ref={vogue4Ref}
                        src={vogue2}
                        className="right-10 sm:right-14 md:right-10 lg:right-13 absolute bottom-11 sm:bottom-15 md:bottom-13 h-[100px] sm:h-[125px] md:h-[135px] lg:h-[165px] xl:h-[200px] 2xl:h-[13vw] w-auto pointer-events-none z-50 will-change-transform"
                        alt=""
                    />
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-4 sm:mt-14 md:mt-20 lg:mt-28">
                    <div className="flex flex-col lg:flex-row gap-24 sm:gap-20 md:gap-24 lg:gap-32 xl:gap-48 justify-center items-center -mt-32 min-[370px]:max-[450px]:mt-2 min-[451px]:mt-12 sm:mt-14 md:mt-18 lg:mt-22 relative z-[2] w-full">
                        <div className="flex flex-col md:flex-row gap-24 sm:gap-12 md:gap-24 lg:gap-32 xl:gap-48 justify-center items-center">
                            <PhotoCard imageUrl={d1} name="SANKALP JAIN" role="DEVELOPER" size="small" theme="orange" instagram="https://www.instagram.com/_sankalp.j?igsh=dXM4b3UzdndoOGdm" email="23ucs696@lnmiit.ac.in" />
                            <PhotoCard imageUrl={d2} name="SHARDUL P CHORGHADE" role="DEVELOPER" size="small" theme="orange" instagram="https://www.instagram.com/shardul.28?igsh=ZGdhcWdsNjJ3Y2s5" email="23ucs701@lnmiit.ac.in" />
                        </div>
                        <div className="flex justify-center items-center lg:contents">
                            <PhotoCard imageUrl={d3} name="NILESH GOYAL" role="DEVELOPER" size="small" theme="orange" instagram="https://www.instagram.com/nileshgoyal_14?igsh=NWE3NHA4cmdkOHk4" email="23ucc624@lnmiit.ac.in" />
                        </div>
                    </div>
                    <div className="mt-36 min-[370px]:max-[450px]:mt-28 min-[451px]:mt-32 sm:mt-34 md:mt-36 lg:mt-40 text-center max-w-[65vw] px-4 mb-10 sm:mb-20">
                        <p className="font-sans font-normal text-black text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1000px] mx-auto" style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
                            TEAM MEMBERS - Laxita Bhimsaria, Garvita Joshi, Anushka Jain, Ishita Agarwal, Anshul Agarwal, Antriksh Nahar, Aditya Jakhar
                        </p>
                    </div>
                </div>
            )
        },
        // section5 removed and merged into section4
        {
            id: 'section4',
            ref: section4Ref,
            theme: 'blue-theme',
            bannerImage: sponsorBanner,
            bannerAlt: 'Sponsorship Team',
            showHeader: false,
            bannerRef: banner4Ref,
            cardHeight: "max-[370px]:h-[280vh] h-[240vh] min-[375px]:max-[380px]:h-[280vh] min-[370px]:max-[450px]:h-[230vh] min-[451px]:h-[260vh] sm:h-[270vh] md:h-[210vh] lg:h-[190vh]",
            vogueHands: (
                <>
                    <div ref={banner4Ref} className="absolute top-[30px] md:top-[40px] left-1/2 -translate-x-1/2 z-[15] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={sponsorBanner} alt="Sponsorship Team" className="w-[40vw] sm:w-[32vw] md:w-[28vw] lg:w-[22vw] xl:w-[18vw] 2xl:w-[13vw] h-auto" />
                        </div>
                    </div>
                    <div className="absolute top-[33px] md:top-[53px] left-0 right-0 w-full px-10 sm:px-12 md:px-14 lg:px-20 xl:px-28 flex justify-between pointer-events-none z-[15]">
                        <img ref={lanternLeftSponsorRef} src={lantern} className="lantern-swing h-[110px] sm:h-[140px] md:h-[170px] lg:h-[210px] xl:h-[250px] 2xl:h-[18vw] w-auto" alt="Lantern" />
                        <img ref={lanternRightSponsorRef} src={lantern} className="lantern-swing h-[110px] sm:h-[140px] md:h-[170px] lg:h-[210px] xl:h-[250px] 2xl:h-[18vw] w-auto " alt="Lantern" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-16 sm:mt-32 md:mt-36 lg:mt-40">
                    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-20 min-[390px]:gap-60 md:gap-x-32 md:gap-y-32 lg:gap-y-40 xl:gap-y-48 lg:gap-x-32 min-[1000px]:gap-x-8 min-[1000px]:gap-y-16 min-[1300px]:gap-x-32 min-[1300px]:gap-y-40 xl:gap-x-24 2xl:gap-x-32 justify-items-center w-full max-w-full lg:max-w-[1200px] xl:max-w-[1050px] 2xl:max-w-[980px] px-4 items-center">
                        <PhotoCard imageUrl={s1} name="VIDIT SHARMA" role="SPONSORSHIP HEAD" size="small" instagram="https://www.instagram.com/vidit_sharma.14?igsh=cGd0c3J6NzdqMTBz" email="23uec644@lnmiit.ac.in" />
                        <PhotoCard imageUrl={s2} name="RUDRA BANERJEE" role="SPONSORSHIP HEAD" size="small" instagram="https://www.instagram.com/rudrabanerjee397?igsh=MXUwanBiczZ1c3FnaQ%3D%3D" email="23uec606@lnmiit.ac.in" />
                        <PhotoCard imageUrl={s4} name="ANURAG YADAV" role="SPONSORSHIP HEAD" size="small" instagram="https://www.instagram.com/i_am.anurag?igsh=cjZ1enhrY3d6aGV3" email="23uec519@lnmiit.ac.in" />
                        <PhotoCard imageUrl={s5} name="KARTIKEYA SINGH" role="SPONSORSHIP HEAD" size="small" instagram="https://www.instagram.com/kart.ik_3085?igsh=MWF1eHR4MnI5dmswNQ%3D%3D" email="23ucs612@lnmiit.ac.in" />
                        <PhotoCard imageUrl={s6} name="SAJAL JAGGI" role="SPONSORSHIP HEAD" size="small" instagram="https://www.instagram.com/sajal_jaggi?igsh=OTc3bmttMjZzZTdo" email="23ucs695@lnmiit.ac.in" />
                        <PhotoCard imageUrl={s7} name="JAYESH JHAMNANI" role="SPONSORSHIP HEAD" size="small" instagram="https://www.instagram.com/jayesh._.2309?igsh=MTd5d2RsOXZpaGpvOQ%3D%3D" email="23uec556@lnmiit.ac.in" />
                    </div>
                    <div className="mt-20 sm:mt-28 md:mt-32 lg:mt-40 text-center max-w-[65vw] px-4 mb-8 sm:mb-16">
                        <p className="font-sans font-normal text-[#3d1c10] text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1200px] mx-auto opacity-90" style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
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
            cardHeight: "h-[220vh] min-[370px]:h-[240vh] min-[390px]:h-[180vh] min-[450px]:h-[200vh] min-[500px]:h-[210vh] sm:h-[220vh] md:h-[160vh] lg:h-[200vh] xl:h-[190vh]",
            vogueHands: (
                <>
                    <div ref={banner7Ref} className="absolute top-[30px] md:top-[40px] left-1/2 -translate-x-1/2 z-[15] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={creativeBanner} alt="Creative Team" className="w-[40vw] sm:w-[30vw] md:w-[26vw] lg:w-[22vw] xl:w-[18vw] 2xl:w-[14vw] h-auto" />
                        </div>
                    </div>
                    <div className="absolute bottom-[45px] left-14 sm:left-12 md:left-16 lg:left-20 right-14 sm:right-12 md:right-16 lg:right-20 w-auto flex justify-between items-end pointer-events-none z-30">
                        <img ref={rickshawLeft7Ref} src={rickshaw} className="h-[75px] sm:h-[90px] md:h-[115px] lg:h-[135px] w-auto drop-shadow-xl will-change-transform" alt="Rickshaw" />
                        <img ref={rickshawRight7Ref} src={rickshaw} className="h-[75px] sm:h-[90px] md:h-[115px] lg:h-[135px] w-auto drop-shadow-xl will-change-transform" alt="Rickshaw" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] -mt-2 sm:mt-26 md:mt-32 lg:mt-36">
                    {/* Creative team cards - 2x2 on md, 3+1 on lg+ */}
                    <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-24 min-[390px]:gap-20 md:gap-x-10 md:gap-y-32 lg:gap-28 xl:gap-36 2xl:gap-48 justify-center items-center w-full px-4 mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32 2xl:mb-36">
                        <PhotoCard imageUrl={c1} name="RISHABH SRIVASTAVA" role="CREATIVE HEAD" size="medium" theme="purple" instagram="https://www.instagram.com/roxrishabh_?igsh=M2M3end1NHZtMDgz" email="23ucc625@lnmiit.ac.in" />
                        <PhotoCard imageUrl={c3} name="ADITYA MEHTA" role="CREATIVE HEAD" size="medium" theme="purple" instagram="https://www.instagram.com/aditya.1464_?igsh=ZDlodGM5ZnRwd2R5" email="23uec507@lnmiit.ac.in" />
                        <PhotoCard imageUrl={c2} name="PRASOON AGARWAL" role="CREATIVE HEAD" size="medium" theme="purple" instagram="https://www.instagram.com/prasoon_rcolor?igsh=MXZkdGlxNm03OTU2eg%3D%3D" email="23ume540@lnmiit.ac.in" />
                        <div className="md:block lg:hidden w-full flex justify-center">
                            <PhotoCard imageUrl={c4} name="KRISHNA GOPAL RATHI" role="CREATIVE HEAD" size="medium" theme="purple" instagram="https://www.instagram.com/myselfkgr?igsh=ZGgyMGxnNnU0ZmU%3D" email="23ucs622@lnmiit.ac.in" />
                        </div>
                    </div>
                    {/* Second row: 1 card centered - only visible on lg+ */}
                    <div className="hidden lg:flex justify-center items-center w-full px-4">
                        <PhotoCard imageUrl={c4} name="KRISHNA GOPAL RATHI" role="CREATIVE HEAD" size="medium" theme="purple" instagram="https://www.instagram.com/myselfkgr?igsh=ZGgyMGxnNnU0ZmU%3D" email="23ucs622@lnmiit.ac.in" />
                    </div>
                    <div className="mt-24 sm:mt-32 md:mt-40 lg:mt-52 text-center max-w-[65vw] px-4 mb-6 sm:mb-12">
                        <p className="font-sans font-normal text-black text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1200px] mx-auto opacity-90" style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
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
            cardHeight: "h-[220vh] min-[370px]:h-[240vh] min-[390px]:h-[180vh] min-[450px]:h-[200vh] min-[500px]:h-[210vh] sm:h-[220vh] md:h-[150vh] lg:h-[220vh] xl:h-[210vh]",
            vogueHands: (
                <>
                    <div ref={banner8Ref} className="absolute top-[30px] md:top-[40px] left-1/2 -translate-x-1/2 z-[15] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={prEventsBanner} alt="PR and Events Team" className="w-[38vw] sm:w-[30vw] md:w-[30vw] lg:w-[24vw] xl:w-[20vw] 2xl:w-[14vw] h-auto" />
                        </div>
                    </div>
                    <img
                        ref={vogue5Ref}
                        src={vogue1}
                        className="vogue-img left-10 sm:left-14 md:left-10 lg:left-13 absolute bottom-11 sm:bottom-15 md:bottom-13 h-[100px] sm:h-[125px] md:h-[135px] lg:h-[165px] xl:h-[200px] 2xl:h-[13vw] w-auto pointer-events-none z-50 will-change-transform"
                        alt=""
                    />
                    <img
                        ref={vogue6Ref}
                        src={vogue2}
                        className="right-10 sm:right-14 md:right-10 lg:right-13 absolute bottom-11 sm:bottom-15 md:bottom-13 h-[100px] sm:h-[125px] md:h-[135px] lg:h-[165px] xl:h-[200px] 2xl:h-[13vw] w-auto pointer-events-none z-50 will-change-transform"
                        alt=""
                    />
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] mt-8 sm:mt-32 md:mt-36 lg:mt-40">
                    {/* First row: 3 cards */}
                    {/* First row: 3 cards */}
                    <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-24 min-[390px]:gap-20 md:gap-x-10 md:gap-y-32 lg:gap-28 xl:gap-36 2xl:gap-48 justify-center items-center w-full px-4 mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32 2xl:mb-36">
                        <PhotoCard imageUrl={p1} name="VIKRANT SINGH RATHORE" role="EVENTS HEAD" size="medium" theme="orange" instagram="https://www.instagram.com/vikrant_singh_rathore?igsh=MWxhbDd3OXM4YjJ3ag%3D%3D" email="23ume556@lnmiit.ac.in" />
                        <PhotoCard imageUrl={p2} name="RAGHAV PATHAK" role="EVENTS HEAD" size="medium" theme="orange" instagram="https://www.instagram.com/raghavvpathakk?igsh=MTZwcG05dHN2dzR5bw%3D%3D" email="23ucs685@lnmiit.ac.in" />
                        <PhotoCard imageUrl={p3} name="PARTH GOYAL" role="EVENTS HEAD" size="medium" theme="orange" instagram="https://www.instagram.com/parth.goyal_?igsh=MXQ1ZTZ1ZTB5MjNudw%3D%3D" email="23ucs663@lnmiit.ac.in" />
                        <div className="md:block lg:hidden w-full flex justify-center">
                            <PhotoCard imageUrl={p4} name="TAVISHI VERMA" role="EVENTS HEAD" size="medium" theme="orange" instagram="https://www.instagram.com/tavi_shee?igsh=MTc5dnNsZjFuaTlpYQ%3D%3D" email="23ume549@lnmiit.ac.in" />
                        </div>
                    </div>
                    {/* Second row: 1 card centered */}
                    <div className="hidden lg:flex justify-center items-center w-full px-4">
                        <PhotoCard imageUrl={p4} name="TAVISHI VERMA" role="EVENTS HEAD" size="medium" theme="orange" instagram="https://www.instagram.com/tavi_shee?igsh=MTc5dnNsZjFuaTlpYQ%3D%3D" email="23ume549@lnmiit.ac.in" />
                    </div>
                    <div className="mt-20 sm:mt-20 md:mt-24 lg:mt-52 text-center max-w-[65vw] px-4 mb-8 sm:mb-16">
                        <p className="font-sans font-normal text-black text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1200px] mx-auto opacity-90" style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
                            TEAM MEMBERS - PALLAV SURANA, AADYA RASTOGI, CHINMAY CHANDALIYA, MARDAV JAIN, HARSH MAURYA, MIHIR KUMAWAT, MADHUSUDAN SINGLA, VIDIT PAREKH, ANTRIKSH NAHAR, PALOMA JAIN, LAMIA KHAN, ARJAV JAIN, SHIVIKA BANSAL, ISHIKA, ARNAV DUBEY, SANSKRITI TRIPATHI, AKANSHA GARG, MADHUR JAIN
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'section9',
            ref: section9Ref,
            theme: 'purple-theme',
            bannerImage: operationalBanner,
            bannerAlt: 'Operational Team',
            showHeader: false,
            bannerRef: banner9Ref,
            cardHeight: "h-[220vh] min-[370px]:h-[240vh] min-[390px]:h-[180vh] min-[450px]:h-[200vh] min-[500px]:h-[210vh] sm:h-[220vh] md:h-[150vh] lg:h-[180vh] xl:h-[170vh]",
            vogueHands: (
                <>
                    <div ref={banner9Ref} className="absolute top-[30px] md:top-[40px] left-1/2 -translate-x-1/2 z-[15] pointer-events-none opacity-100">
                        <div className="swing-banner">
                            <img src={operationalBanner} alt="Operational Team" className="w-[32vw] sm:w-[24vw] md:w-[24vw] lg:w-[20vw] xl:w-[16vw] 2xl:w-[12vw] h-auto" />
                        </div>
                    </div>
                    <div className="absolute top-[33px] md:top-[53px] left-0 right-0 w-full px-10 sm:px-12 md:px-14 lg:px-20 xl:px-28 flex justify-between pointer-events-none z-[15]">
                        <img ref={lanternLeftOperationalRef} src={lantern} className="lantern-swing h-[95px] sm:h-[120px] md:h-[145px] lg:h-[180px] xl:h-[215px] 2xl:h-[15vw] w-auto" alt="Lantern" />
                        <img ref={lanternRightOperationalRef} src={lantern} className="lantern-swing h-[95px] sm:h-[120px] md:h-[145px] lg:h-[180px] xl:h-[215px] 2xl:h-[15vw] w-auto " alt="Lantern" />
                    </div>
                    <div className="absolute bottom-[45px] left-14 sm:left-12 md:left-16 lg:left-20 right-14 sm:right-12 md:right-16 lg:right-20 w-auto flex justify-between items-end pointer-events-none z-30">
                        <img ref={rickshawLeft9Ref} src={rickshaw} className="h-[75px] sm:h-[90px] md:h-[115px] lg:h-[135px] w-auto drop-shadow-xl will-change-transform" alt="Rickshaw" />
                        <img ref={rickshawRight9Ref} src={rickshaw} className="h-[75px] sm:h-[90px] md:h-[115px] lg:h-[135px] w-auto drop-shadow-xl will-change-transform" alt="Rickshaw" />
                    </div>
                </>
            ),
            content: (
                <div className="flex flex-col items-center w-full relative z-[2] -mt-12 sm:mt-32 md:mt-36 lg:mt-40">
                    {/* First row: 3 cards */}
                    {/* First row: 3 cards */}
                    <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-24 min-[390px]:gap-20 md:gap-x-12 md:gap-y-32 lg:gap-28 xl:gap-36 2xl:gap-48 justify-center items-center w-full px-4 mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32 2xl:mb-36">
                        <PhotoCard imageUrl={o1} name="HITESH SHEE" role="OPERATIONAL HEAD" size="operational" theme="purple" instagram="https://www.instagram.com/hiteshshee_10557?igsh=MWM2b216dWk1ejB2Zg%3D%3D" email="23ucs594@lnmiit.ac.in" />
                        <PhotoCard imageUrl={o2} name="SHREYANSH AGARWAL" role="OPERATIONAL HEAD" size="operational" theme="purple" instagram="https://www.instagram.com/_shreyansh.10?igsh=YnJ5ZGJ5dzk2ajEx" email="23ucs709@lnmiit.ac.in" />
                        <PhotoCard imageUrl={o3} name="HITESH RAWAT" role="OPERATIONAL HEAD" size="operational" theme="purple" instagram="https://www.instagram.com/its.hitesh_rawat?igsh=MXMxNnV3dGJrajZ0OQ%3D%3D" email="23ucs595@lnmiit.ac.in" />
                        <div className="md:block lg:hidden w-full flex justify-center">
                            <PhotoCard imageUrl={o4} name="PRANJALI MANEK" role="OPERATIONAL HEAD" size="operational" theme="purple" instagram="https://www.instagram.com/_prxjxli_?igsh=MWxnb2IwYnIydzhyMw%3D%3D" email="23dcs507@lnmiit.ac.in" />
                        </div>
                    </div>
                    {/* Second row: 1 card centered */}
                    <div className="hidden lg:flex justify-center items-center w-full px-4">
                        <PhotoCard imageUrl={o4} name="PRANJALI MANEK" role="OPERATIONAL HEAD" size="operational" theme="purple" instagram="https://www.instagram.com/_prxjxli_?igsh=MWxnb2IwYnIydzhyMw%3D%3D" email="23dcs507@lnmiit.ac.in" />
                    </div>
                    <div className="mt-20 sm:mt-28 md:mt-32 lg:mt-40 text-center max-w-[65vw] px-4 mb-8 sm:mb-16">
                        <p className="font-sans font-normal text-black text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem] tracking-[0.05em] uppercase leading-relaxed max-w-[1200px] mx-auto opacity-90" style={{ fontFamily: "'Lemon Milk', sans-serif" }}>
                            TEAM MEMBERS - DHRUV AGARWAL, TANMAY POSWALIA, DIWAS PANDEY, DEVANSH MISHRA
                        </p>
                    </div>
                </div>
            )
        }
    ]
}
