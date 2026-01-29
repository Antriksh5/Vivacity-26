import { Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import OurTeam from './pages/OurTeam.jsx'
import EventPage from './pages/EventPage.jsx'
import PastArtists from './pages/PastArtists.jsx'
import Team from './pages/Team.jsx'
import MascotLanding from './pages/mascotLanding.jsx';
import EventLanding from './pages/EventLanding.jsx'
import Legacy from './pages/Legacy.jsx'
import Landing from './pages/Landing.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ComingSoon from './pages/ComingSoon.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/past-artists" element={<PastArtists />} />
            <Route path="/team" element={<Team />} />
            <Route path="/legacy" element={<Legacy />} />
            <Route path="/eventLanding" element={<EventLanding />} />
            <Route path="/mascot" element={<MascotLanding />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
    )
}

export default App

