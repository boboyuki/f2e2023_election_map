import { Button } from '../ui/button'
import Image from 'next/image'

const Header = () => {
  return (
    <div className="h-[100px] bg-header flex justify-center items-center px-8 py-1 sm:justify-between">
      <div className="h-[74.44px] w-[287px] min-w-[287px] min-h-[74.44px] relative">
        <Image src="/img/Logo.png" alt="logo" fill />
      </div>
      <Button className="hidden sm:block bg-primary shadow-primary">
        進入地圖
      </Button>
    </div>
  )
}

export default Header
