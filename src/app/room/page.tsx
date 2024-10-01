'use client';

import lobbyBanner from '../../../public/images/lobby-background.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

export default function CreateRoom() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRoomProps>({
    resolver: zodResolver(newRoomSchema),
    defaultValues: {
      name: '',
      titles: [{ title: '' }, { title: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'titles',
  });

  const handleCreateRoom = (data: NewRoomProps) => {
    console.log('Room created!', data);
    router.push('/room/2');
  };

  const handleAddTitle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    append({ title: '' });
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
                            <div className="flex items-center gap-1">
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

                      <Button onClick={handleAddTitle} dashed={true}>
                        ADD
                      </Button>
                    </div>
                    {errors.titles && (
                      <div className="mt-1 text-red">
                        {errors.titles.root?.message}
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
