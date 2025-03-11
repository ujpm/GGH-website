import React, { useState } from 'react';
import styled from 'styled-components';
import { FundingCall } from '../../types/grants';
import { toast } from 'react-hot-toast';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
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
  min-height: 150px;
  resize: vertical;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &.primary {
    background-color: var(--color-primary);
    color: white;

    &:hover {
      background-color: var(--color-primary-dark);
    }
  }

  &.secondary {
    background-color: #6c757d;
    color: white;

    &:hover {
      background-color: #5a6268;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ArrayFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ArrayFieldItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const RemoveButton = styled.button`
  padding: 0.5rem;
  border: none;
  background: #dc3545;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-primary);
  background: white;
  color: var(--color-primary);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--color-primary);
    color: white;
  }
`;

interface FundingCallFormProps {
  initialData?: Partial<FundingCall>;
  onSubmit: (data: Omit<FundingCall, '_id' | 'createdAt' | 'updatedAt'>) => Promise<FundingCall>;
  onCancel?: () => void;
}

const FundingCallForm: React.FC<FundingCallFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<FundingCall>>({
    title: '',
    description: '',
    type: 'grant',
    organization: '',
    deadline: new Date().toISOString().split('T')[0],
    fundingInfo: {
      amount: '',
      currency: 'USD',
      duration: '',
      type: ''
    },
    eligibility: {
      criteria: [''],
      restrictions: ['']
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
    tags: [],
    ...initialData
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof FundingCall] as Record<string, unknown>),
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

  const handleArrayChange = (type: 'criteria' | 'restrictions', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility!,
        [type]: prev.eligibility![type].map((item: string, i: number) =>
          i === index ? value : item
        )
      }
    }));
  };

  const handleAddArrayItem = (type: 'criteria' | 'restrictions') => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility!,
        [type]: [...prev.eligibility![type], '']
      }
    }));
  };

  const handleRemoveArrayItem = (type: 'criteria' | 'restrictions', index: number) => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility!,
        [type]: prev.eligibility![type].filter((_: string, i: number) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData as Omit<FundingCall, '_id' | 'createdAt' | 'updatedAt'>);
      toast.success('Funding call saved successfully!');
    } catch (error) {
      console.error('Error saving funding call:', error);
      toast.error('Failed to save funding call');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title</Label>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Description</Label>
        <TextArea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Type</Label>
        <Select name="type" value={formData.type} onChange={handleChange} required>
          <option value="grant">Grant</option>
          <option value="scholarship">Scholarship</option>
          <option value="resource">Resource</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>Organization</Label>
        <Input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Deadline</Label>
        <Input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Funding Information</Label>
        <Input
          type="text"
          name="fundingInfo.amount"
          placeholder="Amount"
          value={formData.fundingInfo?.amount}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="fundingInfo.duration"
          placeholder="Duration"
          value={formData.fundingInfo?.duration}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>Eligibility Criteria</Label>
        <ArrayFieldContainer>
          {formData.eligibility?.criteria.map((criterion, index) => (
            <ArrayFieldItem key={index}>
              <Input
                type="text"
                value={criterion}
                onChange={(e) => handleArrayChange('criteria', index, e.target.value)}
                placeholder="Enter criterion"
                required
              />
              {index > 0 && (
                <RemoveButton
                  type="button"
                  onClick={() => handleRemoveArrayItem('criteria', index)}
                >
                  Remove
                </RemoveButton>
              )}
            </ArrayFieldItem>
          ))}
          <AddButton type="button" onClick={() => handleAddArrayItem('criteria')}>
            Add Criterion
          </AddButton>
        </ArrayFieldContainer>
      </FormGroup>

      <FormGroup>
        <Label>Restrictions</Label>
        <ArrayFieldContainer>
          {formData.eligibility?.restrictions.map((restriction, index) => (
            <ArrayFieldItem key={index}>
              <Input
                type="text"
                value={restriction}
                onChange={(e) => handleArrayChange('restrictions', index, e.target.value)}
                placeholder="Enter restriction"
                required
              />
              {index > 0 && (
                <RemoveButton
                  type="button"
                  onClick={() => handleRemoveArrayItem('restrictions', index)}
                >
                  Remove
                </RemoveButton>
              )}
            </ArrayFieldItem>
          ))}
          <AddButton type="button" onClick={() => handleAddArrayItem('restrictions')}>
            Add Restriction
          </AddButton>
        </ArrayFieldContainer>
      </FormGroup>

      <FormGroup>
        <Label>Contact Information</Label>
        <Input
          type="text"
          name="contact.name"
          placeholder="Contact Name"
          value={formData.contact?.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="contact.email"
          placeholder="Email"
          value={formData.contact?.email}
          onChange={handleChange}
        />
        <Input
          type="tel"
          name="contact.phone"
          placeholder="Phone"
          value={formData.contact?.phone}
          onChange={handleChange}
        />
        <Input
          type="url"
          name="contact.website"
          placeholder="Website"
          value={formData.contact?.website}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>Application URL</Label>
        <Input
          type="url"
          name="applicationUrl"
          value={formData.applicationUrl}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Status</Label>
        <Select name="status" value={formData.status} onChange={handleChange} required>
          <option value="open">Open</option>
          <option value="closing_soon">Closing Soon</option>
          <option value="closed">Closed</option>
        </Select>
      </FormGroup>

      <ButtonGroup>
        {onCancel && (
          <Button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" className="primary">
          Save
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default FundingCallForm;
