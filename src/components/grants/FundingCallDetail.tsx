import { FC } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { FundingCall } from '../../types/grants';
import { motion } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const Modal = styled(motion.div)`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: var(--color-primary);
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  padding-right: 2rem;
`;

const Organization = styled.div`
  color: #666;
  font-size: 1.1rem;
`;

const Section = styled.section`
  margin: 2rem 0;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  color: #333;
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
`;

const Description = styled.p`
  color: #444;
  line-height: 1.6;
  font-size: 1rem;
  white-space: pre-wrap;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  color: #444;
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;

  &:before {
    content: "•";
    color: var(--color-primary);
    position: absolute;
    left: 0;
  }

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const InfoCard = styled.div`
  background: #f8f9fa;
  padding: 1.25rem;
  border-radius: 12px;
`;

const InfoLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ApplyButton = styled.a`
  display: inline-block;
  background: var(--color-primary);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
  }
`;

interface FundingCallDetailProps {
  call: FundingCall;
  onClose: () => void;
}

const FundingCallDetail: FC<FundingCallDetailProps> = ({ call, onClose }) => {
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Modal
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>×</CloseButton>

        <Header>
          <Title>{call.title}</Title>
          <Organization>{call.organization}</Organization>
        </Header>

        <Section>
          <SectionTitle>Description</SectionTitle>
          <Description>{call.description}</Description>
        </Section>

        <Section>
          <SectionTitle>Funding Information</SectionTitle>
          <InfoGrid>
            {call.fundingInfo.amount && (
              <InfoCard>
                <InfoLabel>Amount</InfoLabel>
                <InfoValue>{call.fundingInfo.amount}</InfoValue>
              </InfoCard>
            )}
            {call.fundingInfo.duration && (
              <InfoCard>
                <InfoLabel>Duration</InfoLabel>
                <InfoValue>{call.fundingInfo.duration}</InfoValue>
              </InfoCard>
            )}
            <InfoCard>
              <InfoLabel>Deadline</InfoLabel>
              <InfoValue>{format(new Date(call.deadline), 'MMMM d, yyyy')}</InfoValue>
            </InfoCard>
            <InfoCard>
              <InfoLabel>Status</InfoLabel>
              <InfoValue>{call.status.replace('_', ' ').toUpperCase()}</InfoValue>
            </InfoCard>
          </InfoGrid>
        </Section>

        <Section>
          <SectionTitle>Eligibility Criteria</SectionTitle>
          <List>
            {call.eligibility.criteria.map((criterion, index) => (
              <ListItem key={index}>{criterion}</ListItem>
            ))}
          </List>

          {call.eligibility.restrictions && call.eligibility.restrictions.length > 0 && (
            <>
              <SectionTitle style={{ marginTop: '1.5rem' }}>Restrictions</SectionTitle>
              <List>
                {call.eligibility.restrictions.map((restriction, index) => (
                  <ListItem key={index}>{restriction}</ListItem>
                ))}
              </List>
            </>
          )}
        </Section>

        {call.requirements && call.requirements.length > 0 && (
          <Section>
            <SectionTitle>Requirements</SectionTitle>
            <List>
              {call.requirements.map((requirement, index) => (
                <ListItem key={index}>{requirement}</ListItem>
              ))}
            </List>
          </Section>
        )}

        {call.contact && Object.values(call.contact).some(value => value) && (
          <Section>
            <SectionTitle>Contact Information</SectionTitle>
            <InfoGrid>
              {call.contact.name && (
                <InfoCard>
                  <InfoLabel>Contact Person</InfoLabel>
                  <InfoValue>{call.contact.name}</InfoValue>
                </InfoCard>
              )}
              {call.contact.email && (
                <InfoCard>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue>{call.contact.email}</InfoValue>
                </InfoCard>
              )}
              {call.contact.phone && (
                <InfoCard>
                  <InfoLabel>Phone</InfoLabel>
                  <InfoValue>{call.contact.phone}</InfoValue>
                </InfoCard>
              )}
              {call.contact.website && (
                <InfoCard>
                  <InfoLabel>Website</InfoLabel>
                  <InfoValue>
                    <a href={call.contact.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </InfoValue>
                </InfoCard>
              )}
            </InfoGrid>
          </Section>
        )}

        <ApplyButton href={call.applicationUrl} target="_blank" rel="noopener noreferrer">
          Apply Now
        </ApplyButton>
      </Modal>
    </Overlay>
  );
};

export default FundingCallDetail;
