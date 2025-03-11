import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FundingCall, FundingType, FundingStatus } from '../../types/grants';
import FundingCallCard from './FundingCallCard';
import { useFunding } from '../../context/FundingContext';
import { useAuth } from '../../context/AuthContext';
import { deleteFundingCall } from '../../services/fundingService';

const Container = styled.div`
  width: 100%;
`;

const FiltersContainer = styled.div<{ $type?: FundingType }>`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ $type }) => {
    switch ($type) {
      case 'grant':
        return 'var(--color-primary)';
      case 'scholarship':
        return '#3498DB';
      case 'resource':
        return '#27AE60';
      default:
        return 'var(--color-primary)';
    }
  }}20;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label<{ $type?: FundingType }>`
  font-weight: 600;
  color: ${({ $type }) => {
    switch ($type) {
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
`;

const Select = styled.select<{ $type?: FundingType }>`
  padding: 0.75rem 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 0.95rem;
  background: white;
  flex: 1;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $type }) => {
      switch ($type) {
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
    box-shadow: 0 0 0 3px ${({ $type }) => {
      switch ($type) {
        case 'grant':
          return 'var(--color-primary)';
        case 'scholarship':
          return '#3498DB';
        case 'resource':
          return '#27AE60';
        default:
          return 'var(--color-primary)';
      }
    }}20;
  }
`;

const SearchInput = styled.input<{ $type?: FundingType }>`
  padding: 0.75rem 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 0.95rem;
  flex: 1;
  min-width: 300px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $type }) => {
      switch ($type) {
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
    box-shadow: 0 0 0 3px ${({ $type }) => {
      switch ($type) {
        case 'grant':
          return 'var(--color-primary)';
        case 'scholarship':
          return '#3498DB';
        case 'resource':
          return '#27AE60';
        default:
          return 'var(--color-primary)';
      }
    }}20;
  }

  &::placeholder {
    color: #999;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const NoResults = styled.div<{ $type?: FundingType }>`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.25rem;
  background: white;
  border-radius: 12px;
  border: 2px dashed ${({ $type }) => {
    switch ($type) {
      case 'grant':
        return 'var(--color-primary)';
      case 'scholarship':
        return '#3498DB';
      case 'resource':
        return '#27AE60';
      default:
        return 'var(--color-primary)';
    }
  }}40;
`;

const LoadingSpinner = styled.div<{ $type?: FundingType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: ${({ $type }) => {
    switch ($type) {
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
  font-size: 1.25rem;
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.1rem;
`;

const ClearFilters = styled.button<{ $type?: FundingType }>`
  background: none;
  border: none;
  color: ${({ $type }) => {
    switch ($type) {
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
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $type }) => {
      switch ($type) {
        case 'grant':
          return 'var(--color-primary)';
        case 'scholarship':
          return '#3498DB';
        case 'resource':
          return '#27AE60';
        default:
          return 'var(--color-primary)';
      }
    }}10;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 3rem;
`;

const PaginationButton = styled.button<{ active?: boolean; $type?: FundingType }>`
  padding: 0.75rem 1.25rem;
  border: 2px solid ${props => props.active ? 
    props.$type === 'scholarship' ? '#3498DB' :
    props.$type === 'resource' ? '#27AE60' :
    'var(--color-primary)' : '#eee'};
  background: ${props => props.active ? 
    props.$type === 'scholarship' ? '#3498DB' :
    props.$type === 'resource' ? '#27AE60' :
    'var(--color-primary)' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? 
      props.$type === 'scholarship' ? '#2980B9' :
      props.$type === 'resource' ? '#219A52' :
      'var(--color-primary-dark)' : '#f8f8f8'};
    border-color: ${props => props.active ? 
      props.$type === 'scholarship' ? '#2980B9' :
      props.$type === 'resource' ? '#219A52' :
      'var(--color-primary-dark)' : '#ddd'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 0.95rem;
  color: #666;
`;

interface FundingCallsListProps {
  type?: FundingType;
  itemsPerPage?: number;
}

export default function FundingCallsList({ type, itemsPerPage = 9 }: FundingCallsListProps) {
  const { state, dispatch } = useFunding();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCalls, setFilteredCalls] = useState<FundingCall[]>([]);
  const [status, setStatus] = useState<FundingStatus | ''>('');

  useEffect(() => {
    let filtered = state.calls.filter(call => !type || call.type === type);

    if (searchTerm) {
      filtered = filtered.filter(call => 
        call.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter(call => call.status === status);
    }

    setFilteredCalls(filtered);
    setCurrentPage(1); 
  }, [state.calls, type, searchTerm, status]);

  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCalls = filteredCalls.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = async (call: FundingCall) => {
    if (!isAdmin) return;
    window.location.href = `/dashboard/edit/${call._id}`;
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (!window.confirm('Are you sure you want to delete this funding call?')) return;
    
    try {
      await deleteFundingCall(id);
      dispatch({ type: 'DELETE_CALL', payload: id });
    } catch (error) {
      console.error('Failed to delete funding call:', error);
    }
  };

  if (state.error) {
    return <ErrorMessage>{state.error}</ErrorMessage>;
  }

  if (state.loading) {
    return <LoadingSpinner $type={type}>Loading...</LoadingSpinner>;
  }

  return (
    <Container>
      <FiltersContainer $type={type}>
        <FilterGroup>
          <Label $type={type}>Search</Label>
          <SearchInput
            type="text"
            placeholder="Search by title, organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            $type={type}
          />
        </FilterGroup>
        <FilterGroup>
          <Label $type={type}>Status</Label>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as FundingStatus)}
            $type={type}
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="closing_soon">Closing Soon</option>
            <option value="closed">Closed</option>
          </Select>
        </FilterGroup>
        {(searchTerm || status) && (
          <ClearFilters $type={type} onClick={() => {
            setSearchTerm('');
            setStatus('');
          }}>
            Clear Filters
          </ClearFilters>
        )}
      </FiltersContainer>

      {currentCalls.length === 0 ? (
        <NoResults $type={type}>
          No {type || 'funding opportunities'} found matching your criteria.
        </NoResults>
      ) : (
        <>
          <Grid>
            {currentCalls.map(call => (
              <FundingCallCard 
                key={call._id} 
                call={call}
                onEdit={isAdmin ? handleEdit : undefined}
                onDelete={isAdmin ? handleDelete : undefined}
              />
            ))}
          </Grid>
          
          {totalPages > 1 && (
            <Pagination>
              <PaginationButton
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                $type={type}
              >
                Previous
              </PaginationButton>
              <PageInfo>
                Page {currentPage} of {totalPages}
              </PageInfo>
              <PaginationButton
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                $type={type}
              >
                Next
              </PaginationButton>
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
}
