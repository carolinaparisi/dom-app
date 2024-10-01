interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  dashed?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  dashed,
}: ButtonProps) {
  const custom =
    variant === 'primary' ? `bg-white text-primary` : `bg-black text-white`;

  return (
    <button
      className={
        dashed
          ? `align-center flex w-full justify-center rounded-2xl border-2 border-dotted bg-gray_soft py-4 font-bold text-primary`
          : `${custom} align-center flex w-full justify-center rounded-2xl py-4 font-bold`
      }
      onClick={(event) => onClick && onClick(event)}
    >
      {children}
    </button>
  );
}
