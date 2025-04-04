import { FundingCall } from '../../types/grants';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import FundingCallDetail from './FundingCallDetail';

const Card = styled.div<{ type: string }>`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.75rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => {
    switch (props.type) {
      case 'grant':
        return 'var(--color-primary)';
      case 'scholarship':
        return '#3498DB';
      case 'resource':
        return '#27AE60';
      default:
        return 'var(--color-primary)';
    }
  }};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  gap: 1rem;
`;

const Title = styled.h3<{ type: string }>`
  color: ${props => {
    switch (props.type) {
      case 'grant':
        return 'var(--color-primary)';
      case 'scholarship':
        return '#2C3E50';
      case 'resource':
        return '#27AE60';
      default:
        return 'var(--color-primary)';
    }
  }};
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.4;
`;

const Organization = styled.span`
  color: #666;
  font-size: 0.95rem;
  display: block;
  margin-top: 0.5rem;
`;

const Type = styled.span<{ type: string }>`
  background: ${props => {
    switch (props.type) {
      case 'grant':
        return '#E8F5E9';
      case 'scholarship':
        return '#E3F2FD';
      case 'resource':
        return '#E8F5E9';
      default:
        return '#E8F5E9';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'grant':
        return 'var(--color-primary)';
      case 'scholarship':
        return '#1976D2';
      case 'resource':
        return '#27AE60';
      default:
        return 'var(--color-primary)';
    }
  }};
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const Description = styled.p`
  color: #444;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 1.25rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`;

const Deadline = styled.div`
  font-size: 0.95rem;
  color: #666;

  strong {
    color: #444;
    font-weight: 600;
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
        return '#2E7D32';
      case 'closing_soon':
        return '#E65100';
      default:
        return '#C62828';
    }
  }};
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const AdminButton = styled.button<{ variant: 'edit' | 'delete' }>`
  background: ${props => props.variant === 'edit' ? '#E3F2FD' : '#FFEBEE'};
  color: ${props => props.variant === 'edit' ? '#1976D2' : '#C62828'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.variant === 'edit' ? '#BBDEFB' : '#FFCDD2'};
  }
`;

interface FundingCallCardProps {
  call: FundingCall;
  onEdit?: (call: FundingCall) => void;
  onDelete?: (id: string) => void;
}

const FundingCallCard = ({ call, onEdit, onDelete }: FundingCallCardProps) => {
  const { user } = useAuth();
  const [showDetail, setShowDetail] = useState(false);

  const handleCardClick = () => {
    setShowDetail(true);
  };

  return (
    <>
      <Card type={call.type} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <Header>
          <div>
            <Title type={call.type}>{call.title}</Title>
            <Organization>{call.organization}</Organization>
          </div>
          <Type type={call.type}>{call.type}</Type>
        </Header>

        <Description>{call.description}</Description>

        <Footer>
          <Deadline>
            <strong>Deadline:</strong> {format(new Date(call.deadline), 'MMMM d, yyyy')}
          </Deadline>
          <Status status={call.status}>
            {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
          </Status>
        </Footer>

        {user?.role === 'admin' && (
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            {onEdit && (
              <AdminButton variant="edit" onClick={(e) => {
                e.stopPropagation();
                onEdit(call);
              }}>
                Edit
              </AdminButton>
            )}
            {onDelete && (
              <AdminButton variant="delete" onClick={(e) => {
                e.stopPropagation();
                onDelete(call._id);
              }}>
                Delete
              </AdminButton>
            )}
          </div>
        )}
      </Card>

      {showDetail && (
        <FundingCallDetail 
          call={call} 
          onClose={() => setShowDetail(false)} 
        />
      )}
    </>
  );
};

export default FundingCallCard;
