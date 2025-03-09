import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  title: string;
  description: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  author: mongoose.Types.ObjectId | {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add text indexes for search functionality
contentSchema.index({ title: 'text', description: 'text', content: 'text' });

export const Content = mongoose.model<IContent>('Content', contentSchema);
