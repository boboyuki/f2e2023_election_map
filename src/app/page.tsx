'use client';

import PersonCard from '@/components/person-card/person-card';
import { Button } from '@/components/ui/button';
import candidateInfo from '../../public/vote-data/candidateDetail.json';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EPoliticalPartyId } from './constants';

const candidateArr = Object.values(candidateInfo);

function Home() {
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null,
  );

  const handleSelectCandidate = (id: string | null) => {
    setSelectedCandidate(id);
  };

  return (
    <div className="w-screen">
      <div className="mb-6 pt-[148px] pb-[48px] px-[16px] md:pt-[160px] md:pb-[60px] md:px-[80px] flex flex-col h-full w-full gap-4 md:flex-row md:gap-5">
        {candidateArr.map((candidate) => (
          <PersonCard
            key={candidate.id}
            id={candidate.id.toString()}
            politicalPartyId={candidate.politicalPartyId as EPoliticalPartyId}
            politicalPartyName={candidate.politicalPartyName}
            candidateNumber={candidate.candidateNumber}
            presidentName={candidate.presidentName}
            voteCount={candidate.voteCount}
            voteRate={candidate.voteRate}
            imgUrl={candidate.imgUrl}
            mainColor={candidate.mainColor}
            selectedCandidate={selectedCandidate}
            handleSelectCandidate={handleSelectCandidate}
            platformTitle={candidate.platformTitle}
            platformContext={candidate.platformContext}
          />
        ))}
        <Button
          className="md:hidden bg-primary shadow-primary self-center"
          onClick={() => router.push('dashboard')}
        >
          進入地圖 →
        </Button>
      </div>
    </div>
  );
}

export default Home;
