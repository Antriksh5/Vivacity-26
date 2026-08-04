/**
 * Upload missing S3 assets to Cloudinary
 * Targets: billBoard.gif, shops.gif, tediux-logo.png
 */

import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.VITE_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const assetsDir = path.join(__dirname, '..', 'src', 'assets', 'landingPage');

const filesToUpload = [
    { file: 'tediux-logo.png', publicId: 'viva-26/landingPage/tediux-logo', resourceType: 'image' },
    { file: 'billBoard.gif',   publicId: 'viva-26/landingPage/billBoard',   resourceType: 'image' },
    { file: 'shops.gif',       publicId: 'viva-26/landingPage/shops',       resourceType: 'image' },
];

async function upload({ file, publicId, resourceType }) {
    const fullPath = path.join(assetsDir, file);
    console.log(`\n⬆️  Uploading ${file} → ${publicId}`);
    console.log(`   Path: ${fullPath}`);
    try {
        const result = await cloudinary.uploader.upload(fullPath, {
            public_id: publicId,
            overwrite: true,
            resource_type: resourceType,
            // Skip eager transforms for GIFs to avoid timeout
        });
        console.log(`✅ Done! URL: ${result.secure_url}`);
        return { file, publicId, url: result.secure_url, success: true };
    } catch (err) {
        console.error(`❌ Failed: ${err.message}`);
        return { file, publicId, success: false, error: err.message };
    }
}

async function main() {
    console.log('🔧 Cloudinary config:');
    console.log(`   Cloud name: ${process.env.VITE_CLOUDINARY_CLOUD_NAME}`);
    console.log(`   API key:    ${process.env.VITE_CLOUDINARY_API_KEY}`);
    console.log('');

    const results = [];

    // Upload tediux-logo first (small, fast)
    results.push(await upload(filesToUpload[0]));

    // Then upload GIFs sequentially (they are large)
    results.push(await upload(filesToUpload[1]));
    results.push(await upload(filesToUpload[2]));

    console.log('\n\n===== SUMMARY =====');
    for (const r of results) {
        if (r.success) {
            console.log(`✅ ${r.file}`);
            console.log(`   Public ID: ${r.publicId}`);
            console.log(`   URL: ${r.url}`);
        } else {
            console.log(`❌ ${r.file} → ${r.error}`);
        }
    }

    const failed = results.filter(r => !r.success);
    if (failed.length > 0) {
        console.log('\n⚠️  Some uploads failed. See errors above.');
        process.exit(1);
    } else {
        console.log('\n🎉 All assets uploaded successfully!');
        console.log('\nNext step: update cloudinaryUrls.js to use Cloudinary URLs instead of S3.');
    }
}

main().catch(console.error);
