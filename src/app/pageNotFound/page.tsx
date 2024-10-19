import Image from 'next/image';
import pageNotFound from '../../../public/images/page-not-found.jpg';

export default function PageNotFound() {
  return (
    <div className="relative h-dvh">
      <Image
        alt=""
        src={pageNotFound}
        className="w-full object-cover"
        priority
        quality={100}
        fill
      />
      <div className="absolute bottom-1/2 w-full translate-y-60 overflow-hidden font-silk text-8xl font-bold text-black">
        <div className="-translate-x-4">Page</div>
        <div className="-translate-x-3 text-center">not</div>
        <div className="mt-4 flex translate-x-3 items-end justify-end">
          Found
        </div>
      </div>
    </div>
  );
}
