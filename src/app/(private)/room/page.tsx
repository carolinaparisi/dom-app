'use client';

import votingRoom from '../../../../public/images/votingRoom.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVotingRoomContext } from '@/contexts/VotingRoomContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { votingRoomSchema } from '@/utils/rooms';
import { v4 as uuidv4 } from 'uuid';
import Loading from '@/components/Loading';
import { IndicationRoom } from '@/utils/indications';
import { useIndicationRoomContext } from '@/contexts/IndicationRoomContext';

const newRoomFormSchema = z
  .object({
    name: z.string().min(3, { message: 'Must be 3 or more characters long' }),
    maxBooks: z.coerce.number().lte(3).positive(),
    titles: z
      .array(
        z.object({
          title: z
            .string()
            .min(3, { message: 'Must be 3 or more characters long' }),
        }),
      )
      .min(2, { message: 'Must have at least 2 books to be voted on' }),
  })
  .refine(
    (value) => {
      if (value.titles.length === 2 && value.maxBooks !== 1) {
        return false;
      }
      if (
        value.titles.length === 3 &&
        !(value.maxBooks === 1 || value.maxBooks === 2)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'For 2 books, choose 1. For 3 books, choose 1 or 2, please.',
      path: ['maxBooks'],
    },
  );

type NewRoomFormProps = z.infer<typeof newRoomFormSchema>;

export default function CreateVotingRoom() {
  const {
    subscribeToIndicationRoomUpdates,
    unsubscribeFromIndicationRoomUpdates,
  } = useIndicationRoomContext();

  const searchParams = useSearchParams();
  const paramId = searchParams.get('indicationRoomId');
  const router = useRouter();

  const [previousIndicationRoom, setPreviousIndicationRoom] =
    useState<IndicationRoom | null>(null);
  const [isLoadingRoom, setIsLoadingRoom] = useState(true);
  const { setVotingRoom } = useVotingRoomContext();
  const { user, isLoading } = useAuthContext();
  const hasSetData = useRef(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewRoomFormProps>({
    resolver: zodResolver(newRoomFormSchema),
    defaultValues: {
      name: '',
      titles: [{ title: '' }, { title: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'titles',
  });

  const handleCreateRoom = async (data: NewRoomFormProps) => {
    try {
      const roomId = uuidv4();

      const books = data.titles.map((book, index) => ({
        id: index + 1,
        title: book.title,
        votes: [],
      }));

      const roomData = votingRoomSchema.parse({
        name: data.name,
        id: roomId,
        maxBooks: data.maxBooks,
        books,
        winningBooks: [],
        guests: [],
        createdBy: user?.uid || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVotingRoom: true,
      });

      await setVotingRoom(roomId, roomData);

      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleAddTitle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    append({ title: '' });
  };

  useEffect(() => {
    if (paramId) {
      const handleRoomUpdate = (room: IndicationRoom | null) => {
        setPreviousIndicationRoom(room);
        setIsLoadingRoom(false);
      };
      subscribeToIndicationRoomUpdates(paramId, handleRoomUpdate);
      return () => {
        unsubscribeFromIndicationRoomUpdates(paramId);
      };
    } else {
      setIsLoadingRoom(false);
    }

    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [
    user,
    isLoading,
    router,
    subscribeToIndicationRoomUpdates,
    unsubscribeFromIndicationRoomUpdates,
    paramId,
  ]);

  useEffect(() => {
    if (previousIndicationRoom && !hasSetData.current) {
      setValue('name', previousIndicationRoom.name);

      const bookTitles = previousIndicationRoom.suggestions.map(
        (suggestion) => ({
          title: suggestion.book.title.split(',')[0],
        }),
      );

      setValue('titles', bookTitles);
      hasSetData.current = true;
    }
  }, [previousIndicationRoom, setValue]);

  if (isLoading) return <Loading />;
  if (!user) return null;
  if (isLoadingRoom) return <Loading />;

  return (
    <div className="min-h-screen bg-gray_soft">
      <div className="relative">
        <Image
          alt=""
          src={votingRoom}
          className="w-full"
          quality={100}
          priority
        />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-gray_soft">
          <div className="font-silk text-4xl">Voting</div>
          <div className="text-base">administer your rooms</div>
        </div>
      </div>

      <div className="flex flex-col justify-start px-6 py-9 font-light">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="font-silk text-3xl leading-none text-primary">
                <div>New Voting Room</div>
              </div>
              <div className="text-lg">
                <div>Complete the fields below to create a new room.</div>
              </div>
            </div>
            <div className="flex flex-col">
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div>
                      For which book club would you like to create this new
                      room?
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="e.g. Café com Letras"
                        className={`${errors.name ? 'border-2 border-red focus:border-red' : 'border-gray'} block w-full rounded-2xl bg-transparent px-3 py-4 outline-none placeholder:text-gray focus:outline-none focus:ring-0`}
                        {...register('name')}
                      />
                      {errors.name && (
                        <div className="mt-1 text-red">
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div>
                      Specify the maximum number of books that guests are
                      allowed to select:
                    </div>

                    <div>
                      <input
                        type="number"
                        placeholder="e.g. 3"
                        className={`${errors.maxBooks ? 'border-2 border-red focus:border-red' : 'border-gray'} block w-full rounded-2xl bg-transparent px-3 py-4 outline-none placeholder:text-gray focus:outline-none focus:ring-0`}
                        {...register('maxBooks')}
                      />
                      {errors.maxBooks && (
                        <div className="mt-1 text-red">
                          {errors.maxBooks.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div>
                      Add the books to be voted on, at least 2. If necessary,
                      add additional fields.
                    </div>
                    <div className="flex flex-col gap-2">
                      {fields.map((field, index) => {
                        return (
                          <div key={field.id}>
                            <div className="flex items-center gap-1">
                              <input
                                key={field.id}
                                type="text"
                                placeholder={`Book ${index + 1}`}
                                className={`${errors.titles && errors.titles[index] ? 'border-2 border-red focus:border-red' : 'border-gray'} relative block w-full rounded-2xl bg-transparent px-3 py-4 pr-12 outline-none placeholder:text-gray focus:outline-none focus:ring-0`}
                                {...register(`titles.${index}.title`)}
                              />
                              <Trash
                                className="absolute right-10 cursor-pointer"
                                onClick={() => {
                                  remove(index);
                                }}
                              />
                            </div>

                            {errors.titles?.[index]?.title && (
                              <div className="mt-1 text-red">
                                {errors.titles[index].title.message}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <Button variant="dashed" onClick={handleAddTitle}>
                        ADD BOOK FIELD
                      </Button>
                    </div>
                    {errors.titles && (
                      <div className="mt-1 text-red">
                        {errors.titles.message}
                      </div>
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
