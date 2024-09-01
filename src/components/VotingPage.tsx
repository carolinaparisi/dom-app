import EligibleBooks from './EligibleBooks';
import NamesPool from './NamesPool';
import Title from './Title';

export default function VotingPage() {
  return (
    <div className="h-dvh">
      <div className="h-1/3 bg-primary">
        <Title />
      </div>
      <div className="h-1/3 bg-gray">
        <EligibleBooks />
      </div>
      <div className="h-1/3 bg-black">
        <NamesPool />
      </div>
    </div>
  );
}
