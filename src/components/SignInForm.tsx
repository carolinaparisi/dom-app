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
    <div className="flex w-full flex-col justify-center gap-4 rounded-md border border-gray_soft bg-white p-3 lg:px-8">
      <div className="flex flex-col sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-medium leading-9">Sign In</h2>
      </div>

      <div className="flex flex-col gap-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="flex flex-col gap-4">
          <div>
            <div className="">
              <input
                id="email"
                name="email"
                placeholder="Your email"
                className="block w-full rounded-md border-0 py-4 pl-3 pr-20 ring-1 ring-inset ring-gray_soft placeholder:text-gray focus:outline-none"
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
                className="block w-full rounded-md border-0 py-4 pl-3 pr-20 ring-1 ring-inset ring-gray_soft placeholder:text-gray focus:outline-none"
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
        </form>
      </div>
    </div>
  );
}
