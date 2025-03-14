import { useState } from 'react';
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

const TestimonialSlider = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem 1rem;
`;

const TestimonialCard = styled.div`
  flex: 0 0 calc(33.333% - 2rem);
  min-width: 300px;
  
  @media (max-width: 968px) {
    flex: 0 0 calc(100% - 2rem);
  }
`;

const CardInner = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
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
  color: #444;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-style: italic;
  font-size: 1rem;
  flex-grow: 1;
`;

const AuthorInfo = styled.div`
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
  margin-top: auto;
`;

const AuthorName = styled.h4`
  color: var(--color-primary);
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const AuthorTitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  font-style: italic;
`;

const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction}: -20px;
  transform: translateY(-50%);
  background: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: white;
      color: var(--color-primary);
      transform: translateY(-50%);
    }
  }

  @media (max-width: 968px) {
    ${props => props.direction}: 10px;
  }
`;

const testimonials = [
  {
    id: 1,
    text: "The Global Grants Hub's mentorship and resources have helped us scale our projects and reach more communities in need. We are grateful for their continuous support and dedication.",
    author: "Dr. Jeremiah Mugisha",
    title: "Chief Executive Officer, Mission of Hope Initiative (MOHI)"
  },
  {
    id: 2,
    text: "The Global Grants Hub has been instrumental in connecting us with the right funding opportunities and resources. Through their support, we have successfully secured over $500,000 in funding, significantly advancing our initiatives and empowering us to make a greater impact.",
    author: "Dr. Kiviiri Enock",
    title: "Chairperson BoD, Cairo Youth Empowerment Initiative (CYEI)"
  },
  {
    id: 3,
    text: "Being a part of the Global Grants Hub community has empowered us to achieve our goals and secure funding for our initiatives. Their platform and support are truly exceptional.",
    author: "Mr. Emeka Obi",
    title: "Chief Executive Officer, Nigerian Education Development Network (NEDN)"
  },
  {
    id: 4,
    text: "Through the Global Grants Hub, we've been able to enhance our educational programs and infrastructure. Their expertise in grant writing and strategic planning has been invaluable.",
    author: "Mr. Isabirye Steven James",
    title: "Executive Director, Wanyange Treasure Junior School - Jinja"
  },
  {
    id: 5,
    text: "The Global Grants Hub has played a pivotal role in supporting the EmpowerHER project. Their resources and guidance have enabled us to empower more adolescent girls to access quality education and overcome barriers. Through their support, we have successfully received over $5,000 in funding.",
    author: "Nantaba Norah Jovia",
    title: "Student, Mityana Trinity College & Leader of EmpowerHER Project"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = window.innerWidth <= 968 ? 1 : 3;
  const maxIndex = testimonials.length - itemsPerPage;

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <Section>
      <Container>
        <SectionTitle>Success Stories</SectionTitle>
        <TestimonialsContainer>
          <TestimonialSlider
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
            }}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
              >
                <CardInner>
                  <QuoteIcon />
                  <TestimonialText>{testimonial.text}</TestimonialText>
                  <AuthorInfo>
                    <AuthorName>{testimonial.author}</AuthorName>
                    <AuthorTitle>{testimonial.title}</AuthorTitle>
                  </AuthorInfo>
                </CardInner>
              </TestimonialCard>
            ))}
          </TestimonialSlider>

          <NavigationButton
            direction="left"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <FaChevronLeft />
          </NavigationButton>
          <NavigationButton
            direction="right"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
          >
            <FaChevronRight />
          </NavigationButton>
        </TestimonialsContainer>
      </Container>
    </Section>
  );
};

export default Testimonials;
