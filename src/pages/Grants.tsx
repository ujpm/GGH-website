import { FundingProvider } from '../context/FundingContext';
import FundingCallsList from '../components/grants/FundingCallsList';
import styled from 'styled-components';
import { FundingType } from '../types/grants';

const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--background);
`;

const HeroSection = styled.section`
  background: var(--gradient-primary);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background: var(--background);
    clip-path: polygon(0 0, 100% 50%, 100% 100%, 0% 100%);
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  opacity: 0.9;
  position: relative;
  z-index: 1;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

interface GrantsProps {
  type?: FundingType;
}

const getTitleByType = (type?: FundingType) => {
  switch (type) {
    case 'grant':
      return 'Discover Impactful Grants';
    case 'scholarship':
      return 'Find Your Perfect Scholarship';
    case 'resource':
      return 'Access Valuable Resources';
    default:
      return 'Explore Funding Opportunities';
  }
};

const getSubtitleByType = (type?: FundingType) => {
  switch (type) {
    case 'grant':
      return 'Transform your ideas into reality with our curated selection of grants designed to support innovative projects and community initiatives.';
    case 'scholarship':
      return 'Invest in your future with scholarships that match your academic goals and aspirations. Find opportunities that align with your unique journey.';
    case 'resource':
      return 'Unlock your potential with our comprehensive collection of resources, guides, and tools designed to help you succeed in your funding journey.';
    default:
      return 'Discover grants, scholarships, and resources tailored to your needs. Let us help you find the perfect funding opportunity.';
  }
};

export default function Grants({ type }: GrantsProps) {
  return (
    <FundingProvider>
      <PageContainer>
        <HeroSection>
          <Title>{getTitleByType(type)}</Title>
          <Subtitle>{getSubtitleByType(type)}</Subtitle>
          <StatsContainer>
            <StatItem>
              <StatNumber>150+</StatNumber>
              <StatLabel>Active {type || 'Opportunities'}</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>$25M+</StatNumber>
              <StatLabel>Total Funding</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>5000+</StatNumber>
              <StatLabel>Success Stories</StatLabel>
            </StatItem>
          </StatsContainer>
        </HeroSection>

        <ContentSection>
          <FundingCallsList type={type} />
        </ContentSection>
      </PageContainer>
    </FundingProvider>
  );
}
