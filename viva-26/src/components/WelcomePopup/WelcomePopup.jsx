import { useEffect, useState } from 'react';

const WelcomePopup = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState({
        title: "Welcome onto the Board!",
        message: "We're excited to have you here at Vivacity '26. Explore our events, team, and legacy.",
        eventName: "",
        eventDescription: "",
        date: "",
        time: "",
        venue: ""
    });

    useEffect(() => {
        setIsVisible(true);
        fetch('/api/popup')
            .then(res => res.json())
            .then(data => {
                setContent(data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for transition
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop Blur Layer */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className={`relative group max-w-lg w-full mx-4 transform transition-all duration-500 ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}>

                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>

                <div className="relative bg-gray-900/95 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl overflow-hidden">

                    {/* Decorative Top Mesh */}
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

                    {/* Close Button (Top Right) */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-white/5 hover:bg-white/20 hover:scale-110 active:scale-95 rounded-full p-2 transition-all duration-300 focus:outline-none backdrop-blur-sm group-hover:block"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative z-0">
                        {/* Event Name */}
                        {content.eventName && (
                            <h3
                                className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-8 text-center drop-shadow-2xl tracking-tighter transition-all duration-1000 delay-100 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                            >
                                {content.eventName}
                            </h3>
                        )}

                        {/* Info Badges Grid */}
                        {(content.date || content.time || content.venue) && (
                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}>
                                {content.date && (
                                    <div className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-colors group/card">
                                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover/card:text-blue-300 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        <span className="text-gray-200 font-semibold">{content.date}</span>
                                    </div>
                                )}
                                {content.time && (
                                    <div className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-colors group/card">
                                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 group-hover/card:text-purple-300 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <span className="text-gray-200 font-semibold">{content.time}</span>
                                    </div>
                                )}
                                {content.venue && (
                                    <div className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-colors sm:col-span-2 group/card">
                                        <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400 group-hover/card:text-pink-300 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                        <span className="text-gray-200 font-semibold">{content.venue}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Description */}
                        {content.eventDescription && (
                            <div className={`bg-black/40 rounded-xl p-6 border border-white/5 transition-all duration-1000 delay-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">About Event</h4>
                                <div className="text-gray-300 text-sm leading-relaxed max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                    {content.eventDescription}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePopup;
