import Image from 'next/image'

const PersonCard = () => {
  return (
    <div
      className="flex h-[163px] border-solid border-mainWhite border-2 border-opacity-40 w-full relative text-mainWhite rounded-3xl overflow-hidden
    sm:flex-column sm:h-full sm:w-1/3 sm:max-h-[600px] bg-white/40 backdrop-blur-lg"
    >
      <div className="flex-1 h-full relative sm:absolute sm:bottom-0 sm:left-0 sm:w-full sm:max-h-[600px]">
        <Image
          src="/img/candidate1.png"
          alt="name"
          fill
          className="object-contain object-left-bottom"
        />
      </div>
      <div
        className="flex-1 h-full text-right flex flex-col gap-y-7 pr-4 py-3
      sm:px-6 sm:py-6 sm:justify-between z-10 sm:max-h-[600px]"
      >
        <div className="sm:text-left">
          <p className="hidden sm:block sm:font-bold sm:text-base drop-shadow">
            美丁美黨
          </p>
          <p className="text-3xl sm:text-5xl drop-shadow">
            ① <span className="font-bold">咪夫人</span>
          </p>
        </div>
        <div>
          <div>
            <p className="text-4xl font-extrabold sm:text-[80px] drop-shadow">
              4.3<span className="text-2xl sm:text-[40px]">%</span>
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold sm:text-3xl drop-shadow">
              608,590 票
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonCard
