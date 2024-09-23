import { Book } from '@/utils/books';

interface RoomCardProps {
  name: string;
  books: Book[];
  winner: string;
}

export default function RoomCard({ name, books, winner }: RoomCardProps) {
  return (
    <>
      <div>{name}</div>
      <div>
        {books.map((book) => {
          return <div key={book.id}>{book.title}</div>;
        })}
      </div>
      <div>{winner}</div>
      <div>Created at Thu 12 Sep 2024</div>
    </>
  );
}
