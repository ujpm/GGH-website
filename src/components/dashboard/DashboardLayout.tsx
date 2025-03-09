import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const DashboardContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 60px); // Adjust based on your navbar height
`;

const Sidebar = styled.div`
  width: 250px;
  background: #1a1a1a;
  color: white;
  padding: 2rem 0;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f5f5f5;
  overflow-y: auto;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: #ffffff;
  text-decoration: none;
  transition: background-color 0.2s;
  gap: 0.75rem;

  &:hover {
    background: #333;
  }

  &.active {
    background: var(--color-primary);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const UserInfo = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #333;
  margin-bottom: 1rem;
`;

const UserName = styled.h3`
  margin: 0;
  color: white;
  font-size: 1.1rem;
`;

const UserRole = styled.p`
  margin: 0.25rem 0 0;
  color: #888;
  font-size: 0.9rem;
`;

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'admin') {
    navigate('/unauthorized');
    return null;
  }

  return (
    <DashboardContainer>
      <Sidebar>
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserRole>Administrator</UserRole>
        </UserInfo>

        <nav>
          <NavItem to="/dashboard" end>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Overview
          </NavItem>
          
          <NavItem to="/dashboard/content">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
            Content Management
          </NavItem>

          <NavItem to="/dashboard/users">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            User Management
          </NavItem>

          <NavItem to="/dashboard/settings">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </NavItem>
        </nav>
      </Sidebar>

      <MainContent>
        <Outlet />
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardLayout;
