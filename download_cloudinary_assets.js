// Script to download all Cloudinary assets referenced in cloudinaryUrls.js
// Requires: npm install cloudinary axios fs-extra

const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const fs = require('fs-extra');

// Set your Cloudinary credentials here
cloudinary.config({
  cloud_name: 'dilxriyf3', // Replace with your current cloud name
  api_key: 'YOUR_API_KEY', // Replace with your API key
  api_secret: 'YOUR_API_SECRET', // Replace with your API secret
});

// List of public IDs to download (extracted from cloudinaryUrls.js)
const publicIds = [
  'viva-26/Legacy/Television',
  'viva-26/Legacy/LegacyBgMobile',
  'viva-26/Legacy/LegacyText',
  'viva-26/Team/VivaLogo',
  'viva-26/Team/Flower',
  'viva-26/Team/FlowerY',
  'viva-26/Team/Circle',
  'viva-26/Team/TeamHeader',
  'viva-26/Team/TeamMid1',
  'viva-26/Team/TeamMid2',
  'viva-26/Team/TeamMidBorder',
  'viva-26/Team/TeamMidBorderMobile',
  'viva-26/Team/TeamMidMobile',
  'viva-26/Team/TeamFooter',
  'viva-26/Team/BottomBg',
  'viva-26/Team/TeamBg',
  'viva-26/Team/StampBorder',
  'viva-26/landingPage/aboutThemebg',
  'viva-26/landingPage/aboutBgPhn',
  'viva-26/landingPage/bgDoor',
  'viva-26/landingPage/bgAboutPhn',
  'viva-26/landingPage/aboutViva',
  'viva-26/landingPage/bgAbout',
  'viva-26/landingPage/ferrisWheel',
  'viva-26/landingPage/comingSoon',
  'viva-26/landingPage/doorImg',
  'viva-26/landingPage/bottomImg',
  'viva-26/landingPage/jugnooGroundMobile',
  'viva-26/landingPage/gateBelow',
  'viva-26/landingPage/jugnooGround',
  'viva-26/landingPage/leftHand',
  'viva-26/landingPage/mbabTheme',
  'viva-26/landingPage/mobileJugnooGround',
  'viva-26/landingPage/nimbuMirchi',
  'viva-26/landingPage/registerNow',
  'viva-26/landingPage/rightHand',
  'viva-26/landingPage/tediux-logo',
  'viva-26/landingPage/uncle',
  'viva-26/landingPage/woodFrame',
  // Gate animation frames
  ...Array.from({ length: 27 }, (_, i) => `viva-26/landingPage/gate-animation/frame_${String(i + 2).padStart(2, '0')}`),
  'viva-26/Footer/footerLogo',
  'viva-26/Footer/footer',
  'viva-26/MascotLanding/ara',
  'viva-26/MascotLanding/mascot-final',
  'viva-26/MascotLanding/background1',
  'viva-26/EventLanding/Bottom%20Border',
  'viva-26/EventLanding/Dance1',
  'viva-26/EventLanding/Backgound',
  'viva-26/EventLanding/ArtImage',
  'viva-26/EventLanding/Hand',
  'viva-26/EventLanding/FashionImage',
  'viva-26/EventLanding/QuizEvent',
  'viva-26/EventLanding/PhotoGraphyImage',
  'viva-26/EventLanding/ExcitingImage',
  'viva-26/EventLanding/SideBorder',
  'viva-26/EventLanding/SpeakingImage',
  'viva-26/EventLanding/SocialImage',
  'viva-26/PastArtist/AmitTrivedi',
  'viva-26/PastArtist/AssesKaur',
  'viva-26/PastArtist/DarshanRaval',
  'viva-26/PastArtist/JubinNautyal',
  'viva-26/PastArtist/Kullu',
  'viva-26/PastArtist/MohitChauhan',
  'viva-26/PastArtist/Raftaar',
  'viva-26/PastArtist/Ritviz',
  'viva-26/PastArtist/PastArtistBackGround',
  'viva-26/PastArtist/MatchBoxOpen',
  'viva-26/PastArtist/LeftButton',
  'viva-26/PastArtist/RightButton',
  'viva-26/PastArtist/LeftTopCorner',
  'viva-26/PastArtist/RightTopCorner',
  'viva-26/PastArtist/LeftBottomCorner',
  'viva-26/PastArtist/RightBottomCorner',
  'viva-26/PastArtist/TopLeftCornerPurple',
  'viva-26/PastArtist/TopRightCornerPurple',
  'viva-26/PastArtist/BottomLeftCornerPurple',
  'viva-26/PastArtist/BottomRightCornerPurple',
  'viva-26/PastArtist/TopLeftCornerYellow',
  'viva-26/PastArtist/TopRightCornerYellow',
  'viva-26/PastArtist/BottomLeftCornerYellow',
  'viva-26/PastArtist/BottomRightCornerYellow',
  'viva-26/ourTeam/c1',
  'viva-26/ourTeam/c2',
  'viva-26/ourTeam/c3',
  'viva-26/ourTeam/c4',
  'viva-26/ourTeam/cultural',
  'viva-26/ourTeam/cultural1',
  'viva-26/ourTeam/cultural2',
  'viva-26/ourTeam/cultural3',
  'viva-26/ourTeam/creative',
  'viva-26/ourTeam/d1',
  'viva-26/ourTeam/d2',
  'viva-26/ourTeam/d3',
  'viva-26/ourTeam/development',
  'viva-26/ourTeam/email',
  'viva-26/ourTeam/festhead',
  'viva-26/ourTeam/festhead1',
  'viva-26/ourTeam/festhead2',
  'viva-26/ourTeam/instagram',
  'viva-26/ourTeam/lantern',
  'viva-26/ourTeam/left-border',
  'viva-26/ourTeam/right-border',
  'viva-26/ourTeam/mentors',
  'viva-26/ourTeam/mentors-card',
  'viva-26/ourTeam/mentorImage',
  'viva-26/ourTeam/o1',
  'viva-26/registration/graffiti-wall.png',
  'v1769790106/AakheGIF_1_haefx7.gif',
];

const downloadDir = './cloudinary_downloads';

async function downloadAsset(publicId) {
  try {
    // Get resource details
    const resource = await cloudinary.api.resource(publicId);
    const url = resource.secure_url;
    const ext = url.split('.').pop().split('?')[0];
    const fileName = `${publicId.replace(/[\/]/g, '_')}.${ext}`;
    const filePath = `${downloadDir}/${fileName}`;

    // Download file
    const response = await axios({ url, method: 'GET', responseType: 'stream' });
    await fs.ensureDir(downloadDir);
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filePath));
      writer.on('error', reject);
    });
  } catch (err) {
    console.error(`Failed to download ${publicId}:`, err.message);
  }
}

async function main() {
  for (const publicId of publicIds) {
    console.log(`Downloading: ${publicId}`);
    await downloadAsset(publicId);
  }
  console.log('Download complete. Files saved to', downloadDir);
}

main();
