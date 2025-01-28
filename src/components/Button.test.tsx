import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

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

describe('Button component', () => {
  it('should render button text', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('should render button with primary variant', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('bg-white text-primary');
  });

  it('should render button with secondary variant and is available', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('bg-black text-white');
  });

  it('should render button with secondary variant and is not available', () => {
    render(
      <Button isAvailable={false} variant="secondary">
        Click me
      </Button>,
    );
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('bg-gray text-white');
  });

  it('should render button with tertiary variant and is available', () => {
    render(
      <Button variant="tertiary" isAvailable>
        Click me
      </Button>,
    );
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('bg-primary text-white');
  });

  it('should render button with tertiary variant and is not available', () => {
    render(
      <Button variant="tertiary" isAvailable={false}>
        Click me
      </Button>,
    );
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('bg-gray text-white');
  });

  it('should call router push when clicked', () => {
    const mockOnClick = jest.fn();

    render(<Button onClick={mockOnClick}>Click me</Button>);
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
