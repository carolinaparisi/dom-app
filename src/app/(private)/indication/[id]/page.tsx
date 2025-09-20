'use client';

import bookPile from '../../../../../public/images/bookPile.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { useIndicationRoomContext } from '@/contexts/IndicationRoomContext';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Trash } from 'lucide-react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { IndicationRoom } from '@/utils/indications';
import { useRouter } from 'next/navigation';

export default function EditIndicationRoom({
  params,
}: {
  params: { id: string };
}) {
  const {
    subscribeToIndicationRoomUpdates,
    unsubscribeFromIndicationRoomUpdates,
    setIndicationRoom,
  } = useIndicationRoomContext();
  const router = useRouter();
  const [initialRoom, setInitialRoom] = useState<IndicationRoom | null>(null);
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_URL
      : 'http://localhost:3000';

  useEffect(() => {
    const handleRoomUpdate = (room: IndicationRoom | null) => {
      setInitialRoom(room);
    };
    subscribeToIndicationRoomUpdates(params.id, handleRoomUpdate);
    return () => {
      unsubscribeFromIndicationRoomUpdates(params.id);
    };
  }, [
    params.id,
    subscribeToIndicationRoomUpdates,
    unsubscribeFromIndicationRoomUpdates,
  ]);

  const handleCopyUrl = () => {
    const url = `${baseUrl}/suggestion/${params.id}`;

    navigator.clipboard.writeText(url).then(() => {
      toast.success('URL copied to clipboard!');
    });
  };

  const handleCompleteIndications = async () => {
    if (!initialRoom) {
      return;
    }

    const updatedSuggestionRoom: IndicationRoom = {
      ...initialRoom,
      isCompleted: true,
    };

    await setIndicationRoom(initialRoom?.id, updatedSuggestionRoom);
  };

  const handleCreateVotingRoom = () => {
    router.push(`/room?indicationRoomId=${initialRoom?.id}`);
  };

  const removeSuggestion = async (suggestionId: string) => {
    if (!initialRoom) {
      return;
    }

    const newSuggestions = initialRoom?.suggestions?.filter((suggestion) => {
      if (suggestion.id !== suggestionId) {
        return true;
      }
    });

    const updatedSuggestionRoom: IndicationRoom = {
      ...initialRoom,
      suggestions: newSuggestions,
    };

    await setIndicationRoom(initialRoom?.id, updatedSuggestionRoom);
  };

  return (
    <div className="min-h-screen bg-gray_soft">
      <div className="relative">
        <Image
          alt=""
          src={bookPile}
          className="w-full"
          quality={100}
          priority
        />
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-8 text-gray_soft">
          <div className="line-clamp-1 break-all text-center font-silk text-4xl">
            Indications
          </div>
          <div className="text-base">administer the books</div>
        </div>
      </div>

      <div className="flex flex-col justify-start px-6 py-9 font-light">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-6 text-lg">
                <div>
                  Complete the fields bellow to create a new indication room:
                </div>
                <div className="flex">
                  <input
                    disabled
                    value={`${baseUrl}/suggestion/${params.id}`}
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
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 text-lg">
                    <div>Follow the books already added:</div>
                    {initialRoom?.suggestions?.map((suggestion) => {
                      return (
                        <div key={suggestion.id}>
                          <div className="flex items-center gap-2">
                            <div
                              key={suggestion.id}
                              className="focus:ring-0` flex w-full items-center justify-between rounded-2xl border-2 border-gray bg-transparent py-4 pl-4 pr-6 outline-none placeholder:text-gray focus:outline-none"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="line-clamp-2 break-words">
                                  {suggestion.book.title}
                                </div>
                                <div className="line-clamp-1 break-words text-gray">
                                  {suggestion.guestName}
                                </div>
                              </div>

                              <div className="flex-shrink-0 pl-2">
                                <AlertDialog.Root>
                                  <AlertDialog.Trigger asChild>
                                    <button
                                      className={`${initialRoom?.isCompleted ? 'opacity-20' : ''}`}
                                    >
                                      <Trash size={20} />
                                    </button>
                                  </AlertDialog.Trigger>
                                  <AlertDialog.Portal>
                                    <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
                                    <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                      <AlertDialog.Title className="m-0 text-[17px] font-medium text-black">
                                        Are you absolutely sure?
                                      </AlertDialog.Title>
                                      <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-black">
                                        This action cannot be undone. This will
                                        permanently delete this indication and
                                        remove it from our servers.
                                      </AlertDialog.Description>
                                      <div className="flex justify-end gap-[25px]">
                                        <AlertDialog.Cancel asChild>
                                          <button className="inline-flex h-[35px] items-center justify-center rounded-xl border border-black bg-white px-4 py-6 font-medium leading-none text-black outline-none">
                                            Cancel
                                          </button>
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action asChild>
                                          <button
                                            disabled={initialRoom?.isCompleted}
                                            onClick={() => {
                                              removeSuggestion(suggestion.id);
                                            }}
                                            className="inline-flex h-[35px] items-center justify-center rounded-xl border border-black bg-black px-4 py-6 font-medium leading-none text-white outline-none"
                                          >
                                            Yes, delete indication
                                          </button>
                                        </AlertDialog.Action>
                                      </div>
                                    </AlertDialog.Content>
                                  </AlertDialog.Portal>
                                </AlertDialog.Root>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <Button
                        isAvailable={!initialRoom?.isCompleted}
                        variant="tertiary"
                      >
                        COMPLETE INDICATIONS
                      </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
                      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <AlertDialog.Title className="m-0 text-[17px] font-medium text-black">
                          Are you absolutely sure?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-black">
                          This action cannot be undone. This will permanently
                          close the recommendation phase.
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-[25px]">
                          <AlertDialog.Cancel asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded-xl border border-black bg-white px-4 py-6 font-medium leading-none text-black outline-none">
                              Cancel
                            </button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action asChild>
                            <button
                              onClick={handleCompleteIndications}
                              className="inline-flex h-[35px] items-center justify-center rounded-xl border border-black bg-black px-4 py-6 font-medium leading-none text-white outline-none"
                            >
                              Yes, close this phase
                            </button>
                          </AlertDialog.Action>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                  <Button
                    isAvailable={initialRoom?.isCompleted}
                    variant="tertiary"
                    onClick={handleCreateVotingRoom}
                  >
                    CREATE A NEW VOTING ROOM
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
