import React from "react";
import "../../styles/Card.css";


const EventCard = ({
  yellowText,
  title,
  description,
  artistImage,
  border,
}) => {
  return (
    <div className="card-wrapper" style={{ "--card-red": border }}>
      <div className="card-border" style={{ "--card-red": border }}>
        <div className="card-inner" style={{ "--card-red": border }}>

          <div className="white_div">
            <div className="artist">
              <img className="artist" src={artistImage} alt="artist" />
            </div>
            <div className="title1">
              {title}
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
