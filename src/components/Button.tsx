import { toPascalCase } from '@/utils/formatter';

interface ButtonProps {
  text: string;
  setIsRegistered: (isRegistered: boolean) => void;
}

export default function Button({ text, setIsRegistered }: ButtonProps) {
  return (
    <button
      className="align-center flex w-full justify-center rounded-sm bg-primary py-4 text-black"
      onClick={() => {
        setIsRegistered(true);
      }}
    >
      {toPascalCase(text)}
    </button>
  );
}
