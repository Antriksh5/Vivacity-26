const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'viva-26', 'src');
const inputFile = path.join(srcPath, 'utils', 'cloudinaryUrls.js');

let content = fs.readFileSync(inputFile, 'utf-8');

// Find all occurrences of URL helper functions
const urlRegex = /(?:url|urlDesktop|urlMobile|urlThumb|urlWithWidth|urlHQ)\(['"]viva-26\/([^'"]+)['"](?:,\s*\d+)?\)/g;

let match;
const imports = new Map(); // Map normalized path to variable name
let importCounter = 1;

// First pass: find all Cloudinary references and match them to existing local files
let modifiedContent = content;

// Replace GateAnimation string template logic
modifiedContent = modifiedContent.replace(
    /const gateFrameUrl =.*?\n\nexport const GateAnimationFrames =.*?\n\}\);\n\n.*?\nexport const GateAnimationFramesPriority =.*?\n\}\);/s,
    `// Local Gate Animation Frames
import gateFrame02 from '../assets/landingPage/gate-animation/frame_02.png';
import gateFrame03 from '../assets/landingPage/gate-animation/frame_03.png';
import gateFrame04 from '../assets/landingPage/gate-animation/frame_04.png';
import gateFrame05 from '../assets/landingPage/gate-animation/frame_05.png';
import gateFrame06 from '../assets/landingPage/gate-animation/frame_06.png';
import gateFrame07 from '../assets/landingPage/gate-animation/frame_07.png';
import gateFrame08 from '../assets/landingPage/gate-animation/frame_08.png';
import gateFrame09 from '../assets/landingPage/gate-animation/frame_09.png';
import gateFrame10 from '../assets/landingPage/gate-animation/frame_10.png';
import gateFrame11 from '../assets/landingPage/gate-animation/frame_11.png';
import gateFrame12 from '../assets/landingPage/gate-animation/frame_12.png';
import gateFrame13 from '../assets/landingPage/gate-animation/frame_13.png';
import gateFrame14 from '../assets/landingPage/gate-animation/frame_14.png';
import gateFrame15 from '../assets/landingPage/gate-animation/frame_15.png';
import gateFrame16 from '../assets/landingPage/gate-animation/frame_16.png';
import gateFrame17 from '../assets/landingPage/gate-animation/frame_17.png';
import gateFrame18 from '../assets/landingPage/gate-animation/frame_18.png';
import gateFrame19 from '../assets/landingPage/gate-animation/frame_19.png';
import gateFrame20 from '../assets/landingPage/gate-animation/frame_20.png';
import gateFrame21 from '../assets/landingPage/gate-animation/frame_21.png';
import gateFrame22 from '../assets/landingPage/gate-animation/frame_22.png';
import gateFrame23 from '../assets/landingPage/gate-animation/frame_23.png';
import gateFrame24 from '../assets/landingPage/gate-animation/frame_24.png';
import gateFrame25 from '../assets/landingPage/gate-animation/frame_25.png';
import gateFrame26 from '../assets/landingPage/gate-animation/frame_26.png';
import gateFrame27 from '../assets/landingPage/gate-animation/frame_27.png';

export const GateAnimationFrames = [
  gateFrame02, gateFrame03, gateFrame04, gateFrame05, gateFrame06,
  gateFrame07, gateFrame08, gateFrame09, gateFrame10, gateFrame11,
  gateFrame12, gateFrame13, gateFrame14, gateFrame15, gateFrame16,
  gateFrame17, gateFrame18, gateFrame19, gateFrame20, gateFrame21,
  gateFrame22, gateFrame23, gateFrame24, gateFrame25, gateFrame26,
  gateFrame27
];

export const GateAnimationFramesPriority = [gateFrame02, gateFrame03, gateFrame04];
`
);

while ((match = urlRegex.exec(content)) !== null) {
    const rawPath = match[1]; // e.g. "Team/TeamBg"
    const decodedPath = decodeURIComponent(rawPath);
    
    // Find matching file in src/assets or src/components
    let foundExt = '';
    let isComponentLocation = false;
    const exts = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.avif'];
    
    // Check components directory first (for Events)
    for (const ext of exts) {
        if (fs.existsSync(path.join(srcPath, 'components', decodedPath + ext))) {
            foundExt = ext;
            isComponentLocation = true;
            break;
        }
    }
    
    // Check assets directory
    if (!foundExt) {
        for (const ext of exts) {
            if (fs.existsSync(path.join(srcPath, 'assets', decodedPath + ext))) {
                foundExt = ext;
                break;
            }
        }
    }
    
    if (foundExt) {
        let importPath;
        if (isComponentLocation) {
            importPath = `../components/${decodedPath}${foundExt}`;
        } else {
            importPath = `../assets/${decodedPath}${foundExt}`;
        }
            
        let varName;
        if (imports.has(importPath)) {
            varName = imports.get(importPath);
        } else {
            const safeName = path.basename(decodedPath).replace(/[^a-zA-Z0-9]/g, '');
            varName = `Local_${safeName}_${importCounter++}`;
            imports.set(importPath, varName);
        }
        
        // Replace in modified content
        const searchStr = match[0];
        // Note: globally replace in case there are multiple identical calls
        modifiedContent = modifiedContent.split(searchStr).join(varName);
        console.log("Matched: " + rawPath + " -> " + importPath);
    } else {
        console.log("Not found: " + rawPath + " in components or assets directory");
    }
}

// Build imports string
let importsStr = '';
for (const [importPath, varName] of imports.entries()) {
    importsStr += "import " + varName + " from '" + importPath + "';\n";
}

// Inject imports at the top
modifiedContent = modifiedContent.replace(
    "import aboutVivaBorderImg from '../assets/landingPage/aboutVivaBorder.png';",
    "import aboutVivaBorderImg from '../assets/landingPage/aboutVivaBorder.png';\n" + importsStr
);

fs.writeFileSync(inputFile, modifiedContent);
console.log('Script finished. Re-wrote cloudinaryUrls.js!');
