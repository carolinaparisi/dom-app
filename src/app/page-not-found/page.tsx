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
      <div className="translate-y-35 absolute bottom-1/2 w-full overflow-hidden font-silk text-6xl font-bold text-black">
        <div className="text-center">Page not found </div>
      </div>
    </div>
  );
}
