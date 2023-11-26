import PersonCard from '@/components/person-card/person-card'
import { Button } from '@/components/ui/button'

function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="pt-[148px] pb-[48px] px-[16px] sm:pt-[160px] sm:pb-[60px] sm:px-[80px] flex flex-col h-full w-full gap-4 sm:flex-row sm:gap-5">
        <PersonCard />
        <PersonCard />
        <PersonCard />
        <Button className="sm:hidden bg-primary shadow-primary self-center">
          進入地圖 →
        </Button>
      </div>
    </div>
  )
}

export default Home
