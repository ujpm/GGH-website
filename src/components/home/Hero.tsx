import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import heroImage from 'assets/use-in-hero.png';
import logoTransparent from 'assets/logo_transparent.png';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = styled.section`
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  color: white;
  padding: 2rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 100%);
    z-index: 1;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: scale(1.1);
  filter: blur(3px);
`;

const HeroContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const TextContent = styled.div``;

const LogoContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 0 20px rgba(255,255,255,0.2));
  }

  @media (max-width: 968px) {
    max-width: 300px;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const StyledButton = styled(Button)`
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ScrollDot = styled.div`
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: scrollDot 2s infinite;

  @keyframes scrollDot {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(20px);
      opacity: 0;
    }
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <BackgroundImage />
      <HeroContent>
        <TextContent>
          <Title>Empowering Visionaries, Transforming Communities</Title>
          <Subtitle>
            Connect with valuable funding opportunities and resources to drive positive change.
            Join our community of changemakers creating lasting impact worldwide.
          </Subtitle>
          <ButtonGroup>
            <Link to="/services">
              <StyledButton variant="primary" size="large">
                Explore Grants <FaArrowRight />
              </StyledButton>
            </Link>
            <Link to="/about">
              <StyledButton variant="outline" size="large">
                Learn More
              </StyledButton>
            </Link>
          </ButtonGroup>
        </TextContent>
        <LogoContainer>
          <img src={logoTransparent} alt="GGH Logo" />
        </LogoContainer>
      </HeroContent>
      <ScrollIndicator>
        <ScrollText>Scroll Down</ScrollText>
        <ScrollDot />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
