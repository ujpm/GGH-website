import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../common/Container';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import userExample from 'assets/user-example.webp';

const Section = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: var(--color-secondary);
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: var(--color-primary);
    margin: 1rem auto;
  }
`;

const TestimonialsContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 3rem auto 0;
  overflow: hidden;
`;

const TestimonialSlider = styled.div<{ transform: string }>`
  display: flex;
  transition: transform 0.5s ease;
  transform: ${props => props.transform};
`;

const TestimonialCard = styled.div`
  flex: 0 0 33.333%;
  padding: 1.5rem;
  opacity: 0.5;
  transform: scale(0.9);
  transition: all 0.5s ease;
  
  &.active {
    opacity: 1;
    transform: scale(1);
  }

  @media (max-width: 968px) {
    flex: 0 0 100%;
  }
`;

const CardInner = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    border-radius: 15px 15px 0 0;
  }
`;

const QuoteIcon = styled(FaQuoteLeft)`
  color: var(--color-primary);
  opacity: 0.2;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const TestimonialText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
  font-size: 0.95rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--color-primary);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorDetails = styled.div``;

const AuthorName = styled.h4`
  color: var(--color-primary);
  margin: 0;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const AuthorTitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.85rem;
  font-family: 'Open Sans', sans-serif;
  font-style: italic;
`;

const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction}: -20px;
  transform: translateY(-50%);
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 968px) {
    ${props => props.direction}: 10px;
  }
`;

const testimonials = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The platform exceeded all my expectations with its intuitive interface!",
    author: "Alex Morgan",
    title: "Project Lead, Innovation Hub",
    image: userExample
  },
  {
    id: 2,
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A game-changing resource for our organization.",
    author: "Sam Wilson",
    title: "Director, Future Forward",
    image: userExample
  },
  {
    id: 3,
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Jordan Lee",
    title: "Founder, Tech Solutions",
    image: userExample
  },
  {
    id: 4,
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    author: "Taylor Reed",
    title: "Program Manager, Future Initiatives",
    image: userExample
  },
  {
    id: 5,
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: "Casey Kim",
    title: "Executive Director, Innovation Lab",
    image: userExample
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => 
      (prev + 1) % testimonials.length
    );
  };

  const getTransform = () => {
    const baseTransform = -currentIndex * 33.333;
    return `translateX(${baseTransform}%)`;
  };

  return (
    <Section>
      <Container>
        <SectionTitle>What Others Say About GGH</SectionTitle>
        <TestimonialsContainer>
          <TestimonialSlider transform={getTransform()}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id}
                className={index === currentIndex ? 'active' : ''}
              >
                <CardInner>
                  <QuoteIcon />
                  <TestimonialText>{testimonial.text}</TestimonialText>
                  <AuthorInfo>
                    <AuthorImage>
                      <img src={testimonial.image} alt={testimonial.author} />
                    </AuthorImage>
                    <AuthorDetails>
                      <AuthorName>{testimonial.author}</AuthorName>
                      <AuthorTitle>{testimonial.title}</AuthorTitle>
                    </AuthorDetails>
                  </AuthorInfo>
                </CardInner>
              </TestimonialCard>
            ))}
          </TestimonialSlider>
          <NavigationButton direction="left" onClick={handlePrev}>
            <FaChevronLeft />
          </NavigationButton>
          <NavigationButton direction="right" onClick={handleNext}>
            <FaChevronRight />
          </NavigationButton>
        </TestimonialsContainer>
      </Container>
    </Section>
  );
};

export default Testimonials;
