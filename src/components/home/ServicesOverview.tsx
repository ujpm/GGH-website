import styled from 'styled-components';
import Container from '../common/Container';

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
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const services = [
  {
    icon: '/src/assets/icons/daily-updates.svg',
    title: 'Daily Updates',
    description: 'Stay informed with the latest funding opportunities and donor calls to keep you ahead in your funding journey.'
  },
  {
    icon: '/src/assets/icons/grant-support.svg',
    title: 'Grant Support',
    description: 'Access expertise in grant writing, proposal drafting, and strategic planning to increase your funding success.'
  },
  {
    icon: '/src/assets/icons/networking.svg',
    title: 'Networking',
    description: 'Connect with professionals and organizations, fostering collaboration and sharing of resources.'
  },
  {
    icon: '/src/assets/icons/workshops.svg',
    title: 'Workshops & Training',
    description: 'Enhance your skills through regular workshops and training sessions designed to build capacity.'
  },
  {
    icon: '/src/assets/icons/mentorship.svg',
    title: 'Mentorship',
    description: 'Receive guidance from experienced leaders to navigate challenges and achieve success in your projects.'
  }
];

const ServicesOverview = () => {
  return (
    <Section>
      <Container>
        <SectionTitle>What We Do</SectionTitle>
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
