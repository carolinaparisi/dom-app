interface BookItemProps {
  text: string;
  id: number;
  handleBookSelected: () => void;
}

export default function BookItem({
  text,
  id,
  handleBookSelected,
}: BookItemProps) {
  return (
    <button
      className="max-w-fit rounded-md border border-black px-4 py-4 text-black"
      onClick={() => {
        if (id) {
          handleBookSelected();
          return;
        }
      }}
    >
      {text}
    </button>
  );
}
