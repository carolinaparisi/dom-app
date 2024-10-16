interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'dashed';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({
  children,
  onClick,
  variant,
  ...props
}: ButtonProps) {
  const customButton = () => {
    switch (variant) {
      case 'primary':
        return `bg-white text-primary`;
      case 'secondary':
        return `bg-black text-white`;
      case 'tertiary':
        return `bg-primary text-white`;
      case 'dashed':
        return `border-2 border-dotted bg-gray_soft text-primary`;
    }
  };

  return (
    <button
      className={`${customButton()} align-center flex w-full justify-center rounded-2xl py-4 font-bold`}
      onClick={(event) => onClick && onClick(event)}
      {...props}
    >
      {children}
    </button>
  );
}
