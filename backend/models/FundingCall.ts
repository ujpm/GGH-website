import mongoose, { Schema, Document } from 'mongoose';

export interface IEligibility {
  criteria: string[];
  ineligible: string[];
}

export interface IFundingInfo {
  amount?: string;
  currency?: string;
  duration?: string;
  type?: string;
  budget_limit?: string;
}

export interface IContact {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface IFundingCall extends Document {
  title: string;
  type: 'grant' | 'scholarship' | 'resource';
  organization: string;
  description: string;
  deadline: Date;
  status: 'open' | 'closing_soon' | 'closed';
  eligibility: IEligibility;
  fundingInfo: IFundingInfo;
  contact: IContact;
  applicationUrl: string;
  featured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

const FundingCallSchema = new Schema({
  title: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['grant', 'scholarship', 'resource'] 
  },
  organization: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['open', 'closing_soon', 'closed'],
    default: 'open'
  },
  eligibility: {
    criteria: [String],
    ineligible: [String]
  },
  fundingInfo: {
    amount: String,
    currency: String,
    duration: String,
    type: String,
    budget_limit: String
  },
  contact: {
    name: String,
    email: String,
    phone: String,
    website: String
  },
  applicationUrl: { type: String, required: true },
  featured: { type: Boolean, default: false },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: { type: Date }
}, {
  timestamps: true
});

// Add text indexes for search functionality
FundingCallSchema.index({ 
  title: 'text', 
  description: 'text', 
  organization: 'text',
  tags: 'text'
});

// Add regular indexes for filtering
FundingCallSchema.index({ type: 1 });
FundingCallSchema.index({ status: 1 });
FundingCallSchema.index({ deadline: 1 });
FundingCallSchema.index({ featured: 1 });

// Middleware to update status based on deadline
FundingCallSchema.pre('save', function(next) {
  const call = this as IFundingCall;
  const now = new Date();
  const deadline = new Date(call.deadline);
  const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 3600 * 24));

  if (daysUntilDeadline <= 0) {
    call.status = 'closed';
  } else if (daysUntilDeadline <= 7) {
    call.status = 'closing_soon';
  } else {
    call.status = 'open';
  }

  next();
});

export default mongoose.model<IFundingCall>('FundingCall', FundingCallSchema);
