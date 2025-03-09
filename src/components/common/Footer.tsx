import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #333;
  color: #666;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterLink to="/about">Our Story</FooterLink>
          <FooterLink to="/team">Our Team</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/grants">Grants</FooterLink>
          <FooterLink to="/scholarships">Scholarships</FooterLink>
          <FooterLink to="/resources">E-books & Tutorials</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Support</FooterTitle>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/support">Get Help</FooterLink>
          <FooterLink to="/donate">Support Our Work</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Connect With Us</FooterTitle>
          <p>Follow us on social media for updates and opportunities.</p>
          <SocialLinks>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; {currentYear} Global Grants Hub. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
