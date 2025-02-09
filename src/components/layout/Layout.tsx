import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import DeveloperCredit from '../common/DeveloperCredit';

const Main = styled.main`
  margin-top: 70px; // Height of the fixed navbar
  min-height: calc(100vh - 70px);
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
      <DeveloperCredit />
    </>
  );
};

export default Layout;
