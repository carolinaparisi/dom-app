'use client';

import bookPile from '../../../../../public/images/bookPile.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { useIndicationRoomContext } from '@/contexts/IndicationRoomContext';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Trash } from 'lucide-react';
import { IndicationRoom } from '@/utils/indications';

export default function EditIndicationRoom({
  params,
}: {
  params: { id: string };
}) {
  const {
    subscribeToIndicationRoomUpdates,
    unsubscribeFromIndicationRoomUpdates,
  } = useIndicationRoomContext();
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

  const handleCompleteIndications = () => {
    console.log('handleCompleteIndications clicked!');
  };

  const handleCreateVotingRoom = () => {
    console.log('Creating a new voting room...');
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
                              className="focus:ring-0` relative block w-full rounded-2xl border-2 border-gray bg-transparent px-3 py-4 pr-12 outline-none placeholder:text-gray focus:outline-none"
                            >
                              <div>{suggestion.book.title}</div>
                              <div className="text-gray">
                                {suggestion.guestName}
                              </div>
                            </div>
                            <Trash
                              className="absolute right-10"
                              onClick={() => {
                                console.log('trash clicked!');
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <Button
                    variant="tertiary"
                    onClick={handleCompleteIndications}
                  >
                    COMPLETE INDICATIONS
                  </Button>
                  <Button variant="tertiary" onClick={handleCreateVotingRoom}>
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
