import styled from 'styled-components';
import Container from '../common/Container';
import dailyUpdatesIcon from 'assets/icons/daily-updates.svg';
import grantSupportIcon from 'assets/icons/grant-support.svg';
import networkingIcon from 'assets/icons/networking.svg';
import workshopsIcon from 'assets/icons/workshops.svg';
import { Link } from 'react-router-dom';

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled(Link)`
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

    &::before {
      opacity: 0.05;
    }

    img {
      transform: scale(1.1);
    }
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

const services = [
  {
    icon: dailyUpdatesIcon,
    title: 'Daily Updates',
    description: 'Stay informed with the latest funding opportunities and resources.',
    link: '/services#updates'
  },
  {
    icon: grantSupportIcon,
    title: 'Grant Support',
    description: 'Expert guidance in grant writing and proposal development.',
    link: '/services#support'
  },
  {
    icon: networkingIcon,
    title: 'Networking',
    description: 'Connect with professionals and organizations worldwide.',
    link: '/services#network'
  },
  {
    icon: workshopsIcon,
    title: 'Workshops',
    description: 'Enhance your skills through training and capacity building.',
    link: '/services#workshops'
  }
];

const ServicesOverview = () => {
  return (
    <Section>
      <Container>
        <SectionTitle>Our Services</SectionTitle>
        <SectionSubtitle>
          Comprehensive support to help you secure funding and implement successful projects
        </SectionSubtitle>
        <Grid>
          {services.map((service, index) => (
            <ServiceCard key={index} to={service.link}>
              <IconWrapper>
                <img src={service.icon} alt={service.title} />
              </IconWrapper>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default ServicesOverview;
