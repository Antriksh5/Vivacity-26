const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary with the new account
cloudinary.config({
  cloud_name: 'doxipu0v7',
  api_key: '758139914353321',
  api_secret: 'vQ_5BYfHcxd9Od8fSQAtYL-lU4c',
  secure: true
});

const ASSETS_DIR = path.join(__dirname, 'viva-26', 'src', 'assets');
const COMPONENTS_DIR = path.join(__dirname, 'viva-26', 'src', 'components');

async function uploadFile(filePath, publicId) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            resource_type: 'auto',
            overwrite: true,
            use_filename: true,
            unique_filename: false,
        });
        console.log(`✅ Uploaded: ${publicId}`);
        return true;
    } catch (error) {
        console.error(`❌ Error uploading ${publicId}:`, error.message);
        return false;
    }
}

async function run() {
    console.log('Starting Cloudinary upload process...');
    
    // Find all files being tracked by git
    const execSync = require('child_process').execSync;
    const filesString = execSync('git ls-files viva-26/src').toString().trim();
    if (!filesString) {
        console.log("No files found!");
        return;
    }
    const files = filesString.split('\n').filter(f => /\.(png|jpg|jpeg|svg|gif|webp|mp4|ico|avif)$/i.test(f));
    
    console.log(`Found ${files.length} asset files to upload.`);
    
    let successCount = 0;
    let failCount = 0;

    for (const filePath of files) {
        if (!filePath) continue;
        const absolutePath = path.join(__dirname, filePath);
        if (!fs.existsSync(absolutePath)) continue;

        let relativePath = filePath;
        if (filePath.includes('src/assets/')) {
            relativePath = filePath.split('src/assets/')[1];
        } else if (filePath.includes('src/components/')) {
            relativePath = filePath.split('src/components/')[1];
        } else {
            relativePath = filePath.split('viva-26/src/')[1];
        }
        
        // Strip off the extension for the public_id
        const dirname = path.dirname(relativePath);
        const basename = path.basename(relativePath, path.extname(relativePath));
        
        let publicId = `viva-26/${dirname === '.' ? '' : dirname + '/'}${basename}`;
        
        const success = await uploadFile(absolutePath, publicId);
        if (success) successCount++;
        else failCount++;
        
        // Delay to prevent rate limit issues
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    console.log(`\nUpload complete! Successfully uploaded ${successCount} files. Failed: ${failCount}`);
}

run();
