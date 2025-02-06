import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  background: var(--gradient-primary);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledButton = styled(Button)`
  min-width: 200px;
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <Title>Empowering Visionaries, Transforming Communities</Title>
        <Subtitle>
          Access valuable funding opportunities and resources to drive positive change
          and create lasting impact in communities worldwide.
        </Subtitle>
        <ButtonGroup>
          <Link to="/services">
            <StyledButton variant="primary" size="large">
              Explore Opportunities
            </StyledButton>
          </Link>
          <Link to="/about">
            <StyledButton variant="outline" size="large">
              Learn More
            </StyledButton>
          </Link>
        </ButtonGroup>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
