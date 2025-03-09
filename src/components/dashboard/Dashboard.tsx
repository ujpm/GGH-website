import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const DashboardContainer = styled.div`
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
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }

  &.danger {
    background-color: #dc3545;
  }

  &.secondary {
    background-color: #6c757d;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActionBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const NoAccess = styled.div`
  text-align: center;
  padding: 3rem;
  color: #dc3545;
`;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Fetch content data
    fetchContent();
  }, [user, navigate]);

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
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/dashboard/edit/${id}`);
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
        fetchContent();
      }
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleCreate = () => {
    navigate('/dashboard/create');
  };

  if (!user || user.role !== 'admin') {
    return <NoAccess>
      <h2>Access Denied</h2>
      <p>You need administrator privileges to access this page.</p>
    </NoAccess>;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Admin Dashboard</Title>
        <Button onClick={handleCreate}>Create New Content</Button>
      </Header>

      <ContentGrid>
        {content.map((item) => (
          <ContentCard key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ActionBar>
              <Button onClick={() => handleEdit(item._id)}>Edit</Button>
              <Button className="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
            </ActionBar>
          </ContentCard>
        ))}
      </ContentGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
