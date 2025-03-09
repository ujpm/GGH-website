import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const StyledLink = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Unauthorized: React.FC = () => {
  return (
    <Container>
      <Title>Access Denied</Title>
      <Message>
        Sorry, you don't have permission to access this page. If you believe this
        is an error, please contact the administrator.
      </Message>
      <StyledLink to="/">Return to Home</StyledLink>
    </Container>
  );
};

export default Unauthorized;
