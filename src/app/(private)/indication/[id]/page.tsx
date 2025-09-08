'use client';

import lobbyBanner from '../../../../../public/images/lobby-background.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { useVotingRoomContext } from '@/contexts/VotingRoomContext';
import { useEffect, useState } from 'react';
import { VotingRoom } from '@/utils/rooms';
import { Toaster, toast } from 'sonner';
//import * as AlertDialog from '@radix-ui/react-alert-dialog';
import WinningModal from '@/components/WinningModal';

export default function EditIndicationRoom({
  params,
}: {
  params: { id: string };
}) {
  const [isOpenWinningAlert, setIsOpenWinningAlert] = useState(false);
  const { subscribeToRoomUpdates, unsubscribeFromRoomUpdates } =
    useVotingRoomContext();
  const [initialRoom, setInitialRoom] = useState<VotingRoom | null>(null);
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_URL
      : 'http://localhost:3000';

  useEffect(() => {
    const handleRoomUpdate = (room: VotingRoom | null) => {
      setInitialRoom(room);
    };
    subscribeToRoomUpdates(params.id, handleRoomUpdate);
    return () => {
      unsubscribeFromRoomUpdates(params.id);
    };
  }, [params.id, subscribeToRoomUpdates, unsubscribeFromRoomUpdates]);

  const handleCopyUrl = () => {
    const url = `${baseUrl}/indication/${params.id}`;

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
          src={lobbyBanner}
          className="w-full"
          quality={100}
          priority
        />
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-8 text-gray_soft">
          <div className="line-clamp-1 break-all text-center font-silk text-4xl">
            Indications
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
                    value={`${baseUrl}/indication/${params.id}`}
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
                  <div className="flex flex-col gap-2">
                    <div>Follow the books already added:</div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {isOpenWinningAlert && (
                    <WinningModal
                      initialRoom={initialRoom}
                      setIsOpenWinningAlert={setIsOpenWinningAlert}
                    />
                  )}
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
