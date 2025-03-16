import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useGrants } from '../hooks/useGrants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Grant, PartnerBenefit } from '../types/grant';
import Testimonials from '../components/home/Testimonials';

// Import assets
import heroImage from '../assets/images/use-in-hero.png';
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
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url(${heroImage}) no-repeat center center;
  background-size: cover;
  color: white;
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  padding: 0;
  margin-top: var(--header-height);

  @media (max-width: 768px) {
    min-height: calc(100vh - var(--header-height));
    padding: 2rem 0;
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  padding: 2rem;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroLogo = styled.div`
  order: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 400px;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
  }

  @media (max-width: 1024px) {
    img {
      max-width: 350px;
    }
  }

  @media (max-width: 768px) {
    order: 1;
    margin-bottom: 1rem;
    img {
      max-width: 280px;
    }
  }

  @media (max-width: 480px) {
    img {
      max-width: 220px;
    }
  }
`;

const HeroText = styled.div`
  order: 1;
  max-width: 600px;

  @media (max-width: 768px) {
    order: 2;
    margin: 0 auto;
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
`;

const PrimaryButton = styled(Button)`
  background: var(--color-primary);
  color: white;
  border: 2px solid var(--color-primary);

  &:hover {
    background: var(--color-primary-light);
    border-color: var(--color-primary-light);
    transform: translateY(-2px);
    text-decoration: none;
    color: white;
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: white;
  border: 2px solid white;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    text-decoration: none;
    color: white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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
  const { featuredGrants, featuredScholarships } = useGrants();
  const { ref: scrollRef, animation: scrollAnimation } = useScrollAnimation();

  return (
    <PageContainer>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <HeroText>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Title>Unlock Global Grant Opportunities</Title>
                <Subtitle>Your gateway to worldwide funding possibilities</Subtitle>
                <HeroButtons>
                  <PrimaryButton href="/register">Get Started</PrimaryButton>
                  <SecondaryButton href="/about">Learn More</SecondaryButton>
                </HeroButtons>
              </motion.div>
            </HeroText>
            <HeroLogo>
              <motion.img
                src={heroImage}
                alt="Grant opportunities"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              />
            </HeroLogo>
          </HeroContent>
        </HeroContainer>
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