import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Nav = styled.nav`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-primary);
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;

  ${({ $primary }) =>
    $primary
      ? `
    background-color: var(--color-primary);
    color: white;
  `
      : `
    background-color: transparent;
    color: var(--color-primary);
  `}

  &:hover {
    opacity: 0.8;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          Global Grants Hub
        </Logo>

        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/grants">Grants</NavLink>
          <NavLink to="/scholarships">Scholarships</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
        </NavLinks>

        <AuthButtons>
          {user ? (
            <>
              <UserMenu>
                <Avatar>{getInitials(user.name)}</Avatar>
                <Button onClick={handleLogout}>Logout</Button>
              </UserMenu>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')}>Login</Button>
              <Button $primary onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </AuthButtons>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
