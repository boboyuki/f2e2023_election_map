import { numberWithCommas } from '@/lib/utils'
import Image from 'next/image'

const PersonCard = ({
  politicalPartyName,
  candidateNumber,
  presidentName,
  voteCount,
  voteRate,
  imgUrl,
  mainColor,
}: {
  politicalPartyName: string
  candidateNumber: string
  presidentName: string
  voteCount: number
  voteRate: number
  imgUrl: string
  mainColor: string
}) => {
  const voteRatePercent = (voteRate * 100).toFixed(1)

  const customAnimateStyles: React.CSSProperties = {
    '--target-width': `${parseFloat(voteRatePercent)}%`,
    '--target-height': `${parseFloat(voteRatePercent)}%`,
    backgroundColor: `${mainColor}`,
    boxShadow: `0 0 24px 0 ${mainColor}`,
  } as React.CSSProperties

  return (
    <div
      className="flex h-[163px] border-solid border-mainWhite border-2 border-opacity-40 w-full relative text-mainWhite rounded-3xl overflow-hidden
    sm:flex-column sm:h-full sm:w-1/3 sm:max-h-[600px] bg-white/40 backdrop-blur-lg"
    >
      <div
        className={`absolute bottom-0 left-0 bg-opacity-8 h-full animate-grow-width
      sm:h-0 sm:w-full sm:animate-grow-height `}
        style={customAnimateStyles}
      />
      <div className="flex-1 h-full relative sm:absolute sm:bottom-0 sm:left-0 sm:w-full sm:max-h-[600px]">
        <Image
          src={imgUrl}
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
            {politicalPartyName}
          </p>
          <p className="text-3xl sm:text-5xl">
            {candidateNumber} <span className="font-bold">{presidentName}</span>
          </p>
        </div>
        <div>
          <div>
            <p
              className="text-4xl font-extrabold sm:text-[80px]"
              style={{
                filter: 'drop-shadow(4px 4px 24px #000',
              }}
            >
              {voteRatePercent}
              <span className="text-2xl sm:text-[40px]">%</span>
            </p>
          </div>
          <div>
            <p
              className="text-xl font-semibold sm:text-3xl"
              style={{
                filter: 'drop-shadow(4px 4px 24px #000',
              }}
            >
              {numberWithCommas(voteCount)} 票
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonCard
