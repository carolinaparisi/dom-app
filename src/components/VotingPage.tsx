import { useState } from 'react';
import { Book, initialBooks } from '@/utils/books';
import BookItem from './BookItem';
import { VoterGuest, initialGuests } from '@/utils/guests';
import Image from 'next/image';
import votingBanner from '../../public/images/voting-banner.png';

export default function VotingPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [guests] = useState<VoterGuest[]>(initialGuests);

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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray_soft">
          <div className="font-silk text-4xl">Voting Room</div>
          <div className="text-base">created by Café com Letras</div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-9 bg-gray_soft px-6 py-9 font-light">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            {/* Header */}
            <div className="font-silk text-3xl leading-none text-primary">
              <div>Books</div>
            </div>
            <div className="text-lg">
              <div>
                Dear guest, select 3 volumes from the 5 listed henceforth:
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
                  isSelected={book.isSelected}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            {/* Header */}
            <div className="font-silk text-3xl leading-none text-primary">
              <div>Guests</div>
            </div>
            <div className="text-lg">
              <div>
                Await until all esteemed guests have cast their votes, and the
                host doth reveal the next book.
              </div>
            </div>
          </div>
          {/* NamesPool */}
          <div className="flex flex-wrap gap-2 text-white">
            {guests.map((name) => (
              <span
                key={name.id}
                className={` ${
                  name.isReady ? `bg-primary` : `bg-gray`
                } inline-flex items-center rounded-2xl px-3 py-1 text-sm`}
              >
                {name.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
