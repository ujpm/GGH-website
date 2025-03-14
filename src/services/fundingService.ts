import axios from 'axios';
import { FundingCall, FundingFilters } from '../types/grants';
import { API_URL, API_ENDPOINTS } from '../config/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export async function getFundingCalls(filters?: FundingFilters): Promise<FundingCall[]> {
  try {
    const response = await api.get(API_ENDPOINTS.funding.list, { params: filters });
    // Handle both array and paginated response formats
    return Array.isArray(response.data) ? response.data : response.data.calls || [];
  } catch (error) {
    console.error('Error fetching funding calls:', error);
    throw error;
  }
}

export async function createFundingCall(call: Omit<FundingCall, 'id' | 'createdAt' | 'updatedAt'>): Promise<FundingCall> {
  const token = localStorage.getItem('token');
  const response = await api.post(API_ENDPOINTS.funding.create, call, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateFundingCall(id: string, call: Partial<FundingCall>): Promise<FundingCall> {
  const token = localStorage.getItem('token');
  const response = await api.put(API_ENDPOINTS.funding.update(id), call, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteFundingCall(id: string): Promise<void> {
  const token = localStorage.getItem('token');
  await api.delete(API_ENDPOINTS.funding.delete(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function validateFundingCall(call: Partial<FundingCall>): string[] {
  const errors: string[] = [];

  if (!call.title) errors.push('Title is required');
  if (!call.type) errors.push('Type is required');
  if (!call.organization) errors.push('Organization is required');
  if (!call.description) errors.push('Description is required');
  if (!call.deadline) errors.push('Deadline is required');
  
  // Validate deadline is in the future
  if (call.deadline && new Date(call.deadline) <= new Date()) {
    errors.push('Deadline must be in the future');
  }

  // Validate eligibility
  if (!call.eligibility?.criteria?.length) {
    errors.push('At least one eligibility criterion is required');
  }

  // Validate funding information
  if (!call.fundingInfo?.amount && !call.fundingInfo?.type) {
    errors.push('Either funding amount or type must be specified');
  }

  // Validate application URL
  if (!call.applicationUrl) {
    errors.push('Application URL is required');
  } else {
    try {
      new URL(call.applicationUrl);
    } catch {
      errors.push('Invalid application URL');
    }
  }

  return errors;
}
