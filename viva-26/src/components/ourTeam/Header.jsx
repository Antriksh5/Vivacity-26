import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { vivaLogo } from '../../assets/ourTeam'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [sponsorsOpen, setSponsorsOpen] = useState(false)
    const menuRef = useRef(null)
    const linksRef = useRef(null)

    useLayoutEffect(() => {
        if (menuOpen) {
            gsap.to(menuRef.current, {
                x: '0%',
                opacity: 1,
                pointerEvents: 'all',
                duration: 0.6,
                ease: 'expo.out'
            })
            gsap.fromTo(linksRef.current?.children,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.1, ease: 'power4.out' }
            )
        } else {
            gsap.to(menuRef.current, {
                x: '100%',
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.6,
                ease: 'expo.in'
            })
        }
    }, [menuOpen])

    return (
        <>
            <header className="w-full flex flex-row justify-between items-center z-[110] max-[360px]:pt-8 pt-7 min-[370px]:max-[450px]:pt-9 min-[451px]:pt-10 md:pt-12 lg:pt-14 max-[360px]:px-8 px-6 min-[370px]:max-[450px]:px-[45px] min-[451px]:px-12 md:px-[65px] lg:px-20 xl:px-24 2xl:px-32 relative">
                <div className="flex-shrink-0 z-50 relative mt-2 sm:mt-2.5 md:mt-3 -translate-x-[2px] md:-translate-x-[5px] -translate-y-[3px] md:-translate-y-[8px]">
                    <Link to="/">
                        <img src={vivaLogo} alt="Vivacity'26 Logo" className="w-[36vw] max-[630px]:w-[30vw] max-[390px]:w-[24vw] sm:w-[26vw] md:w-[24vw] lg:w-[22vw] xl:w-[16vw] 2xl:w-[14vw] h-auto transition-all" />
                    </Link>
                </div>

                <nav className="hidden min-[1400px]:flex items-center gap-4 min-[1400px]:gap-6 xl:gap-8 pt-0 -mt-4 md:-mt-6 min-[1400px]:-mt-10 ml-auto mr-0">
                    <Link to="/home" className="no-underline text-[#3d1c10] font-medium text-[0.65rem] min-[1400px]:text-[0.75rem] xl:text-[0.85rem] tracking-wider hover:text-[#9E5D47] transition-colors">HOME</Link>
                    <Link to="/events" className="no-underline text-[#3d1c10] font-medium text-[0.65rem] min-[1400px]:text-[0.75rem] xl:text-[0.85rem] tracking-wider hover:text-[#9E5D47] transition-colors">EVENTS</Link>

                    {/* Sponsors Dropdown */}
                    <div
                        className="relative group py-2"
                        onMouseEnter={() => setSponsorsOpen(true)}
                        onMouseLeave={() => setSponsorsOpen(false)}
                    >
                        <button className="no-underline text-[#3d1c10] font-medium text-[0.65rem] min-[1400px]:text-[0.75rem] xl:text-[0.85rem] tracking-wider hover:text-[#9E5D47] transition-colors flex items-center gap-1 uppercase">
                            Sponsors
                            <svg className={`w-2.5 h-2.5 transition-transform duration-300 ${sponsorsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`absolute top-full left-0 mt-1 w-40 bg-[#f7d0ab] shadow-lg rounded-md overflow-hidden transition-all duration-300 origin-top z-[120] ${sponsorsOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                            <Link to="/coming-soon" className="block px-4 py-2.5 text-[0.65rem] min-[1400px]:text-[0.75rem] font-medium text-[#3d1c10] hover:bg-[#eec29a] hover:text-[#9E5D47] transition-colors tracking-wider">FOOD MENU</Link>
                            <Link to="/coming-soon" className="block px-4 py-2.5 text-[0.65rem] min-[1400px]:text-[0.75rem] font-medium text-[#3d1c10] hover:bg-[#eec29a] hover:text-[#9E5D47] transition-colors tracking-wider border-t border-[#eec29a]">VIBE CARD</Link>
                        </div>
                    </div>

                    <Link to="/our-team" className="no-underline text-[#3d1c10] font-medium text-[0.65rem] min-[1400px]:text-[0.75rem] xl:text-[0.85rem] tracking-wider hover:text-[#9E5D47] transition-colors">OUR TEAM</Link>
                    <Link to="/registration" className="no-underline text-[#3d1c10] font-medium text-[0.65rem] min-[1400px]:text-[0.75rem] xl:text-[0.85rem] tracking-wider hover:text-[#9E5D47] transition-colors border border-[#3d1c10] px-3 py-1 rounded-full hover:bg-[#3d1c10] hover:text-[#f7d0ab]">REGISTER</Link>
                </nav>

                <div className="min-[1400px]:hidden z-50 relative mt-4 sm:mt-6 md:mt-0">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2 focus:outline-none group">
                        <span className={`block h-0.5 bg-[#3d1c10] transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                        <span className={`block h-0.5 bg-[#3d1c10] transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-4 ml-auto group-hover:w-6'}`}></span>
                        <span className={`block h-0.5 bg-[#3d1c10] transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`}></span>
                    </button>
                </div>
            </header >

            <div ref={menuRef} className="absolute inset-0 bg-[#f7d0ab] z-[100] flex flex-col justify-center items-end min-[1400px]:hidden pr-10 sm:pr-20 pointer-events-none opacity-0">
                <nav ref={linksRef} className="flex flex-col gap-6 text-right pointer-events-auto">
                    <Link to="/home" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-medium text-xs sm:text-sm tracking-[0.4em] hover:text-[#9E5D47] transition-all duration-300">HOME</Link>
                    <Link to="/events" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-medium text-xs sm:text-sm tracking-[0.4em] hover:text-[#9E5D47] transition-all duration-300">EVENTS</Link>

                    <div className="flex flex-col gap-4">
                        <span className="text-[#3d1c10] opacity-50 font-medium text-[10px] sm:text-xs tracking-[0.4em] uppercase">Sponsors</span>
                        <Link to="/coming-soon" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-medium text-xs sm:text-sm tracking-[0.4em] hover:text-[#9E5D47] transition-all duration-300 pr-2">FOOD MENU</Link>
                        <Link to="/coming-soon" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-medium text-xs sm:text-sm tracking-[0.4em] hover:text-[#9E5D47] transition-all duration-300 pr-2">VIBE CARD</Link>
                    </div>

                    <Link to="/our-team" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-medium text-xs sm:text-sm tracking-[0.4em] hover:text-[#9E5D47] transition-all duration-300">OUR TEAM</Link>
                    <Link to="/registration" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-medium text-xs sm:text-sm tracking-[0.4em] hover:text-[#9E5D47] transition-all duration-300">REGISTER</Link>
                </nav>
            </div>
        </>
    )
}

export default Header
