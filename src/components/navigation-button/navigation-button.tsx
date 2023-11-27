'use client';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routeConfig: Record<
  string,
  {
    styles: string;
    text: string;
    link: string;
  }
> = {
  '/': {
    styles: 'bg-primary shadow-primary',
    text: '進入地圖',
    link: '/dashboard',
  },
  '/dashboard': {
    styles: 'bg-secondary shadow-secondary text-primary hover:bg-secondary/80',
    text: '回到首頁',
    link: '/',
  },
};
export const NavigationButton = () => {
  const pathname = usePathname();
  return (
    <Button
      className={clsx('hidden md:block', routeConfig[pathname]?.styles || '')}
      asChild
    >
      <Link href={routeConfig[pathname]?.link || ''}>
        {routeConfig[pathname]?.text || ''}
      </Link>
    </Button>
  );
};
