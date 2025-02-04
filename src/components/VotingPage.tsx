'use client';

import { Book } from '@/utils/books';
import BookItem from './BookItem';
import { VoterGuest } from '@/utils/guests';
import Image from 'next/image';
import votingBanner from '../../public/images/voting-banner.png';
import { useRoomContext } from '@/contexts/RoomContext';
import { Room, roomSchema } from '@/utils/rooms';
import Confetti from 'react-confetti-boom';

interface VotingPageProps {
  guestName: string;
  room: Room;
}

export default function VotingPage({ guestName, room }: VotingPageProps) {
  const { books, guests, name, maxBooks, winningBooks } = room;
  const { setRoom } = useRoomContext();

  const getUpdatedVotes = (book: Book) => {
    let updatedVotes: string[] = [];
    if (book.votes?.includes(guestName)) {
      updatedVotes = book.votes.filter((name) => name !== guestName);
      return updatedVotes || [];
    }
    const currentVotes = book.votes || [];

    const quantityVotes = books
      .map((book) => book.votes)
      .flat(1)
      .filter((name) => name === guestName).length;

    if (quantityVotes >= maxBooks) {
      return currentVotes;
    }

    return [...currentVotes, guestName];
  };

  const getUpdatedBooks = (id: number, books: Book[]) => {
    return books.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          votes: getUpdatedVotes(book),
        };
      }
      return {
        ...book,
        votes: book.votes || [],
      };
    });
  };

  const getUpdatedGuests = (books: Book[]): VoterGuest[] => {
    const guestNameVoted = books
      .map((book) => book.votes)
      .flat(1)
      .includes(guestName);

    return guests.map((guest) => {
      if (guest.name === guestName && guestNameVoted) {
        return {
          ...guest,
          isReady: true,
        };
      } else if (guest.name !== guestName) {
        return guest;
      }
      return {
        ...guest,
        isReady: false,
      };
    });
  };

  const handleBookSelected = async (id: number) => {
    const updatedBooks = getUpdatedBooks(id, books);
    const updatedGuests = getUpdatedGuests(updatedBooks);
    const updatedData = roomSchema.parse({
      ...room,
      books: updatedBooks,
      guests: updatedGuests,
    });

    await setRoom(room.id, updatedData);
  };

  return (
    <>
      <div className="relative">
        <Image
          alt="main-banner"
          src={votingBanner}
          className="w-full"
          quality={100}
          priority
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray_soft">
          <div className="font-silk text-4xl">Voting Room</div>
          <div className="text-center text-base">created by {name}</div>
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
                {`Dear guest, kindly limit your selection to no more than ${maxBooks} ${maxBooks === 1 ? `volume` : `volumes`} from the books listed henceforth:`}
              </div>
            </div>
          </div>
          <div>
            {/* EligibleBooks */}

            <div className="flex flex-col gap-3">
              {!winningBooks || winningBooks.length === 0 ? (
                books.map((book) => (
                  <BookItem
                    key={book.id}
                    text={book.title}
                    id={book.id}
                    handleBookSelected={handleBookSelected}
                    votes={book.votes}
                    guestName={guestName}
                  />
                ))
              ) : (
                <>
                  <div className="text-lg">
                    {winningBooks?.length > 1
                      ? 'We have a tie:'
                      : 'The winner is:'}
                  </div>
                  {winningBooks?.length === 1 && (
                    <div>
                      <Confetti
                        mode="boom"
                        y={0.6}
                        particleCount={150}
                        spreadDeg={40}
                        colors={['#ff577f', '#ff884b', '#ffd384', '#fff9b0']}
                        shapeSize={14}
                      />
                    </div>
                  )}
                  {books
                    .filter((book) =>
                      winningBooks?.some(
                        (winningBook) => winningBook.title === book.title,
                      ),
                    )
                    .map((book) => (
                      <BookItem
                        key={book.id}
                        text={book.title}
                        id={book.id}
                        handleBookSelected={() => null}
                        votes={book.votes}
                        guestName={guestName}
                      />
                    ))}
                </>
              )}
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
            {guests.map((guest) => (
              <span
                data-testid="guest-name"
                key={guest.id}
                className={` ${
                  guest.isReady ? `bg-primary` : `bg-gray`
                } inline-flex items-center rounded-2xl px-3 py-1 text-lg`}
              >
                {guest.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
