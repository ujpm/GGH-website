import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { FundingCall } from '../../types/grants';
import FundingCallForm from '../../components/admin/FundingCallForm';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { API_URL, API_ENDPOINTS } from '../../config/api';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--color-primary);
  margin: 0;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => 
    props.variant === 'secondary' ? '#6c757d' : 'var(--color-primary)'};
  color: white;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  background: var(--color-primary);
  color: white;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  font-size: 0.875rem;
`;

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: var(--color-primary);
`;

const ManageFunding: React.FC = () => {
  const { user } = useAuth();
  const [fundingCalls, setFundingCalls] = useState<FundingCall[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCall, setEditingCall] = useState<FundingCall | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      window.location.href = '/';
      return;
    }
    fetchFundingCalls();
  }, [user]);

  const fetchFundingCalls = async () => {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.funding.list}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFundingCalls(data.data.calls); 
      } else {
        toast.error('Failed to fetch funding calls');
      }
    } catch (error) {
      console.error('Error fetching funding calls:', error);
      toast.error('Error loading funding calls');
    } finally {
      setLoading(false);
    }
  };

  const createFundingCall = async (data: Omit<FundingCall, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.funding.create}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        const newCall = result.data;
        setFundingCalls(prev => [...prev, newCall]);
        setShowForm(false);
        toast.success('Funding call created successfully');
        return newCall;
      } else {
        throw new Error('Failed to create funding call');
      }
    } catch (error) {
      console.error('Error creating funding call:', error);
      toast.error('Failed to create funding call');
      throw error;
    }
  };

  const updateFundingCall = async (id: string, data: Omit<FundingCall, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.funding.update(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        const updatedCall = result.data;
        setFundingCalls(prev =>
          prev.map(call => call._id === id ? updatedCall : call)
        );
        setShowForm(false);
        setEditingCall(null);
        toast.success('Funding call updated successfully');
        return updatedCall;
      } else {
        throw new Error('Failed to update funding call');
      }
    } catch (error) {
      console.error('Error updating funding call:', error);
      toast.error('Failed to update funding call');
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this funding call?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.funding.delete(id)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setFundingCalls(prev => prev.filter(call => call._id !== id));
        toast.success('Funding call deleted successfully');
      } else {
        throw new Error('Failed to delete funding call');
      }
    } catch (error) {
      console.error('Error deleting funding call:', error);
      toast.error('Failed to delete funding call');
    }
  };

  const handleEdit = (call: FundingCall) => {
    setEditingCall(call);
    setShowForm(true);
  };

  const handleSubmit = async (data: Omit<FundingCall, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (!editingCall) {
        await createFundingCall(data);
      } else {
        if (!editingCall._id) {
          throw new Error('No funding call selected for editing');
        }
        await updateFundingCall(editingCall._id, data);
      }
    } catch (error) {
      // Error is already handled in the respective functions
      return;
    }
  };

  if (loading) {
    return <LoadingSpinner>Loading...</LoadingSpinner>;
  }

  return (
    <Container>
      <Header>
        <Title>Manage Funding Calls</Title>
        <Button onClick={() => setShowForm(true)}>Add New</Button>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th>Deadline</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {fundingCalls.map(call => (
            <tr key={call._id}>
              <Td>{call.title}</Td>
              <Td>{call.type}</Td>
              <Td>{call.status}</Td>
              <Td>{format(new Date(call.deadline), 'MMM d, yyyy')}</Td>
              <Td>
                <ActionButton onClick={() => handleEdit(call)}>Edit</ActionButton>
                <ActionButton variant="secondary" onClick={() => handleDelete(call._id)}>
                  Delete
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <FormOverlay>
          <FormContainer>
            <FundingCallForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingCall(null);
              }}
              initialData={editingCall}
            />
          </FormContainer>
        </FormOverlay>
      )}
    </Container>
  );
};

export default ManageFunding;
