'use client';
import { EPoliticalPartyId, POLITICAL_PARTY_COLOR } from '@/app/constants';
import { useEffect, useState } from 'react';
import { VoteBar } from './chart/vote-bar/vote-bar';
import TAIWAN_AREA_JSON from '../../../../public/vote-data/taiwanArea.json';
import CANDIDATE_DETAIL_JSON from '../../../../public/vote-data/candidateDetail.json';

export const Chart = ({
  politicalPartyId,
  cityId,
  townId,
  villageId,
  handleSelectArea,
}: {
  politicalPartyId?: EPoliticalPartyId;
  cityId: string;
  townId: string;
  villageId: string;
  handleSelectArea: (
    county: string,
    town: string,
    village: string,
    politicalPartyId?: EPoliticalPartyId,
  ) => void;
}) => {
  const city = TAIWAN_AREA_JSON.cities.find(({ id }) => id === cityId)?.city;
  const town = TAIWAN_AREA_JSON.towns.find(({ id }) => id === townId)?.town;
  const areas = ['全國', city, town].filter((area) => !!area);
  const areaTitle = areas.join(' > ');

  return (
    <div className="flex flex-col">
      {/* 選政黨 */}
      <div className="flex justify-center mb-3">
        <div
          className="flex flex-col items-center justify-center rounded-3xl text-white px-6 py-2 cursor-pointer mr-1"
          style={{
            flex: 1,
            maxWidth: '130px',
            background: POLITICAL_PARTY_COLOR[EPoliticalPartyId.PFP],
          }}
          onClick={() => {
            handleSelectArea(
              cityId,
              townId.replaceAll('-', ''),
              villageId.replaceAll('-', ''),
              EPoliticalPartyId.PFP,
            );
          }}
        >
          <p
            style={{ fontSize: '1.4vw' }}
          >{`${CANDIDATE_DETAIL_JSON[1].candidateNumber}${CANDIDATE_DETAIL_JSON[1].presidentName}`}</p>
          <div>
            <span style={{ fontSize: '2.5vw' }}>{`${
              Math.round(CANDIDATE_DETAIL_JSON[1].voteRate * 10000) / 100
            }`}</span>
            <span style={{ fontSize: '1.4vw' }}>%</span>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center rounded-3xl text-white px-6 py-2 cursor-pointer mr-1"
          style={{
            flex: 1,
            maxWidth: '130px',
            background: POLITICAL_PARTY_COLOR[EPoliticalPartyId.KMT],
          }}
          onClick={() => {
            handleSelectArea(
              cityId,
              townId.replaceAll('-', ''),
              villageId.replaceAll('-', ''),
              EPoliticalPartyId.KMT,
            );
          }}
        >
          <p
            style={{ fontSize: '1.4vw' }}
          >{`${CANDIDATE_DETAIL_JSON[2].candidateNumber}${CANDIDATE_DETAIL_JSON[2].presidentName}`}</p>
          <div>
            <span style={{ fontSize: '2.5vw' }}>{`${
              Math.round(CANDIDATE_DETAIL_JSON[2].voteRate * 10000) / 100
            }`}</span>
            <span style={{ fontSize: '1.4vw' }}>%</span>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center rounded-3xl text-white px-6 py-2 cursor-pointer"
          style={{
            flex: 1,
            maxWidth: '130px',
            background: POLITICAL_PARTY_COLOR[EPoliticalPartyId.DPP],
          }}
          onClick={() => {
            handleSelectArea(
              cityId,
              townId.replaceAll('-', ''),
              villageId.replaceAll('-', ''),
              EPoliticalPartyId.DPP,
            );
          }}
        >
          <p
            style={{ fontSize: '1.4vw' }}
          >{`${CANDIDATE_DETAIL_JSON[3].candidateNumber}${CANDIDATE_DETAIL_JSON[3].presidentName}`}</p>
          <div>
            <span style={{ fontSize: '2.5vw' }}>{`${
              Math.round(CANDIDATE_DETAIL_JSON[3].voteRate * 10000) / 100
            }`}</span>
            <span style={{ fontSize: '1.4vw' }}>%</span>
          </div>
        </div>
      </div>
      {/* 圖表 */}
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
    </div>
  );
};
