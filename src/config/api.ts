const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In production on Vercel, API calls will be made to the same domain
  if (import.meta.env.PROD) {
    return window.location.origin;
  }
  
  // Default development URL
  return 'http://localhost:5000';
};

export const API_URL = getApiUrl();

export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    verify: '/api/auth/verify',
    me: '/api/auth/me'
  },
  
  // Funding calls endpoints
  funding: {
    list: '/api/funding',
    create: '/api/funding',
    update: (id: string) => `/api/funding/${id}`,
    delete: (id: string) => `/api/funding/${id}`,
    getById: (id: string) => `/api/funding/${id}`,
    stats: '/api/funding/stats'
  },
  
  // Content endpoints
  content: {
    list: '/api/content',
    create: '/api/content',
    update: (id: string) => `/api/content/${id}`,
    delete: (id: string) => `/api/content/${id}`,
    getByType: (type: string) => `/api/content/type/${type}`
  },
  
  // Dashboard endpoints
  dashboard: {
    overview: '/api/dashboard/overview',
    users: '/api/dashboard/users',
    stats: '/api/dashboard/stats',
    manage: '/api/dashboard/manage'
  }
};
