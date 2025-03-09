import React, { useState } from 'react';
import styled from 'styled-components';
import { FundingCall } from '../../types/grants';
import FundingCallForm from '../../components/admin/FundingCallForm';
import { useFunding } from '../../context/FundingContext';
import { createFundingCall, updateFundingCall, deleteFundingCall } from '../../services/fundingService';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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

const Button = styled.button`
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: var(--color-primary-dark);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: #f5f5f5;
  color: var(--color-secondary);
  font-weight: 500;
`;

const Td = styled.td`
  padding: 1rem;
  border-top: 1px solid #eee;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  background: ${props => props.variant === 'delete' ? '#ffebee' : '#e3f2fd'};
  color: ${props => props.variant === 'delete' ? '#c62828' : '#1976d2'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  margin-right: 0.5rem;

  &:hover {
    background: ${props => props.variant === 'delete' ? '#ffcdd2' : '#bbdefb'};
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
  max-width: 90%;
  max-height: 90%;
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

export default function ManageFunding() {
  const { state, dispatch } = useFunding();
  const [showForm, setShowForm] = useState(false);
  const [editingCall, setEditingCall] = useState<FundingCall | null>(null);

  const handleCreate = async (data: Omit<FundingCall, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newCall = await createFundingCall(data);
      dispatch({ type: 'ADD_CALL', payload: newCall });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create funding call:', error);
    }
  };

  const handleUpdate = async (data: Omit<FundingCall, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingCall) return;
    try {
      const updatedCall = await updateFundingCall(editingCall.id, data);
      dispatch({ type: 'UPDATE_CALL', payload: updatedCall });
      setShowForm(false);
      setEditingCall(null);
    } catch (error) {
      console.error('Failed to update funding call:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this funding call?')) return;
    try {
      await deleteFundingCall(id);
      dispatch({ type: 'DELETE_CALL', payload: id });
    } catch (error) {
      console.error('Failed to delete funding call:', error);
    }
  };

  const handleEdit = (call: FundingCall) => {
    setEditingCall(call);
    setShowForm(true);
  };

  return (
    <Container>
      <Header>
        <Title>Manage Funding Calls</Title>
        <Button onClick={() => setShowForm(true)}>Add New Call</Button>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Title</Th>
            <Th>Organization</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th>Deadline</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {state.calls.map(call => (
            <tr key={call.id}>
              <Td>{call.title}</Td>
              <Td>{call.organization}</Td>
              <Td style={{ textTransform: 'capitalize' }}>{call.type}</Td>
              <Td><Status status={call.status}>{call.status}</Status></Td>
              <Td>{new Date(call.deadline).toLocaleDateString()}</Td>
              <Td>
                <ActionButton onClick={() => handleEdit(call)}>Edit</ActionButton>
                <ActionButton variant="delete" onClick={() => handleDelete(call.id)}>
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
            }}>
              ×
            </CloseButton>
            <FundingCallForm
              initialData={editingCall || undefined}
              onSubmit={editingCall ? handleUpdate : handleCreate}
            />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
