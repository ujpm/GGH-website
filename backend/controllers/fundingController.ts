import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import FundingCall, { IFundingCall } from '../src/models/FundingCall';

// Get all funding calls with filtering
export const getFundingCalls = async (req: Request, res: Response) => {
  try {
    const { 
      type, 
      status, 
      featured, 
      search,
      page = 1,
      limit = 10,
      sortBy = 'deadline',
      sortOrder = 'asc'
    } = req.query;

    const query: any = {};
    
    // Apply filters
    if (type) query.type = type;
    if (status) query.status = status;
    if (featured) query.featured = featured === 'true';
    
    // Apply text search
    if (search) {
      query.$text = { $search: search as string };
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const [calls, total] = await Promise.all([
      FundingCall.find(query)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      FundingCall.countDocuments(query)
    ]);

    // If no calls exist, create a sample one
    if (total === 0) {
      try {
        const sampleCall = new FundingCall({
          title: 'Sample Research Grant',
          type: 'grant',
          organization: 'Global Research Foundation',
          description: 'A sample grant for testing purposes',
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          status: 'open',
          fundingInfo: {
            amount: '50000',
            currency: 'USD'
          },
          featured: true
        });
        await sampleCall.save();
        return res.json({
          calls: [sampleCall],
          pagination: {
            total: 1,
            page: 1,
            pages: 1,
            limit: Number(limit)
          }
        });
      } catch (seedError) {
        console.error('Error seeding sample data:', seedError);
      }
    }

    return res.json({
      calls,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching funding calls:', error);
    return res.status(500).json({ error: 'Failed to fetch funding calls' });
  }
};

// Get a single funding call by ID
export const getFundingCall = async (req: Request, res: Response) => {
  try {
    const call = await FundingCall.findById(req.params.id).lean();
    if (!call) {
      return res.status(404).json({ error: 'Funding call not found' });
    }
    return res.json(call);
  } catch (error) {
    console.error('Error fetching funding call:', error);
    return res.status(500).json({ error: 'Failed to fetch funding call' });
  }
};

// Create a new funding call
export const createFundingCall = async (req: AuthRequest, res: Response) => {
  try {
    const fundingCall: Partial<IFundingCall> = {
      ...req.body,
      fundingInfo: {
        amount: req.body.fundingInfo?.amount?.toString().replace(/^\$/, '') || '0', // Remove $ if present
        currency: req.body.fundingInfo?.currency || 'USD'
      }
    };
    
    const newCall = new FundingCall(fundingCall);
    const savedCall = await newCall.save();
    return res.status(201).json(savedCall);
  } catch (error: any) {
    console.warn('Error creating funding call:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {} as Record<string, string>)
      });
    }
    return res.status(500).json({ 
      error: `Error creating funding call: ${error.message}`
    });
  }
};

// Update a funding call
export const updateFundingCall = async (req: AuthRequest, res: Response) => {
  try {
    const call = await FundingCall.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        fundingInfo: {
          amount: req.body.fundingInfo?.amount?.toString().replace(/^\$/, '') || '0',
          currency: req.body.fundingInfo?.currency || 'USD'
        }
      },
      { new: true, runValidators: true }
    );

    if (!call) {
      return res.status(404).json({ error: 'Funding call not found' });
    }

    return res.json(call);
  } catch (error) {
    console.error('Error updating funding call:', error);
    return res.status(500).json({ error: 'Failed to update funding call' });
  }
};

// Delete a funding call
export const deleteFundingCall = async (req: AuthRequest, res: Response) => {
  try {
    const call = await FundingCall.findByIdAndDelete(req.params.id);
    if (!call) {
      return res.status(404).json({ error: 'Funding call not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting funding call:', error);
    return res.status(500).json({ error: 'Failed to delete funding call' });
  }
};

// Get funding call statistics
export const getFundingStats = async (_req: Request, res: Response) => {
  try {
    const [totalCalls, openCalls, closedCalls] = await Promise.all([
      FundingCall.countDocuments(),
      FundingCall.countDocuments({ status: 'open' }),
      FundingCall.countDocuments({ status: 'closed' })
    ]);

    return res.json({
      total: totalCalls,
      open: openCalls,
      closed: closedCalls
    });
  } catch (error) {
    console.error('Error fetching funding stats:', error);
    return res.status(500).json({ error: 'Failed to fetch funding stats' });
  }
};
