/**
 * Cloudinary Bulk Upload Script
 * 
 * This script uploads all images from the src/assets folder to Cloudinary
 * with automatic optimization settings.
 * 
 * Usage:
 *   1. First install cloudinary: npm install cloudinary dotenv
 *   2. Fill in your .env file with actual Cloudinary credentials
 *   3. Run: node scripts/upload-to-cloudinary.js
 */

import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.VITE_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image extensions to upload
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

// Base folder in Cloudinary
const CLOUDINARY_FOLDER = 'viva-26';

// Track uploaded files
const uploadedFiles = [];
const failedFiles = [];

/**
 * Recursively get all image files from a directory
 */
function getImageFiles(dir, baseDir = dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            files.push(...getImageFiles(fullPath, baseDir));
        } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
            const relativePath = path.relative(baseDir, fullPath);
            files.push({ fullPath, relativePath });
        }
    }

    return files;
}

/**
 * Upload a single image to Cloudinary
 */
async function uploadImage(file) {
    const { fullPath, relativePath } = file;

    // Create public_id from relative path (without extension)
    const publicId = `${CLOUDINARY_FOLDER}/${relativePath}`
        .replace(/\\/g, '/')
        .replace(/\.[^/.]+$/, '');

    try {
        const result = await cloudinary.uploader.upload(fullPath, {
            public_id: publicId,
            overwrite: true,
            resource_type: 'auto',
            // Eager transformations - pre-generate optimized versions
            eager: [
                { fetch_format: 'auto', quality: 'auto' },
                { width: 1920, crop: 'limit', fetch_format: 'auto', quality: 'auto' },
                { width: 640, crop: 'limit', fetch_format: 'auto', quality: 'auto' },
            ],
            eager_async: true,
        });

        console.log(`✅ Uploaded: ${relativePath}`);
        console.log(`   URL: ${result.secure_url}`);
        console.log(`   Public ID: ${result.public_id}`);

        uploadedFiles.push({
            localPath: relativePath,
            publicId: result.public_id,
            url: result.secure_url,
        });

        return result;
    } catch (error) {
        console.error(`❌ Failed: ${relativePath}`);
        console.error(`   Error: ${error.message}`);
        failedFiles.push({ localPath: relativePath, error: error.message });
        return null;
    }
}

/**
 * Main upload function
 */
async function main() {
    const assetsDir = path.join(__dirname, '..', 'src', 'assets');

    // Check if assets directory exists
    if (!fs.existsSync(assetsDir)) {
        console.error('❌ Assets directory not found:', assetsDir);
        process.exit(1);
    }

    // Validate Cloudinary config
    if (!process.env.VITE_CLOUDINARY_CLOUD_NAME ||
        !process.env.VITE_CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET) {
        console.error('❌ Missing Cloudinary credentials in .env file');
        console.log('\nPlease set the following in your .env file:');
        console.log('  VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name');
        console.log('  VITE_CLOUDINARY_API_KEY=your_api_key');
        console.log('  CLOUDINARY_API_SECRET=your_api_secret');
        process.exit(1);
    }

    console.log('🔍 Scanning for images in:', assetsDir);
    console.log('');

    // Get all image files
    const imageFiles = getImageFiles(assetsDir);

    if (imageFiles.length === 0) {
        console.log('📭 No image files found in assets directory');
        return;
    }

    console.log(`📦 Found ${imageFiles.length} image(s) to upload\n`);
    console.log('='.repeat(50));

    // Upload images with concurrency limit
    const CONCURRENCY = 5;
    for (let i = 0; i < imageFiles.length; i += CONCURRENCY) {
        const batch = imageFiles.slice(i, i + CONCURRENCY);
        await Promise.all(batch.map(uploadImage));
    }

    console.log('\n' + '='.repeat(50));
    console.log('\n📊 Upload Summary:');
    console.log(`   ✅ Successful: ${uploadedFiles.length}`);
    console.log(`   ❌ Failed: ${failedFiles.length}`);

    // Generate mapping file for easy reference
    if (uploadedFiles.length > 0) {
        const mappingPath = path.join(__dirname, '..', 'cloudinary-mapping.json');
        fs.writeFileSync(mappingPath, JSON.stringify(uploadedFiles, null, 2));
        console.log(`\n📝 Mapping file saved to: cloudinary-mapping.json`);
        console.log('\nYou can now use the public IDs in your components:');
        console.log('\n  import CloudinaryImage from "./components/CloudinaryImage";\n');
        console.log('  <CloudinaryImage publicId="viva-26/your-folder/image-name" alt="Description" />');
    }

    if (failedFiles.length > 0) {
        console.log('\n⚠️  Failed uploads:');
        failedFiles.forEach(f => console.log(`   - ${f.localPath}: ${f.error}`));
    }
}

main().catch(console.error);
