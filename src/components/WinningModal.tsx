import { VotingRoom } from '@/utils/rooms';
import React from 'react';
import Confetti from 'react-confetti-boom';

interface WinningModalProps {
  initialRoom: VotingRoom | null;
  setIsOpenWinningAlert: (isOpen: boolean) => void;
}

const WinningModal = ({
  initialRoom,
  setIsOpenWinningAlert,
}: WinningModalProps) => {
  const hasWinner = initialRoom?.winningBooks?.length === 1;
  const hasTie = initialRoom && initialRoom.winningBooks?.length > 1;

  return (
    <div className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50">
      {hasWinner && (
        <div>
          <Confetti
            mode="boom"
            y={0.35}
            particleCount={150}
            colors={['#ff577f', '#ff884b', '#ffd384', '#fff9b0']}
            spreadDeg={40}
            shapeSize={14}
          />
        </div>
      )}
      <div className="data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <div className="m-0 pb-2 text-[20px] font-bold text-black">
          {hasTie ? 'We have a tie:' : 'The winner is:'}
        </div>
        <div className="pb-4 font-medium">
          {initialRoom?.winningBooks?.map((winningBook) => {
            console.log('winningBook', winningBook);
            return (
              <div className="flex justify-between" key={winningBook.id}>
                <div>{winningBook.title}</div>
                <div>{winningBook.votes?.length}</div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-[25px]">
          <div>
            <button
              onClick={() => setIsOpenWinningAlert(false)}
              className="inline-flex h-[35px] items-center justify-center rounded-xl border border-black bg-white px-4 py-6 font-medium leading-none text-black outline-none"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinningModal;
