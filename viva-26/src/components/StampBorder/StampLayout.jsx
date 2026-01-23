import React, { forwardRef } from 'react';

export const StampFrame = ({ children, className = "" }) => {
    return (
        <div className="fixed inset-0 w-full h-full bg-[#5d2a1c] flex justify-center items-center py-4 px-3 sm:py-8 sm:px-6 z-0">
            
            <div className={`relative w-[95vw] h-[90vh] stamp-border p-6 box-border z-10 flex flex-col ${className}`}>
                {children}
            </div>
        </div>
    );
};

//  The Inner Container
 
export const StampScrollContainer = forwardRef(({ children, className = "" }, ref) => {
    return (
        <div 
            ref={ref} 
            className={`relative w-full h-full rounded-[2rem] border-[3px] border-[#9E5D47] overflow-y-auto overflow-x-hidden bg-[#f7d0ab] no-scrollbar scroll-smooth ${className}`}
        >
            {children}
        </div>
    );
});