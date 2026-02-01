import { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { S3Assets } from './utils/cloudinaryUrls'

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

import Preloader from './components/Preloader/Preloader.jsx'

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    const isFirstLoad = useRef(true)

    // Initial page load - let video play completely
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 5000) // 5 seconds to let video play

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
        }, 4000) // 4 seconds for route transitions

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
