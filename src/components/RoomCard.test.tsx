import { render, screen } from '@testing-library/react';
import RoomCard from './RoomCard';
import { roomsMock } from '../mocks/roomsMock';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('RoomCard component', () => {
  it('should render image', () => {
    const room = roomsMock[0];
    render(
      <RoomCard
        name={room.name}
        id={room.id}
        books={room.books}
        winner={room.winningBooks}
        createdAt={room.createdAt}
      />,
    );
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  it("should render room card's information", () => {
    const room = roomsMock[0];
    render(
      <RoomCard
        name={room.name}
        id={room.id}
        books={room.books}
        winner={room.winningBooks}
        createdAt={room.createdAt}
      />,
    );
    const image = screen.getByTestId('room-card-info');
    expect(image).toBeInTheDocument();
  });
});
