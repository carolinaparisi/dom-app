import Button from './Button';

export default function EligibleBooks() {
  const bookTitles = [
    'Macunaíma, Mário de Andrade',
    'Dom Casmurro, Machado de Assis',
    'Dom quixote, Miguel de Cervantes',
    'Os Miseráveis, Victor Hugo',
    '1984, George Orwell',
  ];

  return (
    <div>
      {bookTitles.map((bookTitle, index) => (
        <Button key={index} text={bookTitle} id={index + 1} />
      ))}
    </div>
  );
}
