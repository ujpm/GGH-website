import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FundingCall, FundingType } from '../../types/grants';
import { validateFundingCall } from '../../services/fundingService';
import { useFunding } from '../../context/FundingContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--color-secondary);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--color-primary-dark);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.875rem;
`;

const ArrayInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .input-row {
    display: flex;
    gap: 0.5rem;

    input {
      flex: 1;
    }

    button {
      padding: 0.5rem;
      background: #f0f0f0;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #e0e0e0;
      }
    }
  }
`;

interface FundingCallFormProps {
  initialData?: FundingCall;
  onSubmit: (data: Omit<FundingCall, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export default function FundingCallForm({ initialData, onSubmit }: FundingCallFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'grant' as FundingType,
    organization: '',
    description: '',
    deadline: '',
    eligibility: {
      criteria: [''],
      ineligible: [''],
    },
    fundingInfo: {
      amount: '',
      currency: '',
      duration: '',
      type: '',
    },
    contact: {
      website: '',
      email: '',
    },
    applicationUrl: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (type: 'criteria' | 'ineligible', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [type]: prev.eligibility[type].map((item: string, i: number) =>
          i === index ? value : item
        ),
      },
    }));
  };

  const handleArrayAdd = (type: 'criteria' | 'ineligible') => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [type]: [...prev.eligibility[type], ''],
      },
    }));
  };

  const handleArrayRemove = (type: 'criteria' | 'ineligible', index: number) => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [type]: prev.eligibility[type].filter((_: string, i: number) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    const validationErrors = validateFundingCall(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors(['Failed to save funding call. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter funding call title"
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
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          placeholder="Enter organization name"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Description</Label>
        <TextArea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter detailed description"
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
        <Label>Eligibility Criteria</Label>
        <ArrayInput>
          {formData.eligibility.criteria.map((criterion, index) => (
            <div key={index} className="input-row">
              <Input
                value={criterion}
                onChange={(e) => handleArrayChange('criteria', index, e.target.value)}
                placeholder="Enter eligibility criterion"
              />
              <button
                type="button"
                onClick={() => handleArrayRemove('criteria', index)}
              >
                Remove
              </button>
            </div>
          ))}
          <Button type="button" onClick={() => handleArrayAdd('criteria')}>
            Add Criterion
          </Button>
        </ArrayInput>
      </FormGroup>

      <FormGroup>
        <Label>Ineligibility Criteria</Label>
        <ArrayInput>
          {formData.eligibility.ineligible.map((criterion, index) => (
            <div key={index} className="input-row">
              <Input
                value={criterion}
                onChange={(e) => handleArrayChange('ineligible', index, e.target.value)}
                placeholder="Enter ineligibility criterion"
              />
              <button
                type="button"
                onClick={() => handleArrayRemove('ineligible', index)}
              >
                Remove
              </button>
            </div>
          ))}
          <Button type="button" onClick={() => handleArrayAdd('ineligible')}>
            Add Criterion
          </Button>
        </ArrayInput>
      </FormGroup>

      <FormGroup>
        <Label>Funding Information</Label>
        <Input
          name="fundingInfo.amount"
          value={formData.fundingInfo.amount}
          onChange={handleChange}
          placeholder="Enter funding amount"
        />
        <Input
          name="fundingInfo.currency"
          value={formData.fundingInfo.currency}
          onChange={handleChange}
          placeholder="Enter currency"
        />
        <Input
          name="fundingInfo.duration"
          value={formData.fundingInfo.duration}
          onChange={handleChange}
          placeholder="Enter funding duration"
        />
        <Input
          name="fundingInfo.type"
          value={formData.fundingInfo.type}
          onChange={handleChange}
          placeholder="Enter funding type"
        />
      </FormGroup>

      <FormGroup>
        <Label>Contact Information</Label>
        <Input
          name="contact.website"
          value={formData.contact.website}
          onChange={handleChange}
          placeholder="Enter website URL"
        />
        <Input
          name="contact.email"
          value={formData.contact.email}
          onChange={handleChange}
          placeholder="Enter contact email"
        />
      </FormGroup>

      <FormGroup>
        <Label>Application URL</Label>
        <Input
          name="applicationUrl"
          value={formData.applicationUrl}
          onChange={handleChange}
          placeholder="Enter application URL"
          required
        />
      </FormGroup>

      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <ErrorText key={index}>{error}</ErrorText>
          ))}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Funding Call'}
      </Button>
    </Form>
  );
}
