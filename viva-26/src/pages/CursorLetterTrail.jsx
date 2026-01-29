import { useEffect, useRef } from 'react'
import '../styles/CursorLetterTrail.css'

const CursorLetterTrail = () => {
    const containerRef = useRef(null)
    const lastPositionRef = useRef({ x: 0, y: 0 })
    const letterIndexRef = useRef(0)

    // Hindi Devanagari syllables (Akshars) kept intact
    // Using an array prevents breaking complex characters like 'वि' into 'व' + 'ि'
    const letters = [
        'वि', 'वा', 'सिटी', // Vivacity
        'वि', 'वा', 'सि', 'टी',
        '2026',             // 2026
        'ॐ', 'श्री', 'देसी',          // Auspicious symbols (optional, fits ceremonial theme)
        'वि', 'वा', 'सिटी'
    ];

    useEffect(() => {
        let lastTime = 0
        const throttleDelay = 50 // Slower, more deliberate spawning for premium feel

        const handleMouseMove = (e) => {
            const currentTime = Date.now()

            // Calculate distance moved
            const dx = e.clientX - lastPositionRef.current.x
            const dy = e.clientY - lastPositionRef.current.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Only create letters if mouse moved significantly - higher threshold for elegance
            if (distance > 8 && currentTime - lastTime > throttleDelay) {
                createLetter(e.clientX, e.clientY)
                lastTime = currentTime
            }

            lastPositionRef.current = { x: e.clientX, y: e.clientY }
        }

        const createLetter = (x, y) => {
            if (!containerRef.current) return

            const letter = document.createElement('span')
            letter.className = 'cursor-letter'
            letter.textContent = letters[letterIndexRef.current % letters.length]
            letter.style.left = `${x}px`
            letter.style.top = `${y}px`

            // Increased spreading (offsets)
            const randomRotation = (Math.random() - 0.5) * 30
            const randomOffsetX = (Math.random() - 0.5) * 100 // Spreads much wider horizontally
            const randomOffsetY = (Math.random() - 0.5) * 50  // Spreads more vertically

            letter.style.setProperty('--random-rotation', `${randomRotation}deg`)
            letter.style.setProperty('--random-x', `${randomOffsetX}px`)
            letter.style.setProperty('--random-y', `${randomOffsetY}px`)

            containerRef.current.appendChild(letter)
            letterIndexRef.current++

            // Remove letter after animation completes (3 seconds for slower fade)
            setTimeout(() => {
                if (letter.parentNode) {
                    letter.parentNode.removeChild(letter)
                }
            }, 3000)
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return <div ref={containerRef} className="cursor-letter-container" />
}

export default CursorLetterTrail
