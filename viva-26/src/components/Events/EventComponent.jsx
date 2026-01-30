import React from 'react'
import { Link } from 'react-router-dom'
import { Events } from '../../utils/cloudinaryUrls';

const BackGroundImage = Events.BackGroundImage;
const TextArea = Events.Dance.YellowTextArea;

import EventCard from './EventCard';

import '../../styles/Event.css'

const EventComponent = ({ HeaderImage, Events, border, TextAreaImage = TextArea, rulebookUrl }) => {
    return (
        <>
            <div
                className='p-4 sm:p-5 md:p-6 w-full min-h-screen transition-colors duration-300'
                style={{ backgroundColor: border }}
            >

                {/* Stamp Border Wrapper */}
                <div
                    className='relative w-full min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-5rem)] stamp-border p-9 md:p-14 flex flex-col'
                    style={{ '--stamp-color': border }}
                >
                    <div className="stamp-inner-line"></div>

                    {/* Inner Content Container */}
                    <div className='relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col grow z-20'>
                        <div className='absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat'
                            style={{ backgroundImage: `url(${BackGroundImage})` }}
                        />
                        <div className="relative z-10 p-4 sm:p-6 flex flex-col grow">
                            <div className='flex justify-center items-start w-full mb-3'>
                                <img src={HeaderImage} alt="Events" className='w-3/4 sm:w-[80vw] lg:w-[80vw] lg:h-[25vh] object-contain' />
                            </div>
                            <div className="w-full max-w-[95%] mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 p-2 md:p-4 justify-items-center">
                                {Events.map((event, index) => {
                                    const isLastOdd = Events.length % 2 !== 0 && index === Events.length - 1;
                                    return (
                                        <div
                                            key={event.id}
                                            className={`w-full flex justify-center ${isLastOdd ? 'lg:col-span-2 lg:w-[calc(50%-1.25rem)]' : ''}`}
                                        >
                                            <EventCard
                                                title={event.title}
                                                artistImage={event.img}
                                                description={event.desc}
                                                yellowText={TextAreaImage}
                                                border={border}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='mt-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 w-full pb-4 relative z-50'
                            >
                                {rulebookUrl && (
                                    <a
                                        href={rulebookUrl}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='w-full sm:w-auto px-8 py-3 bg-[#FFF600] shadow-[0_4px_0_#FF4193] active:shadow-none active:translate-y-[4px] transition-all rounded-md text-[red] border-[#00D9FF] border-[1.5px] text-sm sm:text-base tracking-wide rum-raisin-regular text-center'>
                                        DOWNLOAD RULEBOOK
                                    </a>
                                )}
                                <Link
                                    to="/registration"
                                    className='w-full sm:w-auto px-8 py-3 bg-[#FFF600] shadow-[0_4px_0_#FF4193] active:shadow-none active:translate-y-[4px] transition-all rounded-md text-[red] border-[#00D9FF] border-[1.5px] text-sm sm:text-base tracking-wide rum-raisin-regular text-center'>
                                    REGISTER NOW
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default EventComponent