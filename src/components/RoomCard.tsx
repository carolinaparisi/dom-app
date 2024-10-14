import { Book } from '@/utils/books';
import Image from 'next/image';
import roomBanner from '../../public/images/welcome.png';

interface RoomCardProps {
  name: string;
  books: Book[];
  winner: Book[] | null;
}

export default function RoomCard({ name, books, winner }: RoomCardProps) {
  return (
    <>
      <div className="align-center flex w-full gap-3 rounded-2xl bg-primary p-3 text-white">
        <Image
          className="rounded-full"
          alt=""
          src={roomBanner}
          priority
          width={55}
          height={110}
        />
        <div className="flex flex-col justify-center gap-1">
          <div className="font-silk text-xl">{name}</div>
          <div className="line-clamp-1">
            {`Books: ` + books.map((book) => book.title).join(', ')}
          </div>
          <div className="line-clamp-1">{`Winner: ${
            winner
              ? winner?.map((book) => book.title).join(', ')
              : 'Not revealed yet'
          }`}</div>
          <div className="text-gray">Created at Thu 12 Sep 2024</div>
        </div>
      </div>
    </>
  );
}
