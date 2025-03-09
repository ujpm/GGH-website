import { Request, Response } from 'express';
import FundingCall, { IFundingCall } from '../models/FundingCall';

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

    // Update status based on deadline for all calls
    const updatedCalls = calls.map(call => {
      const now = new Date();
      const deadline = new Date(call.deadline);
      const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 3600 * 24));

      if (daysUntilDeadline <= 0) {
        call.status = 'closed';
      } else if (daysUntilDeadline <= 7) {
        call.status = 'closing_soon';
      }

      return call;
    });

    res.json({
      calls: updatedCalls,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching funding calls:', error);
    res.status(500).json({ error: 'Failed to fetch funding calls' });
  }
};

// Get a single funding call by ID
export const getFundingCall = async (req: Request, res: Response) => {
  try {
    const call = await FundingCall.findById(req.params.id).lean();
    if (!call) {
      return res.status(404).json({ error: 'Funding call not found' });
    }
    res.json(call);
  } catch (error) {
    console.error('Error fetching funding call:', error);
    res.status(500).json({ error: 'Failed to fetch funding call' });
  }
};

// Create a new funding call
export const createFundingCall = async (req: Request, res: Response) => {
  try {
    const newCall = new FundingCall({
      ...req.body,
      publishedAt: new Date()
    });

    await newCall.save();
    res.status(201).json(newCall);
  } catch (error) {
    console.error('Error creating funding call:', error);
    res.status(500).json({ error: 'Failed to create funding call' });
  }
};

// Update a funding call
export const updateFundingCall = async (req: Request, res: Response) => {
  try {
    const call = await FundingCall.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!call) {
      return res.status(404).json({ error: 'Funding call not found' });
    }

    res.json(call);
  } catch (error) {
    console.error('Error updating funding call:', error);
    res.status(500).json({ error: 'Failed to update funding call' });
  }
};

// Delete a funding call
export const deleteFundingCall = async (req: Request, res: Response) => {
  try {
    const call = await FundingCall.findByIdAndDelete(req.params.id);
    if (!call) {
      return res.status(404).json({ error: 'Funding call not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting funding call:', error);
    res.status(500).json({ error: 'Failed to delete funding call' });
  }
};

// Get funding call statistics
export const getFundingStats = async (req: Request, res: Response) => {
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

    res.json(stats[0]);
  } catch (error) {
    console.error('Error fetching funding stats:', error);
    res.status(500).json({ error: 'Failed to fetch funding statistics' });
  }
};
