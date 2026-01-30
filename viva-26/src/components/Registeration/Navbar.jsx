import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'
import { Registration } from '../../utils/cloudinaryUrls';
const vivaLogo = Registration.vivacityLogo;

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="registration-navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={vivaLogo} alt="VIVASITY" className="logo-image" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-links">
                    <Link to="/home" className="nav-link">HOME</Link>
                    <Link to="/events" className="nav-link">EVENTS</Link>
                    <Link to="/coming-soon" className="nav-link">SPONSORS</Link>
                    <Link to="https://tediux.com/cards" className="nav-link">VIBE CARD</Link>
                    <Link to="/our-team" className="nav-link">OUR TEAM</Link>
                </div>

                {/* Hamburger Menu Button */}
                <button
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/home" className="mobile-nav-link" onClick={closeMenu}>HOME</Link>
                <Link to="/events" className="mobile-nav-link" onClick={closeMenu}>EVENTS</Link>
                <Link to="/coming-soon" className="mobile-nav-link" onClick={closeMenu}>SPONSORS</Link>
                <Link to="https://tediux.com/cards" className="mobile-nav-link" onClick={closeMenu}>VIBE CARD</Link>
                <Link to="/our-team" className="mobile-nav-link" onClick={closeMenu}>OUR TEAM</Link>
            </div>

            {/* Overlay Background */}
            {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
        </nav>
    )
}

export default Navbar
