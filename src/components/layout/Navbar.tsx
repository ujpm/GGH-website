import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: var(--primary);
    text-decoration: none;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Global Grants Hub</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/support">Support Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
