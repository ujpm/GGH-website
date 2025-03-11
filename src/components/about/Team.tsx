import styled from 'styled-components';
import TeamMember from './TeamMember';
import { TeamMember as TeamMemberType } from '../../types/team';
import logo from "../../assets/logo.svg";

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
    name: "Pr. Richardson Kyeyune (Chief)",
    role: "Founder & CEO",
    bio: "A visionary leader with a deep passion for empowering communities and driving sustainable development. With a Master's in Business Administration and extensive experience in the nonprofit sector, Richardson has dedicated his career to connecting organizations with valuable funding opportunities. His journey from becoming an orphan at 9 months to founding the Global Grants Hub is a testament to the power of perseverance and dedication to positive change.",
    image: "CEO-richarlison.png",
    contacts: {
      email: "chief@globalgrantshub.org",
      phone: "+256788886782",
      whatsapp: "256788886782"
    },
    socials: {
      linkedin: "https://www.linkedin.com/in/richardson-kyeyune-5b708675/",
      twitter: "https://x.com/RichieKLouis",
      facebook: "https://www.facebook.com/richieKLouis"
    }
  },
  {
    id: 2,
    name: "Nomfundo Sifundza-Ngcamphalala",
    role: "Chief Operating Officer",
    bio: "passionate educator, social entrepreneur, and founder of Umliba Loyembili Edupreneurs, a non-profit organization dedicated to empowering communities through education, digital skills, and entrepreneurship. With experience teaching in rural areas and working remotely as a bookkeeper for a U.S.-based business, Nomfundo balances multiple roles as a mother, wife, and advocate for lifelong learning. Under her leadership, Umliba Loyembili Edupreneurs champions initiatives such as skills development workshops, youth discussions on social issues, and programs supporting female house helpers. She is also a proud champion of the Africa Educates Her campaign by the African Union International Centre for Girls and Women's Education in Africa, working to ensure girls' access to education and equal opportunities in Eswatini and beyond.",
    image: logo,
    contacts: {
      email: "chief@globalgrantshub.org",
      phone: "+256788886782",
      whatsapp: "256788886782"
    },
    socials: {
      linkedin: "www.linkedin.com/in/nomfundo-sifundza-a2789418b",
      facebook: "www.facebook.com/Fufuhcfundza"
    }
  },
  {
    id: 2,
    name: "Nantamu Winnie",
    role: "communication Officer",
    bio: "Nantamu Winnie is a dedicated Project Management professional with a strong passion for driving sustainable development initiatives. Currently serving as the Programs Manager at Cairo Youth Empowerment Initiative (CYEI), Winnie plays a pivotal role in designing, implementing, and overseeing programs aimed at empowering youth and fostering community growth. With a background in Project Management, Winnie has successfully led and contributed to various projects, ensuring effective planning, execution, and stakeholder engagement. She is committed to empowering communities and creating positive impacts through innovative and inclusive project solutions.",
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
  {
    id: 2,
    name: "RSU. Dr. Mubiru Moses Batanda, PhD",
    role: "Hon. Advisor",
    bio: "Dr. Moses Batanda Mubiru is a distinguished academic, researcher, and consultant specializing in Housing, Valuation, Land Management, and Real Estate. He holds a PhD in Housing and Human Settlement Studies, as well as an MSc in Real Estate and an MBA in Investment Management. Dr. Mubiru is a Lecturer at Kyambogo University and the Managing Director at Whiteknights Valuers, a professional valuation surveying and property management company. His extensive research and teaching experience have significantly contributed to the field, making him a valuable addition to the Global Grants Hub team.",
    image: logo,
    contacts: {
      email: "chief@globalgrantshub.org",
      phone: "+256788886782",
      whatsapp: "256788886782"
    },
    socials: {
      linkedin: "https://www.linkedin.com/in/dr-moses-batanda-mubiru-phd-aciarb-rsu-6b659425/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://twitter.com/MubiruM05953701"
    }
  },
  {
    id: 2,
    name: "Mr. JP Uwizeyimana",
    role: "IT-developer",
    bio: "´◡` Thanks for checking me out!! find out more about me on my linkedin profile or my portfolio",
    image: logo,
    contacts: {
      email: "uwizeyimanajp2@gmail.com",
      phone: "+250790180545",
      whatsapp: "250737787395"
    },
    socials: {
      linkedin: "https://www.linkedin.com/in/ujeanpierre45",
      twitter: "https://x.com/Uwizeyi30479056",
      github: "https://github.com/ujpm",
      globeAfrica: "https://portifolio-cgu.pages.dev"
    }
  },  

  {  
    id: 2,
    name: "Ms.Nelisiwe Mhlabane",
    role: "Member",
    bio: "Research Managers, Public Health Specialist, practicing as an Infectious  Disease Epidemiologist with vast experience  in program implementation, health system strengthening, and grant writing.",
    image: logo,
    contacts: {
      email: "uwizeyimanajp2@gmail.com",
      phone: "+250790180545",
      whatsapp: "250737787395"
    },
    socials: {
      linkedin: "https://www.linkedin.com/in/nelisiwe-mhlabane-0017601b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
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
