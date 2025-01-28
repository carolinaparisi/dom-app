import { render, screen } from '@testing-library/react';
import RoomCard from './RoomCard';
import { roomsMock } from '../mocks/roomsMock';

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
        testId="room-card"
      />,
    );
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
});
