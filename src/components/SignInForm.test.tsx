import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignInForm from './SignInForm';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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

  it('should redirect to home page after successful sign in', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const signInFnMock = signInWithEmailAndPassword as jest.Mock;
    signInFnMock.mockResolvedValueOnce({});

    render(<SignInForm testId="sign-in-form" />);

    const emailInput = screen.getByPlaceholderText(/your email/i);
    const passwordInput = screen.getByPlaceholderText(/your password/i);
    const signInButton = screen.getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'user@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signInFnMock).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('should redirect to home page after successful sign up', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const signUpFnMock = createUserWithEmailAndPassword as jest.Mock;
    signUpFnMock.mockResolvedValueOnce({});

    render(<SignInForm testId="sign-in-form" />);

    const emailInput = screen.getByPlaceholderText(/your email/i);
    const passwordInput = screen.getByPlaceholderText(/your password/i);
    const signUpButton = screen.getByText('Sign Up');

    fireEvent.change(emailInput, { target: { value: 'user@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(signUpFnMock).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
