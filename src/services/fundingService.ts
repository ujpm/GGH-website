import { FundingCall, FundingFilters, FundingType } from '../types/grants';

export async function getFundingCalls(filters?: FundingFilters): Promise<FundingCall[]> {
  // TODO: Replace with actual API call
  const response = await fetch('/api/funding-calls', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  return response.json();
}

export async function createFundingCall(call: Omit<FundingCall, 'id' | 'createdAt' | 'updatedAt'>): Promise<FundingCall> {
  // TODO: Replace with actual API call
  const response = await fetch('/api/funding-calls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(call),
  });
  return response.json();
}

export async function updateFundingCall(id: string, call: Partial<FundingCall>): Promise<FundingCall> {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/funding-calls/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(call),
  });
  return response.json();
}

export async function deleteFundingCall(id: string): Promise<void> {
  // TODO: Replace with actual API call
  await fetch(`/api/funding-calls/${id}`, {
    method: 'DELETE',
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
