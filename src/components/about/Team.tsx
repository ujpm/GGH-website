import styled from 'styled-components';
import TeamMember from './TeamMember';
import { TeamMember as TeamMemberType } from '../../types/team';

const Section = styled.section`
  padding: 4rem 2rem;
  background: #f9f9f9;
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
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
`;

// Sample team data - replace with actual team data
const teamMembers: TeamMemberType[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Founder & CEO",
    bio: "Passionate about empowering organizations and driving positive change in communities worldwide.",
    image: "/team/john-doe.jpg", // Add actual image path
    contacts: {
      email: "john@globalgrantshub.org",
      phone: "+256788886782",
      whatsapp: "256788886782"
    },
    socials: {
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe"
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
