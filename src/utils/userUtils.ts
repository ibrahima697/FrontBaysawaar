import { User } from '../types';

/**
 * Resolves the best available photo for a user.
 * Prioritizes Cloudinary URLs, falls back to legacy photo strings, social login URLs, 
 * and finally a dynamically generated initials avatar.
 */
export const getUserPhoto = (user: User | null): string => {
    if (!user) {
        return 'https://ui-avatars.com/api/?name=U&background=16a34a&color=fff&bold=true';
    }

    // Handle Cloudinary object first
    if (user.photo && typeof user.photo === 'object' && user.photo.url) {
        return user.photo.url;
    }

    // Handle legacy string photo if it looks like a valid URL or path
    if (typeof user.photo === 'string' && (user.photo as string).trim().length > 0) {
        return user.photo as string;
    }

    // Social login and other fallbacks
    if (user.photoURL && user.photoURL.trim().length > 0) return user.photoURL;
    if (user.avatar && user.avatar.trim().length > 0) return user.avatar;

    // Fallback to initials if name is available
    if (user.firstName && user.lastName) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
            `${user.firstName} ${user.lastName}`
        )}&background=16a34a&color=fff&bold=true`;
    }

    if (user.firstName) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.firstName
        )}&background=16a34a&color=fff&bold=true`;
    }

    // Ultimate fallback
    return 'https://ui-avatars.com/api/?name=U&background=16a34a&color=fff&bold=true';
};

/**
 * Resolves the display name for a user.
 */
export const getUserDisplayName = (user: User | null): string => {
    if (!user) return 'Utilisateur';

    if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
        return user.firstName;
    }
    if (user.email) {
        return user.email.split('@')[0];
    }
    return 'Utilisateur';
};
