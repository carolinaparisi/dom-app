import { render, screen } from '@testing-library/react';
import Login from './page';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn(),
    database: jest.fn(),
  }),
}));

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

describe('Login Component', () => {
  it('should render image background', () => {
    render(<Login />);
    const backgroundImage = screen.queryByRole('img');
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveAttribute(
      'alt',
      'Background image with an oil painting of a child',
    );
  });

  it('should render thy credentials title', () => {
    render(<Login />);
    const signInTitle = screen.queryByText('Enter Thy Credentials');
    expect(signInTitle).toBeInTheDocument();
  });

  it('should render menu icon', () => {
    render(<Login />);
    const menuIcon = screen.queryByTestId('menu-icon');
    expect(menuIcon).toBeInTheDocument();
  });
});
