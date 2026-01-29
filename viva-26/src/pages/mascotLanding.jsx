import React, { useEffect } from "react";
import "../styles/mascot.css";

import { StampFrame, StampScrollContainer } 
  from "../components/StampBorder/StampLayout";

import mascotVideo from "../assets/MascotLanding/mascot-video.mp4";
import mascotImage from "../assets/MascotLanding/mascot-final.png";
import araLogo from "../assets/MascotLanding/ara.png";
import backgroundImg from "../assets/MascotLanding/background1.png";

const MascotLanding = () => {

  useEffect(() => {
    const video = document.querySelector(".mascot-video");
    const image = document.querySelector(".mascot-image");

    if (!video || !image) return;

    video.play();

    const timer = setTimeout(() => {
      video.pause();
      video.style.display = "none";
      image.style.opacity = "1";
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

return (
  <StampFrame>
    <StampScrollContainer>

      <section className="mascot-section">
        <div className="mascot-outer">
          <div
            className="mascot-inner-bg"
            style={{ backgroundImage: `url(${backgroundImg})` }}
          >

            <div className="mascot-left">
              <video
                className="mascot-video"
                src={mascotVideo}
                autoPlay
                muted
                playsInline
              />

              <img
                className="mascot-image"
                src={mascotImage}
                alt="Mascot Final"
                style={{ opacity: 0 }}
              />
            </div>

            <div className="mascot-right-top">
              <div className="mascot-title">
                <span>MEET</span>
                <span>OUR</span>
                <span>MASCOT</span>
              </div>
            </div>

            <div className="mascot-right-bottom">
              <img src={araLogo} alt="Logo" className="mascot-logo" />
            </div>

          </div>
        </div>
      </section>

    </StampScrollContainer>
  </StampFrame>
);
};

export default MascotLanding;
