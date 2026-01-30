import { useEffect, useState } from 'react'
import './Preloader.css'

const Preloader = ({ mobileGif, desktopGif, isLoading }) => {
    const [show, setShow] = useState(isLoading)
    const [isMobile, setIsMobile] = useState(false)

    // Detect screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Handle fade animations
    useEffect(() => {
        if (isLoading) {
            setShow(true)
        } else {
            // Delay hiding to allow fade-out animation
            const timer = setTimeout(() => setShow(false), 300)
            return () => clearTimeout(timer)
        }
    }, [isLoading])

    if (!show) return null

    // Determine which GIF to show
    const currentGif = isMobile ? mobileGif : desktopGif

    return (
        <div className={`preloader ${isLoading ? 'fade-in' : 'fade-out'}`}>
            <div className="preloader-content">
                {currentGif ? (
                    <img src={currentGif} alt="Loading..." className="preloader-gif" />
                ) : (
                    // Placeholder spinner - will be replaced with custom GIFs
                    <div className="preloader-spinner">
                        <div className="spinner-ring"></div>
                        <div className="spinner-text">Loading...</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Preloader
