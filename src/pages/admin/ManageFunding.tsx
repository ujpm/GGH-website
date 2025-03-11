import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { FundingCall } from '../../types/grants';
import FundingCallForm from '../../components/admin/FundingCallForm';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

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
  background: #f8f9fa;
  color: #495057;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  color: #212529;
`;

const ActionButton = styled.button<{ variant: 'edit' | 'delete' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0.5rem;
  background-color: ${props => 
    props.variant === 'edit' ? '#0d6efd' : '#dc3545'};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const Status = styled.span<{ status: string }>`
  background: ${props => {
    switch (props.status) {
      case 'open':
        return '#E8F5E9';
      case 'closing_soon':
        return '#FFF3E0';
      default:
        return '#FFEBEE';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'open':
        return '#388E3C';
      case 'closing_soon':
        return '#F57C00';
      default:
        return '#D32F2F';
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
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
      const response = await fetch('/api/funding-calls', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFundingCalls(data);
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
      const response = await fetch('/api/funding-calls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const newCall = await response.json();
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
      const response = await fetch(`/api/funding-calls/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const updatedCall = await response.json();
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
      const response = await fetch(`/api/funding-calls/${id}`, {
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

  const handleCreate = async (data: Omit<FundingCall, '_id' | 'createdAt' | 'updatedAt'>) => {
    return await createFundingCall(data);
  };

  const handleUpdate = async (data: Omit<FundingCall, '_id' | 'createdAt' | 'updatedAt'>) => {
    if (editingCall) {
      return await updateFundingCall(editingCall._id, data);
    }
    throw new Error('No funding call selected for editing');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>Manage Funding Calls</Title>
        <Button onClick={() => setShowForm(true)}>Create New</Button>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th>Organization</Th>
            <Th>Deadline</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {fundingCalls.map(call => (
            <tr key={call._id}>
              <Td>{call.title}</Td>
              <Td style={{ textTransform: 'capitalize' }}>{call.type}</Td>
              <Td>{call.organization}</Td>
              <Td>{format(new Date(call.deadline), 'MMM d, yyyy')}</Td>
              <Td><Status status={call.status}>{call.status}</Status></Td>
              <Td>
                <ActionButton variant="edit" onClick={() => handleEdit(call)}>
                  Edit
                </ActionButton>
                <ActionButton variant="delete" onClick={() => handleDelete(call._id)}>
                  Delete
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => {
              setShowForm(false);
              setEditingCall(null);
            }}>×</CloseButton>
            <FundingCallForm
              initialData={editingCall || undefined}
              onSubmit={editingCall ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingCall(null);
              }}
            />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default ManageFunding;
