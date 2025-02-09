import styled from 'styled-components';
import TeamMember from './TeamMember';
import { TeamMember as TeamMemberType } from '../../types/team';
import logo from "../../assets/logo.png";

const Section = styled.section`
  padding: 4rem 2rem;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 3rem;
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  justify-items: center;
  margin-top: 2rem;
`;

// Sample team data - replace with actual team data
const teamMembers: TeamMemberType[] = [
  {
    id: 1,
    name: "Chief",
    role: "Founder & CEO",
    bio: "Empowering organizations and driving positive change in communities worldwide.",
    image: logo,
    contacts: {
      email: "chief@globalgrantshub.org",
      phone: "+256788886782",
      whatsapp: "256788886782"
    },
    socials: {
      linkedin: "https://linkedin.com/in/ujeanpierre45",
      twitter: "https://twitter.com/chief"
    }
  },
  {
    id: 2,
    name: "XXX",
    role: "CTO",
    bio: "Lorem ipsum gutir ipsum ipsum hakhum.",
    image: logo,
    contacts: {
      email: "chief@globalgrantshub.org",
      phone: "+256788886782",
      whatsapp: "256788886782"
    },
    socials: {
      linkedin: "https://linkedin.com/in/ujeanpierre45",
      twitter: "https://twitter.com/xxxx"
    }
  },
  // Add more team members here
];

const Team = () => {
  return (
    <Section>
      <Container>
        <Title>Our Team</Title>
        <TeamGrid>
          {teamMembers.map(member => (
            <TeamMember key={member.id} member={member} />
          ))}
        </TeamGrid>
      </Container>
    </Section>
  );
};

export default Team;
