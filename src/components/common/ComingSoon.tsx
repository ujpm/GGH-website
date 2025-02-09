import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaRocket, FaArrowLeft } from 'react-icons/fa';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const RocketIcon = styled(FaRocket)`
  font-size: 4rem;
  color: var(--color-primary);
  margin-bottom: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--color-primary);
  color: red;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    background: var(--color-secondary);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const PagePath = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: rgba(var(--color-primary-rgb), 0.1);
  border-radius: 20px;
  color: var(--color-primary);
  font-family: monospace;
  font-size: 0.9rem;
`;

const Dots = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
  justify-content: center;
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: ${pulse} 1s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const ComingSoon = () => {
  const location = useLocation();
  const [countdown, setCountdown] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) return 100;
        return prev - 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <PagePath>{location.pathname}</PagePath>
      <Content>
        <RocketIcon />
        <Title>Coming Soon!</Title>
        <Subtitle>
          We're working hard to bring you something amazing. 
          This page will be ready in approximately {countdown} light-years! 🚀
        </Subtitle>
        <BackLink to="/">
          <FaArrowLeft /> Back to Home
        </BackLink>
        <Dots>
          <Dot delay={0} />
          <Dot delay={0.2} />
          <Dot delay={0.4} />
        </Dots>
      </Content>
    </Container>
  );
};

export default ComingSoon;
