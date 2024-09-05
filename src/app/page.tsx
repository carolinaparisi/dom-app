'use client';
import Image from 'next/image';
import background from '../../public/assets/background.png';
import MainSection from '@/components/MainSection';
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
    <div className="h-dvh">
      <div className="relative h-1/2">
        <Image alt="" src={background} fill className="object-cover" priority />
      </div>
      <div className="flex h-1/2 flex-col justify-between p-5">
        <MainSection />
        <Button handleButton={handleButton} text="Get Started" />
      </div>
    </div>
  );
}
