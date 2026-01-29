import { Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import OurTeam from './pages/OurTeam.jsx'
import EventPage from './pages/EventPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ComingSoon from './pages/ComingSoon.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/registeration" element={<Registration />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
    )
}

export default App

