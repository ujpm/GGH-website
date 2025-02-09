import styled from 'styled-components';
import Team from '../components/about/Team';

const PageContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: var(--color-primary);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.9;
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Mission = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: var(--color-primary);
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const StorySection = styled.div`
  margin: 4rem 0;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 20px;
  
  p {
    line-height: 1.8;
    color: #4a4a4a;
    margin-bottom: 1.5rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const About = () => {
  return (
    <PageContainer>
      <HeroSection>
        <Title>About Global Grants Hub</Title>
        <Subtitle>
          Empowering civil society organizations, NGOs, entrepreneurs, and students
          to create lasting impact in communities worldwide.
        </Subtitle>
      </HeroSection>

      <ContentSection>
        <Mission>
          <SectionTitle>Our Mission</SectionTitle>
          <p>
            To empower civil society organizations, non-governmental organizations,
            entrepreneurs, and students by facilitating valuable funding opportunities
            and resources, driving positive change and creating lasting impact.
          </p>
        </Mission>

        <StorySection>
          <SectionTitle>Our Story</SectionTitle>
          <p>
            Global Grants Hub was born from a simple yet powerful observation: countless
            passionate organizations and individuals with transformative ideas were
            struggling to access the funding they needed to make a difference in their
            communities.
          </p>
          <p>
            In early 2023, a group of dedicated professionals who had spent years working
            in the development sector came together with a shared vision. They had
            witnessed firsthand the challenges that CSOs, NGOs, and entrepreneurs faced
            in securing grants and resources. They understood that the problem wasn't
            a lack of funding opportunities, but rather the barriers to accessing them:
            limited information, complex application processes, and insufficient support.
          </p>
          <p>
            What started as a small initiative to share grant opportunities quickly
            evolved into something much bigger. The team realized that organizations
            needed more than just information – they needed comprehensive support,
            guidance, and a community of like-minded individuals who could share
            experiences and resources.
          </p>
          <p>
            Today, Global Grants Hub has grown into a vibrant platform that connects
            organizations with funding opportunities, provides expert guidance in grant
            writing, and facilitates knowledge sharing among our community members.
            We've helped numerous organizations secure funding for their projects,
            conducted workshops and training sessions, and built a network of
            professionals dedicated to creating positive change.
          </p>
          <p>
            Our journey continues as we expand our services and reach, always guided
            by our core mission: to empower those who are working to make the world
            a better place. We believe that by providing the right resources and
            support, we can help turn powerful ideas into reality and create lasting
            impact in communities worldwide.
          </p>
        </StorySection>

        <SectionTitle>What We Do</SectionTitle>
        <ServicesGrid>
          <ServiceCard>
            <h3>Daily Updates</h3>
            <p>
              Stay informed with the latest funding opportunities, donor calls, and
              relevant resources to keep you ahead in your funding journey.
            </p>
          </ServiceCard>

          <ServiceCard>
            <h3>Grant Application Support</h3>
            <p>
              We offer expertise in grant writing, proposal drafting, and strategic
              planning, ensuring you have the best chance of securing funding.
            </p>
          </ServiceCard>

          <ServiceCard>
            <h3>Networking</h3>
            <p>
              Connect with a diverse network of professionals and organizations,
              fostering collaboration and sharing of resources.
            </p>
          </ServiceCard>

          <ServiceCard>
            <h3>Workshops and Training</h3>
            <p>
              Enhance your skills and knowledge through regular workshops and
              training sessions designed to build capacity.
            </p>
          </ServiceCard>
        </ServicesGrid>
      </ContentSection>

      <Team />
    </PageContainer>
  );
};

export default About;
