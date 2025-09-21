import CreateVotingRoom from '@/components/CreateVotingRoom';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

export default function CreateVotingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateVotingRoom />
    </Suspense>
  );
}
