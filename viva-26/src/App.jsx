import { Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import OurTeam from './pages/OurTeam.jsx'
import EventPage from './pages/EventPage.jsx'
import Landing from './pages/Landing.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/events" element={<EventPage />} />
            {/* <Route path="/landing" element={<Landing />} /> */}
        </Routes>
    )
}

export default App

