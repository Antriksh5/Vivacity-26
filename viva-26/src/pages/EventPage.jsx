import React from 'react'
import EventComponent from '../components/Events/EventComponent';
import DanceHeader from '../assets/Events/DanceEvent/DanceEventsHeader.png'
import ArtEventHeader from '../assets/Events/ArtEvent/ArtEventsHeader.png'
const DanceEvents = [
  { id: 1, title: "Pump It Up", img: "https://picsum.photos/id/103/400/300", desc: "Let the beats flow and your body move! Engage yourself in solo western performances where rhythm is everything." },
  { id: 2, title: "Street Dance", img: "https://picsum.photos/id/106/400/300", desc: "Let the streets bear witness to electrifying performances and exhilarating beats. Let your spirits soar with street dance!" },
  { id: 3, title: "Razzmatazz", img: "https://picsum.photos/id/158/400/300", desc: "Set the stage on fire as you unleash the rhythm and showcase your choreography in this dance battle." },
  { id: 4, title: "Taal Tarang", img: "https://picsum.photos/id/175/400/300", desc: "Duet with a partner as your symphonies collide against each other in this competition of melodies." },
  { id: 5, title: "Let's Tangle", img: "https://picsum.photos/id/192/400/300", desc: "Let the streets bear witness to electrifying performances and exhilarating beats. Let your spirits soar with street dance!" },
  { id: 6, title: "Mudra", img: "https://picsum.photos/id/235/400/300", desc: "Explore the allure of the classical arts! Let light descend onto the stage as you enamor yourself in elegant styles." },
];
const EventPage = () => {
  return (
    <>
      <EventComponent HeaderImage = {DanceHeader} Events = {DanceEvents}/>
      <EventComponent HeaderImage = {ArtEventHeader} Events = {DanceEvents}/>
      <EventComponent HeaderImage = {DanceHeader} Events = {DanceEvents}/>
    </>
  )
}

export default EventPage