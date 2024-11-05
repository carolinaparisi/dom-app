import { Book } from '@/utils/books';
import Image from 'next/image';
import roomBanner from '../../public/images/welcome.png';
import Link from 'next/link';

interface RoomCardProps {
  name: string;
  id: string;
  books: Book[];
  winner: Book[] | null;
  createdAt: string | Date;
}

export default function RoomCard({
  name,
  id,
  books,
  winner,
  createdAt,
}: RoomCardProps) {
  const updateCreatedAt = () => {
    const createdDate = String(createdAt).split('T')[0];
    const [year, month, day] = createdDate.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <Link href={`/room/${id}`}>
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
          <div className="text-gray">{`Created at ${updateCreatedAt()}`}</div>
        </div>
      </div>
    </Link>
  );
}
