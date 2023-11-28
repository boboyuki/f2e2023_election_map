'use client';
import Map from '@/components/map/map';
import { Chart } from '../components/vote-chart/chart';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { EPoliticalPartyId } from '../constants';

export default function Home() {
  const searchParams = useSearchParams();
  const politicalPartyId = searchParams.get('politicalPartyId');
  const [currentSelectArea, setCurrentSelectArea] = useState<{
    county: string;
    town: string;
    village: string;
  }>({
    county: '',
    town: '',
    village: '',
  });
  const [currentSelectAreaId, setCurrentSelectAreaId] = useState<{
    county: string;
    town: string;
    village: string;
  }>({
    county: '',
    town: '',
    village: '',
  });
  const handleSelectArea = (county: string, town: string, village: string) => {
    setCurrentSelectArea((prev) => {
      return { ...prev, county, town, village };
    });

    setCurrentSelectAreaId((prev) => {
      const townId = town && town.replace(county, `${county}-`);
      const villageId = village && village.replace(town, `${prev.town}-`);
      return { ...prev, county, town: townId, village: villageId };
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
            politicalPartyId={EPoliticalPartyId.DPP}
            cityId={currentSelectAreaId.county}
            townId={currentSelectAreaId.town}
          />
        </div>

        {/* <div className="flex">
          <div className="p-10">
            <Chart
              politicalPartyId={EPoliticalPartyId.DPP}
              cityId={currentSelectArea.county}
              townId={currentSelectArea.town}
            />
          </div>
          <div className="p-10">
            <Chart cityId={currentSelectArea.county} />
          </div>
        </div> */}
      </div>
    </div>
  );
}
