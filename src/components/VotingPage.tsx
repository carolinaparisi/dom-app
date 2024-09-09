import { useState } from 'react';
import { Book, initialBooks } from '@/utils/books';
import BookItem from './BookItem';
import { VoterName, initialNames } from '@/utils/names';
import Image from 'next/image';
import votingBanner from '../../public/assets/images/voting-banner.png';

export default function VotingPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [names, setNames] = useState<VoterName[]>(initialNames);

  const handleBookSelected = (id: number) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          isSelected: !book.isSelected,
        };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  return (
    <>
      <div className="relative">
        <Image
          alt=""
          src={votingBanner}
          className="w-full"
          quality={100}
          priority
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          <div className="font-silk text-4xl">Voting Room</div>
          <div className="text-base">created by Café com Letras</div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-6 p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="text-4xl font-medium leading-none">
            <div>Choose 3 out</div>
            <div>of 5 books</div>
            <div>from the list</div>
          </div>
          <div className="text-lg">
            <div>
              This poll is available only during the discussion. Once voting
              ends, &nbsp;
              <span className="font-bold">
                the URL will be instantly disabled
              </span>
              .
            </div>
          </div>
        </div>
        <div>
          {/* EligibleBooks */}
          <div className="flex flex-col gap-3 text-lg">
            {books.map((book) => (
              <BookItem
                key={book.id}
                text={book.title}
                id={book.id}
                handleBookSelected={handleBookSelected}
                isSelected={book.isSelected}
              />
            ))}
          </div>
        </div>
        {/* NamesPool */}
        <div className="flex flex-wrap gap-2">
          {names.map((name) => (
            <span
              key={name.id}
              className={` ${
                name.isReady ? `bg-primary` : `bg-gray_soft`
              } inline-flex items-center rounded-md px-2 py-1 text-lg`}
            >
              {name.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
