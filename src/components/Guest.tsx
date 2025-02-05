import { VoterGuest } from '@/utils/guests';
import { X } from 'lucide-react';

interface GuestProps {
  guest: VoterGuest;
  testId: string;
  isButton: boolean;
}

export default function Guest({ guest, testId, isButton }: GuestProps) {
  return (
    <span
      data-testid={testId}
      key={guest.id}
      className={` ${
        guest.isReady ? `bg-primary` : `bg-gray`
      } flex items-center justify-center gap-1 rounded-2xl px-3 py-1 text-lg`}
    >
      {guest.name}
      {isButton && <X size={12} />}
    </span>
  );
}
