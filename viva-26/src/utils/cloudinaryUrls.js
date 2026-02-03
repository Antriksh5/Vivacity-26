import aboutThemeBorderImg from '../assets/landingPage/aboutTheme.png';
import mobileThemeBorderImg from '../assets/landingPage/mobileAboutTheme.png';
import aboutVivaBorderImg from '../assets/landingPage/aboutVivaBorder.png';
/**
 * Cloudinary Image URL Mappings
 *
 * Highly optimized Cloudinary URLs with aggressive compression and modern formats.
 * Uses f_auto (WebP/AVIF), q_auto:low for max compression, responsive sizing.
 */

const CLOUD_NAME = 'dilxriyf3';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

// AWS S3 CDN URLs for GIF assets (better performance than local files)
const S3_BASE_URL = 'https://viva-bucket-2026.s3.us-east-1.amazonaws.com';

export const S3Assets = {
    billBoard: `${S3_BASE_URL}/billBoard.gif`,
    jugnoo: `${S3_BASE_URL}/jugnoo.gif`,
    shops: `${S3_BASE_URL}/shops.gif`,
    tediuxLogo: `${S3_BASE_URL}/tediux-logo.png`,
    thadiJugnoo: `${S3_BASE_URL}/thadi+jugnoo.gif`,
    aboutThemeBorder: aboutThemeBorderImg,
    aboutVivaBorder: aboutVivaBorderImg,
};

// Optimized URL helpers with aggressive compression
// f_auto: WebP/AVIF auto-selection, q_auto:low: maximum compression
const url = (publicId) => `${BASE_URL}/f_auto,q_auto:low/${publicId}`;

// Higher quality for critical above-fold images
const urlHQ = (publicId) => `${BASE_URL}/f_auto,q_auto:good/${publicId}`;

// Responsive images with width cap (prevents oversized images)
const urlWithWidth = (publicId, width) => `${BASE_URL}/f_auto,q_auto:low,w_${width}/${publicId}`;

// Mobile-optimized (smaller width, lower quality)
const urlMobile = (publicId) => `${BASE_URL}/f_auto,q_auto:low,w_768/${publicId}`;

// Desktop-optimized with width cap
const urlDesktop = (publicId) => `${BASE_URL}/f_auto,q_auto:low,w_1920/${publicId}`;

// Thumbnail/small image helper
const urlThumb = (publicId) => `${BASE_URL}/f_auto,q_auto:low,w_400/${publicId}`;

// Legacy Page Images
export const Legacy = {
    Television: urlDesktop('viva-26/Legacy/Television'),
    LegacyBgMobile: urlMobile('viva-26/Legacy/LegacyBgMobile'),
    LegacyText: url('viva-26/Legacy/LegacyText'),
};

// Team Page Images
export const Team = {
    VivaLogo: urlThumb('viva-26/Team/VivaLogo'),
    Flower: urlThumb('viva-26/Team/Flower'),
    FlowerY: urlThumb('viva-26/Team/FlowerY'),
    Circle: urlThumb('viva-26/Team/Circle'),
    TeamHeader: urlDesktop('viva-26/Team/TeamHeader'),
    TeamMid1: urlDesktop('viva-26/Team/TeamMid1'),
    TeamMid2: urlDesktop('viva-26/Team/TeamMid2'),
    TeamMidBorder: urlDesktop('viva-26/Team/TeamMidBorder'),
    TeamMidBorderMobile: urlMobile('viva-26/Team/TeamMidBorderMobile'),
    TeamMidMobile: urlMobile('viva-26/Team/TeamMidMobile'),
    TeamFooter: urlDesktop('viva-26/Team/TeamFooter'),
    BottomBg: urlDesktop('viva-26/Team/BottomBg'),
    TeamBg: urlDesktop('viva-26/Team/TeamBg'),
    StampBorder: url('viva-26/Team/StampBorder'),
};

// Landing Page Images - critical for LCP
export const LandingPage = {
    aboutThemebg: urlDesktop('viva-26/landingPage/aboutThemebg'),
    aboutBgPhn: urlMobile('viva-26/landingPage/aboutBgPhn'),
    bgDoor: urlDesktop('viva-26/landingPage/bgDoor'),
    bgAboutPhn: urlMobile('viva-26/landingPage/bgAboutPhn'),
    aboutViva: urlDesktop('viva-26/landingPage/aboutViva'),
    bgAbout: urlDesktop('viva-26/landingPage/bgAbout'),
    aboutThemeBorder: S3Assets.aboutThemeBorder,
    ferrisWheel: urlDesktop('viva-26/landingPage/ferrisWheel'),
    comingSoon: url('viva-26/landingPage/comingSoon'),
    doorImg: urlDesktop('viva-26/landingPage/doorImg'),
    bottomImg: urlDesktop('viva-26/landingPage/bottomImg'),
    jugnooGroundMobile: urlMobile('viva-26/landingPage/jugnooGroundMobile'),
    gateBelow: urlDesktop('viva-26/landingPage/gateBelow'),
    jugnooGround: urlDesktop('viva-26/landingPage/jugnooGround'),
    leftHand: url('viva-26/landingPage/leftHand'),
    mbabTheme: urlMobile('viva-26/landingPage/mbabTheme'),
    mobileJugnooGround: urlMobile('viva-26/landingPage/mobileJugnooGround'),
    nimbuMirchi: urlThumb('viva-26/landingPage/nimbuMirchi'),
    mobileThemeBorder: mobileThemeBorderImg,
    registerNow: urlThumb('viva-26/landingPage/registerNow'),
    rightHand: url('viva-26/landingPage/rightHand'),
    tediuxLogo: urlThumb('viva-26/landingPage/tediux-logo'),
    uncle: url('viva-26/landingPage/uncle'),
    woodFrame: url('viva-26/landingPage/woodFrame'),
};

// Gate Animation Frames (for LandingPage.jsx)
// Optimized with: f_auto (WebP/AVIF), q_auto:low (smaller files), w_1920 (max width cap)
const gateFrameUrl = (frameNum) =>
    `${BASE_URL}/f_auto,q_auto:low,w_1920/${`viva-26/landingPage/gate-animation/frame_${frameNum}`}`;

export const GateAnimationFrames = Array.from({ length: 27 }, (_, i) => {
    const frameNum = String(i + 2).padStart(2, '0');
    return gateFrameUrl(frameNum);
});

// First 3 frames with higher quality for initial display
export const GateAnimationFramesPriority = Array.from({ length: 3 }, (_, i) => {
    const frameNum = String(i + 2).padStart(2, '0');
    return `${BASE_URL}/f_auto,q_auto:good,w_1920/${`viva-26/landingPage/gate-animation/frame_${frameNum}`}`;
});

// Footer Images
export const FooterImg = {
    footerLogo: urlThumb('viva-26/Footer/footerLogo'),
    footer: urlDesktop('viva-26/Footer/footer'),
};

// Mascot Landing Images
export const MascotLanding = {
    ara: urlDesktop('viva-26/MascotLanding/ara'),
    mascotFinal: urlDesktop('viva-26/MascotLanding/mascot-final'),
    background1: urlDesktop('viva-26/MascotLanding/background1'),
};

// Event Landing Images
export const EventLanding = {
    BottomBorder: url('viva-26/EventLanding/Bottom%20Border'),
    Dance1: urlWithWidth('viva-26/EventLanding/Dance1', 600),
    Background: urlDesktop('viva-26/EventLanding/Backgound'),
    ArtImage: urlWithWidth('viva-26/EventLanding/ArtImage', 600),
    Hand: url('viva-26/EventLanding/Hand'),
    FashionImage: urlWithWidth('viva-26/EventLanding/FashionImage', 600),
    QuizEvent: urlWithWidth('viva-26/EventLanding/QuizEvent', 600),
    PhotoGraphyImage: urlWithWidth('viva-26/EventLanding/PhotoGraphyImage', 600),
    ExcitingImage: urlWithWidth('viva-26/EventLanding/ExcitingImage', 600),
    SideBorder: url('viva-26/EventLanding/SideBorder'),
    SpeakingImage: urlWithWidth('viva-26/EventLanding/SpeakingImage', 600),
    SocialImage: urlWithWidth('viva-26/EventLanding/SocialImage', 600),
    AakheGIF: `https://res.cloudinary.com/dilxriyf3/image/upload/f_auto,q_auto:low/v1769790106/AakheGIF_1_haefx7.gif`,
};

// Past Artists Images
export const PastArtist = {
    AmitTrivedi: urlWithWidth('viva-26/PastArtist/AmitTrivedi', 500),
    AssesKaur: urlWithWidth('viva-26/PastArtist/AssesKaur', 500),
    DarshanRaval: urlWithWidth('viva-26/PastArtist/DarshanRaval', 500),
    JubinNautyal: urlWithWidth('viva-26/PastArtist/JubinNautyal', 500),
    Kullu: urlWithWidth('viva-26/PastArtist/Kullu', 500),
    MohitChauhan: urlWithWidth('viva-26/PastArtist/MohitChauhan', 500),
    Raftaar: urlWithWidth('viva-26/PastArtist/Raftaar', 500),
    Ritviz: urlWithWidth('viva-26/PastArtist/Ritviz', 500),
    PastArtistBackGround: urlDesktop('viva-26/PastArtist/PastArtistBackGround'),
    MatchBoxOpen: urlWithWidth('viva-26/PastArtist/MatchBoxOpen', 800),
    LeftButton: urlThumb('viva-26/PastArtist/LeftButton'),
    RightButton: urlThumb('viva-26/PastArtist/RightButton'),
    LeftTopCorner: urlThumb('viva-26/PastArtist/LeftTopCorner'),
    RightTopCorner: urlThumb('viva-26/PastArtist/RightTopCorner'),
    LeftBottomCorner: urlThumb('viva-26/PastArtist/LeftBottomCorner'),
    RightBottomCorner: urlThumb('viva-26/PastArtist/RightBottomCorner'),
    TopLeftCornerPurple: urlThumb('viva-26/PastArtist/TopLeftCornerPurple'),
    TopRightCornerPurple: urlThumb('viva-26/PastArtist/TopRightCornerPurple'),
    BottomLeftCornerPurple: urlThumb('viva-26/PastArtist/BottomLeftCornerPurple'),
    BottomRightCornerPurple: urlThumb('viva-26/PastArtist/BottomRightCornerPurple'),
    TopLeftCornerYellow: urlThumb('viva-26/PastArtist/TopLeftCornerYellow'),
    TopRightCornerYellow: urlThumb('viva-26/PastArtist/TopRightCornerYellow'),
    BottomLeftCornerYellow: urlThumb('viva-26/PastArtist/BottomLeftCornerYellow'),
    BottomRightCornerYellow: urlThumb('viva-26/PastArtist/BottomRightCornerYellow'),
};

// Our Team Page Images
export const OurTeam = {
    c1: urlThumb('viva-26/ourTeam/c1'),
    c2: urlThumb('viva-26/ourTeam/c2'),
    c3: urlThumb('viva-26/ourTeam/c3'),
    c4: urlThumb('viva-26/ourTeam/c4'),
    cultural: url('viva-26/ourTeam/cultural'),
    cultural1: urlThumb('viva-26/ourTeam/cultural1'),
    cultural2: urlThumb('viva-26/ourTeam/cultural2'),
    cultural3: urlThumb('viva-26/ourTeam/cultural3'),
    creative: url('viva-26/ourTeam/creative'),
    d1: urlThumb('viva-26/ourTeam/d1'),
    d2: urlThumb('viva-26/ourTeam/d2'),
    d3: urlThumb('viva-26/ourTeam/d3'),
    development: url('viva-26/ourTeam/development'),
    email: urlThumb('viva-26/ourTeam/email'),
    festhead: url('viva-26/ourTeam/festhead'),
    festhead1: urlThumb('viva-26/ourTeam/festhead1'),
    festhead2: urlThumb('viva-26/ourTeam/festhead2'),
    instagram: urlThumb('viva-26/ourTeam/instagram'),
    lantern: urlThumb('viva-26/ourTeam/lantern'),
    leftBorder: url('viva-26/ourTeam/left-border'),
    rightBorder: url('viva-26/ourTeam/right-border'),
    mentors: url('viva-26/ourTeam/mentors'),
    mentorsCard: urlWithWidth('viva-26/ourTeam/mentors-card', 600),
    mentorImage: urlWithWidth('viva-26/ourTeam/mentorImage', 300),
    o1: urlThumb('viva-26/ourTeam/o1'),
    o2: urlThumb('viva-26/ourTeam/o2'),
    o3: urlThumb('viva-26/ourTeam/o3'),
    o4: urlThumb('viva-26/ourTeam/o4'),
    operational: url('viva-26/ourTeam/opertaional'),
    p1: urlThumb('viva-26/ourTeam/p1'),
    p2: urlThumb('viva-26/ourTeam/p2'),
    p3: urlThumb('viva-26/ourTeam/p3'),
    p4: urlThumb('viva-26/ourTeam/p4'),
    prEvents: url('viva-26/ourTeam/pr_events'),
    s1: urlThumb('viva-26/ourTeam/s1'),
    s2: urlThumb('viva-26/ourTeam/s2'),
    s4: urlThumb('viva-26/ourTeam/s4'),
    s5: urlThumb('viva-26/ourTeam/s5'),
    s6: urlThumb('viva-26/ourTeam/s6'),
    s7: urlThumb('viva-26/ourTeam/s7'),
    rickshaw: url('viva-26/ourTeam/rickshaw'),
    sponsor: url('viva-26/ourTeam/sponsor'),
    vivaLogo: urlThumb('viva-26/ourTeam/viva-logo'),
    purpleInsta: urlThumb('viva-26/ourTeam/purple_insta'),
    purpleGmail: urlThumb('viva-26/ourTeam/purple_gmail'),
    yellowEmail: urlThumb('viva-26/ourTeam/yellow_email'),
    yellowInsta: urlThumb('viva-26/ourTeam/yellow_insta'),
    image330: urlWithWidth('viva-26/ourTeam/image%20330', 600),
    vogue1: urlWithWidth('viva-26/ourTeam/vogue%201', 600),
    vogue2: urlWithWidth('viva-26/ourTeam/vogue%202', 600),
};

// Registration Page Images
export const Registration = {
    addEvent: urlThumb('viva-26/registration/addEvent'),
    doorPrev: url('viva-26/registration/door-prev'),
    doorHoriB: urlMobile('viva-26/registration/doorHoriB'),
    door: urlDesktop('viva-26/registration/door'),
    doorHori: urlMobile('viva-26/registration/doorHori'),
    doorPng: urlDesktop('viva-26/registration/doorPng'),
    next: urlThumb('viva-26/registration/next'),
    preRegisterHere: url('viva-26/registration/Pre%20register%20here'),
    doorOnly: urlDesktop('viva-26/registration/door_only'),
    nav: url('viva-26/registration/nav'),
    graffitiWall: urlDesktop('viva-26/registration/graffiti-wall'),
    vivacityLogo: urlThumb('viva-26/registration/vivacityLogo'),
    proceed: urlThumb('viva-26/registration/procced'),
};

// Events Images (grouped by event type) - optimized with width caps
export const Events = {
    BackGroundImage: urlDesktop('viva-26/Events/BackGroundImage'),
    StampBorder: url('viva-26/Events/StampBorder'),

    // Dance Events
    Dance: {
        Header: urlDesktop('viva-26/Events/DanceEvent/DanceEventsHeader'),
        LeftTopEdge: urlThumb('viva-26/Events/DanceEvent/LeftTopEdge'),
        RightTopEdge: urlThumb('viva-26/Events/DanceEvent/RightTopEdge'),
        YellowTextArea: url('viva-26/Events/DanceEvent/YellowTextArea'),
        PumpItUp: urlWithWidth('viva-26/Events/DanceEvent/First/PumpItUp', 600),
        PumpItUpText: url('viva-26/Events/DanceEvent/First/PumpItUpText'),
        StreetDance: urlWithWidth('viva-26/Events/DanceEvent/second/StreetDance', 600),
        StreetDanceText: url('viva-26/Events/DanceEvent/second/StreetDanceText'),
        Razzmatazz: urlWithWidth('viva-26/Events/DanceEvent/Third/Razzmatazz', 600),
        RazzmatazzText: url('viva-26/Events/DanceEvent/Third/RazzmatazzText'),
        TaalTarang: urlWithWidth('viva-26/Events/DanceEvent/Fourth/TaalTarang', 600),
        TaalTarangText: url('viva-26/Events/DanceEvent/Fourth/TaalTarangText'),
        LetsTangle: urlWithWidth('viva-26/Events/DanceEvent/Fifth/LetsTangle', 600),
        LetsTangleText: url('viva-26/Events/DanceEvent/Fifth/LetsTangleText'),
        Mudra: urlWithWidth('viva-26/Events/DanceEvent/Sixth/Mudra', 600),
        MudraText: url('viva-26/Events/DanceEvent/Sixth/MudraText'),
    },

    // Music Events
    Music: {
        Header: urlDesktop('viva-26/Events/MusicEvent/MusicEventsHeader'),
        OrangeTextBox: url('viva-26/Events/MusicEvent/OrangeTextBox'),
        BattleOfBands: urlWithWidth('viva-26/Events/MusicEvent/First/BattleOfBands', 600),
        GullyWar: urlWithWidth('viva-26/Events/MusicEvent/Second/GullyWar', 600),
        Bandish: urlWithWidth('viva-26/Events/MusicEvent/Third/Bandish', 600),
        Aaroh: urlWithWidth('viva-26/Events/MusicEvent/Fourth/Aaroh', 600),
        Malhar: urlWithWidth('viva-26/Events/MusicEvent/Fiveth/Malhar', 600),
    },

    // Art Events
    Art: {
        Header: urlDesktop('viva-26/Events/ArtEvent/ArtEventsHeader'),
        Contrasto: urlWithWidth('viva-26/Events/ArtEvent/Artists/Contrasto_1', 600),
        HueNiverse: urlWithWidth('viva-26/Events/ArtEvent/Artists/Hue_niverse_1', 600),
        TatooTales: urlWithWidth('viva-26/Events/ArtEvent/Artists/Tatoo_tales_1', 600),
        Splash: urlWithWidth('viva-26/Events/ArtEvent/Artists/Splash_1', 600),
        Eclectic: urlWithWidth('viva-26/Events/ArtEvent/Artists/eclectic_1', 600),
    },

    // Drama Events
    Drama: {
        Header: urlDesktop('viva-26/Events/DramaEvent/DramaEventsHeader'),
        RedTextArea: url('viva-26/Events/DramaEvent/red_text_area'),
        Rangshala: urlWithWidth('viva-26/Events/DramaEvent/First/Rangshala_1', 600),
        Hunkaar: urlWithWidth('viva-26/Events/DramaEvent/Second/hunkaar_1', 600),
        Mukhauta: urlWithWidth('viva-26/Events/DramaEvent/Third/Mukhauta_1', 600),
        Paddhati: urlWithWidth('viva-26/Events/DramaEvent/Fourth/Paddhati_1', 600),
    },

    // Fashion Events
    Fashion: {
        Header: urlDesktop('viva-26/Events/FashionEvent/FashionEventsHeader'),
        Viva: urlWithWidth('viva-26/Events/FashionEvent/Artists/Viva_1', 600),
        Vogue: urlWithWidth('viva-26/Events/FashionEvent/Artists/Vogue_1', 600),
    },

    // Photography Events
    Photography: {
        Header: urlDesktop('viva-26/Events/PhotographyEvent/PhotographyEventHeader'),
        Photobooth: urlWithWidth('viva-26/Events/PhotographyEvent/Artists/photobooth_1', 600),
        ImageHunt: urlWithWidth('viva-26/Events/PhotographyEvent/Artists/Image_hunt_1', 600),
        FilmMaking: urlWithWidth('viva-26/Events/PhotographyEvent/Artists/filn_making_competition_1', 600),
        Kalakriti: urlWithWidth('viva-26/Events/PhotographyEvent/Artists/kalakriti_1', 600),
        Perspective: urlWithWidth('viva-26/Events/PhotographyEvent/Artists/perspective_1', 600),
        Pixels: urlWithWidth('viva-26/Events/PhotographyEvent/Artists/pixels_1', 600),
    },

    // Quizzing Events
    Quizzing: {
        Header: urlDesktop('viva-26/Events/QuizzingEvent/QuizzingEventsHeader'),
        Bamboozled: urlWithWidth('viva-26/Events/QuizzingEvent/Artists/Bamboozled_1', 600),
        MovieAuction: urlWithWidth('viva-26/Events/QuizzingEvent/Artists/MovieAuction_1', 600),
    },

    // Speaking Arts Events
    SpeakingArt: {
        Header: urlDesktop('viva-26/Events/SpeakingArt/SpeakingArtsHeader'),
        Afreen: urlWithWidth('viva-26/Events/SpeakingArt/Artists/Afreen_1', 600),
        Duologue: urlWithWidth('viva-26/Events/SpeakingArt/Artists/Duologue_1', 600),
        DareToSpell: urlWithWidth('viva-26/Events/SpeakingArt/Artists/Dare%20to%20Spell', 600),
        Spotlight: urlWithWidth('viva-26/Events/SpeakingArt/Artists/Spotlight_1', 600),
        FamilyFeud: urlWithWidth('viva-26/Events/SpeakingArt/Artists/Family%20Feud_1', 600),
        Potpourii: urlWithWidth('viva-26/Events/SpeakingArt/Artists/Potpourii_1', 600),
    },

    // Social Events
    Social: {
        Header: urlDesktop('viva-26/Events/SocialEvent/SocialEventsHeader'),
        Sahyog: urlWithWidth('viva-26/Events/SocialEvent/Artists/Sahyog_1', 600),
    },

    // Exciting Pursuits
    ExcitingPursuits: {
        Header: urlDesktop('viva-26/Events/ExcitingPursuits/ExcitingPurSuitsHeader'),
        JammingNight: urlWithWidth('viva-26/Events/ExcitingPursuits/Artists/Jamming_Night_1', 600),
        StageSpectrum: urlWithWidth('viva-26/Events/ExcitingPursuits/Artists/Stage_Spectrum_1', 600),
        PromNight: urlWithWidth('viva-26/Events/ExcitingPursuits/Artists/Prom_Night_1', 600),
        SilentDisco: urlWithWidth('viva-26/Events/ExcitingPursuits/Artists/Silent_Disco_1', 600),
    },
};

export default {
    Legacy,
    Team,
    LandingPage,
    GateAnimationFrames,
    FooterImg,
    MascotLanding,
    EventLanding,
    PastArtist,
    OurTeam,
    Registration,
    Events,
    S3Assets,
};
