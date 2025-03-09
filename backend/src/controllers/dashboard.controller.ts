import { Request, Response } from 'express';
import { Content, IContent } from '../models/content.model';
import { User } from '../models/user.model';

interface PopulatedContent extends Omit<IContent, 'author'> {
  author: {
    _id: string;
    name: string;
  };
}

export const dashboardController = {
  // Get dashboard statistics
  getStats: async (_req: Request, res: Response): Promise<Response> => {
    try {
      const [
        totalContent,
        publishedContent,
        draftContent,
        totalUsers
      ] = await Promise.all([
        Content.countDocuments(),
        Content.countDocuments({ status: 'published' }),
        Content.countDocuments({ status: 'draft' }),
        User.countDocuments()
      ]);

      return res.json({
        totalContent,
        publishedContent,
        draftContent,
        totalUsers
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
    }
  },

  // Get recent activity
  getActivity: async (_req: Request, res: Response): Promise<Response> => {
    try {
      // Get recent content changes
      const recentContent = await Content.find()
        .sort({ updatedAt: -1 })
        .limit(10)
        .populate<{ author: { _id: string; name: string } }>('author', 'name')
        .select('title author updatedAt createdAt status')
        .lean();

      // Transform content into activity items
      const activity = recentContent.map(content => {
        const typedContent = content as unknown as PopulatedContent;
        return {
          _id: typedContent._id,
          type: typedContent.createdAt?.getTime() === typedContent.updatedAt?.getTime() ? 'create' : 'update',
          title: `${typedContent.title} ${typedContent.createdAt?.getTime() === typedContent.updatedAt?.getTime() ? 'created' : 'updated'}`,
          user: typedContent.author.name,
          timestamp: typedContent.updatedAt
        };
      });

      return res.json(activity);
    } catch (error) {
      console.error('Error fetching activity:', error);
      return res.status(500).json({ error: 'Failed to fetch activity' });
    }
  },

  // Update content status
  updateStatus: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const content = await Content.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).populate<{ author: { _id: string; name: string } }>('author', 'name');

      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }

      return res.json(content);
    } catch (error) {
      console.error('Error updating content status:', error);
      return res.status(500).json({ error: 'Failed to update content status' });
    }
  },

  // Bulk delete content
  bulkDelete: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Invalid content IDs' });
      }

      const result = await Content.deleteMany({ _id: { $in: ids } });

      return res.json({
        message: `Successfully deleted ${result.deletedCount} items`
      });
    } catch (error) {
      console.error('Error in bulk delete:', error);
      return res.status(500).json({ error: 'Failed to delete content items' });
    }
  }
};
