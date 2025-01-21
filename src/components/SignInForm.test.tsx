import { render, screen } from '@testing-library/react';
import SignInForm from './SignInForm';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe('SignInForm component', () => {
  it('should render title Enter Thy Credentials', () => {
    render(<SignInForm testId="sign-in-form" />);
    const title = screen.queryByText('Enter Thy Credentials');
    expect(title).toBeInTheDocument();
  });

  it('should render email input', () => {
    render(<SignInForm testId="sign-in-form" />);
    const emailInput = screen.getByPlaceholderText(/your email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('should render password input', () => {
    render(<SignInForm testId="sign-in-form" />);
    const passwordInput = screen.getByPlaceholderText(/your password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('should render sign in and sign up buttons', () => {
    render(<SignInForm testId="sign-in-form" />);
    const signInButton = screen.getByText('Sign In');
    const signUpButton = screen.getByText('Sign Up');
    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });
});
