import PersonCard from '@/components/person-card/person-card'

function Home() {
  return (
    <div className="w-screen h-screen bg-black">
      <div className="pt-[148px] pb-[48px] px-[16px] flex flex-col h-full w-full gap-4 sm:flex-row sm:gap-5">
        <PersonCard />
        <PersonCard />
        <PersonCard />
      </div>
    </div>
  )
}

export default Home
