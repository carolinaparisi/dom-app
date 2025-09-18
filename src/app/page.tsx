'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import lobby from '../../public/images/lobby.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { useVotingRoomContext } from '@/contexts/VotingRoomContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';
import RoomCard, { RoomCardProps } from '@/components/RoomCard';
import Loading from '@/components/Loading';
import { useIndicationRoomContext } from '@/contexts/IndicationRoomContext';

export default function Lobby() {
  const { user, isLoading } = useAuthContext();
  const { getAllIndicationRooms } = useIndicationRoomContext();
  const { getAllVotingRooms } = useVotingRoomContext();
  const [rooms, setRooms] = useState<RoomCardProps[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login');
    }

    if (user && rooms === null) {
      const allRooms: RoomCardProps[] = [];

      Promise.all([
        getAllVotingRooms(user.uid),
        getAllIndicationRooms(user.uid),
      ]).then(([votingRooms, indicationRooms]) => {
        Object.values(votingRooms).forEach((room) => {
          allRooms.push({
            id: room.id,
            name: room.name,
            books: room.books,
            winner: room.winningBooks || null,
            createdAt: room.createdAt,
            isVotingRoom: room.isVotingRoom,
          });
        });

        Object.values(indicationRooms).forEach((room) => {
          allRooms.push({
            id: room.id,
            name: room.name,
            books: room.suggestions?.map((s) => s.book) || [],
            winner: null,
            createdAt: room.createdAt,
            isVotingRoom: room.isVotingRoom,
            isCompleted: room.isCompleted,
          });
        });

        setRooms(
          allRooms.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );

        console.log('rooms in lobby:', allRooms);
      });
    }
  }, [
    user,
    isLoading,
    router,
    getAllVotingRooms,
    rooms,
    getAllIndicationRooms,
  ]);

  if (isLoading) return <Loading />;
  if (!user) return null;

  const handleCreateVotingRoom = () => {
    router.push('/room');
  };

  const handleCreateIndicationRoom = () => {
    router.push('/indication');
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray_soft">
      <div className="relative">
        <Image
          alt="main lobby banner"
          src={lobby}
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
              {rooms?.map((room, index) => {
                return (
                  <RoomCard
                    key={index}
                    name={room.name}
                    id={room.id}
                    books={room.books}
                    winner={room.winner}
                    createdAt={room.createdAt}
                    isVotingRoom={room.isVotingRoom}
                    isCompleted={room.isCompleted}
                    testId={'main-room-card'}
                  />
                );
              })}
            </div>
            <div className="flex gap-4">
              <Button onClick={handleCreateIndicationRoom} variant="secondary">
                <div>NEW INDICATION</div>
              </Button>
              <Button onClick={handleCreateVotingRoom} variant="secondary">
                <div>NEW VOTING</div>
              </Button>
            </div>
            <div className="mt-6">
              <Button onClick={handleLogout} variant="dashed">
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
