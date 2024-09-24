'use client';

import lobbyBanner from '../../../public/images/lobby-background.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  roomName: z
    .string()
    .min(3, { message: ' Must be 3 or more characters long' }),
  numberBooks: z.number().lte(3).positive(),
  bookName: z
    .string()
    .min(3, { message: ' Must be 3 or more characters long' }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function CreateRoom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleCreateRoom = () => {
    console.log('Room created!');
  };

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
                <div>New Room</div>
              </div>
              <div className="text-lg">
                <div>Complete de fields below to create a new room.</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <form className="flex flex-col gap-4">
                <div>
                  <div>
                    For which book club would you like to create this new room?
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="e.g. Café com Letras"
                      className={`${errors.roomName ? 'border-2 border-red focus:border-red' : 'border-gray'} block w-full rounded-2xl bg-transparent px-3 py-4 outline-none placeholder:text-gray focus:outline-none focus:ring-0`}
                      {...register('roomName')}
                    />
                    {errors.roomName && (
                      <div className="mt-1">{errors.roomName.message}</div>
                    )}
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={handleSubmit(handleCreateRoom)}
                >
                  CREATE ROOM
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
