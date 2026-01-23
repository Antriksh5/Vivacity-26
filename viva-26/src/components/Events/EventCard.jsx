import React from 'react';

const EventCard = ({ imageSrc, title, description }) => {
  return (
    <div className="relative group h-full flex flex-col">
      {/* The heavy red border frame overlay */}
      <div className="absolute inset-0 border-[5px] border-poster-red z-20 pointer-events-none rounded-sm"></div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Title Overlay with heavy shadow/outline effect */}
        <h3 className="absolute bottom-1 left-2 z-10 text-white text-2xl font-display font-bold tracking-wider drop-shadow-[0_3px_3px_rgba(0,0,0,0.9)] shadow-text-outline">
          {title.toUpperCase()}
        </h3>
         {/* Dark gradient at bottom of image to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Description Box */}
      <div className="bg-poster-yellow p-3 flex-grow border-t-[5px] border-poster-red z-10 relative">
        <p className="text-xs font-bold text-black leading-tight uppercase">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EventCard;