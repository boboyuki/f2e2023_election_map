'use client'

import PersonCard from '@/components/person-card/person-card'
import { Button } from '@/components/ui/button'
import candidateInfo from '../../public/vote-data/candidateDetail.json'
import { useState } from 'react'

const candidateArr = Object.values(candidateInfo)

function Home() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null,
  )

  const handleSelectCandidate = (id: string | null) => {
    setSelectedCandidate(id)
  }

  return (
    <div className="w-screen h-screen">
      <div className="pt-[148px] pb-[48px] px-[16px] sm:pt-[160px] sm:pb-[60px] sm:px-[80px] flex flex-col h-full w-full gap-4 sm:flex-row sm:gap-5">
        {candidateArr.map((candidate) => (
          <PersonCard
            key={candidate.id}
            id={candidate.id.toString()}
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
        <Button className="sm:hidden bg-primary shadow-primary self-center">
          進入地圖 →
        </Button>
      </div>
    </div>
  )
}

export default Home
