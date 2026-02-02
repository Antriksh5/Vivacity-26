// In production (Render), VITE_API_URL should be set to the backend URL.
// In development, we use '/api' to trigger the Vite proxy (defined in vite.config.js).
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const getApiUrl = (endpoint) => {
    // Prevent double slashes if endpoint starts with /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const cleanBase = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    return `${cleanBase}/${cleanEndpoint}`;
};
