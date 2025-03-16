import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: var(--color-secondary);
  color: white;
  padding: 4rem 1rem 1rem;
  margin-top: auto;

  @media (max-width: 768px) {
    padding: 3rem 1rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 40px;
      height: 2px;
      background: var(--color-primary);
    }
  }
`;

const FooterLink = styled(Link)`
  color: #cbd5e1;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  
  &:hover {
    color: white;
    text-decoration: none;
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  color: #cbd5e1;
  
  a {
    color: #cbd5e1;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    transition: all 0.2s ease;
    
    &:hover {
      color: white;
      transform: translateX(5px);
    }

    svg {
      font-size: 1.2rem;
      color: var(--color-primary-light);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  a {
    color: #cbd5e1;
    font-size: 1.5rem;
    transition: all 0.2s ease;

    &:hover {
      color: var(--color-primary-light);
      transform: translateY(-3px);
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/support">Support Us</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>Our Services</h3>
          <FooterLink to="/services#updates">Daily Updates</FooterLink>
          <FooterLink to="/services#grant-support">Grant Support</FooterLink>
          <FooterLink to="/services#scholarships">Scholarships</FooterLink>
          <FooterLink to="/services#networking">Networking</FooterLink>
          <FooterLink to="/services#workshops">Workshops</FooterLink>
          <FooterLink to="/services#mentorship">Mentorship</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            <a href="https://wa.me/256788886782" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
              WhatsApp: +256 788 886 782
            </a>
            <a href="tel:+256788886782">
              <FaPhone />
              +256 788 886 782
            </a>
            <a href="mailto:info@globalgrantshub.org">
              <FaEnvelope />
              info@globalgrantshub.org
            </a>
          </ContactInfo>
          <SocialLinks>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {currentYear} Global Grants Hub. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
