import React from "react";
import "../../styles/Card.css";


const EventCard = ({
  yellowText,

  titleImage,
  description,
  artistImage,
}) => {
  return (
    <div className="card-wrapper">
      <div className="card-border">
        <div className="card-inner">

          <div className="white_div">
            <div className="artist">
              <img className="artist" src={artistImage} alt="artist" />
            </div>
            <div className="title1">
              PUMP IT UP
            </div>
          </div>

          <div className="text_area">
            <img className="text_area" src={yellowText} alt="text" />
          </div>

          <div className="text_card">
            {description}
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventCard;
