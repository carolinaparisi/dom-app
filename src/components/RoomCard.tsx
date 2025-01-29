import { Book } from '@/utils/books';
import Image from 'next/image';
import roomBanner from '../../public/images/room-image1.png';
import { useRouter } from 'next/navigation';

interface RoomCardProps {
  name: string;
  id: string;
  books: Book[];
  winner: Book[] | null;
  createdAt: string | Date;
  testId?: string;
}

export default function RoomCard({
  name,
  id,
  books,
  winner,
  createdAt,
  testId,
}: RoomCardProps) {
  const updateCreatedAt = () => {
    const createdDate = String(createdAt).split('T')[0];
    const [year, month, day] = createdDate.split('-');
    return `${day}-${month}-${year}`;
  };

  const router = useRouter();

  const handleRoomCard = () => {
    router.push(`/room/${id}`);
  };

  return (
    <button data-testid={testId} onClick={() => handleRoomCard()}>
      <div
        data-testid="room-card"
        className="align-center flex w-full gap-3 rounded-2xl bg-primary p-3 text-white"
      >
        <Image
          className="rounded-full object-cover"
          alt="main image"
          src={roomBanner}
          priority
          width={55}
          height={110}
        />
        <div
          data-testid="room-card-info"
          className="flex flex-col items-start gap-1"
        >
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
    </button>
  );
}
