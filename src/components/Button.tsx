import { BookOpen } from 'lucide-react';
interface ButtonProps {
  text: string;
  setIsRegistered: (isRegistered: boolean) => void;
}

export default function Button({ text, setIsRegistered }: ButtonProps) {
  const isSelected = false;

  return (
    <button
      className="align-center flex w-full justify-center rounded-md bg-primary py-4 text-black"
      onClick={() => {
        setIsRegistered && setIsRegistered(true);
      }}
    >
      {text}
    </button>
  );
}
