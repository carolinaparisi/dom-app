import { BookOpen } from 'lucide-react';
interface ButtonProps {
  text: string;
  setIsRegistered?: (isRegistered: boolean) => void;
  id?: number;
  handleBookSelected?: (id: number) => void;
}

export default function Button({
  text,
  setIsRegistered,
  id,
  handleBookSelected,
}: ButtonProps) {
  const isSelected = false;

  return (
    <button
      className={`${id ? `max-w-fit border border-black px-4` : `align-center flex w-full justify-center bg-primary`} rounded-md py-4 text-black`}
      onClick={() => {
        if (id) {
          handleBookSelected && handleBookSelected(id);
          return;
        }
        setIsRegistered && setIsRegistered(true);
      }}
    >
      {!id ? (
        text
      ) : (
        <div className="flex gap-3">
          <BookOpen />
          {text}
        </div>
      )}
    </button>
  );
}
