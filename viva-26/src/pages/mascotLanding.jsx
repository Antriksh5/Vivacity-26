import React from "react";
import "../styles/mascot.css";
import { MascotLanding as MascotImages } from '../utils/cloudinaryUrls';

// Assets - video from local, images from Cloudinary
import mascotVideo from "../assets/MascotLanding/mascot-video.mp4";
const araLogo = MascotImages.ara;
const backgroundImg = MascotImages.background1;


const MascotLanding = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center p-1 bg-[#FDDEC0] overflow-hidden">
      {/* STAMP BORDER WRAPPER */}
      <div className="mascot-stamp relative w-full max-w-[100vw] h-[calc(100vh-2rem)] max-h-[100vh] p-4 sm:p-4 md:p-5 lg:p-7 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] ">

        {/* OUTER CONTAINER */}
        <div className="mascot-outer relative w-full h-full rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">

          {/* INNER BACKGROUND */}
          <div className="relative w-full h-full p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border-4 border-[#fff]">

            {/* Background Image */}
            <img
              src={backgroundImg}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-110"
            />

            {/* Content Grid */}
            <div className="relative z-10 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-12 lg:gap-10 xl:gap-10 w-full h-full justify-center items-center">

              {/* LEFT SIDE - Mascot (Bottom on Mobile) */}
              <div className="relative w-full flex-1  md:h-[90%] md:w-[45%] lg:w-[40%]  rounded-xl sm:rounded-2xl flex justify-center items-center overflow-hidden order-2 md:order-1 min-h-0 ">
                <video
                  src={mascotVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-5 h-[60%] md:h-[95%] w-auto max-w-full object-contain border-4 border-[#fff]"
                />
              </div>

              {/* RIGHT SIDE - Title and Logo (Top on Mobile) */}
              <div className="flex flex-row md:flex-col gap-3 sm:gap-4 md:gap-6 w-full h-[30%] sm:h-[35%] md:h-auto md:w-[40%] lg:w-[30%] order-1 md:order-2 shrink-0 md:-translate-x-8 lg:-translate-x-12">

                {/* Title Card */}
                <div className="mascot-right-card relative w-1/2 md:w-full h-full md:h-[40%] bg-[rgba(108,13,46,0.9)] rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-4 ">
                  <div className="mascot-title flex flex-col items-center justify-center text-center gap-0.5 sm:gap-1">
                    <span className="text-[clamp(1.2rem,5vw,5rem)] lg:text-[clamp(1.5rem,4vw,6rem)] leading-none font-black tracking-wide">MEET</span>
                    <span className="text-[clamp(1.2rem,5vw,5rem)] lg:text-[clamp(1.5rem,4vw,6rem)] leading-none font-black tracking-wide">OUR</span>
                    <span className="text-[clamp(1.2rem,5vw,5rem)] lg:text-[clamp(1.5rem,4vw,6rem)] leading-none font-black tracking-wide">MASCOT</span>
                  </div>
                </div>

                {/* Logo Card */}
                <div className="mascot-right-card relative w-1/2 md:w-full h-full md:flex-1 bg-[rgba(108,13,46,0.9)] rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                  <img
                    src={araLogo}
                    alt="Ara Logo"
                    className="w-[80%] h-auto max-h-[90%] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MascotLanding;
