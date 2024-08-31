import { toPascalCase } from '@/utils/formatter';

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <button className="align-center flex w-full justify-center rounded-s bg-primary py-4 text-black">
      {toPascalCase(text)}
    </button>
  );
}
