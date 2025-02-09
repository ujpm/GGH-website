import styled from 'styled-components';
import Container from '../common/Container';
import dailyUpdatesIcon from 'assets/icons/daily-updates.svg';
import grantSupportIcon from 'assets/icons/grant-support.svg';
import networkingIcon from 'assets/icons/networking.svg';
import workshopsIcon from 'assets/icons/workshops.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Section = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  }
`;

const ServicesContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 3rem auto 0;
  overflow: hidden;
`;

const ServiceSlider = styled.div<{ transform: string }>`
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease;
  transform: ${props => props.transform};
  padding: 1rem;
`;

const ServiceCard = styled(Link)`
  flex: 0 0 calc(33.333% - 1.33rem);
  text-decoration: none;
  color: inherit;
  opacity: 0.7;
  transform: scale(0.95);
  transition: all 0.3s ease;
  
  &.active {
    opacity: 1;
    transform: scale(1);
  }

  @media (max-width: 968px) {
    flex: 0 0 calc(100% - 2rem);
  }
`;

const CardInner = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  height: 100%;
  transition: transform 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    border-radius: 15px 15px 0 0;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }
`;

const ServiceTitle = styled.h3`
  color: var(--color-primary);
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  font-size: 1.5rem;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  position: relative;
  z-index: 2;
  font-size: 0.95rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: var(--color-secondary);
    margin: 1rem auto;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 1rem;
  cursor: pointer;
  z-index: 1;

  ${props => props.direction === 'left' ? 'left: 0;' : 'right: 0;'}
`;

const services = [
  {
    id: 1,
    icon: dailyUpdatesIcon,
    title: 'Daily Updates',
    description: 'Stay informed with the latest funding opportunities and resources.',
    link: '/services#updates'
  },
  {
    id: 2,
    icon: grantSupportIcon,
    title: 'Grant Support',
    description: 'Expert guidance in grant writing and proposal development.',
    link: '/services#support'
  },
  {
    id: 3,
    icon: networkingIcon,
    title: 'Networking',
    description: 'Connect with professionals and organizations worldwide.',
    link: '/services#network'
  },
  {
    id: 4,
    icon: workshopsIcon,
    title: 'Workshops',
    description: 'Enhance your skills through training and capacity building.',
    link: '/services#workshops'
  }
];

const ServicesOverview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay && !isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, isHovered]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => 
      prev === 0 ? services.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => 
      (prev + 1) % services.length
    );
  };

  const getTransform = () => {
    const baseTransform = -currentIndex * (33.333 + 2);
    return `translateX(${baseTransform}%)`;
  };

  return (
    <Section>
      <Container>
        <SectionTitle>Our Services</SectionTitle>
        <SectionSubtitle>
          Comprehensive support to help you secure funding and implement successful projects
        </SectionSubtitle>
        <ServicesContainer
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ServiceSlider transform={getTransform()}>
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id}
                to={service.link}
                className={index === currentIndex ? 'active' : ''}
              >
                <CardInner>
                  <IconWrapper>
                    <img src={service.icon} alt={service.title} />
                  </IconWrapper>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </CardInner>
              </ServiceCard>
            ))}
          </ServiceSlider>
          <NavigationButton direction="left" onClick={handlePrev}>
            <FaChevronLeft />
          </NavigationButton>
          <NavigationButton direction="right" onClick={handleNext}>
            <FaChevronRight />
          </NavigationButton>
        </ServicesContainer>
      </Container>
    </Section>
  );
};

export default ServicesOverview;
