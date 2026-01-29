import React from 'react';
import aboutThemebg from '../../assets/landingPage/aboutThemebg.png';
import mbabTheme from '../../assets/landingPage/mbabTheme.png';
import bgAbout from '../../assets/landingPage/bgAbout.png';
import aboutThemeBorder from '../../assets/landingPage/aboutThemeBorder.png';
import mobileThemeBorder from '../../assets/landingPage/mobileThemeBorder.png';
import aboutThemeTitle from '../../assets/landingPage/aboutTheme.png';
import '../../styles/AboutTheme.css';

const AboutTheme = React.forwardRef((props, ref) => {
    const { borderRef, bgAboutRef, textRef } = props;

    return (
        <section className="about-theme-section">
            <div
                className="theme-stamp-container"
                ref={ref}
                style={{
                    '--desktop-bg': `url(${aboutThemebg})`,
                    '--mobile-bg': `url(${mbabTheme})`
                }}
            >
                <div className="theme-content-wrapper">
                    {/* Border Container - Fades in together */}
                    <div ref={borderRef} style={{ opacity: 0, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                        {/* aboutThemeBorder - Second image to fade in (Desktop) */}
                        <img
                            src={aboutThemeBorder}
                            alt="Theme Border"
                            className="theme-border-img theme-border-large desktop-theme-border"
                        />

                        {/* mobileThemeBorder - Mobile version */}
                        <img
                            src={mobileThemeBorder}
                            alt="Theme Border"
                            className="theme-border-img theme-border-large mobile-theme-border"
                        />
                    </div>

                    <div className="theme-text-overlay" ref={textRef} style={{ opacity: 0 }}>
                        <div className="theme-title-wrapper">
                            <img
                                src={aboutThemeTitle}
                                alt="ABOUT THEME"
                                className="theme-title-img"
                            />
                        </div>

                        {/* Desktop version - Full text */}
                        <div className="theme-description desktop-only-text">
                            <p>
                                Anachronic Mélange presents Vivacity as a timeless cultural experience—where past, present, and creativity merge seamlessly. Inspired by Indian maximalism, truck art, retro Bollywood, and folk traditions, LNMIIT becomes a living stage where culture isn't preserved, it's performed.
                            </p>
                        </div>

                        {/* Mobile version - Shortened text */}
                        <div className="theme-description mobile-only-text">
                            <p>
                                Anachronic Mélange presents Vivacity as a timeless cultural experience—where past, present, and creativity merge seamlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default AboutTheme;

