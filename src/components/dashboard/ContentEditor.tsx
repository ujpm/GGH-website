import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const EditorContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--color-text);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &.primary {
    background-color: var(--color-primary);
    color: white;
  }

  &.secondary {
    background-color: #6c757d;
    color: white;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 1rem;
`;

interface ContentData {
  title: string;
  description: string;
  content: string;
  status: 'draft' | 'published';
}

const ContentEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContentData>({
    title: '',
    description: '',
    content: '',
    status: 'draft',
  });

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // If editing existing content, fetch it
    if (id) {
      fetchContent();
    }
  }, [id, user, navigate]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Failed to fetch content');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const url = id ? `/api/content/${id}` : '/api/content';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setError('Failed to save content');
    }
  };

  return (
    <EditorContainer>
      <h1>{id ? 'Edit Content' : 'Create New Content'}</h1>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">Content</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" className="primary">
            {id ? 'Update' : 'Create'} Content
          </Button>
          <Button
            type="button"
            className="secondary"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </EditorContainer>
  );
};

export default ContentEditor;
