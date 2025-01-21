import Image from 'next/image';
import login from '../../../public/images/login.png';
import SignInForm from '@/components/SignInForm';
import { Menu as MenuIcon } from 'lucide-react';

export default function Login() {
  return (
    <div className="h-dvh">
      <div className="flex h-[13%] items-center px-6 text-4xl font-medium text-primary">
        <MenuIcon data-testid="menu-icon" />
      </div>
      <div className="relative h-[87%] bg-gray">
        <Image
          alt="Background image with an oil painting of a child"
          src={login}
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-6">
          <SignInForm testId="sign-in-form" />
        </div>
      </div>
    </div>
  );
}
