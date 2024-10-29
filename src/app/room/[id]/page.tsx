'use client';

import lobbyBanner from '../../../../public/images/lobby-background.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useRoomContext } from '@/contexts/RoomContext';
import { useEffect, useState } from 'react';
import { Room, roomSchema } from '@/utils/rooms';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const newRoomSchema = z
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

type NewRoomProps = z.infer<typeof newRoomSchema>;

export default function EditRoom({ params }: { params: { id: string } }) {
  const router = useRouter();
  const {
    setRoom,
    deleteRoom,
    subscribeToRoomUpdates,
    unsubscribeFromRoomUpdates,
  } = useRoomContext();
  const [initialRoom, setInitialRoom] = useState<Room | null>(null);
  const baseVotingUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_VOTING_URL
      : 'http://localhost:3000';

  useEffect(() => {
    const handleRoomUpdate = (room: Room | null) => {
      setInitialRoom(room);
    };
    subscribeToRoomUpdates(params.id, handleRoomUpdate);
    return () => {
      unsubscribeFromRoomUpdates(params.id);
    };
  }, [params.id, subscribeToRoomUpdates, unsubscribeFromRoomUpdates]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRoomProps>({
    resolver: zodResolver(newRoomSchema),
    values: {
      name: initialRoom?.name || '',
      maxBooks: initialRoom?.maxBooks || 0,
      titles:
        initialRoom?.books.map((book) => {
          return {
            title: `${book.title}`,
          };
        }) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'titles',
  });

  const handleAddTitle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    append({ title: '' });
  };

  const handleEditRoom = async (data: NewRoomProps) => {
    const updatedBooks = data.titles.map((book, index) => {
      return {
        id: index + 1,
        title: book.title,
        votes: [],
      };
    });

    const updatedGuests = initialRoom?.guests.map((guest) => {
      return {
        ...guest,
        isReady: false,
      };
    });

    const updatedData = roomSchema.parse({
      name: data.name,
      id: params.id,
      maxBooks: data.maxBooks,
      books: updatedBooks,
      winningBooks: initialRoom?.winningBooks,
      guests: updatedGuests,
      createdBy: initialRoom?.createdBy,
      createdAt: initialRoom?.createdAt,
      updatedAt: new Date().toISOString(),
    });

    await setRoom(params.id, updatedData);
    router.push('/');
  };

  const handleDeleteRoom = async () => {
    await deleteRoom(params.id);

    router.push('/');
  };

  const handleDeleteGuest = (id: number) => {
    console.log(`Guest ${id} clicked!`);
  };

  const handleRevealBook = () => {
    console.log('Book revealed!');
  };

  const handleCopyUrl = () => {
    const url = `${baseVotingUrl}/voting/${params.id}`;

    navigator.clipboard.writeText(url).then(() => {
      toast.success('URL copied to clipboard!');
    });
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
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-8 text-gray_soft">
          <div className="line-clamp-1 break-all text-center font-silk text-4xl">
            {initialRoom?.name}
          </div>
          <div className="text-base">administer your room</div>
        </div>
      </div>

      <div className="flex flex-col justify-start px-6 py-9 font-light">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-6 text-lg">
                <div>
                  Amend room&apos;s details and copy the sharing link below:
                </div>
                <div className="flex">
                  <input
                    disabled
                    value={`${baseVotingUrl}/voting/${params.id}`}
                    className="w-3/4 border-primary bg-blue_super_light py-4"
                    type="text"
                  />
                  <Toaster position="top-center" richColors />
                  <button
                    onClick={handleCopyUrl}
                    className="w-1/4 bg-primary py-4 text-xs font-bold text-white"
                  >
                    COPY URL
                  </button>
                </div>
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
                        <div className="mt-1">{errors.name.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
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
                        <div className="mt-1">{errors.maxBooks.message}</div>
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
                            <div className="flex items-center gap-2">
                              <input
                                key={field.id}
                                type="text"
                                placeholder={`Book ${index + 1}`}
                                className={`${errors.titles && errors.titles[index] ? 'border-2 border-red focus:border-red' : 'border-gray'} block w-full rounded-2xl bg-transparent px-3 py-4 outline-none placeholder:text-gray focus:outline-none focus:ring-0`}
                                {...register(`titles.${index}.title`)}
                              />
                              <Trash
                                onClick={() => {
                                  remove(index);
                                }}
                              />
                            </div>

                            {errors.titles?.[index]?.title && (
                              <div className="mt-1">
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
                        {errors.titles.root?.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <Button
                      variant="secondary"
                      onClick={handleSubmit(handleEditRoom)}
                    >
                      UPDATE ROOM
                    </Button>

                    <AlertDialog.Root>
                      <AlertDialog.Trigger asChild>
                        <Button variant="primary">DELETE ROOM</Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                          <AlertDialog.Title className="m-0 text-[17px] font-medium text-black">
                            Are you absolutely sure?
                          </AlertDialog.Title>
                          <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-black">
                            This action cannot be undone. This will permanently
                            delete this room and remove its data from our
                            servers.
                          </AlertDialog.Description>
                          <div className="flex justify-end gap-[25px]">
                            <AlertDialog.Cancel asChild>
                              <button className="inline-flex h-[35px] items-center justify-center rounded-xl border border-black bg-white px-4 py-6 font-medium leading-none text-black outline-none">
                                Cancel
                              </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                              <button
                                onClick={handleDeleteRoom}
                                className="inline-flex h-[35px] items-center justify-center rounded-xl border border-black bg-black px-4 py-6 font-medium leading-none text-white outline-none"
                              >
                                Yes, delete room
                              </button>
                            </AlertDialog.Action>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog.Root>
                  </div>

                  <div>
                    <div className="flex flex-col gap-2">
                      {/* Header */}
                      <div className="font-silk text-2xl leading-none text-primary">
                        <div>Guests present in this room</div>
                      </div>
                      <div className="text-lg">
                        <div>
                          Dear host, if needed, please click on the guest you
                          would like to remove from this voting session
                        </div>
                      </div>
                      {/* NamesPool */}
                      <div className="flex flex-wrap gap-2 text-white">
                        {initialRoom?.guests?.map((guest) => (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteGuest(guest.id);
                            }}
                            key={guest.id}
                          >
                            <span
                              className={` ${
                                guest.isReady ? `bg-primary` : `bg-gray`
                              } inline-flex items-center rounded-2xl px-3 py-1 text-lg`}
                            >
                              {guest.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="tertiary"
                    onClick={handleSubmit(handleRevealBook)}
                  >
                    REVEAL THE WINNING BOOK
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
