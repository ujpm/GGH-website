import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '../../config/api';

interface User {
  _id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
}

const UserManagement: React.FC = () => {
  const { data: users, isLoading, error } = useQuery<User[]>('users', async () => {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.dashboard.users}`);
    return response.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <Container>
      <h1>User Management</h1>
      <UserTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.name || 'N/A'}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </UserTable>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;

  h1 {
    margin-bottom: 2rem;
  }
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: var(--background-secondary);
  border-radius: var(--border-radius);
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }

  th {
    background: var(--background-tertiary);
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background: var(--background-hover);
  }
`;

export default UserManagement;
