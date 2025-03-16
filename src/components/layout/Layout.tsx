import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import DeveloperCredit from '../common/DeveloperCredit';

const Main = styled.main`
  margin-top: var(--header-height);
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;

  /* Add padding to account for the fixed navbar on mobile */
  @media (max-width: 768px) {
    margin-top: calc(var(--header-height) - 10px);
  }

  /* Ensure content doesn't touch screen edges on mobile */
  & > * {
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }

  /* Add bottom padding for iOS safe area */
  padding-bottom: env(safe-area-inset-bottom);
`;

const PageWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Main>
        <PageWrapper>{children}</PageWrapper>
      </Main>
      <Footer />
      <DeveloperCredit />
    </>
  );
};

export default Layout;
