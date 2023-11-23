import PersonCard from '@/components/person-card/person-card'

function Home() {
  return (
    <div className="w-full h-full bg-black">
      <div className="pt-[148px] pb-[48px] px-[16px] flex flex-col">
        <PersonCard />
      </div>
    </div>
  )
}

export default Home
