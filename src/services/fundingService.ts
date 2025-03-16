import axios from 'axios';
import { FundingCall, FundingFilters, FundingResponse } from '../types/grants';
import { API_URL, API_ENDPOINTS } from '../config/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_URL}/api`,
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
  const token = localStorage.getItem('token');
  const response = await api.post<FundingCall>(API_ENDPOINTS.funding.create, call, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateFundingCall(id: string, call: Partial<FundingCall>): Promise<FundingCall> {
  const token = localStorage.getItem('token');
  const response = await api.put<FundingCall>(API_ENDPOINTS.funding.update(id), call, {
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

  // Validate funding information
  if (!call.fundingInfo?.amount) {
    errors.push('Funding amount is required');
  }

  return errors;
}
