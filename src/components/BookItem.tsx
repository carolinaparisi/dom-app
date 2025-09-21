import { BookOpen } from 'lucide-react';

interface BookItemProps {
  text: string;
  id: number;
  handleBookSelected: (id: number) => void;
  votes: string[] | null;
  guestName: string;
}

export default function BookItem({
  text,
  id,
  handleBookSelected,
  votes,
  guestName,
}: BookItemProps) {
  return (
    <button
      data-testid="book-item"
      className={`${
        votes?.includes(guestName)
          ? `bg-primary text-white`
          : `bg-gray text-white`
      } w-full rounded-2xl border-gray px-6 py-4`}
      onClick={() => {
        handleBookSelected(id);
      }}
    >
      <div data-testid="title-div" className="flex items-center gap-2">
        <BookOpen className="shrink-0" />
        <div className="min-w-0 truncate">{text}</div>
      </div>
    </button>
  );
}
