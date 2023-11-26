import { numberWithCommas } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Icon } from '@iconify/react'

const PersonCard = ({
  politicalPartyName,
  candidateNumber,
  presidentName,
  voteCount,
  voteRate,
  imgUrl,
  mainColor,
  id,
  handleSelectCandidate,
  selectedCandidate,
  platformTitle,
  platformContext,
}: {
  politicalPartyName: string
  candidateNumber: string
  presidentName: string
  voteCount: number
  voteRate: number
  imgUrl: string
  mainColor: string
  id: string
  handleSelectCandidate: (id: string | null) => void
  selectedCandidate: string | null
  platformTitle: string
  platformContext: string
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
      className={`flex flex-col h-[163px] w-full border-solid border-mainWhite border-2 border-opacity-40 relative rounded-3xl text-mainWhite
    sm:flex-row sm:h-full sm:max-h-[600px] transition-all duration-1000 ease-in-out
    ${
      !selectedCandidate
        ? 'sm:w-1/3'
        : selectedCandidate === id
        ? 'h-auto sm:w-full'
        : 'hidden'
    }`}
    >
      <div
        className={`flex h-full w-full relative
    sm:flex-column bg-white/40 backdrop-blur-lg overflow-hidden
    ${
      !selectedCandidate
        ? 'rounded-3xl sm:w-full cursor-pointer'
        : 'rounded-t-3xl sm:rounded-tr-none sm:rounded-l-3xl sm:w-1/3'
    }`}
        onClick={() => handleSelectCandidate(id)}
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
              {candidateNumber}{' '}
              <span className="font-bold">{presidentName}</span>
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
      <div
        className={`flex flex-col justify-center items-center relative h-full w-full bg-white/70 backdrop-blur-lg text-center
       text-[#0A1128] gap-8 rounded-b-3xl sm:rounded-bl-none sm:rounded-r-3xl
       ${!selectedCandidate ? 'hidden' : 'px-6 py-20 sm:w-2/3'}`}
      >
        <div
          className="w-10 h-10 absolute top-6 right-6 cursor-pointer"
          onClick={() => handleSelectCandidate(null)}
        >
          <Icon
            icon="carbon:close-outline"
            className="w-full h-full"
            color="#14132c9b"
          />
        </div>
        <div className="text-[#303030] flex flex-col gap-8 items-center">
          <p className="text-4xl font-bold">{platformTitle}</p>
          <div className="h-px w-[60px] bg-primary" />
          <p className="font-normal text-base whitespace-pre-line">
            {platformContext}
          </p>
        </div>
        <Button
          className="bg-white bg-opacity-40 text-primary hover:text-white text-xl"
          size="lg"
        >
          查看得票分佈 →
        </Button>
      </div>
    </div>
  )
}

export default PersonCard
