import { Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import OurTeam from './pages/OurTeam.jsx'
import EventPage from './pages/EventPage.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/events" element={<EventPage />} />
        </Routes>
    )
}

export default App
