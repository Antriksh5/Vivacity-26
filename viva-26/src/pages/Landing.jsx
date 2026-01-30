import React, { lazy, Suspense } from 'react';

// Lazy load below-fold sections for better initial page load
const PastArtists = lazy(() => import('./PastArtists'));
const EventLanding = lazy(() => import('./EventLanding'));
const MascotLanding = lazy(() => import('./mascotLanding'));
const Legacy = lazy(() => import('./Legacy'));
const Team = lazy(() => import('./Team'));
const Footer = lazy(() => import('../components/Footer/Footer'));

// Simple loading placeholder
const SectionPlaceholder = () => (
    <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
);

const Landing = () => {
    return (
        <main className="w-full relative">
            <Suspense fallback={<SectionPlaceholder />}>
                {/* Section 1: Past Artists */}
                <section id="past-artists">
                    <PastArtists />
                </section>
                <section id="eventLanding">
                    <EventLanding />
                </section>

                {/* Section 2: Mascot */}
                <section id="mascot">
                    <MascotLanding />
                </section>

                {/* Section 3: Legacy */}
                {/* Section 3: Legacy */}
                <section id="legacy" className="hidden lg:block">
                    <Legacy />
                </section>

                {/* Section 4: Team */}
                <section id="team">
                    <Team />
                </section>

                {/* Footer */}
                <Footer />
            </Suspense>
        </main>
    );
};

export default Landing;
