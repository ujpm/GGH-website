import styled from 'styled-components';
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa';

const CreditContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
  transform: translateY(70%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    bottom: 0.5rem;
    right: 0.5rem;
  }
`;

const CreditButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: white;
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
  border-radius: 20px;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    border-color: var(--color-primary);
    text-decoration: none;
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem 0.8rem;
  }
`;

const CodeIcon = styled(FaCode)`
  font-size: 1rem;
  color: var(--color-secondary);
`;

const LinkIcon = styled(FaExternalLinkAlt)`
  font-size: 0.8rem;
  opacity: 0.7;
`;

const DeveloperCredit = () => {
  return (
    <CreditContainer>
      <CreditButton 
        href="https://portifolio-cgu.pages.dev" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Developer's Portfolio"
      >
        <CodeIcon />
        Developer: JP
        <LinkIcon />
      </CreditButton>
    </CreditContainer>
  );
};

export default DeveloperCredit;
