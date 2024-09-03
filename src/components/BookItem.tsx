import { BookOpen } from 'lucide-react';
interface BookItemProps {
  text: string;
  id: number;
  handleBookSelected: (id: number) => void;
  isSelected: boolean;
}

export default function BookItem({
  text,
  id,
  handleBookSelected,
  isSelected,
}: BookItemProps) {
  return (
    <button
      className={
        isSelected
          ? 'max-w-fit rounded-md border border-black bg-black px-3 py-4 text-white'
          : 'max-w-fit rounded-md border border-black px-3 py-4 text-black'
      }
      onClick={() => {
        handleBookSelected(id);
      }}
    >
      <div className="flex gap-2">
        <BookOpen />
        {text}
      </div>
    </button>
  );
}
