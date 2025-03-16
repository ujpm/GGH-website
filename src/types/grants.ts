export type FundingType = 'grant' | 'scholarship';

export type FundingStatus = 'open' | 'closed';

export interface FundingEligibility {
  criteria: string[];
  restrictions: string[];
}

export interface FundingInformation {
  amount: string;
  currency?: string;
}

export interface FundingContact {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface FundingCall {
  _id: string;
  title: string;
  type: FundingType;
  organization: string;
  description: string;
  deadline: string;
  status: FundingStatus;
  eligibility: FundingEligibility;
  fundingInfo: FundingInformation;
  contact: FundingContact;
  applicationUrl: string;
  requirements?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  featured: boolean;
  tags?: string[];
}

export interface FundingFilters {
  type?: FundingType;
  status?: FundingStatus;
  featured?: boolean;
  tags?: string[];
}

export interface FundingResponse {
  calls: FundingCall[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}
