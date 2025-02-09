import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../common/Container';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Section = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 1rem;
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
  font-size: 1.1rem;
`;

const AuthorTitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
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
    text: "Global Grants Hub has been instrumental in helping us secure funding for our community projects. Their platform and support are exceptional!",
    author: "Sarah Johnson",
    title: "Executive Director, Community First",
    image: "/assets/testimonials/sarah.jpg"
  },
  {
    id: 2,
    text: "The resources and guidance provided by GGH have transformed how we approach grant writing. We've seen a significant increase in our success rate.",
    author: "Michael Chen",
    title: "Program Manager, Tech4Good",
    image: "/assets/testimonials/michael.jpg"
  },
  {
    id: 3,
    text: "As a small nonprofit, GGH's platform has given us access to opportunities we wouldn't have found otherwise. Their support is invaluable.",
    author: "Emma Rodriguez",
    title: "Founder, Youth Empowerment Initiative",
    image: "/assets/testimonials/emma.jpg"
  },
  {
    id: 4,
    text: "The workshops and networking opportunities provided by GGH have helped us build valuable partnerships and improve our grant writing skills.",
    author: "David Thompson",
    title: "Grant Coordinator, Environmental Action",
    image: "/assets/testimonials/david.jpg"
  },
  {
    id: 5,
    text: "Thanks to GGH, we've been able to expand our reach and impact. Their platform is user-friendly and their team is always there to help.",
    author: "Lisa Patel",
    title: "Director, Healthcare Access Now",
    image: "/assets/testimonials/lisa.jpg"
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
