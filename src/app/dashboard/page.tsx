import Map from '@/components/map/map';
// import { Chart } from '../components/vote-chart/chart';
// import { EPoliticalPartyId } from '../constants';
// import TAIWAN_AREA from '../../../public/vote-data/taiwanArea.json';

export default function Home() {
  return (
    <div className="w-3/5 h-screen pt-[100px]">
      <Map></Map>

      {/* <div className="p-10">
        <Chart
          politicalPartyId={EPoliticalPartyId.DPP}
          cityId={TAIWAN_AREA.cities[0].id}
          townId={TAIWAN_AREA.towns[0].id}
        />
      </div> */}

      {/* <div className="flex">
        <div className="p-10">
          <Chart
            politicalPartyId={EPoliticalPartyId.DPP}
            cityId={TAIWAN_AREA.cities[0].id}
            townId={TAIWAN_AREA.towns[0].id}
          />
        </div>
        <div className="p-10">
          <Chart cityId={TAIWAN_AREA.cities[0].id} />
        </div>
      </div> */}
    </div>
  );
}
