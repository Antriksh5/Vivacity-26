import { useState, useEffect } from 'react'
import '../styles/Registration.css'
import doorGif from '../assets/registration/door.gif'
import doorPng from '../assets/registration/doorPng.png'
import doorOnlyPng from '../assets/registration/door_only.png'
import nextButton from '../assets/registration/next.png'
import preRegisterImg from '../assets/registration/Pre register here.png'

const Registration = () => {
    const [step, setStep] = useState(1)
    const [showGif, setShowGif] = useState(true)
    const [showPng, setShowPng] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        university: '',
        referral: '',
        participant: ''
    })
    const [errors, setErrors] = useState({})
    const [formVisible, setFormVisible] = useState(false)
    const [gifSrc, setGifSrc] = useState(null)

    useEffect(() => {
        document.body.classList.add('registration-page')

        // Preload the PNG first (this is what stays after GIF ends)
        const pngImg = new Image()
        const doorOnlyImg = new Image()

        let pngLoaded = false
        let doorOnlyLoaded = false

        const checkAllLoaded = () => {
            if (pngLoaded && doorOnlyLoaded) {
                setGifSrc(`${doorGif}?t=${Date.now()}`)
            }
        }

        pngImg.onload = () => {
            pngLoaded = true
            checkAllLoaded()
        }
        doorOnlyImg.onload = () => {
            doorOnlyLoaded = true
            checkAllLoaded()
        }

        pngImg.src = doorPng
        doorOnlyImg.src = doorOnlyPng

        return () => {
            document.body.classList.remove('registration-page')
        }
    }, [])

    useEffect(() => {
        if (!gifSrc) return

        // Start form fade-in immediately when GIF starts
        setFormVisible(true)

        // Start fading in the PNG near the end of the GIF
        const pngTimer = setTimeout(() => {
            setShowPng(true)
        }, 1000)

        // Hide GIF after it completes and PNG has faded in
        const timer = setTimeout(() => {
            setShowGif(false)
        }, 1600)

        return () => {
            clearTimeout(timer)
            clearTimeout(pngTimer)
        }
    }, [gifSrc])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validate = () => {
        const newErrors = {}
        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = 'Please enter your name'
            if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required'
            else if (!/^\d{10}$/.test(formData.mobile.trim())) newErrors.mobile = 'Enter a valid 10-digit number'

            if (!formData.email.trim()) newErrors.email = 'Email address is required'
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address'

            if (!formData.university.trim()) newErrors.university = 'University name is required'
        } else if (step === 2) {
            if (!formData.participant) newErrors.participant = 'Please select an option'
        }
        return newErrors
    }

    const handleNext = (e) => {
        if (e) e.preventDefault()

        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        if (step === 1) {
            setStep(2)
        } else {
            console.log('Final Form Data:', formData)
            alert('Registration Complete!')
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
            <div className="flex items-center justify-center w-full h-screen relative z-0">
                <div className="relative w-350 h-350 flex items-center justify-center transform-gpu backface-hidden max-[1200px]:w-225 max-[1200px]:h-225 max-[900px]:w-175 max-[900px]:h-175 max-[480px]:w-137.5 max-[480px]:h-137.5">
                    <img
                        src={doorPng}
                        alt="Door"
                        className={`absolute w-full h-full object-contain block z-10 m-auto -translate-x-1 max-[480px]:hidden transition-opacity duration-500 ${showPng ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {showGif && gifSrc && (
                        <img
                            src={gifSrc}
                            alt="Door Animation"
                            className="absolute inset-0 w-full h-full object-contain -translate-x-1 z-20"
                        />
                    )}

                    <div className={`absolute left-1/2 -translate-x-1/2 w-[38%] max-w-105 max-h-[65%] flex flex-col z-10 overflow-y-visible py-2.5 transition-all ease-out max-[1024px]:w-[36%] max-[1024px]:top-[49%] max-[768px]:w-[52%] max-[768px]:top-[48%] max-[480px]:w-[65%] max-[480px]:top-[46%] ${step === 2
                        ? 'top-[34%] items-start'
                        : 'top-1/2 items-center'
                        } ${formVisible ? 'opacity-100 -translate-y-1/2' : 'opacity-0 -translate-y-[45%]'}`}>
                        {step === 1 ? (
                            <>
                                <img src={preRegisterImg} alt="Pre Register Here" className="w-full max-w-80 mx-auto mt-4 mb-4 block h-auto max-[480px]:max-w-77.5 max-[480px]:mb-3 max-[480px]:mt-2.5" />
                                <form className="w-full" onSubmit={handleNext}>
                                    {[
                                        { label: 'NAME', name: 'name', type: 'text' },
                                        { label: 'MOBILE NO.', name: 'mobile', type: 'text' },
                                        { label: 'EMAIL', name: 'email', type: 'email' },
                                        { label: 'UNIVERSITY/ INSTITUTION/ ACADEMY', name: 'university', type: 'text' },
                                        { label: 'REFERRAL CODE (OPTIONAL)', name: 'referral', type: 'text' }
                                    ].map((field) => (
                                        <div key={field.name} className="mb-2 flex flex-col relative pb-4 max-[480px]:mb-1.25 max-[480px]:pb-3">
                                            <label className="text-white font-gill text-[15px] font-medium mb-1 text-left tracking-[0.5px] opacity-90 max-[768px]:text-[14px] max-[480px]:text-[12px] max-[480px]:mb-0.5">
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                placeholder="Enter text"
                                                className={`bg-[linear-gradient(#0d192d,#0d192d),linear-gradient(to_right,#4a3fad,#216d7d)] [background-origin:padding-box,border-box] border-2 border-transparent rounded-md px-3 py-2 text-white text-[15px] font-gill w-full outline-none transition-all duration-300 placeholder-white/30 focus:border-white/40 focus:bg-[#0d1321]/95 max-[768px]:text-[14px] max-[480px]:text-[12px] max-[480px]:px-3 ${errors[field.name] ? 'border-[#ff4d4d] bg-[#ff4d4d]/5' : ''
                                                    }`}
                                            />
                                            {errors[field.name] && <span className="text-[#ff4d4d] text-[11px] font-gill absolute bottom-0 left-0 font-medium tracking-[0.3px] animate-shake">{errors[field.name]}</span>}
                                        </div>
                                    ))}
                                </form>
                            </>
                        ) : (
                            <div className="w-full h-full text-left p-1.25 flex flex-col justify-start items-start">
                                <h2 className="text-white font-gill text-[25px] font-extralight mb-5 tracking-[0.5px] leading-[1.2] max-[768px]:text-[22px] max-[480px]:text-[20px]">
                                    ARE YOU A PARTICIPANT?
                                </h2>
                                <div className="flex flex-col gap-5">
                                    {['yes', 'no'].map((option) => (
                                        <label key={option} className="flex items-center gap-3.75 text-white font-gill text-[20px] cursor-pointer relative select-none max-[768px]:text-[18px] max-[480px]:text-[16px] max-[480px]:gap-2.5 group">
                                            <input
                                                type="radio"
                                                name="participant"
                                                value={option}
                                                checked={formData.participant === option}
                                                onChange={handleChange}
                                                className="absolute opacity-0 cursor-pointer peer"
                                            />
                                            <span className="h-6.25 w-6.25 bg-transparent border-2 border-white rounded-full flex justify-center items-center transition-all duration-200 shrink-0 peer-checked:border-white max-[480px]:h-5.5 max-[480px]:w-5.5 group-hover:border-white/70">
                                                <span className={`w-4.5 h-4.5 rounded-full bg-white max-[480px]:w-3 max-[480px]:h-3 ${formData.participant === option ? 'block' : 'hidden'}`}></span>
                                            </span>
                                            {option === 'yes' ? 'Yes' : 'No'}
                                        </label>
                                    ))}
                                </div>
                                <div className="mt-2.5 pb-5 relative w-full h-5">
                                    {errors.participant && <span className="text-[#ff4d4d] text-[11px] font-gill absolute top-0 left-0 font-medium tracking-[0.3px] animate-shake">{errors.participant}</span>}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        className="absolute bottom-[27%] left-1/2 -translate-x-1/2 z-30 transition-transform duration-200 hover:scale-105 active:scale-95 outline-none focus:outline-none cursor-pointer max-[480px]:bottom-[16%]"
                        onClick={handleNext}
                    >
                        <img src={nextButton} alt="Next" className="w-37.5 h-auto border-none outline-none" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Registration
