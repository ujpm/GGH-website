import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import heroImage from 'assets/use-in-hero.png';

const HeroSection = styled.section`
  position: relative;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7));
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
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
              Explore Grants
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
