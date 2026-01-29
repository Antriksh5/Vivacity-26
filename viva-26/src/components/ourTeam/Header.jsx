import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { vivaLogo } from '../../assets/ourTeam'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
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
            <header className="w-full flex flex-row justify-between items-center z-[110] max-[360px]:pt-10 pt-6 min-[370px]:max-[450px]:pt-[45px] min-[451px]:pt-14 md:pt-[65px] lg:pt-20 max-[360px]:px-8 px-6 min-[370px]:max-[450px]:px-[45px] min-[451px]:px-12 md:px-[65px] lg:px-20 xl:px-24 2xl:px-32 relative">
                <div className="flex-shrink-0 z-50 relative mt-4 sm:mt-6 md:mt-0 -translate-x-[2px] md:-translate-x-[5px] -translate-y-[3px] md:-translate-y-[8px]">
                    <img src={vivaLogo} alt="Vivacity'26 Logo" className="w-[36vw] max-[630px]:w-[30vw] max-[390px]:w-[24vw] sm:w-[26vw] md:w-[24vw] lg:w-[22vw] xl:w-[16vw] 2xl:w-[14vw] h-auto transition-all" />
                </div>

                <nav className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-10 pt-0 -mt-4 md:-mt-6 lg:-mt-10 mr-0">
                    <a href="#home" className="no-underline text-[#3d1c10] font-medium text-[0.65rem] lg:text-[0.75rem] xl:text-[0.95rem] tracking-wider hover:text-[#9E5D47] transition-colors">HOME</a>
                    <a href="#events" className="no-underline text-[#3d1c10] font-medium text-[0.65rem] lg:text-[0.75rem] xl:text-[0.95rem] tracking-wider hover:text-[#9E5D47] transition-colors">EVENTS</a>
                    <a href="#sponsors" className="no-underline text-[#3d1c10] font-medium text-[0.65rem] lg:text-[0.75rem] xl:text-[0.95rem] tracking-wider hover:text-[#9E5D47] transition-colors">SPONSORS</a>
                    <a href="#team" className="no-underline text-[#3d1c10] font-medium text-[0.65rem] lg:text-[0.75rem] xl:text-[0.95rem] tracking-wider hover:text-[#9E5D47] transition-colors">OUR TEAM</a>
                </nav >

                <div className="lg:hidden z-50 relative mt-4 sm:mt-6 md:mt-0">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2 focus:outline-none group">
                        <span className={`block h-0.5 bg-[#3d1c10] transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                        <span className={`block h-0.5 bg-[#3d1c10] transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-4 ml-auto group-hover:w-6'}`}></span>
                        <span className={`block h-0.5 bg-[#3d1c10] transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`}></span>
                    </button>
                </div>
            </header >

            <div ref={menuRef} className="absolute inset-0 bg-[#f7d0ab] z-[100] flex flex-col justify-center items-end lg:hidden pr-10 sm:pr-20 pointer-events-none opacity-0">
                <nav ref={linksRef} className="flex flex-col gap-8 text-right pointer-events-auto">
                    <a href="#home" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-medium text-xs sm:text-sm tracking-[0.4em] hover:text-[#9E5D47] transition-all duration-300 hover:pr-4">HOME</a>
                    <a href="#events" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-medium text-xs sm:text-sm tracking-[0.4em] hover:text-[#9E5D47] transition-all duration-300 hover:pr-4">EVENTS</a>
                    <a href="#sponsors" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-medium text-xs sm:text-sm tracking-[0.4em] hover:text-[#9E5D47] transition-all duration-300 hover:pr-4">SPONSORS</a>
                    <a href="#team" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-medium text-xs sm:text-sm tracking-[0.4em] hover:text-[#9E5D47] transition-all duration-300 hover:pr-4">OUR TEAM</a>
                </nav>
            </div>
        </>
    )
}

export default Header
