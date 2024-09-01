import { toPascalCase } from '@/utils/formatter';

interface ButtonProps {
  text: string;
  isClicked: boolean;
  setClicked: (isClicked: boolean) => void;
}

export default function Button({ text, setClicked, isClicked }: ButtonProps) {
  return (
    <button
      className="align-center flex w-full justify-center rounded-sm bg-primary py-4 text-black"
      onClick={() => {
        setClicked(!isClicked);
      }}
    >
      {toPascalCase(text)}
    </button>
  );
}
