import React from 'react';
import Confetti from 'react-confetti-boom';

interface SuggestionModalProps {
  setIsOpenIndicationAlert: (isOpen: boolean) => void;
}

const SuggestionModal = ({
  setIsOpenIndicationAlert,
}: SuggestionModalProps) => {
  return (
    <div className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50">
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
      <div className="data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 flex max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <div className="text-center text-lg font-bold text-black">
          We are delighted by your participation!
        </div>
        <div className="text-center text-sm text-black">
          Contact the hosts directly if you want to change your indication.
        </div>
        <div className="flex justify-end gap-[25px]">
          <div>
            <button
              onClick={() => setIsOpenIndicationAlert(false)}
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

export default SuggestionModal;
