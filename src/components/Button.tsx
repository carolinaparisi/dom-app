interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  const custom =
    variant === 'primary' ? `bg-white text-primary` : `bg-black text-white`;

  return (
    <button
      className={`${custom} align-center flex w-full justify-center rounded-2xl py-4 font-bold`}
      onClick={(event) => onClick && onClick(event)}
    >
      {children}
    </button>
  );
}
