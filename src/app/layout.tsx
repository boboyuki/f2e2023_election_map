import '@/app/globals.css'
import Header from '@/components/header/header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="zh">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

export default Layout
