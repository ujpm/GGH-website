import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Container = styled.div`
  display: grid;
  gap: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const RecentActivity = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin: 0 0 1rem;
  color: #1a1a1a;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
`;

const ActivityIcon = styled.div<{ type: 'create' | 'update' | 'delete' }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => 
    props.type === 'create' ? '#28a745' :
    props.type === 'update' ? '#007bff' :
    '#dc3545'};
  color: white;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityHeading = styled.div`
  font-weight: 500;
  color: #1a1a1a;
`;

const ActivityMeta = styled.div`
  color: #666;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionCard = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  
  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }
`;

const ActionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ActionInfo = styled.div`
  flex: 1;
`;

const ActionTitle = styled.div`
  font-weight: 500;
  color: #1a1a1a;
`;

const ActionDescription = styled.div`
  color: #666;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

interface DashboardStats {
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  totalUsers: number;
}

interface Activity {
  _id: string;
  type: 'create' | 'update' | 'delete';
  title: string;
  user: string;
  timestamp: string;
}

const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalContent: 0,
    publishedContent: 0,
    draftContent: 0,
    totalUsers: 0
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        fetch('/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch('/api/dashboard/activity', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      ]);

      if (statsResponse.ok && activityResponse.ok) {
        const [statsData, activityData] = await Promise.all([
          statsResponse.json(),
          activityResponse.json()
        ]);

        setStats(statsData);
        setRecentActivity(activityData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <StatsGrid>
        <StatCard>
          <StatIcon color="#4CAF50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </StatIcon>
          <StatInfo>
            <StatValue>{stats.totalContent}</StatValue>
            <StatLabel>Total Content</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIcon color="#2196F3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </StatIcon>
          <StatInfo>
            <StatValue>{stats.publishedContent}</StatValue>
            <StatLabel>Published Content</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIcon color="#FFC107">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </StatIcon>
          <StatInfo>
            <StatValue>{stats.draftContent}</StatValue>
            <StatLabel>Draft Content</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIcon color="#9C27B0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </StatIcon>
          <StatInfo>
            <StatValue>{stats.totalUsers}</StatValue>
            <StatLabel>Total Users</StatLabel>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <ActionCard onClick={() => navigate('/dashboard/content')}>
          <ActionIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </ActionIcon>
          <ActionInfo>
            <ActionTitle>Create Content</ActionTitle>
            <ActionDescription>Add new content to your website</ActionDescription>
          </ActionInfo>
        </ActionCard>

        <ActionCard onClick={() => navigate('/dashboard/users')}>
          <ActionIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </ActionIcon>
          <ActionInfo>
            <ActionTitle>Manage Users</ActionTitle>
            <ActionDescription>View and manage user accounts</ActionDescription>
          </ActionInfo>
        </ActionCard>

        <ActionCard onClick={() => navigate('/dashboard/settings')}>
          <ActionIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </ActionIcon>
          <ActionInfo>
            <ActionTitle>Settings</ActionTitle>
            <ActionDescription>Configure dashboard settings</ActionDescription>
          </ActionInfo>
        </ActionCard>
      </QuickActions>

      <RecentActivity>
        <SectionTitle>Recent Activity</SectionTitle>
        <ActivityList>
          {recentActivity.map((activity) => (
            <ActivityItem key={activity._id}>
              <ActivityIcon type={activity.type}>
                {activity.type === 'create' && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
                {activity.type === 'update' && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )}
                {activity.type === 'delete' && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </ActivityIcon>
              <ActivityContent>
                <ActivityHeading>{activity.title}</ActivityHeading>
                <ActivityMeta>
                  by {activity.user} • {new Date(activity.timestamp).toLocaleString()}
                </ActivityMeta>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivity>
    </Container>
  );
};

export default DashboardOverview;
