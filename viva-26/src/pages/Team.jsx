import VivaLogo from "../assets/Team/VivaLogo.png";
import Flower from "../assets/Team/Flower.png";
import FlowerY from "../assets/Team/FlowerY.png";
import Circle from "../assets/Team/Circle.png";
import TeamHeader from "../assets/Team/TeamHeader.png";
import TeamMid1 from "../assets/Team/TeamMid1.png";
import TeamMid2 from "../assets/Team/TeamMid2.png";
import TeamMidBorder from "../assets/Team/TeamMidBorder.png";
import TeamMidBorderMobile from "../assets/Team/TeamMidBorderMobile.png";
import TeamMidMobile from "../assets/Team/TeamMidMobile.png";
import TeamFooter from "../assets/Team/TeamFooter.png";
import BottomBg from "../assets/Team/BottomBg.png";
import TeamBg from "../assets/Team/TeamBg.png";
import "../styles/Team.css";

const Team = () => {
  return (
    <div
      className="py-10 px-4 w-full min-h-screen flex justify-center items-center"
      style={{ backgroundColor: "#FDDEC0" }}
    >
      <div
        className="team-stamp-border w-full max-w-[1200px] mx-auto box-border"
        style={{ "--stamp-color": "#FDDEC0" }}
      >

        <div className="inner-container bg-[#FFD600] w-full h-full relative overflow-hidden flex flex-col pt-6 sm:pt-10">

          <div
            className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url(${TeamBg})` }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 z-0">
            <img src={BottomBg} className="w-full h-full object-cover object-bottom opacity-80" alt="" />
          </div>

          <div className="relative z-10 flex-grow flex flex-col items-center w-full">

            <div className="flex justify-between items-center w-full px-2 sm:px-10">
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="relative w-10 h-10 sm:w-16 sm:h-16 flex-shrink-0">
                  <img src={Circle} className="absolute inset-0 w-full h-full" alt="" />
                  <img src={VivaLogo} className="relative w-6 sm:w-10 mx-auto mt-2" alt="Viva Logo" />
                </div>
                <img src={Flower} className="w-8 sm:w-12 hidden md:block" alt="" />
              </div>

              <div className="flex-1 min-w-0 mx-2 flex justify-center">
                <img
                  src={TeamHeader}
                  className="h-8 sm:h-16 md:h-20 lg:h-24 object-contain max-w-full"
                  alt="THE TEAM"
                />
              </div>

              <div className="flex items-center gap-2 lg:gap-4">
                <img src={Flower} className="w-8 sm:w-12 hidden md:block" alt="" />
                <div className="relative w-10 h-10 sm:w-16 sm:h-16 flex-shrink-0">
                  <img src={Circle} className="absolute inset-0 w-full h-full" alt="" />
                  <img src={VivaLogo} className="relative w-6 sm:w-10 mx-auto mt-2" alt="Viva Logo" />
                </div>
              </div>
            </div>

            <div className="w-full mt-6 sm:mt-10 mb-8 flex flex-col items-center">

              <div className="w-full mb-[-5px] z-20">
                <img src={TeamMidBorder} className="w-full object-contain hidden sm:block" alt="decoration" />
                <img src={TeamMidBorderMobile} className="w-full object-contain block sm:hidden" alt="decoration" />
              </div>

              <div className="relative w-full flex justify-center">
                <div className="absolute inset-0 w-full h-full z-0">
                  <img src={TeamMidMobile} className="w-full h-full block sm:hidden" style={{ objectFit: "fill" }} alt="content background mobile" />

                  <div className="hidden sm:block w-full h-full relative">
                    <img src={TeamMid1} className="w-full h-full" style={{ objectFit: "fill" }} alt="content background" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src={TeamMid2} className="w-[98%] h-[90%]" style={{ objectFit: "fill" }} alt="" />
                    </div>
                  </div>
                </div>

                <div className="relative z-10 py-[15%] px-[12%] sm:py-[8%] sm:px-[10%] text-center flex flex-col items-center justify-center">
                  <p className="content-box-text mb-2 sm:mb-4">
                    MEET THE VISIONARIES, CREATORS, AND CHANGEMAKERS BEHIND VIVACITY
                    <br className="hidden lg:block" />
                    FROM SPARKING BOLD IDEAS TO SHAPING UNFORGETTABLE EXPERIENCES, THIS TEAM
                    TURNS IMAGINATION INTO IMPACT. EVERY DETAIL, EVERY MOMENT, EVERY SPARK OF MAGIC
                    CRAFTED BY MINDS THAT DARE TO DREAM AND DO.
                  </p>
                  <p className="content-box-text">
                    TAP IN TO DISCOVER THE FACES, STORIES, AND PASSION POWERING
                    THE UNIVERSE OF VIVACITY'26
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="relative z-20 w-full mt-auto">
            <div
              className="w-full bg-[#D95F08] border-t-[4px] sm:border-t-[6px] border-[#731402]
                         px-2 sm:px-10 py-3 sm:py-5
                         flex justify-between items-center shadow-inner"
            >
              <div className="flex gap-1 sm:gap-4">
                <img src={FlowerY} className="w-[1.2rem] sm:w-8 block sm:hidden" alt="" />
                <img src={FlowerY} className="w-8 sm:w-12 hidden md:block" alt="" />
                <img src={FlowerY} className="w-8 sm:w-12 hidden sm:block" alt="" />
              </div>

              <img src={TeamFooter} className="h-6 sm:h-10 md:h-12 object-contain mx-1 sm:mx-0 flex-grow sm:flex-grow-0" alt="MEET THEM" />

              <div className="flex gap-1 sm:gap-4">
                <img src={FlowerY} className="w-8 sm:w-12 hidden sm:block" alt="" />
                <img src={FlowerY} className="w-8 sm:w-12 hidden md:block" alt="" />
                <img src={FlowerY} className="w-[1.2rem] sm:w-8 block sm:hidden" alt="" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Team;
