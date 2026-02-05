import React from 'react';
import '../styles/VendorStamp.css';

const VendorStamp = ({ name, description, websiteUrl, color1 = '#000', backgroundColor = '#fff' }) => {

    return (
        <div className="relative w-full aspect-[4/3] sm:aspect-[1/1] flex justify-center shrink-0 transition-transform duration-300 hover:scale-[1.03] hover:rotate-1 group">

            {/* The Stamp Border Container */}
            <div
                className="vendor-stamp-container w-full h-full flex flex-col items-center justify-center p-4 text-center"
                style={{
                    '--stamp-color': color1,
                    '--stamp-bg': backgroundColor,   // Using the passed Page Background so holes look transparent
                    backgroundColor: color1,
                }}
            >
                <div className="vendor-inner-border" style={{ borderColor: 'rgba(0,0,0,0.2)' }}></div>

                {/* Content Area */}
                <div className="bg-[#FFFBF2] w-full h-full rounded-xl flex flex-col items-center justify-center p-3 z-10 relative overflow-hidden">

                    <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
                        <h3
                            className="font-['Lemon_Milk',_sans-serif] text-sm sm:text-base md:text-xl font-bold leading-tight uppercase mb-1 drop-shadow-sm tracking-wide"
                            style={{ color: color1 }}
                        >
                            {name}
                        </h3>

                        {/* Decorative divider */}
                        <div
                            className="w-10 h-0.5 rounded-full my-1 opacity-80"
                            style={{ backgroundColor: color1 }}
                        ></div>

                        <p className="font-['Outfit',_sans-serif] text-[10px] sm:text-xs font-semibold text-gray-800 leading-snug px-1 line-clamp-4">
                            {description}
                        </p>

                        {websiteUrl && (
                            <a
                                href={websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 px-5 py-1.5 text-white font-['Lemon_Milk',_sans-serif] text-[10px] sm:text-xs rounded-full uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-95"
                                style={{
                                    backgroundColor: color1,
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#000';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = color1;
                                }}
                            >
                                Visit
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorStamp;
