import React from "react";
import "../styles/mascot.css";

// Assets
import mascotVideo from "../assets/MascotLanding/mascot-video.mp4";
import araLogo from "../assets/MascotLanding/ara.png";
import backgroundImg from "../assets/MascotLanding/background1.png";

const MascotLanding = () => {

  return (
    <section className="w-full h-screen max-h-screen overflow-hidden box-border flex justify-center items-center p-2 sm:p-3 md:p-4 bg-[#FDDEC0]">

      {/* ✅ STAMP BORDER WRAPPER */}
      <div className="mascot-stamp relative w-full max-w-[92rem] flex justify-center items-center">

        <div className="mascot-outer relative w-full max-md:max-w-[500px] md:max-w-[78rem] shrink md:aspect-[16/11] max-md:aspect-[9/16] box-border shadow-lg sm:shadow-xl md:shadow-2xl">
          <div className="mascot-inner-bg absolute overflow-hidden">
            {/* Background Image - like PastArtist */}
            <img
              src={backgroundImg}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-125"
            />
            {/* ========== MOBILE/TABLET LAYOUT (< 768px) ========== */}
            <div className="md:hidden flex flex-col h-full w-full p-3">
              {/* Top row: Title + Logo side by side - 50% each */}
              <div className="flex flex-row gap-3 w-full shrink-0 mb-3">
                {/* Title Card - 50% */}
                <div className="mascot-right-top w-1/2 h-[70px] sm:h-[90px] bg-[rgba(108,13,46,0.767)] flex items-center justify-center rounded-xl relative">
                  <div className="mascot-title flex flex-col items-center justify-center text-center w-full h-full box-border leading-none">
                    <span className="font-['Lemon'] font-black text-transparent tracking-wide leading-none text-xs sm:text-sm">MEET</span>
                    <span className="font-['Lemon'] font-black text-transparent tracking-wide leading-none text-xs sm:text-sm">OUR</span>
                    <span className="font-['Lemon'] font-black text-transparent tracking-wide leading-none text-xs sm:text-sm">MASCOT</span>
                  </div>
                </div>
                {/* Logo Card - 50% */}
                <div className="mascot-right-bottom w-1/2 h-[70px] sm:h-[90px] bg-[rgba(108,13,46,0.767)] flex items-center justify-center overflow-hidden rounded-xl relative">
                  <img src={araLogo} alt="Logo" className="w-[70%] h-auto max-h-[80%] object-contain" />
                </div>
              </div>

              {/* Video - auto height to match video content */}
              <div className="mascot-left w-full overflow-hidden rounded-xl bg-black/15 shrink-0">
                <video
                  className="w-full h-auto object-contain rounded-inherit block"
                  src={mascotVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>

              {/* Empty space at bottom - flex-1 takes remaining space */}
              <div className="flex-1"></div>
            </div>

            {/* ========== DESKTOP LAYOUT (≥ 768px) ========== */}
            {/* Left Video Container */}
            <div className="mascot-left hidden md:block overflow-hidden bg-black/15 absolute left-[15%] top-[6%]">
              <video
                className="w-full h-auto object-cover rounded-inherit block"
                src={mascotVideo}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            {/* Right Top - Title */}
            <div className="mascot-right-top hidden md:flex bg-[rgba(108,13,46,0.767)] items-center justify-center absolute right-[15%] top-[6%] w-[30%] h-[32%] max-h-[35%]">
              <div className="mascot-title flex flex-col items-center justify-center text-center w-full h-full box-border leading-none">
                <span className="font-['Lemon'] font-black text-transparent tracking-wide leading-none">MEET</span>
                <span className="font-['Lemon'] font-black text-transparent tracking-wide leading-none">OUR</span>
                <span className="font-['Lemon'] font-black text-transparent tracking-wide leading-none">MASCOT</span>
              </div>
            </div>

            {/* Right Bottom - Logo */}
            <div className="mascot-right-bottom hidden md:flex bg-[rgba(108,13,46,0.767)] items-center justify-center overflow-hidden absolute right-[15%] bottom-[6%] w-[30%] h-[55%] max-h-[58%]">
              <img src={araLogo} alt="Logo" className="w-[70%] h-auto max-h-[90%] object-contain" />
            </div>
          </div>
        </div>

      </div>
      {/* ✅ END STAMP WRAPPER */}

    </section>
  );
};

export default MascotLanding;
