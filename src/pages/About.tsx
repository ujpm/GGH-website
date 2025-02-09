import styled from 'styled-components';
import Team from '../components/about/Team';
import logoTransparent from 'assets/logo_transparent.png';
import helpingOrgs from 'assets/helping-organizations.jpeg';
import gghMeeting from 'assets/GGH-meeting.png';
import growing from 'assets/growing.jpg';

const PageContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  position: relative;
  background: var(--color-primary);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroText = styled.div`
  flex: 1;
`;

const LogoContainer = styled.div`
  flex: 1;
  max-width: 300px;
  margin: 0 auto;

  img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Mission = styled.div`
  margin: 4rem 0;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  }
`;

const SectionTitle = styled.h2`
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
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

const StorySection = styled.div`
  margin: 4rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  align-items: center;
`;

const StoryContent = styled.div`
  p {
    line-height: 1.8;
    color: #4a4a4a;
    margin-bottom: 1.5rem;
  }
`;

const StoryImage = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
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
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
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
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }

  &:hover {
    transform: translateY(-5px);

    &::before {
      transform: scaleX(1);
    }
  }

  h3 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const About = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <Title>About Global Grants Hub</Title>
            <Subtitle>
              Empowering civil society organizations, NGOs, entrepreneurs, and students
              to create lasting impact in communities worldwide.
            </Subtitle>
          </HeroText>
          <LogoContainer>
            <img src={logoTransparent} alt="GGH Logo" />
          </LogoContainer>
        </HeroContent>
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

        <SectionTitle>Our Story</SectionTitle>
        <StorySection>
          <StoryContent>
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
              in securing grants and resources.
            </p>
          </StoryContent>
          <StoryImage>
            <img src={helpingOrgs} alt="Helping Organizations" />
          </StoryImage>
        </StorySection>

        <StorySection>
          <StoryImage>
            <img src={gghMeeting} alt="GGH Meeting" />
          </StoryImage>
          <StoryContent>
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
            </p>
          </StoryContent>
        </StorySection>

        <StorySection>
          <StoryContent>
            <p>
              Our journey continues as we expand our services and reach, always guided
              by our core mission: to empower those who are working to make the world
              a better place. We believe that by providing the right resources and
              support, we can help turn powerful ideas into reality and create lasting
              impact in communities worldwide.
            </p>
          </StoryContent>
          <StoryImage>
            <img src={growing} alt="Growing Together" />
          </StoryImage>
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
