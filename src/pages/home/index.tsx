import Hero from '../../components/home/Hero';
import ServicesOverview from '../../components/home/ServicesOverview';
import Testimonials from '../../components/home/Testimonials';
import CallToAction from '../../components/home/CallToAction';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomePage;
