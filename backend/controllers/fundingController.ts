import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import FundingCall from '../src/models/FundingCall';

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

    console.log(' Fetching funding calls with filters:', { type, status, featured, search });

    const query: any = {};
    
    // Apply filters
    if (type) query.type = type;
    if (status) query.status = status;
    if (featured) query.featured = featured === 'true';
    
    // Apply text search
    if (search) {
      query.$text = { $search: search as string };
    }

    console.log(' MongoDB query:', JSON.stringify(query, null, 2));

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

    console.log(` Found ${total} total calls, returning ${calls.length} calls`);

    // Update status based on deadline for all calls
    const updatedCalls = calls.map(call => {
      const now = new Date();
      const deadline = new Date(call.deadline);
      const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 3600 * 24));

      let status = call.status;
      if (daysUntilDeadline <= 0) {
        status = 'closed';
      } else if (daysUntilDeadline <= 7) {
        status = 'closing_soon';
      } else {
        status = 'open';
      }

      return { ...call, status };
    });

    return res.json({
      calls: updatedCalls,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error(' Error fetching funding calls:', error);
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
    // Ensure fundingInfo has all required fields with defaults
    const fundingInfo = {
      amount: (req.body.fundingInfo?.amount || '').toString().replace(/^\$/, ''), // Remove $ if present
      currency: req.body.fundingInfo?.currency || 'USD',
      duration: (req.body.fundingInfo?.duration || '').toString(),
      type: (req.body.fundingInfo?.type || '').toString(),
      budget_limit: (req.body.fundingInfo?.budget_limit || '').toString()
    };

    const { fundingInfo: _, ...otherData } = req.body;
    
    const newCall = new FundingCall({
      ...otherData,
      fundingInfo,
      publishedAt: new Date()
    });

    const savedCall = await newCall.save();
    return res.status(201).json(savedCall);
  } catch (error: any) {
    console.warn('Error creating funding call:', error);
    // Return detailed validation errors if available
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
      { ...req.body, updatedAt: new Date() },
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
    const stats = await FundingCall.aggregate([
      {
        $facet: {
          byType: [
            { $group: { _id: '$type', count: { $sum: 1 } } }
          ],
          byStatus: [
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ],
          totalAmount: [
            {
              $group: {
                _id: null,
                total: {
                  $sum: {
                    $cond: [
                      { $and: [
                        { $eq: ['$status', 'open'] },
                        { $ne: ['$fundingInfo.amount', null] }
                      ]},
                      { $toDouble: '$fundingInfo.amount' },
                      0
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    ]);

    return res.json(stats[0]);
  } catch (error) {
    console.error('Error getting funding stats:', error);
    return res.status(500).json({ error: 'Failed to get funding stats' });
  }
};
