'use client';

import lobbyBanner from '../../../../public/images/lobby-background.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useIndicationRoomContext } from '@/contexts/IndicationRoomContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { indicationRoomSchema } from '@/utils/indications';
import { v4 as uuidv4 } from 'uuid';
import Loading from '@/components/Loading';

const newIndicationRoomFormSchema = z.object({
  name: z.string().min(3, { message: 'Must be 3 or more characters long' }),
  maxSuggestions: z.coerce
    .number()
    .max(30, { message: 'Must be 30 or less' })
    .positive(),
});
type NewIndicationRoomFormProps = z.infer<typeof newIndicationRoomFormSchema>;

export default function CreateIndicationRoom() {
  const router = useRouter();
  const { setIndicationRoom } = useIndicationRoomContext();
  const { user, isLoading } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIndicationRoomFormProps>({
    resolver: zodResolver(newIndicationRoomFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleCreateIndicationRoom = async (
    data: NewIndicationRoomFormProps,
  ) => {
    try {
      const roomId = uuidv4();
      const indicationRoomData = indicationRoomSchema.parse({
        name: data.name,
        id: roomId,
        maxSuggestions: data.maxSuggestions,
        suggestions: [],
        createdBy: user?.uid || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isCompleted: false,
        isVotingRoom: false,
      });

      await setIndicationRoom(roomId, indicationRoomData);

      router.push(`/indication/${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <Loading />;
  if (!user) return null;

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
          <div className="font-silk text-4xl">Indication</div>
          <div className="text-base">administer your rooms</div>
        </div>
      </div>

      <div className="flex flex-col justify-start px-6 py-9 font-light">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="font-silk text-3xl leading-none text-primary">
                <div>New Indication Room</div>
              </div>
              <div className="text-lg">
                <div>Complete de fields below to create a new room.</div>
              </div>
            </div>
            <div className="flex flex-col">
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div>
                      For which book club would you like to create this new
                      indication room?
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="e.g. Café com Letras"
                        className={`${errors.name ? 'border-2 border-red focus:border-red' : 'border-gray'} block w-full rounded-2xl bg-transparent px-3 py-4 outline-none placeholder:text-gray focus:outline-none focus:ring-0`}
                        {...register('name')}
                      />
                      {errors.name && (
                        <div className="mt-1">{errors.name.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div>
                      Specify the maximum number of suggestions that this room
                      is allowed to have:
                    </div>

                    <div>
                      <input
                        type="number"
                        placeholder="e.g. 20"
                        className={`${errors.maxSuggestions ? 'border-2 border-red focus:border-red' : 'border-gray'} block w-full rounded-2xl bg-transparent px-3 py-4 outline-none placeholder:text-gray focus:outline-none focus:ring-0`}
                        {...register('maxSuggestions')}
                      />
                      {errors.maxSuggestions && (
                        <div className="mt-1">
                          {errors.maxSuggestions.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={handleSubmit(handleCreateIndicationRoom)}
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
