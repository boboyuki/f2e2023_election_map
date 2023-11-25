import '@/app/globals.css'
import ParticlesBackground from '@/components/background/background'
import Header from '@/components/header/header'

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
  )
}

export default Layout
