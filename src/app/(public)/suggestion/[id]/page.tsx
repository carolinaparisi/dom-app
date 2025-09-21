'use client';

import suggestion from '../../../../../public/images/suggestion.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useIndicationRoomContext } from '@/contexts/IndicationRoomContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loading from '@/components/Loading';
import { IndicationRoom } from '@/utils/indications';
import { Suggestion } from '@/utils/suggestions';

const newSuggestionRoomFormSchema = z.object({
  guestName: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' }),
  bookSuggestion: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' }),
});
type NewSuggestionRoomFormProps = z.infer<typeof newSuggestionRoomFormSchema>;

export default function SuggestionRoom({ params }: { params: { id: string } }) {
  const [currentRoom, setCurrentRoom] = useState<IndicationRoom | null>(null);
  const [guestHasIndicated, setGuestHasIndicated] = useState(false);
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const isFormEnabled =
    currentRoom?.maxSuggestions !== currentRoom?.suggestions?.length;

  const isIndicationsCompleted = currentRoom?.isCompleted;

  const router = useRouter();
  const {
    subscribeToIndicationRoomUpdates,
    unsubscribeFromIndicationRoomUpdates,
    setIndicationRoom,
  } = useIndicationRoomContext();
  const { user, isLoading } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewSuggestionRoomFormProps>({
    resolver: zodResolver(newSuggestionRoomFormSchema),
    defaultValues: {
      guestName: '',
    },
  });

  const handleIndicateBook = async (data: NewSuggestionRoomFormProps) => {
    if (!currentRoom) {
      return;
    }

    if (isIndicationsCompleted) {
      return;
    }

    const guestExist = currentRoom.suggestions
      ?.map((suggestion) => suggestion.guestName.toLowerCase())
      .includes(data.guestName.toLowerCase());

    if (guestExist) {
      setGuestHasIndicated(guestExist);
      return;
    }

    const lastBookId =
      currentRoom.suggestions?.[currentRoom.suggestions.length - 1]?.book.id ??
      0;

    const newSuggestion: Suggestion = {
      id: uuidv4(),
      guestName: data.guestName,
      book: {
        id: lastBookId + 1,
        title: data.bookSuggestion,
        votes: [],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const indicationRoomData: IndicationRoom = {
        ...(currentRoom as IndicationRoom),
        suggestions: [
          ...(currentRoom.suggestions?.filter(Boolean) ?? []),
          newSuggestion,
        ],
      };

      setSuggestionSubmitted(true);
      await setIndicationRoom(currentRoom.id, indicationRoomData);
      reset();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  useEffect(() => {
    const handleRoomUpdate = (room: IndicationRoom | null) => {
      setCurrentRoom(room);
      if (room === null) {
        router.push('/pageNotFound');
      }
    };

    subscribeToIndicationRoomUpdates(params.id, handleRoomUpdate);

    return () => {
      unsubscribeFromIndicationRoomUpdates(params.id);
    };
  }, [
    params.id,
    router,
    subscribeToIndicationRoomUpdates,
    unsubscribeFromIndicationRoomUpdates,
  ]);

  if (isLoading) return <Loading />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray_soft">
      <div className="relative">
        <Image
          alt=""
          src={suggestion}
          className="w-full"
          quality={100}
          priority
        />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-gray_soft">
          <div className="whitespace-nowrap font-silk text-4xl">
            Suggestion Room
          </div>
          <div className="text-center">Created by {currentRoom?.name}</div>
        </div>
      </div>

      <div className="flex flex-col justify-start px-6 py-9 font-light">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="font-silk text-3xl leading-none text-primary">
                <div>Book Indication</div>
              </div>
              <div className="text-lg">
                <div>Dear guest, make your wonderful suggestion!</div>
              </div>
            </div>
            <div className="flex flex-col">
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div>Guest name:</div>

                    <div>
                      <input
                        type="text"
                        placeholder="e.g. Carolina Parisi"
                        className={`${errors.guestName ? 'border-2 border-red focus:border-red' : 'border-gray'} block w-full rounded-2xl bg-transparent px-3 py-4 outline-none placeholder:text-gray focus:outline-none focus:ring-0`}
                        {...register('guestName', {
                          onChange: () => setGuestHasIndicated(false),
                          disabled:
                            !isFormEnabled ||
                            isIndicationsCompleted ||
                            suggestionSubmitted,
                        })}
                      />
                      {errors.guestName && (
                        <div className="mt-1">{errors.guestName.message}</div>
                      )}
                    </div>
                    {guestHasIndicated ? (
                      <div className="font-semibold">
                        You have indicated already!
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div>Book name:</div>
                    <div>Book&apos;s title, author&apos;s name</div>

                    <div>
                      <input
                        type="text"
                        placeholder="e.g. Jane Eyre, Charlotte Brontë"
                        className={`${errors.bookSuggestion ? 'border-2 border-red focus:border-red' : 'border-gray'} block w-full rounded-2xl bg-transparent px-3 py-4 outline-none placeholder:text-gray focus:outline-none focus:ring-0`}
                        {...register('bookSuggestion', {
                          disabled:
                            !isFormEnabled ||
                            isIndicationsCompleted ||
                            suggestionSubmitted,
                        })}
                      />
                      {errors.bookSuggestion && (
                        <div className="mt-1">
                          {errors.bookSuggestion.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  isAvailable={
                    !isIndicationsCompleted &&
                    isFormEnabled &&
                    !suggestionSubmitted
                  }
                  variant={'secondary'}
                  onClick={handleSubmit(handleIndicateBook)}
                >
                  SUBMIT INDICATION
                </Button>
                {suggestionSubmitted ? (
                  <>
                    <div className="text-green text-center text-lg font-semibold">
                      We are delighted by your participation!
                    </div>
                    <div className="text-center text-black">
                      Contact the hosts directly if you want to change your
                      indication.
                    </div>
                  </>
                ) : isIndicationsCompleted ? (
                  <div className="text-center font-semibold text-primary">
                    The indication phase is closed, we are so sorry!
                  </div>
                ) : !isFormEnabled ? (
                  <div className="text-center font-semibold text-primary">
                    Unfortunately, we are already full of indications.. Sorry!
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
