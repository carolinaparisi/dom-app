'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from './Button';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/services/firebase';
import { FirebaseError } from 'firebase/app';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Must be 6 or more characters long' }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function SignInForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleSignUp = async (data: LoginSchema) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  const handleSignIn = async (data: LoginSchema) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
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
        <form className="flex flex-col gap-4">
          <div>
            <div className="text-white">
              <input
                placeholder="Your email"
                className={`${errors.email ? 'border-red' : 'border-gray_soft'} block w-full rounded-2xl bg-transparent px-3 py-4 placeholder:text-white`}
                {...register('email')}
              />
              {errors.email && (
                <div className="mt-1">{errors.email.message}</div>
              )}
            </div>
          </div>

          <div>
            <div className="text-white">
              <input
                type="password"
                placeholder="Your password"
                className={`${errors.password ? 'border-red' : 'border-gray_soft'} block w-full rounded-2xl bg-transparent px-3 py-4 placeholder:text-white`}
                {...register('password')}
              />
              {errors.password && (
                <div className="mt-1">{errors.password.message}</div>
              )}
            </div>
          </div>

          <div>
            <Button onClick={handleSubmit(handleSignIn)}>Sign In</Button>
          </div>

          <div>
            <Button onClick={handleSubmit(handleSignUp)} variant="secondary">
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
