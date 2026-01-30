import { useLayoutEffect, useRef, useEffect } from 'react'
import '../styles/OurTeam.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { getSections } from '../components/ourTeam/SectionsConfig'
import Header from '../components/ourTeam/Header'
import Footer from '../components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

const PageSection = ({ theme, children, showHeader, vogueHands, sectionRef, extraClasses = "", cardHeight = "h-[95vh] md:h-[96vh]" }) => {
    const rayClass = theme.replace('-theme', '-rays');
    return (
        <section ref={sectionRef} className={`w-full min-h-screen flex justify-center items-center py-1 px-2 md:py-2 md:px-6 bg-[#4a0b0a] ${extraClasses}`}>
            <div className={`relative w-full ${cardHeight} rounded-[30px] md:rounded-[80px] overflow-hidden ${theme}`}>
                <div className={`absolute inset-[35px] md:inset-[55px] ${rayClass} z-10 rounded-[20px] md:rounded-[35px]`}></div>
                <div className="stamp-inner-line z-20"></div>
                {/* Camouflaged Hanging Strip to mask chains */}
                <div
                    className="hidden md:block absolute top-[38px] md:top-[35px] left-[35px] md:left-[55px] right-[35px] md:right-[55px] h-[10px] md:h-[20px] z-[25]"
                    style={{
                        backgroundColor: theme.includes('purple') ? '#d1b3ff' : theme.includes('orange') ? '#fcc096' : '#a6e3ff'
                    }}
                ></div>

                {/* Decorative elements pinned to frame */}
                <div className="absolute inset-0 pointer-events-none">
                    {vogueHands}
                </div>

                <div className="relative z-[45] w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden no-scrollbar pt-0">
                    {showHeader && <Header />}
                    <div className="flex-1 flex flex-col justify-center items-center w-full relative z-20 pt-6 md:pt-8 lg:pt-10 overflow-x-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}

function OurTeam() {
    const vogue1Ref = useRef(null)
    const vogue2Ref = useRef(null)

    const section1Ref = useRef(null)
    const section2Ref = useRef(null)
    const section3Ref = useRef(null)
    const section4Ref = useRef(null)
    const section5Ref = useRef(null)
    const section6Ref = useRef(null)
    const section7Ref = useRef(null)
    const section8Ref = useRef(null)
    const section9Ref = useRef(null)

    const lanternLeftRef = useRef(null)
    const lanternRightRef = useRef(null)
    const vogue3Ref = useRef(null)
    const vogue4Ref = useRef(null)
    const lanternLeftSponsorRef = useRef(null)
    const lanternRightSponsorRef = useRef(null)
    const rickshawLeftRef = useRef(null)
    const rickshawRightRef = useRef(null)
    const rickshawLeft7Ref = useRef(null)
    const rickshawRight7Ref = useRef(null)
    const lanternLeftOperationalRef = useRef(null)
    const lanternRightOperationalRef = useRef(null)
    const rickshawLeft9Ref = useRef(null)
    const rickshawRight9Ref = useRef(null)
    const vogue5Ref = useRef(null)
    const vogue6Ref = useRef(null)
    const vogue7Ref = useRef(null)
    const vogue8Ref = useRef(null)
    const banner1Ref = useRef(null)
    const banner2Ref = useRef(null)
    const banner3Ref = useRef(null)
    const banner4Ref = useRef(null)
    const banner6Ref = useRef(null)
    const banner7Ref = useRef(null)
    const banner8Ref = useRef(null)
    const banner9Ref = useRef(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        // Custom Snapping Logic
        const sections = [
            section1Ref.current,
            section2Ref.current,
            section3Ref.current,
            section4Ref.current,
            section5Ref.current,
            section6Ref.current,
            section7Ref.current,
            section8Ref.current
        ]

        // Snapping logic removed for continuous smooth scroll

        return () => {
            lenis.destroy()
            gsap.ticker.remove(lenis.raf)
        }
    }, [])

    useEffect(() => {
        document.body.classList.add('our-team-page')
        return () => {
            document.body.classList.remove('our-team-page')
        }
    }, [])

    useLayoutEffect(() => {
        ScrollTrigger.defaults({ scroller: window });

        const revealSet = [
            { hands: [vogue1Ref, vogue2Ref], section: section1Ref },
            { hands: [vogue3Ref, vogue4Ref], section: section6Ref },
            { hands: [vogue5Ref, vogue6Ref], section: section8Ref },
            { ships: [rickshawLeftRef, rickshawRightRef], section: section3Ref },
            { ships: [rickshawLeft7Ref, rickshawRight7Ref], section: section7Ref },
            { ships: [rickshawLeft9Ref, rickshawRight9Ref], section: section9Ref }
        ];

        // Initial setup - hide everything
        revealSet.forEach(item => {
            const elements = item.hands || item.ships;
            if (elements[0].current && elements[1].current) {
                gsap.set(elements[0].current, { opacity: 0, y: 100 });
                gsap.set(elements[1].current, { opacity: 0, y: 100 });

                // Specifically flip left side rickshaws
                if (item.ships) {
                    gsap.set(elements[0].current, { scaleX: -1 });
                }
            }
        });

        const getMovement = () => {
            const vw = window.innerWidth;
            if (vw < 480) return 300;
            if (vw < 768) return 400;
            return 500;
        };

        // Create individual animations for each section
        revealSet.forEach(item => {
            const elements = item.hands || item.ships;
            const left = elements[0].current;
            const right = elements[1].current;
            const triggerSection = item.section.current;

            if (left && right && triggerSection) {
                // Entry animation (Slide up and fade in)
                gsap.fromTo([left, right],
                    { opacity: 0, y: 100 },
                    { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.3 }
                );

                // Scrub animation (Spread outward)
                const movement = getMovement();

                gsap.to(left, {
                    x: -movement,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerSection,
                        start: "bottom bottom",
                        end: "bottom 40%",
                        scrub: true
                    }
                });

                gsap.to(right, {
                    x: movement,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerSection,
                        start: "bottom bottom",
                        end: "bottom 40%",
                        scrub: true
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    useLayoutEffect(() => {
        const handleResize = () => { ScrollTrigger.refresh() }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const sections = getSections({
        section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref, section7Ref, section8Ref, section9Ref,
        banner1Ref, banner2Ref, banner3Ref, banner4Ref, banner6Ref, banner7Ref, banner8Ref, banner9Ref,
        vogue1Ref, vogue2Ref, vogue3Ref, vogue4Ref, vogue5Ref, vogue6Ref, vogue7Ref, vogue8Ref,
        lanternLeftRef, lanternRightRef, lanternLeftSponsorRef, lanternRightSponsorRef, lanternLeftOperationalRef, lanternRightOperationalRef,
        rickshawLeftRef, rickshawRightRef, rickshawLeft7Ref, rickshawRight7Ref, rickshawLeft9Ref, rickshawRight9Ref
    })

    return (
        <main className="w-full relative bg-[#4a0b0a]">
            {sections.map((section) => (
                <PageSection
                    key={section.id}
                    sectionRef={section.ref}
                    theme={section.theme}
                    bannerImage={section.bannerImage}
                    bannerAlt={section.bannerAlt}
                    showHeader={section.showHeader}
                    vogueHands={section.vogueHands}
                    extraClasses={section.extraClasses}
                    cardHeight={section.cardHeight}
                >
                    {section.content}
                </PageSection>
            ))}
            <Footer />
        </main >
    )
}

export default OurTeam
