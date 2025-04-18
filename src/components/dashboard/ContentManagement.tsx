import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../config/api';
import { useFunding } from '../../context/FundingContext';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0;
`;

const AddButton = styled.button`
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const TypeSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 2rem;
`;

const TypeCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  max-width: 600px;
  width: 90%;
`;

const ContentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid #eee;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;
  
  &.edit {
    background-color: #ffd700;
    color: black;
  }
  
  &.delete {
    background-color: #dc3545;
    color: white;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: ${props => 
    props.status === 'open' ? '#28a745' :
    props.status === 'closing_soon' ? '#ffc107' :
    '#dc3545'};
  color: ${props => props.status === 'closing_soon' ? '#000' : '#fff'};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--color-primary);
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff3f3;
  border: 1px solid #dc3545;
  border-radius: 4px;
  color: #dc3545;
`;

interface FundingCall {
  _id: string;
  title: string;
  type: 'grant' | 'scholarship' | 'resource';
  organization: string;
  status: 'open' | 'closing_soon' | 'closed';
  deadline?: Date;
}

const ContentManagement: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { state: { calls, loading, error }, refetchCalls } = useFunding();

  useEffect(() => {
    refetchCalls();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`${API_URL}/funding/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete content');
      }

      toast.success('Content deleted successfully');
      refetchCalls();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
    }
  };

  const handleTypeSelect = (type: 'grant' | 'scholarship' | 'resource') => {
    setShowModal(false);
    navigate('/dashboard/create', { state: { type } });
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading content...</LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          Error loading content: {error}
          <button onClick={refetchCalls}>Try Again</button>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Content Management</Title>
        <AddButton onClick={() => setShowModal(true)}>
          Add New Content
        </AddButton>
      </Header>

      {showModal && (
        <Modal onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowModal(false);
          }
        }}>
          <ModalContent>
            <h2>Select Content Type</h2>
            <TypeSelection>
              <TypeCard onClick={() => handleTypeSelect('grant')}>
                <h3>Grant</h3>
                <p>Create a new grant opportunity</p>
              </TypeCard>
              <TypeCard onClick={() => handleTypeSelect('scholarship')}>
                <h3>Scholarship</h3>
                <p>Create a new scholarship listing</p>
              </TypeCard>
              <TypeCard onClick={() => handleTypeSelect('resource')}>
                <h3>Resource</h3>
                <p>Add a new resource</p>
              </TypeCard>
            </TypeSelection>
          </ModalContent>
        </Modal>
      )}

      {calls.length === 0 ? (
        <p>No content available. Click "Add New Content" to create some.</p>
      ) : (
        <ContentTable>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Type</Th>
              <Th>Organization</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {calls.map(call => (
              <tr key={call._id}>
                <Td>{call.title}</Td>
                <Td style={{ textTransform: 'capitalize' }}>{call.type}</Td>
                <Td>{call.organization}</Td>
                <Td>
                  <StatusBadge status={call.status}>
                    {call.status.replace('_', ' ')}
                  </StatusBadge>
                </Td>
                <Td>
                  <ActionButton
                    className="edit"
                    onClick={() => navigate(`/dashboard/edit/${call._id}`)}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    className="delete"
                    onClick={() => handleDelete(call._id)}
                  >
                    Delete
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </ContentTable>
      )}
    </Container>
  );
};

export default ContentManagement;
