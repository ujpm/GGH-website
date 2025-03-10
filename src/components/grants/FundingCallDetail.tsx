import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { FundingCall } from '../../types/grants';

const ModalOverlay = styled.div`
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
`;

const ModalContent = styled.div<{ type: string }>`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 2px solid ${props => {
    switch (props.type) {
      case 'grant':
        return 'var(--color-primary)';
      case 'scholarship':
        return '#3498DB';
      case 'resource':
        return '#27AE60';
      default:
        return 'var(--color-primary)';
    }
  }};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const Title = styled.h2<{ type: string }>`
  color: ${props => {
    switch (props.type) {
      case 'grant':
        return 'var(--color-primary)';
      case 'scholarship':
        return '#2C3E50';
      case 'resource':
        return '#27AE60';
      default:
        return 'var(--color-primary)';
    }
  }};
  margin: 0 0 1rem;
  font-size: 2rem;
`;

const Organization = styled.div`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const Section = styled.section`
  margin: 2rem 0;
`;

const SectionTitle = styled.h3`
  color: #2C3E50;
  margin: 0 0 1rem;
  font-size: 1.3rem;
`;

const Description = styled.p`
  color: #444;
  line-height: 1.8;
  font-size: 1.1rem;
  margin: 0 0 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const InfoItem = styled.div`
  background: #f8f9fa;
  padding: 1.25rem;
  border-radius: 8px;
`;

const InfoTitle = styled.h4`
  color: #2C3E50;
  margin: 0 0 0.5rem;
  font-size: 1rem;
`;

const InfoContent = styled.div`
  color: #444;
  font-size: 0.95rem;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    color: #444;
  }
`;

const ApplyButton = styled.a<{ type: string }>`
  display: inline-block;
  background: ${props => {
    switch (props.type) {
      case 'grant':
        return 'var(--color-primary)';
      case 'scholarship':
        return '#3498DB';
      case 'resource':
        return '#27AE60';
      default:
        return 'var(--color-primary)';
    }
  }};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

interface FundingCallDetailProps {
  call: FundingCall;
  onClose: () => void;
}

const FundingCallDetail: React.FC<FundingCallDetailProps> = ({ call, onClose }) => {
  // Prevent clicks inside the modal from closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent type={call.type} onClick={handleContentClick}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <Title type={call.type}>{call.title}</Title>
        <Organization>{call.organization}</Organization>
        
        <Description>{call.description}</Description>
        
        <InfoGrid>
          <InfoItem>
            <InfoTitle>Status</InfoTitle>
            <InfoContent style={{ 
              color: call.status === 'open' ? '#2E7D32' : 
                     call.status === 'closing_soon' ? '#E65100' : '#C62828'
            }}>
              {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
            </InfoContent>
          </InfoItem>
          
          <InfoItem>
            <InfoTitle>Deadline</InfoTitle>
            <InfoContent>
              {format(new Date(call.deadline), 'MMMM d, yyyy')}
            </InfoContent>
          </InfoItem>
          
          {call.fundingInfo && (
            <InfoItem>
              <InfoTitle>Funding Details</InfoTitle>
              <InfoContent>
                {call.fundingInfo.amount && `${call.fundingInfo.amount} ${call.fundingInfo.currency}`}
                {call.fundingInfo.type && <div>{call.fundingInfo.type}</div>}
                {call.fundingInfo.duration && <div>Duration: {call.fundingInfo.duration}</div>}
              </InfoContent>
            </InfoItem>
          )}
        </InfoGrid>

        {call.eligibility && (
          <Section>
            <SectionTitle>Eligibility</SectionTitle>
            {call.eligibility.criteria && (
              <>
                <InfoTitle>Criteria</InfoTitle>
                <List>
                  {call.eligibility.criteria.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </List>
              </>
            )}
            {call.eligibility.restrictions && (
              <>
                <InfoTitle style={{ marginTop: '1rem' }}>Restrictions</InfoTitle>
                <List>
                  {call.eligibility.restrictions.map((restriction, index) => (
                    <li key={index}>{restriction}</li>
                  ))}
                </List>
              </>
            )}
          </Section>
        )}

        {call.requirements && (
          <Section>
            <SectionTitle>Requirements</SectionTitle>
            <List>
              {call.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </List>
          </Section>
        )}

        <ApplyButton href={call.applicationUrl} target="_blank" type={call.type}>
          Apply Now
        </ApplyButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FundingCallDetail;
