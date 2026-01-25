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

import Dance1 from '../assets/Events/DanceEvent/First/pump_it_up_1.png'
import Dance1Text from '../assets/Events/DanceEvent/First/pump_it_up.png'
import Dance2 from '../assets/Events/DanceEvent/second/street_dance_1.png'
import Dance2Text from '../assets/Events/DanceEvent/second/street_dance.png'
import Dance3 from '../assets/Events/DanceEvent/Third/Razzmatazz_1.png'
import Dance3Text from '../assets/Events/DanceEvent/Third/Razzmatazz.png'
import Dance4 from '../assets/Events/DanceEvent/Fourth/taal_tarang_1.png'
import Dance4Text from '../assets/Events/DanceEvent/Fourth/taal_tarang.png'


const DanceEvents = [
  { id: 1, title: Dance1Text, img: Dance1, desc: "Let the beats flow and your body move! Engage yourself in solo western performances where rhythm is everything." },
  { id: 2, title: Dance2Text, img: Dance2, desc: "Let the streets bear witness to electrifying performances and exhilarating beats. Let your spirits soar with street dance!" },
  { id: 3, title: Dance3Text, img: Dance3, desc: "Set the stage on fire as you unleash the rhythm and showcase your choreography in this dance battle." },
  { id: 4, title: Dance4Text, img: Dance4, desc: "Duet with a partner as your symphonies collide against each other in this competition of melodies." },
  { id: 5, title: "Let's Tangle", img: "https://picsum.photos/id/192/400/300", desc: "Let the streets bear witness to electrifying performances and exhilarating beats. Let your spirits soar with street dance!" },
  { id: 6, title: "Mudra", img: "https://picsum.photos/id/235/400/300", desc: "Explore the allure of the classical arts! Let light descend onto the stage as you enamor yourself in elegant styles." },
];
const EventPage = () => {
  return (
    <>
      <EventComponent HeaderImage={DanceHeader} Events={DanceEvents} border="#EF0303" />
      <EventComponent HeaderImage={MusicEventHeader} Events={DanceEvents} border="#3C9DF9" />
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