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
                            <img className="artist" src={artistImage} alt="artist" loading="lazy" />
                        </div>
                        <div className="title1">
                            {/* Check if titleImage is likely a URL/imported image or plain text. 
                                 Given the context, it's mostly images. 
                                 But if it's text (like "Let's Tangle"), render text. 
                              */}
                            {titleImage.includes('/') || titleImage.includes('data:image') ? (
                                <img src={titleImage} alt="Event Title" className="w-full h-full object-contain" loading="lazy" />
                            ) : (
                                titleImage
                            )}
                        </div>
                    </div>

                    <div className="text_area">
                        <img className="text_area" src={yellowText} alt="text" loading="lazy" />
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
