import styled from 'styled-components';
import Container from '../common/Container';
import dailyUpdatesIcon from 'assets/icons/daily-updates.svg';
import grantSupportIcon from 'assets/icons/grant-support.svg';
import networkingIcon from 'assets/icons/networking.svg';
import workshopsIcon from 'assets/icons/workshops.svg';
import mentorshipIcon from 'assets/icons/mentorship.svg';

const Section = styled.section`
  padding: 5rem 0;
  background-color: var(--background);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
  
  img {
    width: 100%;
    height: 100%;
  }
`;

const ServiceTitle = styled.h3`
  color: var(--secondary);
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: var(--secondary);
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const services = [
  {
    icon: dailyUpdatesIcon,
    title: 'Daily Updates',
    description: 'Stay informed with the latest funding opportunities and resources to keep you ahead.'
  },
  {
    icon: grantSupportIcon,
    title: 'Grant Support',
    description: 'Get expert guidance in grant writing and proposal development to secure funding.'
  },
  {
    icon: networkingIcon,
    title: 'Networking',
    description: 'Connect with professionals and organizations to share resources and collaborate.'
  },
  {
    icon: workshopsIcon,
    title: 'Workshops',
    description: 'Enhance your skills through regular workshops and training sessions designed to build capacity.'
  },
  {
    icon: mentorshipIcon,
    title: 'Mentorship',
    description: 'Receive guidance from experienced leaders to navigate challenges and achieve success in your projects.'
  }
];

const ServicesOverview = () => {
  return (
    <Section>
      <Container>
        <SectionTitle>GGH-What We Do?</SectionTitle>
        <SectionSubtitle>
          We provide comprehensive support to help you secure funding and implement successful projects.
        </SectionSubtitle>
        <Grid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
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
