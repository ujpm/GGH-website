import styled from 'styled-components';
import Team from '../components/about/Team';
import logoTransparent from 'assets/logo_transparent.png';
import helpingOrgs from 'assets/helping-organizations.jpeg';
import gghMeeting from 'assets/GGH-meeting.png';
import growing from 'assets/growing.jpg';

// Add interface for components with reverse prop
interface ReverseProps {
  $reverse?: boolean;
}

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
  margin: 6rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    margin: 4rem 0;
    gap: 3rem;
  }
`;

const StoryContent = styled.div<ReverseProps>`
  p {
    line-height: 1.8;
    color: #4a4a4a;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    order: ${props => props.$reverse ? 2 : 1};
  }
`;

const StoryImage = styled.div<ReverseProps>`
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

  @media (max-width: 768px) {
    order: ${props => props.$reverse ? 1 : 2};
    margin: 2rem 0;
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
              The Global Grants Hub was founded in 2023 by Richardson Kyeyune, a visionary leader with 
              a deep passion for empowering communities and driving sustainable development. 
              Richardson's journey began in 2002 with World Vision Uganda in Rakai District, during his 
              extensive work with various non-governmental organizations (NGOs) and civil society 
              organizations (CSOs).
            </p>
            <p>
              Having become an orphan at the age of 9 months, Richardson personally understood the need 
              on the ground to empower lives and create opportunities for those in need. His dedication to 
              making a difference in the world was ignited during his involvement in grassroots initiatives, 
              where he saw the transformative power of collaboration and innovation.
            </p>
          </StoryContent>
          <StoryImage>
            <img src={helpingOrgs} alt="Helping Organizations" />
          </StoryImage>
        </StorySection>

        <StorySection>
          <StoryImage $reverse>
            <img src={gghMeeting} alt="GGH Meeting" />
          </StoryImage>
          <StoryContent $reverse>
            <p>
              In March 2023, Richardson launched the Global Grants Hub with a clear mission: to 
              empower civil society organizations, NGOs, entrepreneurs, and students by facilitating 
              valuable funding opportunities and resources. His vision was to create a dynamic community 
              where like-minded individuals and organizations could come together, share knowledge, and 
              collaborate to drive positive change.
            </p>
            <p>
              Under Richardson's leadership, the Global Grants Hub has grown into a global network of 
              passionate and dedicated members, all working towards a common goal of transforming 
              communities and making a lasting impact. Through mentorship, training, and resource 
              sharing, the Hub has become a beacon of support and inspiration for organizations and 
              individuals striving to make a difference.
            </p>
          </StoryContent>
        </StorySection>

        <StorySection>
          <StoryContent>
            <p>
              Richardson's unwavering commitment to social impact and sustainable development 
              continues to guide the Global Grants Hub, ensuring that it remains a vital resource for those 
              seeking to create positive change in the world. His story is a testament to the power of vision, 
              perseverance, and the belief that by working together, we can achieve remarkable things.
            </p>
            <p>
              Through our platform, countless organizations have secured funding, implemented life-changing 
              projects, and created lasting impact in their communities. We continue to grow and expand 
              our services, always guided by our core mission of empowering those who are working to 
              make the world a better place.
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
