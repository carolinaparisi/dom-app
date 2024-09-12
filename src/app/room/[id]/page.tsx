'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import welcome from '../../../../public/images/welcome.png';
import Button from '@/components/Button';
import VotingPage from '@/components/VotingPage';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

export default function Room() {
  const router = useRouter();
  const { user, isLoading } = useAuthContext();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleButton = () => {
    setIsRegistered(true);
  };

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return null;

  return isRegistered ? (
    <VotingPage />
  ) : (
    <div className="relative h-dvh">
      <Image
        alt=""
        src={welcome}
        className="w-full object-cover"
        priority
        quality={100}
        fill
      />
      <div className="absolute bottom-1/2 w-full overflow-hidden font-silk text-8xl text-white">
        <div className="-translate-x-7">Welcome</div>
        <div className="flex translate-x-3 justify-end">to Dom</div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex w-full flex-col gap-3 p-6 text-white">
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          className="block w-full rounded-2xl border-gray_soft bg-transparent py-4 pl-3 pr-20 placeholder:text-white"
        />
        <Button handleButton={handleButton}>STEP FORWARD</Button>
      </div>
    </div>
  );
}
