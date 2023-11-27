import '@/app/globals.css';
import ParticlesBackground from '@/components/background/background';
import Header from '@/components/header/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2020 總統大選即時開票地圖',
  description:
    '2020 年喵夫人、橘博士與喵先生進行總統位置之爭，未來四年的總統將會是由誰上任呢？',
  icons: '/img/favicon.ico',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="zh">
      <body>
        <Header />
        <ParticlesBackground>
          <main>{children}</main>
        </ParticlesBackground>
      </body>
    </html>
  );
};

export default Layout;
