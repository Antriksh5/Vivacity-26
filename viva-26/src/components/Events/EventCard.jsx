const EventCard = ({
  yellowText,
  title,
  description,
  artistImage,
  border,
}) => {
  const cardRed = border;

  const dashedBorderStyle = {
    border: '0.4rem dashed transparent',
    backgroundImage: `
      repeating-linear-gradient(to right, black 0 0.8rem, ${cardRed} 0.8rem 1.2rem, white 1.2rem 2rem, ${cardRed} 2rem 2.4rem),
      repeating-linear-gradient(to bottom, black 0 0.8rem, ${cardRed} 0.8rem 1.2rem, white 1.2rem 2rem, ${cardRed} 2rem 2.4rem),
      repeating-linear-gradient(to left, black 0 0.8rem, ${cardRed} 0.8rem 1.2rem, white 1.2rem 2rem, ${cardRed} 2rem 2.4rem),
      repeating-linear-gradient(to top, black 0 0.8rem, ${cardRed} 0.8rem 1.2rem, white 1.2rem 2rem, ${cardRed} 2rem 2.4rem)
    `,
    backgroundSize: `
      calc(100% - 0.8rem) 0.3rem,
      0.3rem calc(100% - 0.8rem),
      calc(100% - 0.8rem) 0.3rem,
      0.3rem calc(100% - 0.8rem)
    `,
    backgroundPosition: 'top center, right center, bottom center, left center',
    backgroundRepeat: 'no-repeat'
  };

  const mobileDashedBorderStyle = {
    border: '0.22rem dashed transparent',
    backgroundImage: `
      repeating-linear-gradient(to right, black 0 0.45rem, ${cardRed} 0.45rem 0.65rem, white 0.65rem 1.05rem, ${cardRed} 1.05rem 1.25rem),
      repeating-linear-gradient(to bottom, black 0 0.45rem, ${cardRed} 0.45rem 0.65rem, white 0.65rem 1.05rem, ${cardRed} 1.05rem 1.25rem),
      repeating-linear-gradient(to left, black 0 0.45rem, ${cardRed} 0.45rem 0.65rem, white 0.65rem 1.05rem, ${cardRed} 1.05rem 1.25rem),
      repeating-linear-gradient(to top, black 0 0.45rem, ${cardRed} 0.45rem 0.65rem, white 0.65rem 1.05rem, ${cardRed} 1.05rem 1.25rem)
    `,
    backgroundSize: `
      calc(100% - 0.5rem) 0.2rem,
      0.2rem calc(100% - 0.5rem),
      calc(100% - 0.5rem) 0.2rem,
      0.2rem calc(100% - 0.5rem)
    `,
    backgroundPosition: 'top center, right center, bottom center, left center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div
      className="
        w-[110%] max-w-[90rem] mx-auto my-[2rem] h-[58vh] 
        max-[1300px]:w-[105%] max-[1300px]:h-[52vh] 
        max-[1145px]:w-[105%] max-[1145px]:h-[42vh] 
        max-[1024px]:w-[100%] max-[1024px]:h-[36vh] 
        max-[812px]:w-[67%] max-[812px]:h-[45vh] 
        max-[698px]:w-[65%] max-[698px]:h-[35vh] 
        max-[530px]:w-[90%] max-[530px]:h-[28vh] 
        max-[427px]:w-[96%] max-[427px]:h-[27vh]
      "
    >
      <div
        className="p-[0.03rem] h-full transition-all duration-300"
        style={{ background: cardRed }}
      >
        <div
          className="relative w-full h-full bg-[var(--card-red)] transition-all duration-300"
          style={{
            '--card-red': cardRed,
            ...(window.innerWidth <= 698 ? mobileDashedBorderStyle : dashedBorderStyle)
          }}
        >
          {/* White Div (Image Container) */}
          <div className="
            relative bg-white w-[97.1%] h-[70%] ml-[1.5%] mt-[1.3%] border-[0.2rem] border-yellow-400
            max-[1024px]:h-[66%]
            max-[530px]:h-[60%] max-[530px]:mt-[5%]
            max-[427px]:h-[58%] max-[427px]:border-[0.1rem]
          ">
            <div className="
              relative h-[101%] w-[101.001%] -ml-[0.23%] -mt-[0.4%] 
              rounded-tl-[22%] rounded-tr-[22%] 
              max-[698px]:rounded-tl-[16%] max-[698px]:rounded-tr-[16%]
              max-[530px]:-mt-[1.4%] max-[530px]:h-[116%] max-[530px]:rounded-tl-[14%] max-[530px]:rounded-tr-[14%]
              max-[427px]:-mt-[2%] max-[427px]:h-[122%] max-[427px]:w-[101%] max-[427px]:rounded-tl-[12%] max-[427px]:rounded-tr-[12%]
            ">
              <img
                className="w-full h-full object-cover rounded-inherit"
                src={artistImage}
                alt="artist"
                style={{ borderRadius: 'inherit' }}
              />
            </div>

            <div className="
              font-['Rumble_Brave'] text-[#f7e8c6] absolute z-10 
              text-[clamp(1.8rem,3vw+2vh,3.8rem)] top-[74%] left-[1%] tracking-[0.15rem] 
              drop-shadow-[3px_3px_0_#111]
              
              max-[1300px]:text-[clamp(2.4rem,3.2vw,3.4rem)] max-[1300px]:top-[75%]
              max-[1145px]:text-[clamp(2rem,2.6vw,3rem)]
              max-[1024px]:text-[clamp(1.5rem,2.8vw,2.2rem)] max-[1024px]:top-[73%] max-[1024px]:tracking-[0.12rem]
              max-[812px]:text-[clamp(1.8rem,3.6vw,2.9rem)] max-[812px]:top-[76%]
              max-[698px]:text-[clamp(1.4rem,4vw,2.1rem)] max-[698px]:top-[74%]
              max-[530px]:text-[clamp(1.4rem,4.5vw,2.8rem)] max-[530px]:top-[68%] max-[530px]:tracking-[0.08rem]
              max-[427px]:text-[clamp(1.5rem,6vw,2rem)] max-[427px]:top-[73%] max-[427px]:drop-shadow-[2px_2px_0_#111]
            "
              style={{ WebkitTextStroke: '1px #111' }}
            >
              {title}
            </div>
          </div>

          {/* Text Area (Yellow Background) */}
          <div className="
            w-[98.61%] h-[28%] ml-[0.7%] relative z-[4] overflow-hidden
            max-[1024px]:h-[32%]
            max-[427px]:mt-[1%] max-[427px]:h-[35%]
          ">
            <img
              className="w-full h-full object-cover max-[530px]:h-full max-[530px]:w-full"
              src={yellowText}
              alt="text"
            />
          </div>

          {/* Description Text */}
          <div className="
            absolute left-[3%] top-[75%] w-[92%] z-[5] text-black font-medium leading-[1.35]
            text-[clamp(0.9rem,1.2vw+0.7vh,1.3rem)]
            
            max-[1300px]:text-[clamp(1rem,1.3vw,1.25rem)]
            max-[1145px]:text-[clamp(0.7rem,0.9vw,0.9rem)]
            max-[1024px]:text-[clamp(0.6rem,1vw,0.8rem)] max-[1024px]:top-[71%]
            max-[812px]:text-[clamp(0.95rem,1.6vw,1.15rem)]
            max-[698px]:text-[clamp(0.65rem,1.6vw,0.85rem)]
            max-[530px]:text-[clamp(0.7rem,2vw,0.9rem)] max-[530px]:top-[72%]
            max-[427px]:text-[clamp(0.7rem,2.5vw,0.9rem)] max-[427px]:leading-[1.2] max-[427px]:top-[74%] max-[427px]:w-[96%] max-[427px]:left-[2%]
          ">
            {description}
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventCard;
