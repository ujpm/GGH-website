import mongoose, { Schema, Document } from 'mongoose';

interface IFundingInfo {
  amount: string;
  currency?: string;
}

export interface IFundingCall extends Document {
  _id: string;
  title: string;
  organization: string;
  fundingInfo: IFundingInfo;
  deadline: Date;
  type: 'grant' | 'scholarship';
  description: string;
  status: 'open' | 'closed';
  featured: boolean;
}

const FundingCallSchema = new Schema<IFundingCall>({
  title: { 
    type: String, 
    required: true,
    index: true 
  },
  organization: { 
    type: String, 
    required: true,
    index: true 
  },
  fundingInfo: {
    amount: {
      type: String,
      required: true
    },
    currency: { 
      type: String, 
      default: 'USD' 
    }
  },
  deadline: { 
    type: Date, 
    required: true,
    index: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['grant', 'scholarship'],
    index: true
  },
  description: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    required: true,
    enum: ['open', 'closed'],
    default: 'open',
    index: true
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
});

// Create text index for search functionality
FundingCallSchema.index({
  title: 'text',
  description: 'text',
  organization: 'text'
});

// Update status based on deadline
FundingCallSchema.pre('save', function(this: IFundingCall, next) {
  const now = new Date();
  const deadline = new Date(this.deadline);
  if (deadline <= now) {
    this.status = 'closed';
  } else {
    this.status = 'open';
  }
  next();
});

export default mongoose.model<IFundingCall>('FundingCall', FundingCallSchema);
