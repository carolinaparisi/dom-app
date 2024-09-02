interface ButtonProps {
  text: string;
  setIsRegistered?: (isRegistered: boolean) => void;
  id?: number;
}

export default function Button({ text, setIsRegistered, id }: ButtonProps) {
  const isSelected = false;

  const handleBookSelected = (id: number) => {
    console.log(`Book ${id} selected`);
  };

  //TODO: create logic to be green only if it has an id
  return (
    <button
      className="align-center flex w-full justify-center rounded-sm bg-primary py-4 text-black"
      onClick={() => {
        if (id) {
          handleBookSelected(id);
          return;
        }
        setIsRegistered && setIsRegistered(true);
      }}
    >
      {text}
    </button>
  );
}
