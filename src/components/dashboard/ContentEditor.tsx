import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

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
  type: 'grant' | 'scholarship' | 'resource';
  organization: string;
  deadline?: string;
  fundingInfo?: {
    amount?: string;
    currency?: string;
    duration?: string;
    type?: string;
    budget_limit?: string;
  };
  eligibility: {
    criteria: string[];
    ineligible: string[];
  };
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
  applicationUrl?: string;
  status: 'open' | 'closing_soon' | 'closed';
  featured?: boolean;
  tags: string[];
}

const ContentEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContentData>({
    title: '',
    description: '',
    type: (location.state?.type as ContentData['type']) || 'grant',
    organization: '',
    deadline: new Date().toISOString().split('T')[0],
    fundingInfo: {
      amount: '',
      currency: 'USD',
      duration: '',
      type: '',
      budget_limit: ''
    },
    eligibility: {
      criteria: [''],
      ineligible: ['']
    },
    contact: {
      name: '',
      email: '',
      phone: '',
      website: ''
    },
    applicationUrl: '',
    status: 'open',
    featured: false,
    tags: []
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    if (id) {
      fetchContent();
    }
  }, [id, user, navigate]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/funding-calls/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        toast.error('Failed to fetch content');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Error loading content');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof ContentData] as Record<string, unknown>),
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (section: 'eligibility', type: 'criteria' | 'ineligible', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: prev[section][type].map((item, i) => i === index ? value : item)
      }
    }));
  };

  const handleArrayAdd = (section: 'eligibility', type: 'criteria' | 'ineligible') => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: [...prev[section][type], '']
      }
    }));
  };

  const handleArrayRemove = (section: 'eligibility', type: 'criteria' | 'ineligible', index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: prev[section][type].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const cleanedData = {
        ...formData,
        fundingInfo: {
          amount: formData.fundingInfo?.amount?.toString().trim().replace(/^\$/, '') || '',
          currency: formData.fundingInfo?.currency || 'USD',
          duration: formData.fundingInfo?.duration?.toString().trim() || '',
          type: formData.fundingInfo?.type?.toString().trim() || '',
          budget_limit: formData.fundingInfo?.budget_limit?.toString().trim() || ''
        },
        eligibility: {
          criteria: formData.eligibility.criteria.filter(c => c.trim() !== ''),
          ineligible: formData.eligibility.ineligible.filter(c => c.trim() !== '')
        },
        tags: formData.tags.filter(t => t.trim() !== '')
      };

      const url = id ? `http://localhost:5000/api/funding-calls/${id}` : 'http://localhost:5000/api/funding-calls';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(cleanedData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to save content');
      }

      toast.success(`Successfully ${id ? 'updated' : 'created'} content`);
      navigate('/dashboard/content');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to save content';
      console.error('Error saving content:', error);
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <EditorContainer>
      <h1>{id ? 'Edit Content' : `Create New ${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}`}</h1>
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
          <Label htmlFor="organization">Organization</Label>
          <Input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
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

        {(formData.type === 'grant' || formData.type === 'scholarship') && (
          <>
            <FormGroup>
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="fundingInfo.amount">Funding Amount</Label>
              <Input
                type="text"
                id="fundingInfo.amount"
                name="fundingInfo.amount"
                value={formData.fundingInfo?.amount}
                onChange={handleChange}
                placeholder="e.g., 5000"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="fundingInfo.currency">Currency</Label>
              <Select
                id="fundingInfo.currency"
                name="fundingInfo.currency"
                value={formData.fundingInfo?.currency}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </Select>
            </FormGroup>
          </>
        )}

        <FormGroup>
          <Label>Eligibility Criteria</Label>
          {formData.eligibility.criteria.map((criterion, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
              <Input
                type="text"
                value={criterion}
                onChange={(e) => handleArrayChange('eligibility', 'criteria', index, e.target.value)}
                placeholder="Enter eligibility criterion"
                required
              />
              <Button
                type="button"
                className="secondary"
                onClick={() => handleArrayRemove('eligibility', 'criteria', index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            className="secondary"
            onClick={() => handleArrayAdd('eligibility', 'criteria')}
          >
            Add Criterion
          </Button>
        </FormGroup>

        <FormGroup>
          <Label>Ineligible Criteria</Label>
          {formData.eligibility.ineligible.map((criterion, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
              <Input
                type="text"
                value={criterion}
                onChange={(e) => handleArrayChange('eligibility', 'ineligible', index, e.target.value)}
                placeholder="Enter ineligibility criterion"
              />
              <Button
                type="button"
                className="secondary"
                onClick={() => handleArrayRemove('eligibility', 'ineligible', index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            className="secondary"
            onClick={() => handleArrayAdd('eligibility', 'ineligible')}
          >
            Add Ineligible Criterion
          </Button>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="applicationUrl">Application URL</Label>
          <Input
            type="url"
            id="applicationUrl"
            name="applicationUrl"
            value={formData.applicationUrl}
            onChange={handleChange}
            placeholder="https://"
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
            <option value="open">Open</option>
            <option value="closing_soon">Closing Soon</option>
            <option value="closed">Closed</option>
          </Select>
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" className="primary">
            {id ? 'Update' : 'Create'} {formData.type}
          </Button>
          <Button
            type="button"
            className="secondary"
            onClick={() => navigate('/dashboard/content')}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </EditorContainer>
  );
};

export default ContentEditor;
