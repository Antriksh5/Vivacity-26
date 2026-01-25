import React from 'react'
import EventComponent from '../components/Events/EventComponent';
import DanceHeader from '../assets/Events/DanceEvent/DanceEventsHeader.png'
import MusicEventHeader from '../assets/Events/MusicEvent/MusicEventsHeader.png'
import DramaEventHeader from '../assets/Events/DramaEvent/DramaEventsHeader.png'
import SpeakingArtsHeader from '../assets/Events/SpeakingArt/SpeakingArtsHeader.png'
import PhotographyEventHeader from '../assets/Events/PhotographyEvent/PhotographyEventHeader.png'
import ArtEventHeader from '../assets/Events/ArtEvent/ArtEventsHeader.png'
import QuizzingEventHeader from '../assets/Events/QuizzingEvent/QuizzingEventsHeader.png'
import FashionEventHeader from '../assets/Events/FashionEvent/FashionEventsHeader.png'
import SocialEventHeader from '../assets/Events/SocialEvent/SocialEventsHeader.png'
import ExcitingPursuitHeader from '../assets/Events/ExcitingPursuits/ExcitingPursuitHeader.png'

import MusicOrangeBox from '../assets/Events/MusicEvent/OrangeTextBox.png'

import { DanceEvents, MusicEvents } from '../data/EventData';

const EventPage = () => {
  return (
    <>
      <EventComponent HeaderImage={DanceHeader} Events={DanceEvents} border="#EF0303" />
      <EventComponent HeaderImage={MusicEventHeader} Events={MusicEvents} border="#FFA500" TextAreaImage={MusicOrangeBox} />
      <EventComponent HeaderImage={DramaEventHeader} Events={DanceEvents} border="#04BD49" />
      <EventComponent HeaderImage={SpeakingArtsHeader} Events={DanceEvents} border="#F5B60C" />
      <EventComponent HeaderImage={PhotographyEventHeader} Events={DanceEvents} border="#A902D4" />
      <EventComponent HeaderImage={ArtEventHeader} Events={DanceEvents} border="#E95F09" />
      <EventComponent HeaderImage={QuizzingEventHeader} Events={DanceEvents} border="#EF0303" />
      <EventComponent HeaderImage={FashionEventHeader} Events={DanceEvents} border="#3C9DF9" />
      <EventComponent HeaderImage={SocialEventHeader} Events={DanceEvents} border="#04BD49" />
      <EventComponent HeaderImage={ExcitingPursuitHeader} Events={DanceEvents} border="#F5B60C" />
    </>
  )
}
export default EventPage