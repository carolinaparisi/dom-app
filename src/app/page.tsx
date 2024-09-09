'use client';
import Image from 'next/image';
import welcome from '../../public/assets/images/welcome.png';
import Button from '@/components/Button';
import { useState } from 'react';
import VotingPage from '@/components/VotingPage';

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleButton = () => {
    setIsRegistered(true);
  };

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
      <div className="absolute inset-x-0 bottom-0 flex w-full flex-col gap-3 p-6">
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          className="block w-full rounded-2xl border-gray_soft bg-transparent py-4 pl-3 pr-20 placeholder:text-white"
        />
        <Button handleButton={handleButton}>STEP FOWARD</Button>
      </div>
    </div>
  );
}
