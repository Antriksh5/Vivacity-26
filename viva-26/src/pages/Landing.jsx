import React from 'react';
import PastArtists from './PastArtists';
import EventPage from './EventPage';
import MascotLanding from './mascotLanding';
import Legacy from './Legacy';
import Team from './Team';
import Footer from '../components/Footer/Footer';

const Landing = () => {
    return (
        <main className="w-full relative">
            {/* Section 1: Past Artists */}
            <section id="past-artists">
                <PastArtists />
            </section>

            {/* Section 2: Mascot */}
            <section id="mascot">
                <MascotLanding />
            </section>

            {/* Section 3: Legacy */}
            <section id="legacy">
                <Legacy />
            </section>

            {/* Section 4: Team */}
            <section id="team">
                <Team />
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
};

export default Landing;
