import Image from 'next/image';
import background from '../../public/assets/background.png';
import MainSection from '@/components/MainSection';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="h-dvh">
      <div className="relative h-1/2">
        <Image alt="" src={background} fill className="object-cover" priority />
      </div>
      <div className="flex h-1/2 flex-col justify-between p-5">
        <MainSection />
        <Button text="Get started" />
      </div>
    </div>
  );
}
