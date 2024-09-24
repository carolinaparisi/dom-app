'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import lobbyBanner from '../../public/images/lobby-background.png';
import Image from 'next/image';
import Button from '@/components/Button';
import RoomCard from '@/components/RoomCard';
import { initialRooms } from '@/utils/rooms';
import Link from 'next/link';

export default function Lobby() {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return null;

  /*   const handleLogout = async () => {
    await signOut();
  }; */

  return (
    <div className="min-h-screen bg-gray_soft">
      <div className="relative">
        <Image
          alt=""
          src={lobbyBanner}
          className="w-full"
          quality={100}
          priority
        />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-gray_soft">
          <div className="font-silk text-4xl">Lobby</div>
          <div className="text-base">administer your rooms</div>
        </div>
      </div>

      <div className="flex flex-col justify-start px-6 py-9 font-light">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="font-silk text-3xl leading-none text-primary">
                <div>Rooms</div>
              </div>
              <div className="text-lg">
                <div>
                  Behold the most recent rooms you have crafted, or forge a new
                  one.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {initialRooms.map((room) => {
                return (
                  <RoomCard
                    key={room.id}
                    name={room.name}
                    books={room.books}
                    winner={room.books[1].title}
                  />
                );
              })}
            </div>
            <Link href={'/room'}>
              <Button variant="secondary">CREATE A NEW ONE</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
