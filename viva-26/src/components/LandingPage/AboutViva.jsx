import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { LandingPage } from '../../utils/cloudinaryUrls';
import '../../styles/AboutViva.css';

const bgAbout = LandingPage.bgAbout;
const bgAboutPhn = LandingPage.bgAboutPhn;
const aboutBgPhn = LandingPage.aboutBgPhn;
const aboutVivaTitle = LandingPage.aboutViva;
const leftHand = LandingPage.leftHand;
const rightHand = LandingPage.rightHand;
const nimbuMirchi = LandingPage.nimbuMirchi;
const uncle = LandingPage.uncle;


const AboutViva = React.forwardRef((props, bgAboutRef) => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const handLeftRef = useRef(null);
    const handRightRef = useRef(null);
    const uncleRef = useRef(null);
    const cardRef = useRef(null);

    return (
        <section className="about-section" ref={sectionRef}>
            <div className="purple-stamp-container">
                {/* Responsive Background Stamp (Gate for Mobile) */}
                <div className="bg-about-stamp-wrapper" ref={bgAboutRef}>
                    <picture>
                        <source media="(max-width: 768px)" srcSet={bgAboutPhn} />
                        <img
                            src={bgAbout}
                            alt="Background Stamp"
                            className="bg-about-stamp"
                        />
                    </picture>
                </div>
                <div className="content-container">
                    <div
                        className="about-card"
                        ref={cardRef}
                    >
                        {/* Hanging Nimbu Mirchi */}
                        <div className="hanging-decor left">
                            <img src={nimbuMirchi} alt="nimbu-mirchi" className="nimbu-mirchi" />
                        </div>
                        <div className="hanging-decor right">
                            <img src={nimbuMirchi} alt="nimbu-mirchi" className="nimbu-mirchi" />
                        </div>

                        {/* Title Image */}
                        <div className="title-wrapper" ref={titleRef}>
                            <img src={aboutVivaTitle} alt="ABOUT VIVACITY" className="about-title-img" />
                        </div>

                        {/* Text Block */}
                        <div className="text-content" ref={textRef}>
                            <p className="desktop-text">
                                Vivacity, the annual cultural fest of LNMIIT, embodies the vibrant spirit of Gen Z and Millennials, presenting an enticing mix of music, dance, and numerous engaging activities. With exhilarating performances and insightful exhibitions, Vivacity captures the true essence of a lively and memorable cultural celebration.
                            </p>
                            <p className="mobile-text">
                                Vivacity, the annual cultural fest of LNMIIT, embodies the vibrant spirit of Gen Z and Millennials. With exhilarating performances and exhibitions, it captures the essence of a lively, memorable celebration.
                            </p>
                        </div>

                        {/* Bottom Decor: Hands */}
                        <div className="decorative-hand hand-left" ref={handLeftRef}>
                            <img src={leftHand} alt="hand icon" />
                        </div>
                        <div className="decorative-hand hand-right" ref={handRightRef}>
                            <img src={rightHand} alt="hand icon" />
                        </div>

                        {/* Bottom Character: Uncle */}
                        <div className="bottom-character" ref={uncleRef}>
                            <img src={uncle} alt="Rajasthani character" className="uncle-img" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
});

export default AboutViva;
