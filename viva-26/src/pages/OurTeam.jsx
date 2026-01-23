import { useLayoutEffect, useRef, useEffect } from 'react'
import '../styles/OurTeam.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getSections } from '../components/ourTeam/SectionsConfig'
import Header from '../components/ourTeam/Header'

gsap.registerPlugin(ScrollTrigger)

const PageSection = ({ theme, bannerImage, bannerAlt, children, showHeader, vogueHands, sectionRef }) => {
    return (
        <section ref={sectionRef} className={`w-full min-h-screen flex flex-col items-center px-3 sm:px-4 md:px-12 lg:px-16 pb-12 sm:pb-14 md:pb-16 relative z-10 overflow-hidden ${theme}`}>
            {vogueHands}

            {showHeader && (
                <Header />
            )}



            <div className="flex-1 flex flex-col justify-center items-center w-full relative z-20 pt-12">
                {children}
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

    const bgOrangeRef = useRef(null)
    const bgBlueRef = useRef(null)
    const bgPurpleRef = useRef(null)
    const bgSponsorRef = useRef(null)

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
    const banner1Ref = useRef(null)
    const banner2Ref = useRef(null)
    const banner3Ref = useRef(null)
    const banner4Ref = useRef(null)
    const banner6Ref = useRef(null)
    const banner7Ref = useRef(null)
    const banner8Ref = useRef(null)

    useEffect(() => {
        document.body.classList.add('our-team-page')
        return () => {
            document.body.classList.remove('our-team-page')
        }
    }, [])

    useLayoutEffect(() => {

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

            gsap.fromTo(
                vogue1Ref.current,
                { x: 0 },
                {
                    x: -handMovement,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section1Ref.current,
                        start: "bottom bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );


            gsap.fromTo(
                vogue2Ref.current,
                { x: 0 },
                {
                    x: handMovement,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section1Ref.current,
                        start: "bottom bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );

        }

        if (section2Ref.current) {
            gsap.set([lanternLeftRef.current, lanternRightRef.current], { opacity: 0 });

            ScrollTrigger.create({
                trigger: section2Ref.current,
                start: "top 20%",
                end: "bottom 20%",
                onEnter: () => gsap.to([lanternLeftRef.current, lanternRightRef.current], { opacity: 1, duration: 0.5 }),
                onLeave: () => gsap.to([lanternLeftRef.current, lanternRightRef.current], { opacity: 0, duration: 0.5 }),
                onEnterBack: () => gsap.to([lanternLeftRef.current, lanternRightRef.current], { opacity: 1, duration: 0.5 }),
                onLeaveBack: () => gsap.to([lanternLeftRef.current, lanternRightRef.current], { opacity: 0, duration: 0.5 }),
            });


            gsap.set(banner2Ref.current, { opacity: 0 });
            ScrollTrigger.create({
                trigger: section2Ref.current,
                start: "top 20%",
                end: "bottom 20%",
                onToggle: self => gsap.to(banner2Ref.current, { opacity: self.isActive ? 1 : 0, duration: 0.5, ease: "power2.inOut" })
            });
        }


        if (section1Ref.current) {
            gsap.set(banner1Ref.current, { opacity: 1 });
            ScrollTrigger.create({
                trigger: section1Ref.current,
                start: "top 20%",
                end: "bottom 20%",
                onToggle: self => gsap.to(banner1Ref.current, { opacity: self.isActive ? 1 : 0, duration: 0.5, ease: "power2.inOut" })
            });
        }


        if (section3Ref.current) {
            gsap.set(banner3Ref.current, { opacity: 0 });
            ScrollTrigger.create({
                trigger: section3Ref.current,
                start: "top 20%",
                end: "bottom 20%",
                onToggle: self => gsap.to(banner3Ref.current, { opacity: self.isActive ? 1 : 0, duration: 0.5, ease: "power2.inOut" })
            });
        }


        if (section4Ref.current) {
            gsap.set(banner4Ref.current, { opacity: 0 });
            gsap.set([lanternLeftSponsorRef.current, lanternRightSponsorRef.current], { opacity: 0 });


            ScrollTrigger.create({
                trigger: section4Ref.current,
                start: "top 20%",
                end: "bottom 20%",
                onToggle: self => gsap.to(banner4Ref.current, { opacity: self.isActive ? 1 : 0, duration: 0.5, ease: "power2.inOut" })
            });


            ScrollTrigger.create({
                trigger: section4Ref.current,
                start: "top 20%",
                end: "bottom 20%",
                onEnter: () => gsap.to([lanternLeftSponsorRef.current, lanternRightSponsorRef.current], { opacity: 1, duration: 0.5 }),
                onLeave: () => gsap.to([lanternLeftSponsorRef.current, lanternRightSponsorRef.current], { opacity: 0, duration: 0.5 }),
                onEnterBack: () => gsap.to([lanternLeftSponsorRef.current, lanternRightSponsorRef.current], { opacity: 1, duration: 0.5 }),
                onLeaveBack: () => gsap.to([lanternLeftSponsorRef.current, lanternRightSponsorRef.current], { opacity: 0, duration: 0.5 }),
            });
        }


        if (section6Ref.current) {
            gsap.set(banner6Ref.current, { opacity: 0 });
            gsap.set([vogue3Ref.current, vogue4Ref.current], { opacity: 0, y: 100 });

            ScrollTrigger.create({
                trigger: section6Ref.current,
                start: "top 20%",
                end: "bottom 20%",
                onEnter: () => {
                    gsap.to(banner6Ref.current, { opacity: 1, duration: 0.5 });
                    gsap.to([vogue3Ref.current, vogue4Ref.current], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
                },
                onLeave: () => {
                    gsap.to(banner6Ref.current, { opacity: 0, duration: 0.5 });
                    gsap.to([vogue3Ref.current, vogue4Ref.current], { opacity: 0, duration: 0.5 });
                },
                onEnterBack: () => {
                    gsap.to(banner6Ref.current, { opacity: 1, duration: 0.5 });
                    gsap.to([vogue3Ref.current, vogue4Ref.current], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
                },
                onLeaveBack: () => {
                    gsap.to(banner6Ref.current, { opacity: 0, duration: 0.5 });
                    gsap.to([vogue3Ref.current, vogue4Ref.current], { opacity: 0, duration: 0.5 });
                }
            });
        }

        if (rickshawLeftRef.current && rickshawRightRef.current && section3Ref.current) {
            const getResponsiveMovement = () => {
                const vw = window.innerWidth;
                if (vw < 480) return { start: -150, end: vw - 250 };
                if (vw < 768) return { start: -180, end: vw - 300 };
                return { start: -200, end: vw - 450 };
            };

            const movement = getResponsiveMovement();


            gsap.fromTo(rickshawLeftRef.current,
                { x: movement.start },
                {
                    x: movement.end,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section3Ref.current,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: 5,
                    }
                }
            );


            gsap.fromTo(rickshawRightRef.current,
                { x: -movement.start },
                {
                    x: -movement.end,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section3Ref.current,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: 5,
                    }
                }
            );
        }


        if (section7Ref.current) {
            gsap.set(banner7Ref.current, { opacity: 0 });
            ScrollTrigger.create({
                trigger: section7Ref.current,
                start: "top 20%",
                end: "bottom 20%",
                onToggle: self => gsap.to(banner7Ref.current, { opacity: self.isActive ? 1 : 0, duration: 0.5, ease: "power2.inOut" })
            });
        }


        if (section8Ref.current) {
            gsap.set(banner8Ref.current, { opacity: 0 });
            gsap.set([vogue5Ref.current, vogue6Ref.current], { opacity: 0, y: 100 });

            ScrollTrigger.create({
                trigger: section8Ref.current,
                start: "top 20%",
                end: "bottom 20%",
                onEnter: () => {
                    gsap.to(banner8Ref.current, { opacity: 1, duration: 0.5 });
                    gsap.to([vogue5Ref.current, vogue6Ref.current], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
                },
                onLeave: () => {
                    gsap.to(banner8Ref.current, { opacity: 0, duration: 0.5 });
                    gsap.to([vogue5Ref.current, vogue6Ref.current], { opacity: 0, duration: 0.5 });
                },
                onEnterBack: () => {
                    gsap.to(banner8Ref.current, { opacity: 1, duration: 0.5 });
                    gsap.to([vogue5Ref.current, vogue6Ref.current], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
                },
                onLeaveBack: () => {
                    gsap.to(banner8Ref.current, { opacity: 0, duration: 0.5 });
                    gsap.to([vogue5Ref.current, vogue6Ref.current], { opacity: 0, duration: 0.5 });
                }
            });
        }

        gsap.set(bgOrangeRef.current, { opacity: 1, zIndex: 1 });
        gsap.set(bgBlueRef.current, { opacity: 0, zIndex: 2 });
        gsap.set(bgPurpleRef.current, { opacity: 0, zIndex: 3 });
        gsap.set(bgSponsorRef.current, { opacity: 0, zIndex: 4 });

        ScrollTrigger.create({
            trigger: section2Ref.current,
            start: "top 70%",
            onToggle: self => {
                gsap.to(bgBlueRef.current, { opacity: self.isActive ? 1 : 0, duration: 0.4, ease: "power2.inOut" });
            }
        });


        ScrollTrigger.create({
            trigger: section3Ref.current,
            start: "top 70%",
            onToggle: self => {
                gsap.to(bgPurpleRef.current, { opacity: self.isActive ? 1 : 0, duration: 0.4, ease: "power2.inOut" });
            }
        });


        ScrollTrigger.create({
            trigger: section4Ref.current,
            start: "top 70%",
            endTrigger: section5Ref.current,
            end: "bottom 50%",
            onToggle: self => {
                gsap.to(bgSponsorRef.current, { opacity: self.isActive ? 1 : 0, duration: 0.4, ease: "power2.inOut" });
            }
        });


        ScrollTrigger.create({
            trigger: section7Ref.current,
            start: "top 70%",
            onToggle: self => {
                gsap.to(bgPurpleRef.current, { opacity: self.isActive ? 1 : 0, duration: 0.4, ease: "power2.inOut" });
            }
        });

        ScrollTrigger.create({
            trigger: section6Ref.current,
            start: "top 70%",
            onToggle: self => {
                if (self.isActive) {
                    gsap.to(bgPurpleRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
                    gsap.to(bgBlueRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
                }
            }
        });

        ScrollTrigger.create({
            trigger: section8Ref.current,
            start: "top 70%",
            onToggle: self => {
                if (self.isActive) {
                    gsap.to(bgPurpleRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
                    gsap.to(bgBlueRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
                }
            }
        });

        ScrollTrigger.create({
            trigger: section4Ref.current,
            start: "top bottom",
            end: "top center",
            onEnter: () => document.body.classList.add('hide-frame-bottom'),
            onLeaveBack: () => document.body.classList.remove('hide-frame-bottom')
        });

        ScrollTrigger.create({
            trigger: section5Ref.current,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                document.body.classList.remove('hide-frame-bottom');
                document.body.classList.add('hide-frame-top');
            },
            onLeave: () => {
                document.body.classList.remove('hide-frame-top');
            },
            onEnterBack: () => {
                document.body.classList.remove('hide-frame-bottom');
                document.body.classList.add('hide-frame-top');
            },
            onLeaveBack: () => {
                document.body.classList.remove('hide-frame-top');
                document.body.classList.add('hide-frame-bottom');
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    useLayoutEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh()
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    const sections = getSections({
        section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref, section7Ref, section8Ref,
        banner1Ref, banner2Ref, banner3Ref, banner4Ref, banner6Ref, banner7Ref, banner8Ref,
        vogue1Ref, vogue2Ref, vogue3Ref, vogue4Ref, vogue5Ref, vogue6Ref,
        lanternLeftRef, lanternRightRef, lanternLeftSponsorRef, lanternRightSponsorRef,
        rickshawLeftRef, rickshawRightRef, rickshawLeft7Ref, rickshawRight7Ref
    })


    return (
        <main className="w-full relative">
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <div ref={bgOrangeRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] bg-gradient-orange transition-opacity duration-0" />
                <div ref={bgBlueRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] bg-gradient-blue transition-opacity duration-0" />
                <div ref={bgPurpleRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] bg-gradient-purple transition-opacity duration-0" />
                <div ref={bgSponsorRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] bg-gradient-blue transition-opacity duration-0" />
            </div>

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

        </main >
    )
}

export default OurTeam
