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
  const { getRoom, setRoom } = useRoomContext();
  const [initialRoom, setInitialRoom] = useState<Room | null>(null);
  const baseVotingUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_VOTING_URL
      : 'http://localhost:3000';

  useEffect(() => {
    (async function fetchRoom() {
      const room = await getRoom(params.id);
      setInitialRoom(room);
    })();
  }, [getRoom, params.id]);

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
        votes: 0,
      };
    });

    const updatedData = roomSchema.parse({
      name: data.name,
      id: params.id,
      maxBooks: data.maxBooks,
      books: updatedBooks,
      winningBooks: null,
      guests: [],
      createdBy: initialRoom?.createdBy,
      createdAt: initialRoom?.createdAt,
      updatedAt: new Date().toISOString(),
    });

    await setRoom(params.id, updatedData);
    router.push('/');
  };

  /*   const handleDeleteRoom = async () => {
    console.log('handleDeleteRoom clicked!');

         await deleteRoom(params.id);

    router.push('/'); 
  }; */

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
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-gray_soft">
          <div className="whitespace-nowrap font-silk text-4xl">
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
              <div className="font-silk text-3xl leading-none text-primary">
                {/* <div>{`${initialRooms[Number(roomId)].name}'s Room`}</div> */}
              </div>
              <div className="flex flex-col gap-5 text-lg">
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
                        {/*                         <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                          Delete account
                        </button> */}

                        <Button variant="primary">DELETE ROOM</Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                            Are you absolutely sure?
                          </AlertDialog.Title>
                          <AlertDialog.Description className="text-mauve11 mb-5 mt-[15px] text-[15px] leading-normal">
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialog.Description>
                          <div className="flex justify-end gap-[25px]">
                            <AlertDialog.Cancel asChild>
                              <button className="bg-mauve4 text-mauve11 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                Cancel
                              </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                              <button className="bg-red4 text-red11 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                Yes, delete account
                              </button>
                            </AlertDialog.Action>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog.Root>
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
