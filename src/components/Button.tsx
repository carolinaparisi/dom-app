interface ButtonProps {
  text: string;
  handleButton: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

export default function Button({ text, handleButton }: ButtonProps) {
  return (
    <button
      className="align-center flex w-full justify-center rounded-md bg-primary py-4 text-black"
      onClick={(event) => {
        handleButton(event);
      }}
    >
      {text}
    </button>
  );
}
