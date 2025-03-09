import mongoose, { Schema, Document } from 'mongoose';

export interface IFundingCall extends Document {
  title: string;
  type: 'grant' | 'scholarship' | 'resource';
  organization: string;
  description: string;
  deadline: Date;
  status: 'open' | 'closing_soon' | 'closed';
  applicationUrl: string;
  fundingInfo: {
    amount?: string;
    currency?: string;
    type: string;
    duration?: string;
    budget_limit?: string;
  };
  eligibility: {
    criteria: string[];
    restrictions?: string[];
  };
  requirements: string[];
  tags?: string[];
  featured?: boolean;
  publishedAt: Date;
  updatedAt: Date;
}

const FundingCallSchema = new Schema<IFundingCall>({
  title: { 
    type: String, 
    required: true,
    index: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['grant', 'scholarship', 'resource'],
    index: true
  },
  organization: { 
    type: String, 
    required: true,
    index: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  deadline: { 
    type: Date, 
    required: true,
    index: true 
  },
  status: { 
    type: String, 
    required: true,
    enum: ['open', 'closing_soon', 'closed'],
    default: 'open',
    index: true
  },
  applicationUrl: { 
    type: String, 
    required: true 
  },
  fundingInfo: {
    amount: String,
    currency: { 
      type: String, 
      default: 'USD' 
    },
    type: { 
      type: String, 
      required: true 
    },
    duration: String,
    budget_limit: String
  },
  eligibility: {
    criteria: [{ 
      type: String, 
      required: true 
    }],
    restrictions: [String]
  },
  requirements: [{ 
    type: String, 
    required: true 
  }],
  tags: {
    type: [String],
    index: true
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  },
  publishedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create text index for search functionality
FundingCallSchema.index({
  title: 'text',
  description: 'text',
  organization: 'text',
  'eligibility.criteria': 'text',
  tags: 'text'
});

// Update status based on deadline
FundingCallSchema.pre('save', function(next) {
  const now = new Date();
  const deadline = new Date(this.deadline);
  const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 3600 * 24));

  if (daysUntilDeadline <= 0) {
    this.status = 'closed';
  } else if (daysUntilDeadline <= 7) {
    this.status = 'closing_soon';
  } else {
    this.status = 'open';
  }

  next();
});

export default mongoose.model<IFundingCall>('FundingCall', FundingCallSchema);
