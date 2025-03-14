import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useGrants } from '../hooks/useGrants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Grant, PartnerBenefit } from '../types/grant';
import Testimonials from '../components/home/Testimonials';

// Import assets
import heroImage from '../assets/images/use-in-hero.png';
import globeGif from '../assets/images/rotating-globe-connected-gif.gif';
import wavePattern from '../assets/images/patterns/wave.svg';
import howItWorksImage from '../assets/images/how-it-works.png';
import partnershipImage from '../assets/images/partnership.png';

// Import service icons
import grantSupportIcon from '../assets/icons/grant-support.svg';
import mentorshipIcon from '../assets/icons/mentorship.svg';
import networkingIcon from '../assets/icons/networking.svg';
import workshopsIcon from '../assets/icons/workshops.svg';
import dailyUpdatesIcon from '../assets/icons/daily-updates.svg';

const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--background);
`;

const Section = styled.section`
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled(Section)`
  background: var(--gradient-primary);
  color: white;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background: var(--background);
    clip-path: polygon(0 0, 100% 50%, 100% 100%, 0% 100%);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ServiceIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--secondary);
`;

const CardText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const OpportunityCard = styled(Card)`
  border-left: 4px solid var(--primary);
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
`;

const BenefitIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--secondary);
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--primary);
    border-radius: 2px;
  }
`;

const SubTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 2rem;
`;

const HeroGrid = styled(Grid)`
  align-items: center;
  margin-bottom: 2rem;
`;

const HeroImageContainer = styled.div`
  position: relative;
  
  img.hero-main {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  img.globe {
    position: absolute;
    bottom: -2rem;
    right: -2rem;
    width: 120px;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;

const WavePattern = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

const services = [
  { icon: grantSupportIcon, title: 'Grant Support', description: 'Expert guidance through the grant application process' },
  { icon: mentorshipIcon, title: 'Mentorship', description: 'One-on-one mentoring from experienced professionals' },
  { icon: networkingIcon, title: 'Networking', description: 'Connect with other grant seekers and funders' },
  { icon: workshopsIcon, title: 'Workshops', description: 'Regular training sessions on grant writing' },
  { icon: dailyUpdatesIcon, title: 'Daily Updates', description: 'Latest grant opportunities delivered to you' }
];

const howItWorksSteps = [
  { number: 1, title: 'Visit Our Website', description: 'Start your journey by exploring our platform' },
  { number: 2, title: 'Search for Opportunities', description: 'Browse through our curated list of grants and scholarships' },
  { number: 3, title: 'Get Expert Support', description: 'Access our team of grant writing experts' },
  { number: 4, title: 'Submit Your Application', description: 'Apply with confidence using our resources' },
  { number: 5, title: 'Track Your Progress', description: 'Monitor your application status and receive updates' }
];

const partnerBenefits: PartnerBenefit[] = [
  { icon: '✅', title: 'Grant Funding Opportunities', description: 'Regular updates on relevant funding opportunities' },
  { icon: '✅', title: 'Scholarship Opportunities', description: 'Access to scholarships for organizational members' },
  { icon: '✅', title: 'Grant Application Writing Support', description: 'Assistance in crafting competitive proposals' },
  { icon: '✅', title: 'Capacity Building & Staff Training', description: 'Workshops and training for organizational growth' },
  { icon: '✅', title: 'Project Management Support', description: 'Guidance in implementing and managing funded projects' },
  { icon: '✅', title: 'Resource Mobilization Strategies', description: 'Helping you attract funding and sustainability models' },
  { icon: '✅', title: 'Community Development Collaboration', description: 'Joint initiatives for greater impact' }
];

const partnerExpectations = [
  { icon: '🔹', text: 'Priority Access to funding opportunities, training sessions, and mentorship' },
  { icon: '🔹', text: 'Collaboration on Joint Grant Applications for large-scale funding' },
  { icon: '🔹', text: 'Networking & Exposure to donors, funders, and development partners' },
  { icon: '🔹', text: 'Structured Engagement through an MOU defining roles and benefits' }
];

const Home: React.FC = () => {
  const { grantStats, featuredGrants, featuredScholarships } = useGrants();
  const { ref: scrollRef, animation: scrollAnimation } = useScrollAnimation();

  return (
    <PageContainer>
      <HeroSection>
        <Container>
          <HeroGrid>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Title>Unlock Global Grant Opportunities</Title>
              <Subtitle>Your gateway to worldwide funding possibilities</Subtitle>
              <StatsGrid>
                {grantStats.map((stat, index) => (
                  <StatCard
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <StatValue>{stat.value}</StatValue>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatCard>
                ))}
              </StatsGrid>
            </motion.div>
            <HeroImageContainer>
              <img src={heroImage} alt="Grant opportunities" className="hero-main" />
              <img src={globeGif} alt="Global reach" className="globe" />
            </HeroImageContainer>
          </HeroGrid>
        </Container>
        <WavePattern src={wavePattern} alt="" />
      </HeroSection>

      <Section ref={scrollRef}>
        <Container>
          <motion.div variants={scrollAnimation}>
            <SectionTitle>Our Services</SectionTitle>
            <Grid>
              {services.map((service, index) => (
                <Card
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <ServiceIcon src={service.icon} alt={service.title} />
                  <CardTitle>{service.title}</CardTitle>
                  <CardText>{service.description}</CardText>
                </Card>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Section>

      <Section style={{ background: 'var(--background-alt)' }}>
        <Container>
          <SectionTitle>Featured Opportunities</SectionTitle>
          <Grid>
            <div>
              <SubTitle>Grants</SubTitle>
              {featuredGrants.map((grant: Grant) => (
                <OpportunityCard
                  key={grant.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CardTitle>{grant.title}</CardTitle>
                  <CardText>{grant.organization}</CardText>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <span>Amount: {grant.amount}</span>
                    <span style={{ color: 'var(--primary)' }}>Deadline: {grant.deadline}</span>
                  </div>
                </OpportunityCard>
              ))}
            </div>
            <div>
              <SubTitle>Scholarships</SubTitle>
              {featuredScholarships.map((scholarship) => (
                <OpportunityCard
                  key={scholarship.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CardTitle>{scholarship.title}</CardTitle>
                  <CardText>{scholarship.organization}</CardText>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <span>Amount: {scholarship.amount}</span>
                    <span style={{ color: 'var(--primary)' }}>Deadline: {scholarship.deadline}</span>
                  </div>
                </OpportunityCard>
              ))}
            </div>
          </Grid>
        </Container>
      </Section>

      <Section style={{ background: 'var(--background-alt)' }}>
        <Container>
          <Testimonials />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle>How GGH Works</SectionTitle>
          <Grid>
            <div>
              {howItWorksSteps.map((step) => (
                <motion.div
                  key={step.number}
                  style={{ display: 'flex', marginBottom: '2rem' }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <StepNumber>{step.number}</StepNumber>
                  <div>
                    <CardTitle>{step.title}</CardTitle>
                    <CardText>{step.description}</CardText>
                  </div>
                </motion.div>
              ))}
            </div>
            <div>
              <img src={howItWorksImage} alt="How GGH Works" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }} />
            </div>
          </Grid>
        </Container>
      </Section>

      <Section style={{ background: 'var(--background-alt)' }}>
        <Container>
          <SectionTitle>Partner with Us</SectionTitle>
          <Grid>
            <div>
              <SubTitle>What Does It Mean to Partner with Global Grants Hub?</SubTitle>
              {partnerBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  style={{ display: 'flex', marginBottom: '1.5rem' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <BenefitIcon>{benefit.icon}</BenefitIcon>
                  <div>
                    <CardTitle>{benefit.title}</CardTitle>
                    <CardText>{benefit.description}</CardText>
                  </div>
                </motion.div>
              ))}
              <SubTitle style={{ marginTop: '3rem' }}>What to Expect as a Partner?</SubTitle>
              {partnerExpectations.map((expectation, index) => (
                <motion.div
                  key={index}
                  style={{ display: 'flex', marginBottom: '1rem' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span style={{ marginRight: '1rem' }}>{expectation.icon}</span>
                  <CardText>{expectation.text}</CardText>
                </motion.div>
              ))}
            </div>
            <div>
              <img src={partnershipImage} alt="Partnership" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }} />
            </div>
          </Grid>
        </Container>
      </Section>
    </PageContainer>
  );
};

export default Home;