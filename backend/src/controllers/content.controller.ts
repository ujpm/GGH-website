import { Request, Response } from 'express';
import { Content } from '../models/content.model';

export const contentController = {
  // Get all content
  getAll: async (_req: Request, res: Response): Promise<Response> => {
    try {
      const content = await Content.find()
        .sort({ createdAt: -1 })
        .populate('author', 'name email');
      return res.json(content);
    } catch (error) {
      console.error('Error fetching content:', error);
      return res.status(500).json({ error: 'Failed to fetch content' });
    }
  },

  // Get single content by ID
  getById: async (req: Request, res: Response): Promise<Response> => {
    try {
      const content = await Content.findById(req.params.id)
        .populate('author', 'name email');
      
      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }
      
      return res.json(content);
    } catch (error) {
      console.error('Error fetching content:', error);
      return res.status(500).json({ error: 'Failed to fetch content' });
    }
  },

  // Create new content
  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, description, content, status } = req.body;
      
      const newContent = await Content.create({
        title,
        description,
        content,
        status,
        author: req.user!._id,
      });

      return res.status(201).json(newContent);
    } catch (error) {
      console.error('Error creating content:', error);
      return res.status(500).json({ error: 'Failed to create content' });
    }
  },

  // Update content
  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, description, content, status } = req.body;
      
      const updatedContent = await Content.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          content,
          status,
        },
        { new: true }
      ).populate('author', 'name email');

      if (!updatedContent) {
        return res.status(404).json({ error: 'Content not found' });
      }

      return res.json(updatedContent);
    } catch (error) {
      console.error('Error updating content:', error);
      return res.status(500).json({ error: 'Failed to update content' });
    }
  },

  // Delete content
  delete: async (req: Request, res: Response): Promise<Response> => {
    try {
      const deletedContent = await Content.findByIdAndDelete(req.params.id);
      
      if (!deletedContent) {
        return res.status(404).json({ error: 'Content not found' });
      }

      return res.json({ message: 'Content deleted successfully' });
    } catch (error) {
      console.error('Error deleting content:', error);
      return res.status(500).json({ error: 'Failed to delete content' });
    }
  },
};
