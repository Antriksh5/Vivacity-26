const fs = require('fs');
let content = fs.readFileSync('viva-26/src/utils/cloudinaryUrls.js', 'utf8');

// 1. Change Cloud Name
content = content.replace(
  "const CLOUD_NAME = 'dilxriyf3';",
  "const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'doxipu0v7';"
);

// 2. Add S3Assets logic right after url helper
content = content.replace(
  "// Legacy Page Images",
  "// AWS S3 CDN URLs for GIF assets (oversized files)\nconst S3_BASE_URL = 'https://viva-bucket-2026.s3.us-east-1.amazonaws.com';\n\nexport const S3Assets = {\n    billBoard: `${S3_BASE_URL}/billBoard.gif`,\n    jugnoo: `${S3_BASE_URL}/jugnoo.gif`,\n    shops: `${S3_BASE_URL}/shops.gif`,\n    tediuxLogo: `${S3_BASE_URL}/tediux-logo.png`,\n    thadiJugnoo: `${S3_BASE_URL}/thadi+jugnoo.gif`,\n};\n\n// Legacy Page Images"
);

// 3. Rename Footer to FooterImg
content = content.replace(
  "export const Footer = {",
  "export const FooterImg = {"
);

// 4. Add GateAnimationFramesPriority
content = content.replace(
  "// Footer Images",
  "// First 3 frames with higher quality for initial display\nexport const GateAnimationFramesPriority = Array.from({ length: 3 }, (_, i) => {\n    const frameNum = String(i + 2).padStart(2, '0');\n    return `${BASE_URL}/f_auto,q_auto:good,w_1920/${`viva-26/landingPage/gate-animation/frame_${frameNum}`}`;\n});\n\n// Footer Images"
);

// 5. Update export default block
content = content.replace(
  /export default \{[\s\S]*?\};/,
  "export default {\n    Legacy,\n    Team,\n    LandingPage,\n    GateAnimationFrames,\n    GateAnimationFramesPriority,\n    FooterImg,\n    MascotLanding,\n    EventLanding,\n    PastArtist,\n    OurTeam,\n    Registration,\n    Events,\n    S3Assets,\n};"
);

fs.writeFileSync('viva-26/src/utils/cloudinaryUrls.js', content);
console.log("Successfully rebuilt cloudinaryUrls.js smoothly!");
