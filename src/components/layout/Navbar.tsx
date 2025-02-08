import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from '../../assets/logo_transparent.png';

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

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
`;

const LogoImg = styled.img`
  height: 40px;
  width: 40px;
  object-fit: contain;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
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
        <LogoContainer to="/">
          <LogoImg src={LogoImage} alt="GGH Logo" />
          <LogoText>Global Grants Hub</LogoText>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/grants">Grants</NavLink>
          <NavLink to="/scholarships">Scholarships</NavLink>
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
