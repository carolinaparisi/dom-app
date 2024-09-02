import EligibleBooks from './EligibleBooks';
import NamesPool from './NamesPool';
import Header from './Header';
import { useState } from 'react';

export default function VotingPage() {
  const [isSelected, setIsSelected] = useState(false);

  const handleBookSelected = (id: number) => {
    console.log(`Book ${id} selected`);
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-4">
        <Header />
      </div>
      <div>
        <EligibleBooks handleBookSelected={handleBookSelected} />
      </div>
      <div className="bg-black">
        <NamesPool />
      </div>
    </div>
  );
}
