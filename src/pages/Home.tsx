import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  GlobeAltIcon,
  LightBulbIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

// Styled Components
const Container = styled.div`
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: calc(100vh - 64px);
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('/images/hero-bg.jpg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 2rem;
`;

const HeroContent = styled(motion.div)`
  max-width: 1200px;
  text-align: center;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)<{ $primary?: boolean }>`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  ${({ $primary }) =>
    $primary
      ? `
    background-color: var(--color-primary);
    color: white;
    &:hover {
      transform: translateY(-2px);
      background-color: var(--color-primary-dark);
    }
  `
      : `
    background-color: transparent;
    color: white;
    border: 2px solid white;
    &:hover {
      transform: translateY(-2px);
      background-color: rgba(255, 255, 255, 0.1);
    }
  `}
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background-color: #f8fafc;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--color-primary);
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  color: var(--color-primary);
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
`;

const FeatureDescription = styled.p`
  color: #4b5563;
  line-height: 1.6;
`;

const StatsSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('/images/stats-bg.jpg') center/cover fixed;
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const StatCard = styled(motion.div)`
  padding: 1rem;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const CTASection = styled.section`
  padding: 6rem 2rem;
  background-color: white;
  text-align: center;
`;

const CTAContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container>
      <HeroSection>
        <HeroContent
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Title variants={itemVariants}>
            Empowering Dreams Through Global Opportunities
          </Title>
          <Subtitle variants={itemVariants}>
            Discover and access life-changing grants and scholarships worldwide.
            Your journey to academic and professional excellence starts here.
          </Subtitle>
          <ButtonGroup variants={itemVariants}>
            <Button to="/grants" $primary>
              <AcademicCapIcon width={20} />
              Explore Grants
            </Button>
            <Button to="/register">
              <UserGroupIcon width={20} />
              Join Our Community
            </Button>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Global Grants Hub?
        </SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsSection>

      <CTASection>
        <CTAContent
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Ready to Start Your Journey?</SectionTitle>
          <Subtitle style={{ color: '#4b5563' }}>
            Join thousands of students and researchers who have found their perfect
            funding opportunity through Global Grants Hub.
          </Subtitle>
          <ButtonGroup>
            <Button to="/register" $primary>
              Get Started Now
            </Button>
            <Button to="/about" style={{ color: 'var(--color-primary)', border: '2px solid var(--color-primary)' }}>
              Learn More
            </Button>
          </ButtonGroup>
        </CTAContent>
      </CTASection>
    </Container>
  );
};

const features = [
  {
    icon: <GlobeAltIcon />,
    title: 'Global Reach',
    description:
      'Access opportunities from prestigious institutions and organizations worldwide.',
  },
  {
    icon: <LightBulbIcon />,
    title: 'Smart Matching',
    description:
      'Our intelligent system matches you with grants and scholarships that fit your profile.',
  },
  {
    icon: <AcademicCapIcon />,
    title: 'Expert Guidance',
    description:
      'Get professional advice and resources to strengthen your applications.',
  },
  {
    icon: <UserGroupIcon />,
    title: 'Community Support',
    description:
      'Connect with fellow applicants and mentors in our thriving community.',
  },
];

const stats = [
  {
    number: '10K+',
    label: 'Active Opportunities',
  },
  {
    number: '50K+',
    label: 'Registered Users',
  },
  {
    number: '$100M+',
    label: 'Funding Secured',
  },
  {
    number: '95%',
    label: 'Success Rate',
  },
];

export default Home;
