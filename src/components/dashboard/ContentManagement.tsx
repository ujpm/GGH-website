import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Container = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--color-primary);
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  background-color: ${props => 
    props.variant === 'danger' ? '#dc3545' :
    props.variant === 'secondary' ? '#6c757d' :
    'var(--color-primary)'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  background-color: ${props => 
    props.status === 'published' ? '#28a745' :
    props.status === 'draft' ? '#ffc107' :
    '#6c757d'};
  color: ${props => props.status === 'draft' ? '#000' : '#fff'};
`;

const SearchBar = styled.input`
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  width: 300px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
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
  max-width: 500px;
`;

const ModalTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--color-primary);
`;

const TypeButton = styled(Button)<{ selected?: boolean }>`
  flex: 1;
  background: ${props => props.selected ? 'var(--color-primary)' : '#f8f9fa'};
  color: ${props => props.selected ? 'white' : 'var(--color-primary)'};
  border: 1px solid var(--color-primary);
  margin: 0.5rem;

  &:hover {
    background: ${props => props.selected ? 'var(--color-primary)' : '#e9ecef'};
  }
`;

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

interface Content {
  _id: string;
  title: string;
  description: string;
  type: 'grant' | 'scholarship' | 'resource';
  status: 'draft' | 'published' | 'archived';
  author: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

const ContentManagement: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        toast.error('Failed to fetch content');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;

    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        toast.success('Content deleted successfully');
        fetchContent();
      } else {
        toast.error('Failed to delete content');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Error deleting content');
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) return;

    try {
      const promises = selectedItems.map(id => 
        fetch(`/api/content/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      );

      await Promise.all(promises);
      toast.success('Selected items deleted successfully');
      setSelectedItems([]);
      fetchContent();
    } catch (error) {
      console.error('Error in bulk delete:', error);
      toast.error('Failed to delete some items');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        toast.success('Status updated successfully');
        fetchContent();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    }
  };

  const handleCreateContent = (type: 'grant' | 'scholarship' | 'resource') => {
    navigate('/dashboard/create', { state: { type } });
    setShowCreateModal(false);
  };

  const filteredContent = content
    .filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item => 
      statusFilter === 'all' ? true : item.status === statusFilter
    );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(filteredContent.map(item => item._id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>Content Management</Title>
        <Button onClick={() => setShowCreateModal(true)}>Add New Content</Button>
      </Header>

      <FilterGroup>
        <SearchBar
          type="text"
          placeholder="Search content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </Select>
      </FilterGroup>

      {selectedItems.length > 0 && (
        <ActionGroup>
          <Button variant="danger" onClick={handleBulkDelete}>
            Delete Selected ({selectedItems.length})
          </Button>
        </ActionGroup>
      )}

      <Table>
        <thead>
          <tr>
            <Th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={content.length > 0 && selectedItems.length === content.length}
              />
            </Th>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th>Author</Th>
            <Th>Last Updated</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredContent.map((item) => (
            <tr key={item._id}>
              <Td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleSelectItem(item._id)}
                />
              </Td>
              <Td>{item.title}</Td>
              <Td>{item.type}</Td>
              <Td>
                <StatusBadge status={item.status}>
                  {item.status}
                </StatusBadge>
              </Td>
              <Td>{item.author.name}</Td>
              <Td>{new Date(item.updatedAt).toLocaleDateString()}</Td>
              <Td>
                <ActionGroup>
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/dashboard/edit/${item._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </ActionGroup>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showCreateModal && (
        <Modal onClick={() => setShowCreateModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>Create New Content</ModalTitle>
            <TypeGrid>
              <TypeButton onClick={() => handleCreateContent('grant')}>
                Grant
              </TypeButton>
              <TypeButton onClick={() => handleCreateContent('scholarship')}>
                Scholarship
              </TypeButton>
              <TypeButton onClick={() => handleCreateContent('resource')}>
                Resource
              </TypeButton>
            </TypeGrid>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default ContentManagement;
