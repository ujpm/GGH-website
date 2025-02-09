import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Section = styled.section`
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  padding: 8rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    z-index: -1;
  }

  &::before {
    top: -10rem;
    left: -10rem;
  }

  &::after {
    bottom: -10rem;
    right: -10rem;
  }

  // Add this to ensure content remains clear
  > * {
    position: relative;
    z-index: 2;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  background: transparent;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  color: var(--color-primary);
  margin-bottom: 3rem;
  font-size: 1.25rem;
  line-height: 1.6;
  font-weight: 500;
`;

const StyledButton = styled(Button)`
  min-width: 220px;
  background: var(--color-secondary);
  color: var(--color-primary);
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  transform-origin: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    background: var(--color-primary);
    color: var(--color-secondary);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  color: var(--color-primary);
  position: relative;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: var(--color-secondary);
    border-radius: 2px;
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.5px;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: var(--color-primary);
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  font-weight: 500;
  opacity: 0.9;
`;

const CallToAction = () => {
  return (
    <Section>
      <Content>
        <Title>Ready to Make an Impact?</Title>
        <Description>
          Join our growing community of changemakers and access the resources you need to transform your vision into reality.
          Start your journey with Global Grants Hub today.
        </Description>
        <Link to="/contact">
          <StyledButton variant="primary" size="large">
            Get Started Today <FaArrowRight />
          </StyledButton>
        </Link>
        <Stats>
          <StatItem>
            <StatNumber>500+</StatNumber>
            <StatLabel>Active Members</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>$2M+</StatNumber>
            <StatLabel>Grants Secured</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>50+</StatNumber>
            <StatLabel>Success Stories</StatLabel>
          </StatItem>
        </Stats>
      </Content>
    </Section>
  );
};

export default CallToAction;
