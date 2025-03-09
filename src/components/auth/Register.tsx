import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  span {
    padding: 0 10px;
    color: #777;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  text-align: center;
`;

const LinkText = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const GoogleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PasswordRequirements = styled.ul`
  font-size: 0.85rem;
  color: #666;
  margin: 0.5rem 0;
  padding-left: 1.2rem;
`;

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { register, googleLogin, error } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      await googleLogin(credentialResponse.credential);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <RegisterContainer>
      <h2>Create an Account</h2>
      {(error || validationError) && (
        <ErrorMessage>{error || validationError}</ErrorMessage>
      )}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <PasswordRequirements>
          <li>At least 6 characters long</li>
          <li>Mix of letters, numbers, and symbols recommended</li>
        </PasswordRequirements>
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </Form>

      <Divider>
        <span>OR</span>
      </Divider>

      <GoogleContainer>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log('Registration Failed')}
          text="signup_with"
          shape="rectangular"
          theme="filled_blue"
        />
      </GoogleContainer>

      <LinkText to="/login">
        Already have an account? Login here
      </LinkText>
    </RegisterContainer>
  );
};

export default Register;
