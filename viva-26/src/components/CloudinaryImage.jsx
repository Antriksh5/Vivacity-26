import React from 'react';
import { getCloudinaryUrl, getCloudinarySrcSet } from '../utils/cloudinary';

/**
 * CloudinaryImage Component
 * 
 * A reusable React component for displaying optimized Cloudinary images
 * with automatic WebP/AVIF delivery, responsive srcsets, and lazy loading.
 * 
 * @example
 * // Basic usage
 * <CloudinaryImage publicId="viva-26/hero-banner" alt="Hero Banner" />
 * 
 * // With dimensions and custom className
 * <CloudinaryImage 
 *   publicId="viva-26/team/member1" 
 *   alt="Team Member"
 *   width={400}
 *   height={300}
 *   className="rounded-lg shadow-md"
 * />
 */
const CloudinaryImage = ({
    publicId,
    alt,
    width,
    height,
    className = '',
    crop = 'fill',
    quality = 'auto',
    sizes = '100vw',
    loading = 'lazy',
    responsive = true,
    responsiveWidths = [320, 640, 960, 1280, 1920],
    ...props
}) => {
    // Generate the main src URL
    const src = getCloudinaryUrl(publicId, { width, height, crop, quality });

    // Generate srcset for responsive images
    const srcSet = responsive ? getCloudinarySrcSet(publicId, responsiveWidths) : undefined;

    return (
        <img
            src={src}
            srcSet={srcSet}
            sizes={responsive ? sizes : undefined}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            className={className}
            {...props}
        />
    );
};

export default CloudinaryImage;
