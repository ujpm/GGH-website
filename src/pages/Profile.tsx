import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <h1>Profile</h1>
      <ProfileCard>
        <ProfileInfo>
          <h2>{user.name || 'User'}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </ProfileInfo>
      </ProfileCard>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background: var(--background-secondary);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  margin-top: 2rem;
`;

const ProfileInfo = styled.div`
  h2 {
    margin: 0 0 1rem 0;
    color: var(--text-primary);
  }

  p {
    margin: 0.5rem 0;
    color: var(--text-secondary);
  }
`;

export default Profile;
