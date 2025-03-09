import axios from 'axios';
import { FundingCall, FundingFilters } from '../types/grants';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function getFundingCalls(filters?: FundingFilters): Promise<FundingCall[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/funding-calls`, { params: filters });
    return response.data.calls || [];
  } catch (error) {
    console.error('Error fetching funding calls:', error);
    return [];
  }
}

export async function createFundingCall(call: Omit<FundingCall, 'id' | 'createdAt' | 'updatedAt'>): Promise<FundingCall> {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_BASE_URL}/funding-calls`, call, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateFundingCall(id: string, call: Partial<FundingCall>): Promise<FundingCall> {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_BASE_URL}/funding-calls/${id}`, call, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteFundingCall(id: string): Promise<void> {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_BASE_URL}/funding-calls/${id}`, {
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
