import { EPoliticalPartyId } from '@/app/constants';
import { VoteBar } from './chart/vote-bar/vote-bar';
import TAIWAN_AREA_JSON from '../../../../public/vote-data/taiwanArea.json';

export const Chart = ({
  politicalPartyId,
  cityId,
  townId,
}: {
  politicalPartyId?: EPoliticalPartyId;
  cityId?: string;
  townId?: string;
}) => {
  const city = TAIWAN_AREA_JSON.cities.find(({ id }) => id === cityId)?.city;
  const town = TAIWAN_AREA_JSON.towns.find(({ id }) => id === townId)?.town;
  const areas = ['全國', city, town].filter((area) => !!area);
  const areaTitle = areas.join(' > ');
  return (
    <>
      <div
        className="flex flex-col justify-center rounded-3xl"
        style={{
          // maxWidth: '1000px',
          border: '2px solid rgba(254, 252, 251, 0.40)',
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.20) 100%);',
        }}
      >
        <div className="px-6 py-5 text-2xl text-white">
          <p>{areaTitle}</p>
        </div>
        <hr />
        <div className="px-7 pb-7">
          <VoteBar
            politicalPartyId={politicalPartyId}
            cityId={cityId}
            townId={townId}
          />
        </div>
      </div>
    </>
  );
};
