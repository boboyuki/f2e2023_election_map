import Image from 'next/image';
import { NavigationButton } from '../navigation-button/navigation-button';
import { Button } from '../ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="h-[100px] w-full bg-header flex justify-center items-center px-8 py-1 md:justify-between fixed backdrop-blur-3xl z-50">
      <div className="h-[74.44px] w-[287px] min-w-[287px] min-h-[74.44px] relative">
        <Link href={'/'}>
          <Image src="/img/Logo.png" alt="logo" fill />
        </Link>
      </div>
      <NavigationButton />
    </div>
  );
};

export default Header;
