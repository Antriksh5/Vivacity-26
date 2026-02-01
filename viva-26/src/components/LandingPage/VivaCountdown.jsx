import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/VivaCountdown.css';
import { LandingPage, OurTeam, S3Assets } from '../../utils/cloudinaryUrls';
import billBoardPhn from '../../assets/landingPage/billBoardPhn.png';
import shopsImg from '../../assets/landingPage/shopsImg.png';

// CDN-hosted assets from AWS S3 for better performance
const billBoard = S3Assets.billBoard;
const shops = S3Assets.shops;

// Cloudinary-hosted static images with optimized URLs
const registerNow = LandingPage.registerNow;
const vivaLogo = OurTeam.vivaLogo;
const jugnooGround = LandingPage.jugnooGround;
const mobileJugnooGround = LandingPage.mobileJugnooGround;
const ferrisWheel = LandingPage.ferrisWheel;
const tediuxLogo = S3Assets.tediuxLogo;

// Memoized Timer Item to prevent unnecessary re-renders
const TimerItem = memo(({ label, value }) => (
    <div className="timer-item">
        <span className="label">{label}</span>
        <span className="val">{value}</span>
    </div>
));


const VivaCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isFlipped, setIsFlipped] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const targetDate = new Date('2026-02-06T00:00:00').getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const flipTimer = setInterval(() => {
            setIsFlipped(prev => !prev);
        }, 6000); // Toggle every 6 seconds
        return () => clearInterval(flipTimer);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="viva-main-wrapper">
            <section className="countdown-section">
                {/* Navigation Bar */}
                <nav className="countdown-nav">
                    <div className="nav-left flex flex-start">
                        <img src={vivaLogo} alt="Vivacity Logo" className="viva-main-logo" fetchPriority="high" decoding="async" />
                    </div>

                    <div className="nav-center">
                        <Link to="/events">EVENTS</Link>
                        <Link to="/coming-soon">SPONSORS</Link>
                        <Link to="https://tediux.com/cards">VIBE CARD</Link>
                        <Link to="/our-team">OUR TEAM</Link>
                    </div>

                    <div className="nav-right">
                        <Link to="/registration" className="register-btn-styled">
                            <img src={registerNow} alt="Register Now" />
                        </Link>
                    </div>

                    {/* Hamburger Icon */}
                    <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {/* Mobile Navigation Overlay */}
                    <div className={`mobile-nav-overlay ${menuOpen ? 'active' : ''}`}>
                        <div className="mobile-nav-links">
                            <Link to="/events" onClick={toggleMenu}>EVENTS</Link>
                            <Link to="/coming-soon" onClick={toggleMenu}>SPONSORS</Link>
                            <Link to="https://tediux.com/cards" onClick={toggleMenu}>VIBE CARD</Link>
                            <Link to="/our-team" onClick={toggleMenu}>OUR TEAM</Link>
                        </div>
                    </div>
                </nav>

                <div className="carnival-scene">
                    {/* Ferris Wheel */}
                    <div className="ferris-wheel-container">
                        <img src={ferrisWheel} alt="Ferris Wheel" className="ferris-wheel-img" loading="eager" decoding="async" />
                    </div>

                    {/* Main Billboard Area */}
                    <div className="billboard-container">
                        <img src={billBoard} alt="Billboard" className="billboard-bg billboard-desktop" loading="eager" decoding="async" />
                        <img src={billBoardPhn} alt="Billboard" className="billboard-bg billboard-mobile" loading="eager" decoding="async" />

                        <div className={`timer-flip-wrapper ${isFlipped ? 'is-flipped' : ''}`}>
                            <div className="timer-flip-inner">
                                <div className="timer-flip-front">
                                    <div className="timer-overlay">
                                        <h2 className="timer-title">VIVACITY BEGINS IN</h2>
                                        <div className="timer-display">
                                            <TimerItem label="DAYS" value={String(timeLeft.days).padStart(2, '0')} />
                                            <span className="sep">:</span>
                                            <TimerItem label="HOURS" value={String(timeLeft.hours).padStart(2, '0')} />
                                            <span className="sep">:</span>
                                            <TimerItem label="MINS" value={String(timeLeft.minutes).padStart(2, '0')} />
                                            <span className="sep">:</span>
                                            <TimerItem label="SECS" value={String(timeLeft.seconds).padStart(2, '0')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="timer-flip-back">
                                    <div className="timer-overlay">
                                        <h2 className="timer-title">Tech Partner</h2>
                                        <img src={tediuxLogo} alt="Tediux Logo" className="tediux-sponsor-logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stalls / Shops Area */}
                    <div className="shops-container">
                        <img src={shops} alt="Carnival Shops" className="shops-img shops-desktop" loading="lazy" decoding="async" />
                        <img src={shopsImg} alt="Carnival Shops" className="shops-img shops-mobile" loading="lazy" decoding="async" />
                    </div>
                </div>
            </section>

            {/* Second Page / Transition Section */}
            <section className="transition-section">
                {/* Jugnoo Ground Effect - Between Shops and Bottom */}
                <div className="jugnoo-ground-container">
                    <img src={jugnooGround} alt="Jugnoo Ground" className="jugnoo-ground-img desktop-ground" loading="lazy" decoding="async" />
                    <img src={mobileJugnooGround} alt="Jugnoo Ground" className="jugnoo-ground-img mobile-ground" loading="lazy" decoding="async" />
                </div>


            </section>
        </div>
    );
};

export default VivaCountdown;
