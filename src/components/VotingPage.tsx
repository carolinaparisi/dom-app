import EligibleBooks from './EligibleBooks';
import NamesPool from './NamesPool';
import Header from './Header';

export default function VotingPage() {
  return (
    <div className="p-3">
      <div className="bg-primary">
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
