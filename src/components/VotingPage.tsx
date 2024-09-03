import { useState } from 'react';
import Button from './Button';
import { Book, initialBooks } from '@/utils/books';
import BookItem from './BookItem';

export default function VotingPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const handleBookSelected = () => {
    console.log('Hello');
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="text-4xl font-medium leading-none">
          <div>Choose 3 out</div>
          <div>of 5 books</div>
          <div>from the list</div>
        </div>
        <div className="text-lg">
          <div>
            This poll is available only during the discussion. Once voting ends,
            &nbsp;
            <span className="font-bold">
              the URL will be instantly disabled
            </span>
            .
          </div>
        </div>
      </div>
      <div>
        {/* EligibleBooks */}
        <div className="flex flex-col gap-3">
          {books.map((book) => (
            <BookItem
              key={book.id}
              text={book.title}
              id={book.id}
              handleBookSelected={handleBookSelected}
            />
          ))}
        </div>
      </div>
      {/* NamesPool */}
      <div className="bg-gray">Names Poll</div>
    </div>
  );
}
