import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Lobby from './page';
import { roomsMock } from '@/mocks/roomsMock';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
}));

jest.mock('../contexts/AuthContext', () => ({
  useAuthContext: () => {
    return {
      user: {
        uid: '123',
        email: 'test@gmail.com',
      },
      isLoading: false,
    };
  },
}));

jest.mock('../contexts/RoomContext', () => ({
  useRoomContext: () => {
    return {
      getAllRooms: jest.fn(async () => {
        return roomsMock;
      }),
    };
  },
}));

describe('Lobby component', () => {
  it('should render lobby image', async () => {
    render(<Lobby />);

    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
    });
  });

  it('should render lobby title', async () => {
    render(<Lobby />);

    await waitFor(() => {
      const title = screen.getByText('Lobby');
      expect(title).toBeInTheDocument();

      const secondTitle = screen.getByText('administer your rooms');
      expect(secondTitle).toBeInTheDocument();
    });
  });

  it('should render rooms', async () => {
    render(<Lobby />);

    await waitFor(() => {
      const room1 = screen.getByText('Room 1');
      expect(room1).toBeInTheDocument();

      const room2 = screen.getByText('Room 2');
      expect(room2).toBeInTheDocument();

      const book1 = screen.getAllByText('Books: Book 1, Book 2');
      expect(book1).toHaveLength(2);

      const winner1 = screen.getAllByText('Winner: Book 1');
      expect(winner1).toHaveLength(2);

      const createdAt1 = screen.getAllByText('Created at 01-01-2025');
      expect(createdAt1).toHaveLength(2);
    });
  });

  it('should render create room button', async () => {
    render(<Lobby />);

    await waitFor(() => {
      const createRoomButton = screen.getByText('CREATE A NEW ONE');
      expect(createRoomButton).toBeInTheDocument();
    });
  });

  it('should render logout button', async () => {
    render(<Lobby />);

    await waitFor(() => {
      const createRoomButton = screen.getByText('LOGOUT');
      expect(createRoomButton).toBeInTheDocument();
    });
  });

  it('should redirect to create room page when clicking create room button', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const createBtnMock = jest.fn();
    createBtnMock.mockResolvedValueOnce({});

    render(<Lobby />);
    const createRoomButton = screen.getByRole('button', {
      name: 'CREATE A NEW ONE',
    });

    fireEvent.click(createRoomButton);
    await waitFor(() => {
      expect(createRoomButton).toBeInTheDocument();
      expect(mockPush).toHaveBeenCalledWith('/room');
    });
  });

  it('should logout when clicking logout button', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const logoutBtnMock = signOut as jest.Mock;
    logoutBtnMock.mockResolvedValueOnce({});

    render(<Lobby />);
    const logoutButton = screen.getByRole('button', {
      name: 'LOGOUT',
    });

    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(logoutBtnMock).toHaveBeenCalled();
    });
  });
});
