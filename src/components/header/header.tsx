import Image from 'next/image';
import { NavigationButton } from '../navigation-button/navigation-button';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <div className="h-[100px] w-full bg-header flex justify-center items-center px-8 py-1 sm:justify-between fixed backdrop-blur-3xl">
      <div className="h-[74.44px] w-[287px] min-w-[287px] min-h-[74.44px] relative">
        <Image src="/img/Logo.png" alt="logo" fill />
      </div>
      <NavigationButton />
    </div>
  );
};

export default Header;
