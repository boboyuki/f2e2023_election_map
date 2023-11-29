'use client';
import Map from '@/components/map/map';
import { Chart } from '../components/vote-chart/chart';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { EPoliticalPartyId } from '../constants';

export default function Home() {
  const searchParams = useSearchParams();
  const qsPoliticalPartyId = searchParams.get('politicalPartyId') || '';
  const politicalPartyIds = [
    EPoliticalPartyId.DPP,
    EPoliticalPartyId.KMT,
    EPoliticalPartyId.PFP,
  ] as string[];
  const politicalPartyId = politicalPartyIds.includes(qsPoliticalPartyId)
    ? (qsPoliticalPartyId as EPoliticalPartyId)
    : undefined;
  const [currentSelectArea, setCurrentSelectArea] = useState<{
    county: string;
    town: string;
    village: string;
    politicalParty?: EPoliticalPartyId;
  }>({
    county: '',
    town: '',
    village: '',
    politicalParty: politicalPartyId,
  });
  const [currentSelectAreaId, setCurrentSelectAreaId] = useState<{
    county: string;
    town: string;
    village: string;
    politicalParty?: EPoliticalPartyId;
  }>({
    county: '',
    town: '',
    village: '',
    politicalParty: politicalPartyId,
  });
  const handleSelectArea = (
    county: string,
    town: string,
    village: string,
    politicalPartyId?: EPoliticalPartyId,
  ) => {
    setCurrentSelectArea((prev) => {
      return {
        ...prev,
        county,
        town,
        village,
        politicalParty: politicalPartyId,
      };
    });
    setCurrentSelectAreaId((prev) => {
      const townId = town && town.replace(county, `${county}-`);
      const villageId = village && village.replace(town, `${prev.town}-`);
      return {
        ...prev,
        county,
        town: townId,
        village: villageId,
        politicalParty: politicalPartyId,
      };
    });
  };

  return (
    <div className="flex">
      <div className="md:w-3/5 w-full md:h-screen h-[324px] pt-[100px]">
        <Map
          currentSelectArea={currentSelectArea}
          handleSelectArea={handleSelectArea}
        />
      </div>
      <div className="md:w-2/5 w-full md:h-screen pt-[100px]">
        <div className="p-10">
          <Chart
            politicalPartyId={currentSelectAreaId.politicalParty}
            cityId={currentSelectAreaId.county}
            townId={currentSelectAreaId.town}
            villageId={currentSelectAreaId.village}
            handleSelectArea={handleSelectArea}
          />
        </div>
      </div>
    </div>
  );
}
