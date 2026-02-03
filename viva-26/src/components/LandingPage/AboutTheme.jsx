import React from 'react';
import { LandingPage } from '../../utils/cloudinaryUrls';
import '../../styles/AboutTheme.css';

const aboutThemebg = LandingPage.aboutThemebg;
const mbabTheme = LandingPage.mbabTheme;
const aboutThemeBorder = LandingPage.aboutThemeBorder;
const mobileThemeBorder = LandingPage.mobileThemeBorder;


const AboutTheme = React.forwardRef((props, ref) => {
    const { borderRef, textRef } = props;

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
                            loading="lazy"
                            decoding="async"
                        />

                        {/* mobileThemeBorder - Mobile version */}
                        <img
                            src={mobileThemeBorder}
                            alt="Theme Border"
                            className="theme-border-img theme-border-large mobile-theme-border"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    <div className="theme-text-overlay" ref={textRef} style={{ opacity: 0 }}>
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
