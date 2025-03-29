import axios from 'axios';
import { FundingCall, FundingFilters, FundingResponse } from '../types/grants';
import { API_URL, API_ENDPOINTS } from '../config/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(new Error('Please log in to continue'));
    }
    
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: errorMessage
    });
    return Promise.reject(new Error(errorMessage));
  }
);

export async function getFundingCalls(filters?: FundingFilters): Promise<FundingResponse> {
  try {
    const response = await api.get<FundingResponse>(API_ENDPOINTS.funding.list, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching funding calls:', error);
    throw error;
  }
}

export async function createFundingCall(call: Omit<FundingCall, '_id'>): Promise<FundingCall> {
  try {
    // Validate required fields
    const errors = validateFundingCall(call);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    const response = await api.post<FundingCall>(API_ENDPOINTS.funding.create, call);
    return response.data;
  } catch (error) {
    console.error('Error creating funding call:', error);
    throw error;
  }
}

export async function updateFundingCall(id: string, call: Partial<FundingCall>): Promise<FundingCall> {
  try {
    // Validate fields that are being updated
    const errors = validateFundingCall(call);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    const response = await api.put<FundingCall>(API_ENDPOINTS.funding.update(id), call);
    return response.data;
  } catch (error) {
    console.error('Error updating funding call:', error);
    throw error;
  }
}

export async function deleteFundingCall(id: string): Promise<void> {
  try {
    await api.delete(API_ENDPOINTS.funding.delete(id));
  } catch (error) {
    console.error('Error deleting funding call:', error);
    throw error;
  }
}

export function validateFundingCall(call: Partial<FundingCall>): string[] {
  const errors: string[] = [];

  if (!call.title?.trim()) errors.push('Title is required');
  if (!call.type) errors.push('Type is required');
  if (!call.organization?.trim()) errors.push('Organization is required');
  if (!call.description?.trim()) errors.push('Description is required');
  
  // Only validate deadline if it's provided
  if (call.deadline) {
    const deadlineDate = new Date(call.deadline);
    if (isNaN(deadlineDate.getTime())) {
      errors.push('Invalid deadline date');
    } else if (deadlineDate <= new Date()) {
      errors.push('Deadline must be in the future');
    }
  }

  // Validate funding information if provided
  if (call.fundingInfo) {
    if (!call.fundingInfo.amount) {
      errors.push('Funding amount is required');
    } else if (isNaN(Number(call.fundingInfo.amount))) {
      errors.push('Funding amount must be a valid number');
    }
    if (!call.fundingInfo.currency?.trim()) {
      errors.push('Currency is required');
    }
  }

  return errors;
}
