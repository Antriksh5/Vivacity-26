import { useState, useEffect, useLayoutEffect, useRef } from 'react'
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

    const isFirstLoad = useRef(true)

    // Initial page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 5000) // 4.3 seconds for initial load

        return () => clearTimeout(timer)
    }, [])

    // Route change detection - useLayoutEffect to trigger before paint
    useLayoutEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }
        setIsLoading(true)
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 6000) // 4.3 seconds for route transitions

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
