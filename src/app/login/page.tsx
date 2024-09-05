import Image from 'next/image';
import loginBackground from '../../../public/assets/login-background.jpeg';
import SignInForm from '@/components/SignInForm';

export default function Login() {
  return (
    <div className="h-dvh">
      <div className="flex h-1/6 items-center px-6 text-4xl font-medium text-black">
        DOM
      </div>
      <div className="relative h-5/6 bg-gray">
        <Image
          alt=""
          src={loginBackground}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-6">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
