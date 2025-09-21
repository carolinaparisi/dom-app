import { render, screen } from '@testing-library/react';
import VotingPage from './VotingPage';
import { roomsMock } from '@/mocks/roomsMock';
//import { booksMock } from '@/mocks/booksMock';
import React from 'react';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));
jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
}));
jest.mock('../contexts/RoomContext', () => ({
  useVotingRoomContext: () => {
    return {
      setVotingRoom: jest.fn(),
    };
  },
}));

jest.mock('react-confetti-boom', () => jest.fn(() => <div>Confetti</div>));

describe('VotingPage', () => {
  it('should render voting page image', () => {
    render(<VotingPage guestName="test" room={roomsMock[0]} />);
    //screen.logTestingPlaygroundURL();
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
  it('should render book items to vote', () => {
    render(<VotingPage guestName="test" room={roomsMock[0]} />);
    const booksToVote = screen.getAllByTestId('book-item');
    expect(booksToVote).toHaveLength(roomsMock[0].books.length);
  });
  it('should render winning book', () => {
    render(<VotingPage guestName="test" room={roomsMock[1]} />);
    const booksToVote = screen.getAllByTestId('book-item');
    expect(booksToVote).toHaveLength(roomsMock[1].winningBooks.length);
  });
  it('should render the tied book items', () => {
    render(<VotingPage guestName="test" room={roomsMock[2]} />);
    const booksToVote = screen.getAllByTestId('book-item');
    expect(booksToVote).toHaveLength(roomsMock[2].winningBooks.length);
  });
  it('should render guests', () => {
    render(<VotingPage guestName="test" room={roomsMock[0]} />);
    const booksToVote = screen.getAllByTestId('guest-name');
    expect(booksToVote).toHaveLength(roomsMock[0].guests.length);
  });
});
