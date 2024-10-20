'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import welcome from '../../../../public/images/welcome.png';
import Button from '@/components/Button';
import VotingPage from '@/components/VotingPage';
import { useRoomContext } from '@/contexts/RoomContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { roomSchema } from '@/utils/rooms';

const newGuestFormSchema = z.object({
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
});

type NewGuestFormProps = z.infer<typeof newGuestFormSchema>;

export default function WelcomeRoom({ params }: { params: { id: string } }) {
  const { getRoom, setRoom } = useRoomContext();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    (async () => {
      const room = await getRoom(params.id);
      if (room === null) {
        router.push('/pageNotFound');
      }
    })();
  }, [router, getRoom, params.id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewGuestFormProps>({
    resolver: zodResolver(newGuestFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleCreateGuest = async (data: NewGuestFormProps) => {
    try {
      const room = await getRoom(params.id);

      const currentGuests = room?.guests || [];
      const winningBooks = room?.winningBooks || [];
      const nextId = (room?.guests?.length || 0) + 1;

      const roomData = roomSchema.parse({
        ...room,
        winningBooks,
        guests: [
          ...currentGuests,
          {
            id: nextId,
            name: data.name,
            isReady: false,
          },
        ],
      });

      await setRoom(params.id, roomData);

      setIsRegistered(true);
    } catch (error) {
      console.error('Error creating guest:', error);
    }
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
      <div className="absolute inset-x-0 bottom-0 flex w-full flex-col gap-3 p-6 text-white">
        <input
          type="text"
          placeholder="Your name"
          className={` ${errors.name ? 'border-2 border-red focus:border-red' : 'border-gray_soft'} block w-full rounded-2xl bg-transparent py-4 pl-3 pr-20 outline-none placeholder:text-white focus:outline-none focus:ring-0`}
          {...register('name')}
        />
        {errors.name && <div className="mt-1">{errors.name.message}</div>}

        <Button variant="primary" onClick={handleSubmit(handleCreateGuest)}>
          STEP FORWARD
        </Button>
      </div>
    </div>
  );
}
