import { numberWithCommas } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { EPoliticalPartyId } from '@/app/constants';

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
  politicalPartyId,
}: {
  politicalPartyName: string;
  candidateNumber: string;
  presidentName: string;
  voteCount: number;
  voteRate: number;
  imgUrl: string;
  mainColor: string;
  id: string;
  handleSelectCandidate: (id: string | null) => void;
  selectedCandidate: string | null;
  platformTitle: string;
  platformContext: string;
  politicalPartyId: EPoliticalPartyId;
}) => {
  const voteRatePercent = (voteRate * 100).toFixed(1);

  const customAnimateStyles: React.CSSProperties = {
    '--target-width': `${parseFloat(voteRatePercent)}%`,
    '--target-height': `${parseFloat(voteRatePercent)}%`,
    backgroundColor: `${mainColor}`,
    boxShadow: `0 0 24px 0 ${mainColor}`,
  } as React.CSSProperties;

  return (
    <div
      className={`flex flex-col h-[163px] w-full border-solid border-mainWhite border-2 border-opacity-40 relative rounded-3xl text-mainWhite
    md:flex-row md:h-[600px] transition-all duration-1000 ease-in-out
    ${
      !selectedCandidate
        ? 'md:w-1/3'
        : selectedCandidate === id
        ? 'h-auto md:w-full'
        : 'hidden'
    }`}
    >
      <div
        className={`flex h-[163px] w-full relative md:h-full
    md:flex-column bg-white/40 backdrop-blur-lg overflow-hidden
    ${
      !selectedCandidate
        ? 'rounded-3xl md:w-full cursor-pointer'
        : 'rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl md:w-1/3'
    }`}
        onClick={() => handleSelectCandidate(id)}
      >
        <div
          className={`absolute bottom-0 left-0 bg-opacity-8 h-full animate-grow-width
      md:h-0 md:w-full md:animate-grow-height `}
          style={customAnimateStyles}
        />
        <div className="flex-1 h-full relative md:absolute md:bottom-0 md:left-0 md:w-full md:max-h-[600px]">
          <Image
            src={imgUrl}
            alt="name"
            fill
            className="object-contain object-left-bottom"
          />
        </div>
        <div
          className="flex-1 h-full text-right flex flex-col gap-y-7 pr-4 py-3
      md:px-6 md:py-6 md:justify-between z-10 md:max-h-[600px]"
        >
          <div className="md:text-left">
            <p className="hidden md:block md:font-bold md:text-base drop-shadow">
              {politicalPartyName}
            </p>
            <p className="text-3xl md:text-5xl">
              {candidateNumber}{' '}
              <span className="font-bold">{presidentName}</span>
            </p>
          </div>
          <div>
            <div>
              <p
                className="text-4xl font-extrabold md:text-[80px]"
                style={{
                  filter: 'drop-shadow(4px 4px 24px #000',
                }}
              >
                {voteRatePercent}
                <span className="text-2xl md:text-[40px]">%</span>
              </p>
            </div>
            <div>
              <p
                className="text-xl font-semibold md:text-3xl"
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
       text-[#0A1128] gap-8 rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl
       ${!selectedCandidate ? 'hidden' : 'px-6 py-20 md:w-2/3'}`}
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
          asChild
        >
          <Link href={{ pathname: 'dashboard', query: { politicalPartyId } }}>
            查看得票分佈 →
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PersonCard;
