import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'
import vivaLogo from '../../assets/registration/vivacityLogo.png'

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
                    <div className="dropdown">
                        <span className="nav-link">SPONSORS</span>
                        <div className="dropdown-content">
                            <Link to="/coming-soon" className="dropdown-item">FOOD MENU</Link>
                            <Link to="/coming-soon" className="dropdown-item">VIBE CARD</Link>
                        </div>
                    </div>
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
                <div className="mobile-dropdown">
                    <span className="mobile-nav-link disabled">SPONSORS</span>
                    <Link to="/coming-soon" className="mobile-sub-link" onClick={closeMenu}>FOOD MENU</Link>
                    <Link to="/coming-soon" className="mobile-sub-link" onClick={closeMenu}>VIBE CARD</Link>
                </div>
                <Link to="/our-team" className="mobile-nav-link" onClick={closeMenu}>OUR TEAM</Link>
            </div>

            {/* Overlay Background */}
            {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
        </nav>
    )
}

export default Navbar
