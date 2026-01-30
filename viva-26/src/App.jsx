import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Registration from './pages/Registration.jsx'
import OurTeam from './pages/OurTeam.jsx'
import EventPage from './pages/EventPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import Preloader from './components/Preloader/Preloader.jsx'

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()

    // Initial page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500) // 1.5 seconds for initial load

        return () => clearTimeout(timer)
    }, [])

    // Route change detection
    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 800) // 800ms for route transitions

        return () => clearTimeout(timer)
    }, [location.pathname])

    return (
        <>
            <Preloader isLoading={isLoading} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/home" element={<LandingPage />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
            </Routes>
        </>
    )
}

export default App
