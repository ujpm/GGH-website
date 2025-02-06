import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const Section = styled.section`
  background-color: var(--soft-peach);
  padding: 5rem 2rem;
  text-align: center;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: var(--secondary);
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
`;

const Description = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const StyledButton = styled(Button)`
  min-width: 200px;
`;

const CallToAction = () => {
  return (
    <Section>
      <Content>
        <Title>Ready to Make an Impact?</Title>
        <Description>
          Join our community of changemakers and access the resources you need to transform your vision into reality.
        </Description>
        <Link to="/contact">
          <StyledButton variant="primary" size="large">
            Get Started Today
          </StyledButton>
        </Link>
      </Content>
    </Section>
  );
};

export default CallToAction;
