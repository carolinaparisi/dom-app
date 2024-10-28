'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import welcome from '../../../../public/images/welcome.png';
import Button from '@/components/Button';
import { useRoomContext } from '@/contexts/RoomContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Room, roomSchema } from '@/utils/rooms';
import { useCookies } from 'react-cookie';

const VotingPage = dynamic(() => import('../../../components/VotingPage'), {
  ssr: false,
});

const newGuestFormSchema = z.object({
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
});

type NewGuestFormProps = z.infer<typeof newGuestFormSchema>;

export default function WelcomeRoom({ params }: { params: { id: string } }) {
  const cookiesKey = `${process.env.NODE_ENV === 'production' ? `dom-guest-prod-${params.id}` : `dom-guest-local-${params.id}`}`;
  const { setRoom, subscribeToRoomUpdates, unsubscribeFromRoomUpdates } =
    useRoomContext();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([cookiesKey]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [isGuestRegistered, setIsGuestRegistered] = useState(false);

  useEffect(() => {
    const handleRoomUpdate = (room: Room | null) => {
      setCurrentRoom(room);
      if (room === null) {
        router.push('/pageNotFound');
      }

      const guestExist = room?.guests
        ?.map((guest) => guest.name)
        .includes(cookies[cookiesKey]);

      if (guestExist) {
        setIsGuestRegistered(guestExist);
        return;
      }

      removeCookie(cookiesKey);
    };

    subscribeToRoomUpdates(params.id, handleRoomUpdate);

    return () => {
      unsubscribeFromRoomUpdates(params.id);
    };
  }, [
    cookies,
    cookiesKey,
    params.id,
    removeCookie,
    router,
    subscribeToRoomUpdates,
    unsubscribeFromRoomUpdates,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<NewGuestFormProps>({
    resolver: zodResolver(newGuestFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleCreateGuest = async (data: NewGuestFormProps) => {
    const nameIsAvailable = currentRoom?.guests
      ?.map((guest) => guest.name.toLowerCase())
      .every((name) => name !== data.name.toLowerCase());

    if (nameIsAvailable || nameIsAvailable === undefined) {
      try {
        const updatedBooks = currentRoom?.books.map((book) => {
          return {
            ...book,
            votes: book.votes || [],
          };
        });

        const currentGuests = currentRoom?.guests || [];
        const nextId = (currentRoom?.guests?.length || 0) + 1;
        const newGuest = {
          id: nextId,
          name: data.name,
          isReady: false,
        };

        const roomData = roomSchema.parse({
          ...currentRoom,
          books: updatedBooks,
          winningBooks: currentRoom?.winningBooks || [],
          guests: [...currentGuests, newGuest],
        });

        await setRoom(params.id, roomData);
        setCurrentRoom(roomData);

        setCookie(cookiesKey, newGuest.name);
      } catch (error) {
        console.error('Error creating guest:', error);
      }
    }

    if (!nameIsAvailable) {
      setError('name', {
        message:
          'Alas! This guest is already in the room, choose another name, please.',
      });
      return;
    }
  };

  return isGuestRegistered && currentRoom ? (
    <VotingPage room={currentRoom} guestName={cookies[cookiesKey]} />
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
        {errors.name && <div className="mt-1">{errors.name.message}</div>}
        <input
          type="text"
          placeholder="Your name"
          className={` ${errors.name ? 'border-2 border-red focus:border-red' : 'border-gray_soft'} block w-full rounded-2xl bg-transparent py-4 pl-3 pr-20 outline-none placeholder:text-white focus:outline-none focus:ring-0`}
          {...register('name')}
        />
        <Button variant="primary" onClick={handleSubmit(handleCreateGuest)}>
          STEP FORWARD
        </Button>
      </div>
    </div>
  );
}
