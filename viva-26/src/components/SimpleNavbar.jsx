import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Registration } from '../utils/cloudinaryUrls'
import gsap from 'gsap'

const SimpleNavbar = () => {
    const navRef = useRef(null)
    const mobileMenuRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Initial Animation
            gsap.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.5,
                clearProps: "transform"
            })

            // Set initial state of mobile menu
            gsap.set(mobileMenuRef.current, {
                x: '100%',
                display: 'none'
            })
        }, navRef)

        return () => ctx.revert()
    }, [])

    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isOpen) {
            gsap.to(mobileMenuRef.current, {
                x: '0%',
                duration: 0.5,
                ease: 'power3.out',
                display: 'flex'
            })
        } else {
            gsap.to(mobileMenuRef.current, {
                x: '100%',
                duration: 0.5,
                ease: 'power3.in',
                display: 'none'
            })
        }
    }, [isOpen])

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'EVENTS', path: '/events' },
        { name: 'OUR TEAM', path: '/our-team' },
        { name: 'FOOD STALLS', path: '/food-stalls' },
        { name: 'REGISTER', path: '/registration' },
    ]

    return (
        <nav
            ref={navRef}
            className="relative top-0 left-0 w-full z-[1000] flex justify-between items-center px-4 py-3 md:px-8 bg-[#EF0303] backdrop-blur-md border-b border-white/10"
        >
            {/* Logo */}
            <Link to="/" className="flex items-center z-[1060]">
                <img
                    src={Registration.vivacityLogo}
                    alt="Vivacity Logo"
                    className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-4 md:gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className="text-white text-sm md:text-base font-bold tracking-wider hover:text-[#FFA500] transition-colors duration-300 relative group font-['Lemon_Milk',_sans-serif]"
                    >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFA500] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden z-[1060] text-white focus:outline-none relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className="fixed top-0 left-0 w-full h-screen bg-[#EF0303] z-[1050] flex flex-col justify-center items-center gap-8"
                style={{ display: 'none' }} // Initial state handled by CSS/GSAP
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="text-white text-2xl font-bold tracking-wider hover:text-[#FFA500] transition-colors duration-300 font-['Lemon_Milk',_sans-serif]"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    )
}

export default SimpleNavbar
