import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import VivaCountdown from '../components/LandingPage/VivaCountdown';
import AboutViva from '../components/LandingPage/AboutViva';
import AboutTheme from '../components/LandingPage/AboutTheme';
import Landing from './Landing';
import CursorLetterTrail from './CursorLetterTrail';
import { GateAnimationFrames, GateAnimationFramesPriority } from '../utils/cloudinaryUrls';
import '../styles/LandingPage.css';

// Tediux Promotional Banner Component
const TediuxBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="tediux-banner">
            <div className="tediux-banner-content">
                <div className="tediux-banner-lights left"></div>
                <div className="tediux-banner-text">
                    <span className="tediux-sparkle">✨</span>
                    <span className="tediux-main-text">
                        Love this <span className="tediux-highlight">carnival magic</span>?&nbsp; We craft digital experiences that dazzle!
                    </span>
                    <span className="tediux-sparkle">🎪</span>
                </div>
                <a
                    href="https://tediux.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tediux-banner-btn"
                >
                    <span>Visit Tediux</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                    </svg>
                </a>
                <div className="tediux-banner-lights right"></div>
            </div>
        </div>
    );
};

gsap.registerPlugin(ScrollTrigger);

// Use Cloudinary-hosted frames for better performance
const frameUrls = GateAnimationFrames;


const LandingPage = () => {
    const mainRef = useRef(null);
    const triggerRef = useRef(null);
    const canvasRef = useRef(null);
    const aboutVivaRef = useRef(null);
    const aboutThemeRef = useRef(null);
    const bgAboutRef = useRef(null);
    const themeBorderRef = useRef(null);
    const themeTextRef = useRef(null);
    const zoomOverlayRef = useRef(null);

    // Image preloading and canvas rendering - optimized for performance
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const images = new Array(frameUrls.length).fill(null);
        const totalFrames = frameUrls.length;

        // Define animation state object to be tweened
        const frameState = { index: 0 };

        // Priority load with fetchPriority hint
        const loadImage = (index, priority = 'auto') => {
            return new Promise((resolve) => {
                const img = new Image();
                img.fetchPriority = priority;
                img.decoding = 'async';
                img.crossOrigin = 'anonymous';
                // Use priority URL for first 3 frames, otherwise use regular frames
                img.src = (index < 3 && GateAnimationFramesPriority[index]) 
                    ? GateAnimationFramesPriority[index] 
                    : frameUrls[index];
                img.onload = () => {
                    images[index] = img;
                    resolve(img);
                };
                img.onerror = (err) => {
                    console.error(`Failed to load frame ${index}:`, frameUrls[index]);
                    resolve(null);
                };
            });
        };

        // Optimized frame loading with parallel fetching
        const loadFrames = async () => {
            // Load first 3 frames with high priority in parallel
            const priorityFrames = await Promise.all([
                loadImage(0, 'high'),
                loadImage(1, 'high'),
                loadImage(2, 'high')
            ]);
            
            if (priorityFrames[0]) {
                renderFrame(0);
            }

            // Load remaining frames in larger batches for better throughput
            const batchSize = 8;
            for (let i = 3; i < totalFrames; i += batchSize) {
                const batch = [];
                for (let j = i; j < Math.min(i + batchSize, totalFrames); j++) {
                    batch.push(loadImage(j, 'low'));
                }
                await Promise.all(batch);
            }
        };

        const renderFrame = (index) => {
            const img = images[Math.round(index)];
            if (img && img.complete && img.naturalWidth > 0) {
                // Set canvas size to match image
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            }
        };

        loadFrames();

        const lenis = new Lenis({
            duration: 2.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.5,
            touchMultiplier: 1.5,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        const ctxGsap = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=350%",
                    pin: true,
                    scrub: 3.5,
                    anticipatePin: 1
                }
            });

            // 1. Scrub through frames (slower for smoother scroll feel)
            tl.to(frameState, {
                index: totalFrames - 1,
                ease: "power2.out",
                duration: 2,
                onUpdate: () => {
                    renderFrame(frameState.index);
                }
            }, 0);

            // 2. Zoom gate effect
            gsap.set(canvasRef.current, { scale: 1.15 });
            tl.to(canvasRef.current, {
                scale: 18,
                duration: 6,
                ease: "power2.in"
            }, 0);

            // Zoom in AboutTheme background (synced with gate opening)
            gsap.set(aboutThemeRef.current, { scale: 0.8, opacity: 0 });
            tl.to(aboutThemeRef.current, {
                scale: 1,
                opacity: 1,
                duration: 6,
                ease: "power2.in"
            }, 0);

            // bgAbout sneak peek - starts zoomed in, then zooms out
            gsap.set(bgAboutRef.current, { scale: 1.3, opacity: 1 });
            tl.to(bgAboutRef.current, {
                scale: 1,
                duration: 4,
                ease: "power2.out"
            }, 0);

            // Fade in About Viva text immediately
            tl.to(aboutVivaRef.current, {
                opacity: 1,
                duration: 1,
                ease: "power1.inOut"
            }, 0);

            // Hold to show bgAbout.png on first scroll
            tl.to({}, { duration: 2 });

            // Second Scroll: Cross-fade to AboutTheme
            // Fade out bgAbout and AboutViva content
            tl.to(aboutVivaRef.current, {
                opacity: 0,
                duration: 2,
                ease: "power2.inOut"
            });


            // Fade in aboutThemeBorder and theme text
            tl.to(themeBorderRef.current, {
                opacity: 1,
                duration: 2,
                ease: "power2.inOut"
            }, "<");

            tl.to(themeTextRef.current, {
                opacity: 1,
                duration: 2,
                ease: "power2.inOut"
            }, "<");

            // Hold with border visible
            tl.to({}, { duration: 1.5 });

            // 6. Short Pause
            tl.to({}, { duration: 2 });

            // 7. Exit Transition
            const exitStartTime = tl.duration();

            tl.to(canvasRef.current, {
                scale: 1.2,
                duration: 5,
                ease: "power2.inOut"
            }, exitStartTime);

            tl.to(frameState, {
                index: 0,
                duration: 5,
                ease: "none",
                onUpdate: () => {
                    renderFrame(frameState.index);
                }
            }, exitStartTime);

            // Zoom out AboutTheme while fading out (synced with gate closing)
            tl.fromTo(aboutThemeRef.current,
                { scale: 1 },
                {
                    scale: 1.2,
                    opacity: 0,
                    duration: 5,
                    ease: "power1.in"
                },
                exitStartTime
            );

            // Reset
            tl.to({}, { duration: 0.5 });

        }, mainRef);

        return () => {
            ctxGsap.revert();
            lenis.destroy();
        };
    }, []);

    return (
        <div className="landing-page-container" ref={mainRef}>
            <TediuxBanner />
            <CursorLetterTrail />
            {/* Section 1: Countdown - Fixed Background Layer */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1 }}>
                <VivaCountdown />
            </div>

            {/* Section 2: Immersive Transition */}
            <div className="transition-container" ref={triggerRef}>

                {/* Content revealed inside the zoom */}
                <div className="reveal-container">

                    {/* STATIC BACKGROUND */}
                    <div className="reveal-item static-bg">
                        <AboutTheme ref={aboutThemeRef} borderRef={themeBorderRef} bgAboutRef={bgAboutRef} textRef={themeTextRef} />
                    </div>

                    {/* CONTENT LAYERS */}
                    <div className="reveal-item" ref={aboutVivaRef}>
                        <AboutViva ref={bgAboutRef} />
                    </div>
                </div>

                {/* The Stamp Interface */}
                <div className="stamp-assembly">
                    <div className="door-canvas-wrapper">
                        <canvas
                            ref={canvasRef}
                            className="gate-visual"
                        />
                    </div>
                </div>

                {/* Overlay for cinematic zoom */}
                <div className="zoom-overlay" ref={zoomOverlayRef}></div>
            </div>

            {/* Section 3: Landing sections appear AFTER the door closes */}
            <div style={{ position: 'relative', zIndex: 10, backgroundColor: '#1a0b2e' }}>
                <Landing />
            </div>
        </div>
    );
};

export default LandingPage;
