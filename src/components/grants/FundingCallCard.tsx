import { FundingCall } from '../../types/grants';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';

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
    box-shadow: 0 8px 24px ${props => {
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
        return 'var(--color-primary)';
      case 'scholarship':
        return '#3498DB';
      case 'resource':
        return '#27AE60';
      default:
        return 'var(--color-primary)';
    }
  }};
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
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
`;

const Status = styled.div<{ status: string }>`
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
  display: inline-block;
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
  gap: 1rem;
`;

const Deadline = styled.div`
  font-size: 0.95rem;
  color: #666;

  strong {
    color: #444;
    font-weight: 600;
  }
`;

const ApplyButton = styled.a<{ type: string }>`
  background: ${props => {
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
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => {
      switch (props.type) {
        case 'grant':
          return 'var(--color-primary-dark)';
        case 'scholarship':
          return '#2980B9';
        case 'resource':
          return '#219A52';
        default:
          return 'var(--color-primary-dark)';
      }
    }};
    transform: translateY(-2px);
  }
`;

const Amount = styled.div`
  font-size: 0.95rem;
  color: #666;
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;

  strong {
    color: #444;
    font-weight: 600;
  }
`;

const AdminActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const AdminButton = styled.button<{ variant: 'edit' | 'delete' }>`
  background: ${props => props.variant === 'edit' ? '#E3F2FD' : '#FFEBEE'};
  color: ${props => props.variant === 'edit' ? '#1976D2' : '#C62828'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
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

export default function FundingCallCard({ call, onEdit, onDelete }: FundingCallCardProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <Card type={call.type}>
      <Header>
        <div>
          <Title type={call.type}>{call.title}</Title>
          <Organization>{call.organization}</Organization>
        </div>
        <Type type={call.type}>{call.type}</Type>
      </Header>

      <Status status={call.status}>
        {call.status === 'closing_soon' ? 'Closing Soon' : call.status}
      </Status>

      <Description>{call.description}</Description>

      {call.fundingInfo.amount && (
        <Amount>
          <strong>Funding:</strong> {call.fundingInfo.amount}
          {call.fundingInfo.currency && ` ${call.fundingInfo.currency}`}
          {call.fundingInfo.duration && ` for ${call.fundingInfo.duration}`}
        </Amount>
      )}

      <Footer>
        <Deadline>
          <strong>Deadline:</strong> {format(new Date(call.deadline), 'MMM dd, yyyy')}
        </Deadline>
        <ApplyButton href={call.applicationUrl} target="_blank" type={call.type}>
          Apply Now
        </ApplyButton>
      </Footer>
      
      {isAdmin && onEdit && onDelete && (
        <AdminActions>
          <AdminButton variant="edit" onClick={() => onEdit(call)}>
            Edit
          </AdminButton>
          <AdminButton variant="delete" onClick={() => onDelete(call.id)}>
            Delete
          </AdminButton>
        </AdminActions>
      )}
    </Card>
  );
}
