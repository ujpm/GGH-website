import { useState } from 'react';
import styled from 'styled-components';
import { TeamMember as TeamMemberType } from '../../types/team';
import { FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaWhatsapp, FaFacebook, FaGlobeAfrica, FaGithub} from 'react-icons/fa';

const Card = styled.div`
  position: relative;
  width: 180px;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  width: 180px;
  height: 180px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid var(--color-primary);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const MoreButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--secondary);
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background: var(--primary-dark);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoOverlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: 90%;
  max-width: 400px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const Backdrop = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const Name = styled.h3`
  font-size: 1.2rem;
  color: var(--color-primary);
  margin: 0.5rem 0 0;
  text-align: center;
`;

const Role = styled.p`
  font-size: 0.9rem;
  color: var(--color-secondary);
  margin: 0.2rem 0;
  text-align: center;
`;

const Bio = styled.p`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin: 1rem 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 1rem 0;
`;

const SocialIcon = styled.a`
  color: var(--color-primary);
  font-size: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactLink = styled.a`
  color: var(--color-secondary);
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    color: var(--color-primary);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-secondary);
  
  &:hover {
    color: var(--color-primary);
  }
`;

interface Props {
  member: TeamMemberType;
}

const TeamMember: React.FC<Props> = ({ member }) => {
  const [showDetails, setShowDetails] = useState(false);

  const closeDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(false);
  };

  return (
    <>
      <Card>
        <ImageContainer onClick={() => setShowDetails(true)}>
          <Image src={member.image} alt={member.name} />
          <MoreButton onClick={(e) => {
            e.stopPropagation();
            setShowDetails(true);
          }}>
            More
          </MoreButton>
        </ImageContainer>
        <Name>{member.name}</Name>
        <Role>{member.role}</Role>
      </Card>

      <Backdrop $isVisible={showDetails} onClick={closeDetails} />
      <InfoOverlay $isVisible={showDetails}>
        <CloseButton onClick={closeDetails}>&times;</CloseButton>
        <Name>{member.name}</Name>
        <Role>{member.role}</Role>
        <Bio>{member.bio}</Bio>

        <SocialLinks>
          {member.socials.linkedin && (
            <SocialIcon href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
          )}
          {member.socials.facebook && (
            <SocialIcon href={member.socials.facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
          )}
          {member.socials.globeAfrica && (
            <SocialIcon href={member.socials.globeAfrica} target="_blank" rel="noopener noreferrer">
              <FaGlobeAfrica />
            </SocialIcon>
          )}
          {member.socials.github && (
            <SocialIcon href={member.socials.github} target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialIcon>
          )}
          {member.socials.twitter && (
            <SocialIcon href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
          )}
        </SocialLinks>

        <ContactInfo>
          {member.contacts.email && (
            <ContactLink href={`mailto:${member.contacts.email}`}>
              <FaEnvelope /> {member.contacts.email}
            </ContactLink>
          )}
          {member.contacts.phone && (
            <ContactLink href={`tel:${member.contacts.phone}`}>
              <FaPhone /> {member.contacts.phone}
            </ContactLink>
          )}
          {member.contacts.whatsapp && (
            <ContactLink href={`https://wa.me/${member.contacts.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> WhatsApp
            </ContactLink>
          )}
        </ContactInfo>
      </InfoOverlay>
    </>
  );
};

export default TeamMember;
