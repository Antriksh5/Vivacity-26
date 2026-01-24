import { useLayoutEffect, useRef, useEffect } from 'react'
import '../styles/OurTeam.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { getSections } from '../components/ourTeam/SectionsConfig'
import Header from '../components/ourTeam/Header'
import Footer from '../components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

const PageSection = ({ theme, children, showHeader, vogueHands, sectionRef, extraClasses = "" }) => {
    const rayClass = theme.replace('-theme', '-rays');
    return (
        <section ref={sectionRef} className={`w-full min-h-screen flex justify-center items-center py-1 px-2 md:py-2 md:px-6 bg-[#4a0b0a] ${extraClasses}`}>
            <div className={`relative w-full h-[95vh] md:h-[96vh] rounded-[30px] md:rounded-[80px] overflow-hidden ${theme}`}>
                <div className={`absolute inset-[35px] md:inset-[55px] ${rayClass} z-10 rounded-[20px] md:rounded-[35px]`}></div>
                <div className="stamp-inner-line z-20"></div>

                {/* Decorative elements pinned to frame */}
                <div className="absolute inset-0 z-40 pointer-events-none">
                    {vogueHands}
                </div>

                <div className="relative z-30 w-full h-full flex flex-col items-center overflow-y-auto no-scrollbar pt-2">
                    {showHeader && <Header />}
                    <div className="flex-1 flex flex-col justify-center items-center w-full relative z-20 pt-12">
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
        // Reset defaults to window for standard scrolling
        ScrollTrigger.defaults({ scroller: window });

        if (vogue1Ref.current && vogue2Ref.current) {
            gsap.fromTo([vogue1Ref.current, vogue2Ref.current],
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
            );
        }

        if (vogue1Ref.current && vogue2Ref.current && section1Ref.current) {
            const getHandMovement = () => {
                const vw = window.innerWidth;
                if (vw < 480) return 300;
                if (vw < 768) return 400;
                return 500;
            };

            const handMovement = getHandMovement();

            gsap.fromTo(vogue1Ref.current, { x: 0 }, {
                x: -handMovement,
                ease: "none",
                scrollTrigger: {
                    trigger: section1Ref.current,
                    start: "bottom bottom",
                    end: "bottom 60%",
                    scrub: true
                }
            });

            gsap.fromTo(vogue2Ref.current, { x: 0 }, {
                x: handMovement,
                ease: "none",
                scrollTrigger: {
                    trigger: section1Ref.current,
                    start: "bottom bottom",
                    end: "bottom 60%",
                    scrub: true
                }
            });
        }

        // Scroll reveal animation removed for section 2 banners and lanterns

        // Scroll reveal animations removed for all banners and lanterns to keep them constant

        // Scroll reveal animation removed for section 4 banners and lanterns

        if (section4Ref.current) {
            gsap.set([vogue7Ref.current, vogue8Ref.current], { opacity: 0, y: 100 });

            ScrollTrigger.create({
                trigger: section4Ref.current,
                start: "top 95%",
                end: "bottom 5%",
                onEnter: () => {
                    gsap.to([vogue7Ref.current, vogue8Ref.current], { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
                },
                onLeave: () => {
                    gsap.to([vogue7Ref.current, vogue8Ref.current], { opacity: 0, duration: 0.3 });
                },
                onEnterBack: () => {
                    gsap.to([vogue7Ref.current, vogue8Ref.current], { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
                },
                onLeaveBack: () => {
                    gsap.to([vogue7Ref.current, vogue8Ref.current], { opacity: 0, duration: 0.3 });
                }
            });

            // Section 4 Hand Scroll Animation (Sideways)
            const getHandMovement = () => {
                const vw = window.innerWidth;
                if (vw < 480) return 500;
                if (vw < 768) return 700;
                return 1000;
            };
            const handMovement = getHandMovement();

            gsap.fromTo(vogue7Ref.current, { x: 0 }, {
                x: -handMovement,
                ease: "none",
                scrollTrigger: {
                    trigger: section4Ref.current,
                    start: "bottom bottom",
                    end: "bottom 60%",
                    scrub: true
                }
            });

            gsap.fromTo(vogue8Ref.current, { x: 0 }, {
                x: handMovement,
                ease: "none",
                scrollTrigger: {
                    trigger: section4Ref.current,
                    start: "bottom bottom",
                    end: "bottom 60%",
                    scrub: true
                }
            });
        }

        if (section6Ref.current) {
            gsap.set([vogue3Ref.current, vogue4Ref.current], { opacity: 0, y: 100 });

            ScrollTrigger.create({
                trigger: section6Ref.current,
                start: "top 95%",
                end: "bottom 5%",
                onEnter: () => {
                    gsap.to([vogue3Ref.current, vogue4Ref.current], { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
                },
                onLeave: () => {
                    gsap.to([vogue3Ref.current, vogue4Ref.current], { opacity: 0, duration: 0.3 });
                },
                onEnterBack: () => {
                    gsap.to([vogue3Ref.current, vogue4Ref.current], { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
                },
                onLeaveBack: () => {
                    gsap.to([vogue3Ref.current, vogue4Ref.current], { opacity: 0, duration: 0.3 });
                }
            });
        }

        // Rickshaw animations removed

        // Scroll reveal animations removed

        if (section8Ref.current) {
            gsap.set([vogue5Ref.current, vogue6Ref.current], { opacity: 0, y: 100 });

            ScrollTrigger.create({
                trigger: section8Ref.current,
                start: "top 95%",
                end: "bottom 5%",
                onEnter: () => {
                    gsap.to([vogue5Ref.current, vogue6Ref.current], { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
                },
                onLeave: () => {
                    gsap.to([vogue5Ref.current, vogue6Ref.current], { opacity: 0, duration: 0.3 });
                },
                onEnterBack: () => {
                    gsap.to([vogue5Ref.current, vogue6Ref.current], { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
                },
                onLeaveBack: () => {
                    gsap.to([vogue5Ref.current, vogue6Ref.current], { opacity: 0, duration: 0.3 });
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    useLayoutEffect(() => {
        const handleResize = () => { ScrollTrigger.refresh() }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const sections = getSections({
        section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref, section7Ref, section8Ref,
        banner1Ref, banner2Ref, banner3Ref, banner4Ref, banner6Ref, banner7Ref, banner8Ref,
        vogue1Ref, vogue2Ref, vogue3Ref, vogue4Ref, vogue5Ref, vogue6Ref, vogue7Ref, vogue8Ref,
        lanternLeftRef, lanternRightRef, lanternLeftSponsorRef, lanternRightSponsorRef,
        rickshawLeftRef, rickshawRightRef, rickshawLeft7Ref, rickshawRight7Ref
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
                >
                    {section.content}
                </PageSection>
            ))}
            <Footer />
        </main >
    )
}

export default OurTeam
