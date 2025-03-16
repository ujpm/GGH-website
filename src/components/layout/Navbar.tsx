import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from '../../assets/logo_transparent.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Nav = styled.nav`
  background: white;
  padding: 0.8rem 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    text-decoration: none;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    gap: 0.4rem;
  }
`;

const LogoImg = styled.img`
  height: 40px;
  width: 40px;
  object-fit: contain;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: 32px;
    width: 32px;
  }
`;

const LogoText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-primary);
  transition: all 0.3s ease;

  @media (max-width: 968px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 968px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: min(280px, 80vw);
    height: 100vh;
    background: white;
    padding: 5rem 2rem 2rem;
    gap: 1.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -2px 0 10px rgba(0,0,0,0.1);
    z-index: 1000;
    overflow-y: auto;
  }
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? 'var(--color-primary)' : 'var(--text)'};
  text-decoration: none;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  font-size: 1rem;
  transition: all 0.2s ease;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  position: relative;
  
  &:hover {
    color: var(--color-primary);
    text-decoration: none;
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0.8rem;
    right: 0.8rem;
    height: 2px;
    background: var(--color-primary);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: ${props => props.$isActive ? 'scaleX(0)' : 'scaleX(1)'};
  }

  @media (max-width: 968px) {
    font-size: 1.1rem;
    width: 100%;
    text-align: left;
    padding: 1rem;
    border-radius: 8px;
    background: ${props => props.$isActive ? 'var(--color-primary)' : 'transparent'};
    color: ${props => props.$isActive ? 'white' : 'var(--text)'};

    &:hover {
      background: var(--color-primary);
      color: white;
      transform: none;
    }

    &::after {
      display: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.8rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.4rem;
  cursor: pointer;
  color: var(--color-primary);
  z-index: 2000;
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-secondary);
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-light);
    border-radius: 4px;
  }

  @media (max-width: 968px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.4rem;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 968px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: ${props => props.isOpen ? 1 : 0};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 2rem;

  @media (max-width: 968px) {
    margin-left: 0;
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const AuthButton = styled(Link)<{ $primary?: boolean }>`
  padding: 0.5rem 1.2rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  border: 2px solid var(--color-primary);
  
  ${props => props.$primary ? `
    background: var(--color-primary);
    color: white;
    
    &:hover {
      background: var(--color-primary-light);
      border-color: var(--color-primary-light);
      text-decoration: none;
      transform: translateY(-1px);
    }
  ` : `
    background: transparent;
    color: var(--color-primary);
    
    &:hover {
      background: var(--color-primary);
      color: white;
      text-decoration: none;
      transform: translateY(-1px);
    }
  `}

  @media (max-width: 968px) {
    width: 100%;
    text-align: center;
    padding: 0.8rem;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 968px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
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

  @media (max-width: 968px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1.2rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  border: 2px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-1px);
  }

  @media (max-width: 968px) {
    width: 100%;
    text-align: center;
    padding: 0.8rem;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Nav style={{ 
      boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.1)',
      background: isScrolled ? 'rgba(255,255,255,0.95)' : 'white',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(10px)' : 'none'
    }}>
      <NavContainer>
        <LogoContainer to="/" onClick={closeMenu}>
          <LogoImg src={LogoImage} alt="GGH Logo" />
          <LogoText>Global Grants Hub</LogoText>
        </LogoContainer>
        <MenuButton 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
        <Overlay isOpen={isOpen} onClick={closeMenu} />
        <NavLinks isOpen={isOpen}>
          <NavLink to="/" onClick={closeMenu} $isActive={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/grants" onClick={closeMenu} $isActive={location.pathname === '/grants'}>
            Grants
          </NavLink>
          <NavLink to="/scholarships" onClick={closeMenu} $isActive={location.pathname === '/scholarships'}>
            Scholarships
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} $isActive={location.pathname === '/about'}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu} $isActive={location.pathname === '/contact'}>
            Contact
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink to="/dashboard" onClick={closeMenu} $isActive={location.pathname === '/dashboard'}>
              Dashboard
            </NavLink>
          )}
          {user ? (
            <UserMenu>
              <Avatar>{getInitials(user.name)}</Avatar>
              <NavLink to="/profile" onClick={closeMenu} $isActive={location.pathname === '/profile'}>
                Profile
              </NavLink>
              <LogoutButton onClick={handleLogout}>
                Logout
              </LogoutButton>
            </UserMenu>
          ) : (
            <AuthButtons>
              <AuthButton to="/login" onClick={closeMenu}>
                Login
              </AuthButton>
              <AuthButton to="/register" onClick={closeMenu} $primary>
                Register
              </AuthButton>
            </AuthButtons>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
