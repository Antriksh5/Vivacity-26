import { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Lazy load route components for better code splitting
const Registration = lazy(() => import('./pages/Registration.jsx'))
const OurTeam = lazy(() => import('./pages/OurTeam.jsx'))
const EventPage = lazy(() => import('./pages/EventPage.jsx'))
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const ComingSoon = lazy(() => import('./pages/ComingSoon.jsx'))

import Preloader from './components/Preloader/Preloader.jsx'

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()

    const isFirstLoad = useRef(true)

    // Initial page load - reduced delay for better LCP
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000) // Reduced from 5s to 2s for better Lighthouse score

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
        }, 1500) // Reduced from 6s to 1.5s for route transitions

        return () => clearTimeout(timer)
    }, [location.pathname])

    return (
        <>
            <Preloader isLoading={isLoading} />

            <Suspense fallback={null}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/registration" element={<Registration isPreloaderComplete={!isLoading} />} />
                    <Route path="/our-team" element={<OurTeam />} />
                    <Route path="/events" element={<EventPage />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/coming-soon" element={<ComingSoon />} />
                    <Route path="/*" element={<LandingPage />} />
                </Routes>
            </Suspense>

        </>
    )
}

export default App
