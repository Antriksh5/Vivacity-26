import React from 'react'
import BackGroundImage from '../../assets/Events/BackGroundImage.png'

import EventCard from './EventCard';

const EventComponent = (props) => {
  return (
    <>
    <div className='bg-[#FFDAB5] p-4 sm:p-6 md:p-10 w-full min-h-screen'>
      <div className='relative w-full min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-5rem)] border-2 border-[#9E5D47] rounded-3xl sm:rounded-4xl overflow-hidden flex flex-col'>
        <div className='absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${BackGroundImage})` }}
        />
        <div className="relative z-10 p-4 sm:p-6 flex flex-col grow">
          <div className='flex justify-center items-start w-full mb-3'>
            <img src={props.HeaderImage} alt="Events" className='w-3/4 sm:w-1/2 lg:w-1/3 max-w-lg object-contain' />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {props.Events.map(event => (
                  <EventCard 
                      key={event.id}
                      title={event.title}
                      imageSrc={event.img}
                      description={event.desc}
                  />
              ))}
          </div>
          <div className='mt-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 w-full pb-4'
          >
              <button 
              className='w-full sm:w-auto px-8 py-3 bg-[#FFF600] shadow-[0_4px_0_#FF4193] active:shadow-none active:translate-y-[4px] transition-all rounded-md text-[red] border-[#00D9FF] border-[1.5px]  text-sm sm:text-base tracking-wide rum-raisin-regular'>
                DOWNLOAD RULEBOOK
              </button>
              <button className='w-full sm:w-auto px-8 py-3 bg-[#FFF600] shadow-[0_4px_0_#FF4193] active:shadow-none active:translate-y-[4px] transition-all rounded-md text-[red] border-[#00D9FF] border-[1.5px]  text-sm sm:text-base tracking-wide rum-raisin-regular'>
                REGISTER NOW
              </button>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default EventComponent