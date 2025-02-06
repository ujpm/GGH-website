import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'medium' | 'large';
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'max-width: 640px;';
      case 'large':
        return 'max-width: 1280px;';
      default: // medium
        return 'max-width: 1024px;';
    }
  }}
`;

export default Container;
