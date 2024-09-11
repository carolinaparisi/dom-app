'use client';

import { useState } from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/services/firebase';
import { FirebaseError } from 'firebase/app';

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  return (
    <div className="flex w-full flex-col justify-center gap-8 rounded-md lg:px-8">
      <div className="font-silk text-6xl text-white">Enter Thy Credentials</div>
      <div className="flex flex-col gap-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="flex flex-col gap-4">
          <div>
            <div className="">
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="block w-full rounded-2xl border-gray_soft bg-transparent py-4 pl-3 pr-20 placeholder:text-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm"></div>
            </div>
            <div className="">
              <input
                id="password"
                name="password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="block w-full rounded-2xl border-gray_soft bg-transparent py-4 pl-3 pr-20 placeholder:text-white"
              />
            </div>
          </div>

          <div>
            <Button handleButton={handleSignIn}>Sign In</Button>
          </div>

          <div>
            <Button handleButton={handleSignUp} variant="secondary">
              Sign Up
            </Button>
          </div>
          <a href="#" className="text-center text-white">
            Forgotten your password?
          </a>
        </form>
      </div>
    </div>
  );
}
