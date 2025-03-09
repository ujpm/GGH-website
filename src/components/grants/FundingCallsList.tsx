import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FundingCall, FundingType, FundingStatus } from '../../types/grants';
import FundingCallCard from './FundingCallCard';
import { useFunding } from '../../context/FundingContext';

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

const PageButton = styled.button<{ active?: boolean; $type?: FundingType }>`
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

interface FundingCallsListProps {
  type?: FundingType;
  itemsPerPage?: number;
}

export default function FundingCallsList({ type, itemsPerPage = 9 }: FundingCallsListProps) {
  const { state } = useFunding();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCalls, setFilteredCalls] = useState<FundingCall[]>([]);
  const [status, setStatus] = useState<FundingStatus | ''>('');

  useEffect(() => {
    const filtered = state.calls.filter(call => {
      const matchesSearch = !searchTerm || 
        call.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !type || call.type === type;
      const matchesStatus = !status || call.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });

    setFilteredCalls(filtered);
    setCurrentPage(1);
  }, [state.calls, type, status, searchTerm]);

  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCalls = filteredCalls.slice(startIndex, endIndex);

  const handleStatusChange = (value: string) => {
    setStatus(value as FundingStatus);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatus('');
  };

  if (state.error) {
    return <ErrorMessage>{state.error}</ErrorMessage>;
  }

  return (
    <Container>
      <FiltersContainer $type={type}>
        <FilterGroup>
          <Label $type={type}>Search:</Label>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${type || 'funding'} opportunities...`}
            $type={type}
          />
        </FilterGroup>

        <FilterGroup>
          <Label $type={type}>Status:</Label>
          <Select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            $type={type}
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="closing_soon">Closing Soon</option>
            <option value="closed">Closed</option>
          </Select>
        </FilterGroup>

        <ClearFilters onClick={clearFilters} $type={type}>
          Clear Filters
        </ClearFilters>
      </FiltersContainer>

      {state.loading ? (
        <LoadingSpinner $type={type}>Loading opportunities...</LoadingSpinner>
      ) : currentCalls.length > 0 ? (
        <>
          <Grid>
            {currentCalls.map((call) => (
              <FundingCallCard key={call.id} call={call} />
            ))}
          </Grid>
          
          {totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
                $type={type}
              >
                Previous
              </PageButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PageButton
                  key={page}
                  active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                  $type={type}
                >
                  {page}
                </PageButton>
              ))}
              <PageButton
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
                $type={type}
              >
                Next
              </PageButton>
            </Pagination>
          )}
        </>
      ) : (
        <NoResults $type={type}>
          No {type || 'funding'} opportunities found. Try adjusting your filters or search terms.
        </NoResults>
      )}
    </Container>
  );
}
