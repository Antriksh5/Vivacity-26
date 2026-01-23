import { useLayoutEffect, useRef, useEffect } from 'react'
import '../styles/OurTeam.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GetSections } from '../components/ourTeam/SectionsConfig.jsx'
import Header from '../components/ourTeam/Header.jsx'

gsap.registerPlugin(ScrollTrigger)

const PageSection = ({ theme, bannerImage, bannerAlt, children, vogueHands, sectionRef }) => {
    return (
        <section ref={sectionRef} className={`w-full min-h-screen flex flex-col items-center px-3 sm:px-4 md:px-12 lg:px-16 pb-12 sm:pb-14 md:pb-16 relative z-10 overflow-hidden ${theme}`}>
            {vogueHands}
            
            {/* Removed internal Header check to avoid duplicates.
                Increased padding (pt-32) so content clears the global absolute Header. 
            */}
            <div className="flex-1 flex flex-col justify-center items-center w-full relative z-20 pt-32 sm:pt-40">
                {children}
            </div>
        </section>
    )
}

function OurTeam() {
    const scrollContainerRef = useRef(null)

    // Refs
    const vogue1Ref = useRef(null); const vogue2Ref = useRef(null);
    const section1Ref = useRef(null); const section2Ref = useRef(null); const section3Ref = useRef(null);
    const section4Ref = useRef(null); const section5Ref = useRef(null); const section6Ref = useRef(null);
    const section7Ref = useRef(null); const section8Ref = useRef(null);
    const bgOrangeRef = useRef(null); const bgBlueRef = useRef(null); const bgPurpleRef = useRef(null); const bgSponsorRef = useRef(null);
    const lanternLeftRef = useRef(null); const lanternRightRef = useRef(null);
    const vogue3Ref = useRef(null); const vogue4Ref = useRef(null);
    const lanternLeftSponsorRef = useRef(null); const lanternRightSponsorRef = useRef(null);
    const rickshawLeftRef = useRef(null); const rickshawRightRef = useRef(null);
    const rickshawLeft7Ref = useRef(null); const rickshawRight7Ref = useRef(null);
    const vogue5Ref = useRef(null); const vogue6Ref = useRef(null);
    const banner1Ref = useRef(null); const banner2Ref = useRef(null); const banner3Ref = useRef(null);
    const banner4Ref = useRef(null); const banner6Ref = useRef(null); const banner7Ref = useRef(null); const banner8Ref = useRef(null);

    useEffect(() => {
        document.body.classList.add('our-team-page')
        return () => document.body.classList.remove('our-team-page')
    }, [])

    useLayoutEffect(() => {
        if (scrollContainerRef.current) {
            ScrollTrigger.defaults({ scroller: scrollContainerRef.current });
        }

        // --- Animations ---
        if (vogue1Ref.current && vogue2Ref.current) {
            gsap.fromTo([vogue1Ref.current, vogue2Ref.current], { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 });
        }

        if (vogue1Ref.current && vogue2Ref.current && section1Ref.current) {
            const handMovement = window.innerWidth < 768 ? 400 : 500;
            gsap.fromTo(vogue1Ref.current, { x: 0 }, { x: -handMovement, ease: "none", scrollTrigger: { trigger: section1Ref.current, start: "bottom bottom", end: "bottom top", scrub: true } });
            gsap.fromTo(vogue2Ref.current, { x: 0 }, { x: handMovement, ease: "none", scrollTrigger: { trigger: section1Ref.current, start: "bottom bottom", end: "bottom top", scrub: true } });
        }

        if (section2Ref.current) {
            gsap.set([lanternLeftRef.current, lanternRightRef.current], { opacity: 0 });
            ScrollTrigger.create({
                trigger: section2Ref.current, start: "top 20%", end: "bottom 20%",
                onEnter: () => gsap.to([lanternLeftRef.current, lanternRightRef.current], { opacity: 1, duration: 0.5 }),
                onLeave: () => gsap.to([lanternLeftRef.current, lanternRightRef.current], { opacity: 0, duration: 0.5 }),
                onEnterBack: () => gsap.to([lanternLeftRef.current, lanternRightRef.current], { opacity: 1, duration: 0.5 }),
                onLeaveBack: () => gsap.to([lanternLeftRef.current, lanternRightRef.current], { opacity: 0, duration: 0.5 }),
            });
            gsap.set(banner2Ref.current, { opacity: 0 });
            ScrollTrigger.create({
                trigger: section2Ref.current, start: "top 20%", end: "bottom 20%",
                onToggle: self => gsap.to(banner2Ref.current, { opacity: self.isActive ? 1 : 0, duration: 0.5, ease: "power2.inOut" })
            });
        }
        
        const setupBannerTrigger = (sectionRef, bannerRef) => {
             if(sectionRef.current) {
                gsap.set(bannerRef.current, { opacity: 0 });
                ScrollTrigger.create({
                    trigger: sectionRef.current, start: "top 20%", end: "bottom 20%",
                    onToggle: self => gsap.to(bannerRef.current, { opacity: self.isActive ? 1 : 0, duration: 0.5, ease: "power2.inOut" })
                });
             }
        }
        setupBannerTrigger(section3Ref, banner3Ref);
        setupBannerTrigger(section4Ref, banner4Ref);
        setupBannerTrigger(section7Ref, banner7Ref);
        
        if (section1Ref.current) {
             gsap.set(banner1Ref.current, { opacity: 1 });
             ScrollTrigger.create({
                trigger: section1Ref.current, start: "top 20%", end: "bottom 20%",
                onToggle: self => gsap.to(banner1Ref.current, { opacity: self.isActive ? 1 : 0, duration: 0.5, ease: "power2.inOut" })
            });
        }

        if(section4Ref.current) {
            gsap.set([lanternLeftSponsorRef.current, lanternRightSponsorRef.current], { opacity: 0 });
             ScrollTrigger.create({
                trigger: section4Ref.current, start: "top 20%", end: "bottom 20%",
                onEnter: () => gsap.to([lanternLeftSponsorRef.current, lanternRightSponsorRef.current], { opacity: 1, duration: 0.5 }),
                onLeave: () => gsap.to([lanternLeftSponsorRef.current, lanternRightSponsorRef.current], { opacity: 0, duration: 0.5 }),
                onEnterBack: () => gsap.to([lanternLeftSponsorRef.current, lanternRightSponsorRef.current], { opacity: 1, duration: 0.5 }),
                onLeaveBack: () => gsap.to([lanternLeftSponsorRef.current, lanternRightSponsorRef.current], { opacity: 0, duration: 0.5 }),
            });
        }
        
        const setupVogueTrigger = (sectionRef, bannerRef, vogues) => {
             if (sectionRef.current) {
                gsap.set(bannerRef.current, { opacity: 0 });
                gsap.set(vogues, { opacity: 0, y: 100 });
                ScrollTrigger.create({
                    trigger: sectionRef.current, start: "top 20%", end: "bottom 20%",
                    onEnter: () => { gsap.to(bannerRef.current, { opacity: 1, duration: 0.5 }); gsap.to(vogues, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }); },
                    onLeave: () => { gsap.to(bannerRef.current, { opacity: 0, duration: 0.5 }); gsap.to(vogues, { opacity: 0, duration: 0.5 }); },
                    onEnterBack: () => { gsap.to(bannerRef.current, { opacity: 1, duration: 0.5 }); gsap.to(vogues, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }); },
                    onLeaveBack: () => { gsap.to(bannerRef.current, { opacity: 0, duration: 0.5 }); gsap.to(vogues, { opacity: 0, duration: 0.5 }); }
                });
            }
        }
        setupVogueTrigger(section6Ref, banner6Ref, [vogue3Ref.current, vogue4Ref.current]);
        setupVogueTrigger(section8Ref, banner8Ref, [vogue5Ref.current, vogue6Ref.current]);

        if (rickshawLeftRef.current && rickshawRightRef.current && section3Ref.current) {
            const movement = window.innerWidth < 480 ? 250 : 450;
            gsap.fromTo(rickshawLeftRef.current, { x: -200 }, { x: window.innerWidth - movement, ease: "none", scrollTrigger: { trigger: section3Ref.current, start: "top bottom", end: "bottom bottom", scrub: 5 } });
            gsap.fromTo(rickshawRightRef.current, { x: 200 }, { x: -(window.innerWidth - movement), ease: "none", scrollTrigger: { trigger: section3Ref.current, start: "top bottom", end: "bottom bottom", scrub: 5 } });
        }

        // Background Toggles
        gsap.set(bgOrangeRef.current, { opacity: 1, zIndex: 1 });
        gsap.set([bgBlueRef.current, bgPurpleRef.current, bgSponsorRef.current], { opacity: 0, zIndex: 2 });
        
        const setupBgToggle = (triggerRef, bgRef) => {
            ScrollTrigger.create({
                trigger: triggerRef, start: "top 70%",
                onToggle: self => gsap.to(bgRef, { opacity: self.isActive ? 1 : 0, duration: 0.4, ease: "power2.inOut" })
            });
        }
        setupBgToggle(section2Ref.current, bgBlueRef.current);
        setupBgToggle(section3Ref.current, bgPurpleRef.current);
        
        ScrollTrigger.create({
            trigger: section4Ref.current, start: "top 70%", endTrigger: section5Ref.current, end: "bottom 50%",
            onToggle: self => gsap.to(bgSponsorRef.current, { opacity: self.isActive ? 1 : 0, duration: 0.4, ease: "power2.inOut" })
        });
        
        setupBgToggle(section7Ref.current, bgPurpleRef.current);

        return () => {
            ScrollTrigger.defaults({ scroller: window });
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    useLayoutEffect(() => {
        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const sections = GetSections({
        section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref, section7Ref, section8Ref,
        banner1Ref, banner2Ref, banner3Ref, banner4Ref, banner6Ref, banner7Ref, banner8Ref,
        vogue1Ref, vogue2Ref, vogue3Ref, vogue4Ref, vogue5Ref, vogue6Ref,
        lanternLeftRef, lanternRightRef, lanternLeftSponsorRef, lanternRightSponsorRef,
        rickshawLeftRef, rickshawRightRef, rickshawLeft7Ref, rickshawRight7Ref
    })

    return (
        
        <div className="fixed inset-0 w-full h-full bg-[#5d2a1c] flex justify-center items-center py-4 px-3 sm:py-8 sm:px-6 z-0">
            
            <div className="relative w-[95vw] h-[90vh] stamp-border p-6 box-border z-10 flex flex-col">

                <div 
                    ref={scrollContainerRef} 
                    className="relative w-full h-full rounded-[2rem] border-[3px] border-[#9E5D47] overflow-y-auto overflow-x-hidden bg-[#f7d0ab] no-scrollbar scroll-smooth"
                >
                    {/* GLOBAL NAV HEADER 
                        1. Changed 'sticky' to 'absolute'. This puts it at the top of the scrollable area.
                        2. Added 'top-0 left-0 w-full' to position it correctly.
                        3. 'z-50' ensures it is above backgrounds.
                        4. Since it is absolute inside a scrolling container, it will scroll UP with the content.
                    */}
                    <div className="absolute top-0 left-0 w-full z-50 pt-4 px-2 pointer-events-none">
                        <div className="pointer-events-auto flex justify-center w-full">
                            <Header />
                        </div>
                    </div>

                    {/* FIXED BACKGROUNDS (Sticky) */}
                    <div className="sticky top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                        <div ref={bgOrangeRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] bg-gradient-orange transition-opacity duration-0" />
                        <div ref={bgBlueRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] bg-gradient-blue transition-opacity duration-0" />
                        <div ref={bgPurpleRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] bg-gradient-purple transition-opacity duration-0" />
                        <div ref={bgSponsorRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] bg-gradient-blue transition-opacity duration-0" />
                    </div>

                    {/* SCROLLABLE CONTENT */}
                    <main className="w-full relative z-10 -mt-[100vh]">
                         {sections.map((section) => (
                            <PageSection
                                key={section.id}
                                sectionRef={section.ref}
                                theme={section.theme}
                                bannerImage={section.bannerImage}
                                bannerAlt={section.bannerAlt}
                                showHeader={section.showHeader}
                                vogueHands={section.vogueHands}
                            >
                                {section.content}
                            </PageSection>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default OurTeam