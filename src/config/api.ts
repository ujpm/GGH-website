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
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    verify: '/auth/verify'
  },
  
  // Funding calls endpoints
  funding: {
    list: '/funding',
    create: '/funding',
    update: (id: string) => `/funding/${id}`,
    delete: (id: string) => `/funding/${id}`,
    getById: (id: string) => `/funding/${id}`
  },
  
  // Content endpoints (for grants/scholarships/resources)
  content: {
    list: '/content',
    create: '/content',
    update: (id: string) => `/content/${id}`,
    delete: (id: string) => `/content/${id}`,
    getByType: (type: string) => `/content/type/${type}`
  },
  
  // Dashboard endpoints (admin only)
  dashboard: {
    overview: '/dashboard/overview',
    stats: '/dashboard/stats',
    manage: '/dashboard/manage'
  }
};
