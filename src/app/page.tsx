'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Lobby() {
  const { user, signOut } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [router, user]);

  if (!user) return null;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div>
      <h1>Lobby</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
