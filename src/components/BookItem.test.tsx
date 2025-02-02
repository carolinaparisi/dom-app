import { screen, render } from '@testing-library/react';
import BookItem from './BookItem';
import { booksMock } from '@/mocks/booksMock';

describe('BookItem', () => {
  it('should render book item', () => {
    render(
      <BookItem
        text={booksMock[0].title}
        id={booksMock[0].id}
        handleBookSelected={() => {}}
        votes={booksMock[0].votes}
        guestName="test"
      />,
    );
    const bookOpen = screen.getByTestId('book-item');
    expect(bookOpen).toBeInTheDocument();
  });
});
