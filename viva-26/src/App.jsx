import { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { S3Assets } from './utils/cloudinaryUrls'
import { getApiUrl } from './utils/apiConfig'

// Preload critical S3 image assets immediately on module load
// Note: Preloader videos (MP4) are preloaded via <link> tags in index.html
const criticalAssets = [
    S3Assets.billBoard,
    S3Assets.shops,
    S3Assets.tediuxLogo,
]
criticalAssets.forEach((src) => {
    const img = new Image()
    img.src = src
})

// Lazy load route components for better code splitting
const Registration = lazy(() => import('./pages/Registration.jsx'))
const OurTeam = lazy(() => import('./pages/OurTeam.jsx'))
const EventPage = lazy(() => import('./pages/EventPage.jsx'))
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const ComingSoon = lazy(() => import('./pages/ComingSoon.jsx'))
const AdminPopup = lazy(() => import('./pages/Admin.jsx'))
const FoodVendors = lazy(() => import('./pages/FoodVendors.jsx'))

import Preloader from './components/Preloader/Preloader.jsx'
import WelcomePopup from './components/WelcomePopup/WelcomePopup.jsx'

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [showWelcome, setShowWelcome] = useState(false)
    const location = useLocation()
    const isFirstLoad = useRef(true)

    // Initial page load - let video play completely
    useEffect(() => {
        const timer = setTimeout(async () => {
            setIsLoading(false)

            // Fetch popup config to see if it is enabled
            try {
                const res = await fetch(getApiUrl('/popup'));
                const config = await res.json();

                if (config.isVisible && config.eventName && (location.pathname === '/' || location.pathname === '/home')) {
                    setShowWelcome(true)
                }
            } catch (e) {
                // Fallback if backend fails, always show
                setShowWelcome(true);
            }

        }, 5000) // 5 seconds to let video play

        return () => clearTimeout(timer)
    }, [])

    const handleWelcomeClose = () => {
        setShowWelcome(false)
    }

    // Route change detection - useLayoutEffect to trigger before paint
    useLayoutEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        setIsLoading(true)
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 4000) // 4 seconds for route transitions

        return () => clearTimeout(timer)
    }, [location.pathname])

    return (
        <>
            <Preloader isLoading={isLoading} />

            {!isLoading && showWelcome && <WelcomePopup onClose={handleWelcomeClose} />}

            <Suspense fallback={null}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/admin" element={<AdminPopup />} />
                    <Route path="/registration" element={<Registration isPreloaderComplete={!isLoading} />} />
                    <Route path="/our-team" element={<OurTeam />} />
                    <Route path="/events" element={<EventPage />} />
                    <Route path="/food-stalls" element={<FoodVendors />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/coming-soon" element={<ComingSoon />} />
                    <Route path="/*" element={<LandingPage />} />
                </Routes>
            </Suspense>
        </>
    )
}

export default App
