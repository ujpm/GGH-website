import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #1e293b;
  color: white;
  padding: 4rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const FooterLink = styled(Link)`
  color: #cbd5e1;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
  
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const ContactInfo = styled.div`
  color: #cbd5e1;
  margin-bottom: 0.5rem;
  
  a {
    color: #cbd5e1;
    text-decoration: none;
    
    &:hover {
      color: white;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #334155;
  color: #cbd5e1;
`;

const Footer = () => {
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
          <h3>Services</h3>
          <FooterLink to="/services#updates">Daily Updates</FooterLink>
          <FooterLink to="/services#grant-support">Grant Support</FooterLink>
          <FooterLink to="/services#scholarships">scholarships</FooterLink>
          <FooterLink to="/services#networking">Networking</FooterLink>
          <FooterLink to="/services#workshops">Workshops</FooterLink>
          <FooterLink to="/services#mentorship">Mentorship</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            <p>WhatsApp: <a href="https://wa.me/256788886782">+256 788 886 782</a></p>
            <p>Phone: +256 788 886 782</p>
            <p>Email: <a href="mailto:info@globalgrantshub.org">info@globalgrantshub.org</a></p>
          </ContactInfo>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {new Date().getFullYear()} Global Grants Hub. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
