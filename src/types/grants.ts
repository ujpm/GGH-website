export type FundingType = 'grant' | 'scholarship' | 'resource';

export type FundingStatus = 'open' | 'closing_soon' | 'closed';

export interface FundingEligibility {
  criteria: string[];
  ineligible: string[];
}

export interface FundingInformation {
  amount?: string;
  currency?: string;
  duration?: string;
  type?: string;
}

export interface FundingContact {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface FundingCall {
  id: string;
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
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featured?: boolean;
  tags?: string[];
}

export interface FundingFilters {
  type?: FundingType;
  status?: FundingStatus;
  featured?: boolean;
  tags?: string[];
}
