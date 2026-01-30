/**
 * Cloudinary Utility Functions
 * 
 * This file provides helper functions to easily use Cloudinary images
 * with automatic optimization (WebP/AVIF, quality auto, responsive)
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/**
 * Generate an optimized Cloudinary image URL
 * 
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {Object} options - Transformation options
 * @param {number} options.width - Desired width
 * @param {number} options.height - Desired height
 * @param {string} options.crop - Crop mode (fill, fit, scale, etc.)
 * @param {string} options.quality - Quality (auto, auto:low, auto:eco, auto:good, auto:best)
 * @param {string} options.format - Format (auto, webp, avif, jpg, png)
 * @returns {string} Optimized Cloudinary URL
 */
export const getCloudinaryUrl = (publicId, options = {}) => {
    const {
        width,
        height,
        crop = 'fill',
        quality = 'auto',
        format = 'auto',
        ...rest
    } = options;

    // Build transformation string
    const transformations = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (crop) transformations.push(`c_${crop}`);
    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);

    // Add DPR auto for retina displays
    transformations.push('dpr_auto');

    const transformString = transformations.join(',');

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
};

/**
 * Generate srcset for responsive images
 * 
 * @param {string} publicId - The public ID of the image
 * @param {number[]} widths - Array of widths for srcset
 * @returns {string} srcset string
 */
export const getCloudinarySrcSet = (publicId, widths = [320, 640, 960, 1280, 1920]) => {
    return widths
        .map(w => `${getCloudinaryUrl(publicId, { width: w })} ${w}w`)
        .join(', ');
};

/**
 * Get optimized background image style
 * 
 * @param {string} publicId - The public ID of the image
 * @param {Object} options - Transformation options
 * @returns {Object} Style object with backgroundImage
 */
export const getCloudinaryBackground = (publicId, options = {}) => {
    return {
        backgroundImage: `url(${getCloudinaryUrl(publicId, options)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
};

export default {
    getCloudinaryUrl,
    getCloudinarySrcSet,
    getCloudinaryBackground,
};
