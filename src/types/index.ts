export interface User {
    _id: string;
    id?: string; // For backward compatibility with some components using .id
    email: string;
    firstName: string;
    lastName: string;
    role: 'member' | 'admin' | 'partner' | 'client';
    phone?: string;
    photo?: {
        publicId: string;
        url: string;
    };
    companyDetails?: {
        name?: string;
        address?: string;
        registrationNumber?: string;
        type?: string;
        years?: number;
    };
    photoURL?: string;
    avatar?: string;
    createdAt?: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface Enrollment {
    _id: string;
    userId: string | User; // Can be populated
    courseId: string;
    status: 'pending' | 'approved' | 'rejected';
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    companyName?: string;
    interests: string[];
    createdAt: string;
    companyLogo?: {
        publicId: string;
        url: string;
    };
    businessDocuments?: {
        publicId: string;
        url: string;
    }[];
}

export interface Formation {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    maxSeats: number;
    enrolledUsers: string[];
    status: string;
    registrations?: { userId: string; status: string }[];
}

export interface EventData {
    _id?: string;
    title: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    location: string;
    priceMember: number;
    priceNonMember: number;
    maxParticipants: number;
    isFeatured: boolean;
    slug?: string;
    type?: 'seminar' | 'business_trip' | 'fair' | 'conference' | 'training' | 'networking';
    registrations?: { user: User; status: string }[];
}

export interface ProductData {
    _id?: string;
    name: string;
    description: string;
    price: number;
    image?: File | string;
    imageUrl?: string;
}

export interface BlogData {
    _id?: string;
    title: string;
    content: string;
    author?: string;
    image?: string;
    createdAt?: string;
}

export interface UserFilter {
    role?: string;
    status?: string;
    searchQuery?: string;
}

export interface EnrollmentUpdate {
    status?: string;
    document?: File;
}

export interface EnrollmentData {
    courseId: string;
    userId: string;
    status: string;
    document?: File;
    // Add other fields if needed for creation
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    country?: string;
    city?: string;
    companyName?: string;
    interests?: string[];
    companyLogo?: File;
    businessDocuments?: File[];
}

export interface FormationData {
    title: string;
    description: string;
    date: string;
    location: string;
    maxSeats: number;
}
