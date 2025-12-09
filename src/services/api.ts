import axios, { AxiosResponse } from 'axios';

// Création d'une instance d'axios avec une configuration de base
const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:5005/api'
    : 'https://bayysawaarback-production.up.railway.app/api',
  timeout: 60000, // 60 secondes pour les uploads
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requêtes pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Intercepteur de réponses pour gérer les erreurs, notamment 401 (Token expiré)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide, redirige vers la page de login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);



// Interfaces pour typer les données d'API

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  photo?: {
    publicId: string;
    url: string;
  };
  companyDetails?: {
    name?: string;
    address?: string;
    registrationNumber?: string;
  };
  photoURL?: string;
  avatar?: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  companyDetails?: {
    name?: string;
    address?: string;
    registrationNumber?: string;
  };
}

interface ProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  image: File;
}

interface EnrollmentData {
  courseId: string;
  userId: string;
  status: string;
  document?: File;
}

interface UserFilter {
  role?: string;
  status?: string;
  searchQuery?: string;
}

interface EnrollmentUpdate {
  status?: string;
  document?: File;
}

interface FormationData {
  title: string;
  description: string;
  date: string;
  location: string;
  maxSeats: number;
}

interface EventData {
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  priceMember: number;
  priceNonMember: number;
  maxParticipants: number;
  isFeatured: boolean;
}

// Typage des différentes API

// Auth API
export const authAPI = {
  login: (email: string, password: string): Promise<LoginResponse> =>
    api.post('/auth/login', { email, password }),

  register: (userData: UserData): Promise<AxiosResponse<User>> =>
    api.post('/auth/register', userData),

  getProfile: (): Promise<AxiosResponse<ProfileResponse>> => api.get('/auth/profile'),

  getMe: (): Promise<AxiosResponse<{ data: User }>> => api.get('/auth/me'),

  updateProfile: (updates: Partial<User>): Promise<AxiosResponse<User>> =>
    api.put('/auth/profile', updates),

  changePassword: (currentPassword: string, newPassword: string): Promise<AxiosResponse> =>
    api.post('/auth/change-password', { currentPassword, newPassword }),

  resetPassword: (email: string): Promise<AxiosResponse> =>
    api.post('/auth/reset-password', { email }),
};

// Dashboard API
export const dashboardAPI = {
  getDashboardData: (): Promise<AxiosResponse> => api.get('/dashboard/my-data'),
};

// Enrollments API
export const enrollmentsAPI = {
  submitEnrollment: (enrollmentData: EnrollmentData): Promise<AxiosResponse> =>
    api.post('/enrollments/submit', enrollmentData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000, // 2 minutes pour les uploads d'images
    }),

  getMyEnrollments: (): Promise<AxiosResponse> => api.get('/enrollments/my-status'),

  getAllEnrollments: (params?: UserFilter): Promise<AxiosResponse> =>
    api.get('/enrollments', { params }),

  getEnrollmentById: (id: string): Promise<AxiosResponse> =>
    api.get(`/enrollments/${id}`),

  updateEnrollment: (id: string, updates: EnrollmentUpdate): Promise<AxiosResponse> =>
    api.put(`/enrollments/${id}`, updates),

  deleteEnrollment: (id: string): Promise<AxiosResponse> =>
    api.delete(`/enrollments/${id}`),
};

// Products API
export const productsAPI = {
  getAllProducts: (params?: UserFilter): Promise<AxiosResponse> =>
    api.get('/products', { params }),

  getProductById: (id: string): Promise<AxiosResponse> =>
    api.get(`/products/${id}`),

  createProduct: (productData: ProductData): Promise<AxiosResponse> =>
    api.post('/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000, // 2 minutes pour les uploads d'images
    }),

  updateProduct: (id: string, updates: ProductData): Promise<AxiosResponse> =>
    api.put(`/products/${id}`, updates, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000, // 2 minutes pour les uploads d'images
    }),

  deleteProduct: (id: string): Promise<AxiosResponse> =>
    api.delete(`/products/${id}`),
};

// Blogs API
export const blogsAPI = {
  getAllBlogs: (params?: UserFilter): Promise<AxiosResponse> =>
    api.get('/blogs', { params }),

  getBlogById: (id: string): Promise<AxiosResponse> =>
    api.get(`/blogs/${id}`),

  createBlog: (blogData: FormData): Promise<AxiosResponse> =>
    api.post('/blogs', blogData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000, // 2 minutes pour les uploads d'images
    }),

  updateBlog: (id: string, updates: FormData): Promise<AxiosResponse> =>
    api.put(`/blogs/${id}`, updates, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000, // 2 minutes pour les uploads d'images
    }),

  deleteBlog: (id: string): Promise<AxiosResponse> =>
    api.delete(`/blogs/${id}`),
};

// Contacts API
export const contactsAPI = {
  submitContact: (contactData: { name: string; email: string; message: string }): Promise<AxiosResponse> =>
    api.post('/contacts/submit', contactData),

  subscribeNewsletter: (email: string): Promise<AxiosResponse> =>
    api.post('/contacts/newsletter', { email }),

  getAllContacts: (): Promise<AxiosResponse> => api.get('/contacts'),

  updateContactStatus: (id: string, status: string): Promise<AxiosResponse> =>
    api.patch(`/contacts/${id}`, { status }),
};

// Admin API
export const adminAPI = {
  getAdminStats: (): Promise<AxiosResponse> => api.get('/admin/stats'),

  getAllUsers: (params?: UserFilter): Promise<AxiosResponse> =>
    api.get('/admin/users', { params }),

  getUsersByRole: (role: string): Promise<AxiosResponse> =>
    api.get(`/admin/users/role/${role}`),

  searchUsers: (query: string): Promise<AxiosResponse> =>
    api.get('/admin/users/search', { params: { query } }),

  filterUsers: (filters: UserFilter): Promise<AxiosResponse> =>
    api.get('/admin/users/filter', { params: filters }),

  getUserStats: (): Promise<AxiosResponse> => api.get('/admin/user-stats'),

  deleteUser: (id: string): Promise<AxiosResponse> =>
    api.delete(`/admin/users/${id}`),

  getAllEnrollments: (params?: UserFilter): Promise<AxiosResponse> =>
    api.get('/admin/enrollments', { params }),

  getEnrollmentById: (id: string): Promise<AxiosResponse> =>
    api.get(`/admin/enrollments/${id}`),

  updateEnrollment: (id: string, updates: EnrollmentUpdate): Promise<AxiosResponse> =>
    api.put(`/admin/enrollments/${id}`, updates),

  deleteEnrollment: (id: string): Promise<AxiosResponse> =>
    api.delete(`/admin/enrollments/${id}`),
};

// Social API
export const socialAPI = {
  setConfig: (configData: { platform: string; apiKey: string }): Promise<AxiosResponse> =>
    api.post('/social/config', configData),

  getConfigs: (): Promise<AxiosResponse> => api.get('/social/config'),

  deleteConfig: (id: string): Promise<AxiosResponse> =>
    api.delete(`/social/config/${id}`),

  fetchPosts: (platform: string, limit?: number): Promise<AxiosResponse> =>
    api.get('/social/posts', { params: { platform, limit } }),
};

export const formationsAPI = {
  // Admin & public utilisent la même route
  getAll: () => api.get('/formations'), // Admin verra tout, public verra seulement upcoming/ongoing

  create: (data: any) => api.post('/formations', data),
  update: (id: string, data: any) => api.put(`/formations/${id}`, data),
  register: (id: string) => api.post(`/formations/${id}/register`),
  updateRegistration: (fid: string, rid: string, data: any) =>
    api.put(`/formations/${fid}/registrations/${rid}`, data),
};

export const eventsAPI = {
  // Admin & public utilisent la même route
  getAll: () => api.get('/events'), // Admin verra tout, public verra seulement upcoming/ongoing

  create: (data: EventData) => api.post('/events', data),
  update: (id: string, data: EventData) => api.put(`/events/${id}`, data),
  register: (slug: string) => api.post(`/events/${slug}/register`),
  registerToEvent: (slug: string) => api.post(`/events/${slug}/register`),
};

export default api;

