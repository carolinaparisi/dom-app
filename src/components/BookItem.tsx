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
      className={`${
        isSelected ? `bg-primary text-white` : `bg-gray text-white`
      } w-full rounded-2xl border-gray px-6 py-4`}
      onClick={() => {
        handleBookSelected(id);
      }}
    >
      <div className="flex items-center gap-2">
        <BookOpen />
        {text}
      </div>
    </button>
  );
}
