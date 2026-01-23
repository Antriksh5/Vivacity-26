import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { vivaLogo } from '../../assets/ourTeam'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const linksRef = useRef(null)

    useLayoutEffect(() => {
        if (menuOpen) {
            gsap.to(menuRef.current, { x: '0%', duration: 0.5, ease: 'power3.out' })
            gsap.fromTo(linksRef.current?.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
            )
        } else {
            gsap.to(menuRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' })
        }
    }, [menuOpen])

    return (
        <>
            <header className="w-full flex flex-row justify-between items-center z-50 pt-10 sm:pt-12 md:pt-14 lg:pt-16 px-3 lg:px-3 xl:px-12 2xl:px-20 relative">
                <div className="flex-shrink-0 z-50 relative">
                    <img src={vivaLogo} alt="Vivacity'26 Logo" className="h-[40px] sm:h-[50px] md:h-[70px] lg:h-[90px] w-auto transition-all" />
                </div>

                <nav className="hidden min-[1100px]:flex items-center gap-6 xl:gap-10">
                    <a href="#home" className="no-underline text-[#3d1c10] font-semibold text-[0.95rem] xl:text-[1.15rem] tracking-wider hover:text-[#9E5D47] transition-colors">HOME</a>
                    <a href="#events" className="no-underline text-[#3d1c10] font-semibold text-[0.95rem] xl:text-[1.15rem] tracking-wider hover:text-[#9E5D47] transition-colors">EVENTS</a>
                    <a href="#sponsors" className="no-underline text-[#3d1c10] font-semibold text-[0.95rem] xl:text-[1.15rem] tracking-wider hover:text-[#9E5D47] transition-colors">SPONSORS</a>
                    <a href="#team" className="no-underline text-[#3d1c10] font-semibold text-[0.95rem] xl:text-[1.15rem] tracking-wider hover:text-[#9E5D47] transition-colors">OUR TEAM</a>
                </nav>

                <div className="min-[1100px]:hidden z-50 relative">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2 focus:outline-none">
                        <span className={`block w-6 h-0.5 bg-[#3d1c10] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-[#3d1c10] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-[#3d1c10] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </header>

            <div ref={menuRef} className="fixed inset-0 bg-[#f7d0ab] z-40 flex flex-col justify-center items-center min-[1100px]:hidden translate-x-full">
                <nav ref={linksRef} className="flex flex-col gap-8 text-center">
                    <a href="#home" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-bold text-2xl tracking-widest hover:text-[#9E5D47] transition-colors">HOME</a>
                    <a href="#events" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-bold text-2xl tracking-widest hover:text-[#9E5D47] transition-colors">EVENTS</a>
                    <a href="#sponsors" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-bold text-2xl tracking-widest hover:text-[#9E5D47] transition-colors">SPONSORS</a>
                    <a href="#team" onClick={() => setMenuOpen(false)} className="text-[#3d1c10] font-bold text-2xl tracking-widest hover:text-[#9E5D47] transition-colors">OUR TEAM</a>
                </nav>
            </div>
        </>
    )
}

export default Header
