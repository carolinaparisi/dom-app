'use client';
import React, { useState } from 'react';
import Button from './Button';

export default function SignInForm() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSignInButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    console.log('LOGIN');
    setLoggedIn(true);
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
                placeholder="Your password"
                className="block w-full rounded-2xl border-gray_soft bg-transparent py-4 pl-3 pr-20 placeholder:text-white"
              />
            </div>
          </div>

          <div>
            <Button handleButton={handleSignInButton}>Sign In</Button>
          </div>

          <div>
            <Button handleButton={handleSignInButton} variant="secondary">
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
