import { Book } from '@/utils/books';
import Image from 'next/image';
import roomBanner from '../../public/images/room-image1.png';
import { useRouter } from 'next/navigation';

export interface RoomCardProps {
  name: string;
  id: string;
  books?: Book[];
  winner?: Book[] | null;
  createdAt: string | Date;
  testId?: string;
  isVotingRoom?: boolean;
  isCompleted?: boolean;
}

export default function RoomCard({
  name,
  id,
  books,
  winner,
  createdAt,
  isVotingRoom,
  isCompleted,
  testId,
}: RoomCardProps) {
  const router = useRouter();

  const handleRoomCard = () => {
    if (isVotingRoom) {
      router.push(`/room/${id}`);
      return;
    }
    router.push(`/indication/${id}`);
  };

  const updateCreatedAt = () => {
    const createdDate = String(createdAt).split('T')[0];
    const [year, month, day] = createdDate.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <button
      data-testid={testId}
      onClick={handleRoomCard}
      className="w-full text-left"
    >
      <div
        data-testid="room-card"
        className={`flex w-full gap-3 rounded-2xl p-3 ${
          isVotingRoom ? 'bg-primary text-white' : 'bg-burgundy text-white'
        }`}
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
          className="flex min-w-0 flex-1 flex-col justify-start gap-1"
        >
          <div className="truncate font-silk text-xl">{name}</div>

          <div className="flex gap-2">
            <span className="shrink-0 font-semibold">Books:</span>
            <span className="min-w-0 flex-1 overflow-hidden truncate">
              {books?.length
                ? books.map((book) => book.title.split(',')[0]).join(', ')
                : 'No books yet'}
            </span>
          </div>

          <div className="flex gap-2">
            <span className="shrink-0 font-semibold">
              {isCompleted
                ? 'Closed'
                : !isVotingRoom
                  ? 'Recommendation phase'
                  : 'Winner:'}
            </span>
            {isVotingRoom && (
              <span className="min-w-0 flex-1 overflow-hidden truncate">
                {winner?.length
                  ? winner.map((book) => book.title).join(', ')
                  : 'Not revealed yet'}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <span className="shrink-0 font-semibold">Created at:</span>
            <span className="min-w-0 flex-1 overflow-hidden truncate">
              {updateCreatedAt()}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
