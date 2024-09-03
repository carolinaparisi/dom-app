import { BookOpen } from 'lucide-react';
interface BookItemProps {
  text: string;
  id: number;
  handleBookSelected: () => void;
}

export default function BookItem({
  text,
  id,
  handleBookSelected,
}: BookItemProps) {
  return (
    <button
      className="max-w-fit rounded-md border border-black px-3 py-4 text-black"
      onClick={() => {
        handleBookSelected();
      }}
    >
      <div className="flex gap-2">
        <BookOpen />
        {text}
      </div>
    </button>
  );
}
