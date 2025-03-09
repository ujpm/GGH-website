import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardContainer>
      <Header>
        <Title>Welcome, {user?.name}!</Title>
        <Subtitle>Manage your account and access your resources</Subtitle>
      </Header>

      <ContentGrid>
        <Card>
          <CardTitle>My Profile</CardTitle>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </Card>

        <Card>
          <CardTitle>Recent Activity</CardTitle>
          <p>No recent activity to display</p>
        </Card>

        <Card>
          <CardTitle>Saved Items</CardTitle>
          <p>No saved items yet</p>
        </Card>

        <Card>
          <CardTitle>Quick Actions</CardTitle>
          <p>Coming soon...</p>
        </Card>
      </ContentGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
