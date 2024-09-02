import Button from './Button';

interface EligibleBooksProps {
  handleBookSelected: (id: number) => void;
}

export default function EligibleBooks({
  handleBookSelected,
}: EligibleBooksProps) {
  const bookTitles = [
    'Macunaíma, Mário de Andrade',
    'Dom Casmurro, Machado de Assis',
    'Dom quixote, Miguel de Cervantes',
    'Os Miseráveis, Victor Hugo',
    '1984, George Orwell',
  ];

  return (
    <div className="flex flex-col gap-3">
      {bookTitles.map((bookTitle, index) => (
        <Button
          key={index}
          text={bookTitle}
          id={index + 1}
          handleBookSelected={handleBookSelected}
        />
      ))}
    </div>
  );
}
