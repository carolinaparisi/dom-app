import EligibleBooks from './EligibleBooks';
import NamesPool from './NamesPool';
import Header from './Header';

export default function VotingPage() {
  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="flex flex-col gap-4">
        <Header />
      </div>
      <div className="bg-gray">
        <EligibleBooks />
      </div>
      <div className="bg-black">
        <NamesPool />
      </div>
    </div>
  );
}
