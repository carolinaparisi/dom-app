interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
  handleButton: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

export default function Button({
  text,
  handleButton,
  variant = 'primary',
}: ButtonProps) {
  const custom =
    variant === 'primary' ? `bg-white text-primary` : `bg-black text-white`;

  return (
    <button
      className={`${custom} align-center flex w-full justify-center rounded-2xl py-4 font-bold`}
      onClick={(event) => {
        handleButton(event);
      }}
    >
      {text}
    </button>
  );
}
