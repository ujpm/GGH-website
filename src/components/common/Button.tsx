import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return css`
          padding: 1rem 2rem;
          font-size: 1.125rem;
        `;
      default: // medium
        return css`
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background: var(--secondary);
          color: white;
          border: none;
          
          &:hover {
            background: #4b5563;
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
          
          &:hover {
            background: var(--primary);
            color: white;
          }
        `;
      default: // primary
        return css`
          background: var(--primary);
          color: white;
          border: none;
          
          &:hover {
            background: var(--primary-dark);
          }
        `;
    }
  }}
`;

export default Button;
