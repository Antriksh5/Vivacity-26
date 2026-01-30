import React from 'react'
import EventComponent from '../components/Events/EventComponent';
import { Events } from '../utils/cloudinaryUrls';

import DanceRulebook from '../data/Events/Dance.pdf'
import MusicRulebook from '../data/Events/Music.pdf'
import DramaRulebook from '../data/Events/Drama.pdf'
import FashionRulebook from '../data/Events/Vogue.pdf'

import {
  DanceEvents,
  MusicEvents,
  DramaEvents,
  SpeakingArtsEvents,
  PhotographyEvents,
  ArtEvents,
  QuizzingEvents,
  FashionEvents,
  SocialEvents,
  ExcitingPursuitsEvents
} from '../data/EventData';

const EventPage = () => {
  return (
    <>
      <EventComponent HeaderImage={Events.Dance.Header} Events={DanceEvents} border="#EF0303" rulebookUrl={DanceRulebook} />
      <EventComponent HeaderImage={Events.Music.Header} Events={MusicEvents} border="#3C9DF9" TextAreaImage={Events.Music.OrangeTextBox} rulebookUrl={MusicRulebook} />
      <EventComponent HeaderImage={Events.Drama.Header} Events={DramaEvents} border="#04BD49" rulebookUrl={DramaRulebook} />
      <EventComponent HeaderImage={Events.SpeakingArt.Header} Events={SpeakingArtsEvents} border="#F5B60C" />
      <EventComponent HeaderImage={Events.Photography.Header} Events={PhotographyEvents} border="#A902D4" />
      <EventComponent HeaderImage={Events.Art.Header} Events={ArtEvents} border="#E95F09" />
      <EventComponent HeaderImage={Events.Quizzing.Header} Events={QuizzingEvents} border="#EF0303" />
      <EventComponent HeaderImage={Events.Fashion.Header} Events={FashionEvents} border="#3C9DF9" rulebookUrl={FashionRulebook} />
      <EventComponent HeaderImage={Events.Social.Header} Events={SocialEvents} border="#04BD49" />
      <EventComponent HeaderImage={Events.ExcitingPursuits.Header} Events={ExcitingPursuitsEvents} border="#F5B60C" />
    </>
  )
}
export default EventPage