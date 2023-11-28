import { EPoliticalPartyId, POLITICAL_PARTY_NAME } from '@/app/constants';
import VOTE_DETAIL_JSON from '../../../../../../public/vote-data/voteDetail.json';
import {
  IAllPoliticalPartyVoteCity,
  IAllPoliticalPartyVoteTown,
  IAllPoliticalPartyVoteVillage,
  IVoteCity,
  IVoteTown,
  IVoteVillage,
} from './vote-bar.type';

const VOTE_DETAIL_JSON_CITIES: IAllPoliticalPartyVoteCity[] =
  // @ts-ignore
  VOTE_DETAIL_JSON.cities;
const VOTE_DETAIL_JSON_TOWNS: IAllPoliticalPartyVoteTown[] =
  // @ts-ignore
  VOTE_DETAIL_JSON.towns;
const VOTE_DETAIL_JSON_VILLAGES: IAllPoliticalPartyVoteVillage[] =
  // @ts-ignore
  VOTE_DETAIL_JSON.villages;

const POLITICAL_PARTY_ORDER = ['丁丁黨', '麥當黨', '美丁美黨'];
// 政黨
// 所有政黨的投票資料 - 縣市
export const ALL_POLITICAL_PARTY_VOTE_CITIES: IAllPoliticalPartyVoteCity[] =
  VOTE_DETAIL_JSON_CITIES.map((city) => {
    const candidates = city.candidates.sort((a, b) => {
      return (
        POLITICAL_PARTY_ORDER.indexOf(a.politicalPartyName) -
        POLITICAL_PARTY_ORDER.indexOf(b.politicalPartyName)
      );
    });
    return {
      ...city,
      candidates,
    };
  });
// 所有政黨的投票資料 - 鄉鎮區
export const ALL_POLITICAL_PARTY_VOTE_TOWNS: IAllPoliticalPartyVoteTown[] =
  VOTE_DETAIL_JSON_TOWNS.map((town) => {
    const candidates = town.candidates.sort((a, b) => {
      return (
        POLITICAL_PARTY_ORDER.indexOf(a.politicalPartyName) -
        POLITICAL_PARTY_ORDER.indexOf(b.politicalPartyName)
      );
    });
    return {
      ...town,
      candidates,
    };
  });
// 所有政黨的投票資料 - 村里
export const ALL_POLITICAL_PARTY_VOTE_VILLAGES: IAllPoliticalPartyVoteVillage[] =
  VOTE_DETAIL_JSON_VILLAGES.map((village) => {
    const candidates = village.candidates.sort((a, b) => {
      return (
        POLITICAL_PARTY_ORDER.indexOf(a.politicalPartyName) -
        POLITICAL_PARTY_ORDER.indexOf(b.politicalPartyName)
      );
    });
    return {
      ...village,
      candidates,
    };
  });

// 城市
// 所有城市的投票狀況 - 民進黨
const DPP_VOTE_CITIES: IVoteCity[] = ALL_POLITICAL_PARTY_VOTE_CITIES.map(
  (city) => ({
    id: city.id,
    city: city.city,
    candidate: city.candidates.find(
      (candidate) =>
        candidate.politicalPartyName ===
        POLITICAL_PARTY_NAME[EPoliticalPartyId.DPP],
    ),
  }),
);
// 所有城市的投票狀況 - 國民黨
const KMT_VOTE_CITIES: IVoteCity[] = ALL_POLITICAL_PARTY_VOTE_CITIES.map(
  (city) => ({
    id: city.id,
    city: city.city,
    candidate: city.candidates.find(
      (candidate) =>
        candidate.politicalPartyName ===
        POLITICAL_PARTY_NAME[EPoliticalPartyId.KMT],
    ),
  }),
);
// 所有城市的投票狀況 - 親民黨
const PFP_VOTE_CITIES: IVoteCity[] = ALL_POLITICAL_PARTY_VOTE_CITIES.map(
  (city) => ({
    id: city.id,
    city: city.city,
    candidate: city.candidates.find(
      (candidate) =>
        candidate.politicalPartyName ===
        POLITICAL_PARTY_NAME[EPoliticalPartyId.PFP],
    ),
  }),
);
export const ALL_POLITICAL_PARTY_VOTE_CITIES_DATA = {
  [EPoliticalPartyId.DPP]: DPP_VOTE_CITIES,
  [EPoliticalPartyId.KMT]: KMT_VOTE_CITIES,
  [EPoliticalPartyId.PFP]: PFP_VOTE_CITIES,
};

// 鄉鎮區
// 所有鄉鎮區的投票狀況 - 民進黨
const DPP_VOTE_TOWNS: IVoteTown[] = ALL_POLITICAL_PARTY_VOTE_TOWNS.map(
  (town) => ({
    id: town.id,
    town: town.town,
    candidate: town.candidates.find(
      (candidate) =>
        candidate.politicalPartyName ===
        POLITICAL_PARTY_NAME[EPoliticalPartyId.DPP],
    ),
  }),
);
// 所有鄉鎮區的投票狀況 - 國民黨
const KMT_VOTE_TOWNS: IVoteTown[] = ALL_POLITICAL_PARTY_VOTE_TOWNS.map(
  (town) => ({
    id: town.id,
    town: town.town,
    candidate: town.candidates.find(
      (candidate) =>
        candidate.politicalPartyName ===
        POLITICAL_PARTY_NAME[EPoliticalPartyId.KMT],
    ),
  }),
);
// 所有鄉鎮區的投票狀況 - 親民黨
const PFP_VOTE_TOWNS: IVoteTown[] = ALL_POLITICAL_PARTY_VOTE_TOWNS.map(
  (town) => ({
    id: town.id,
    town: town.town,
    candidate: town.candidates.find(
      (candidate) =>
        candidate.politicalPartyName ===
        POLITICAL_PARTY_NAME[EPoliticalPartyId.PFP],
    ),
  }),
);
export const ALL_POLITICAL_PARTY_VOTE_TOWNS_DATA = {
  [EPoliticalPartyId.DPP]: DPP_VOTE_TOWNS,
  [EPoliticalPartyId.KMT]: KMT_VOTE_TOWNS,
  [EPoliticalPartyId.PFP]: PFP_VOTE_TOWNS,
};

// 村里
// 所有村里的投票狀況 - 民進黨
const DPP_VOTE_VILLAGES: IVoteVillage[] = ALL_POLITICAL_PARTY_VOTE_VILLAGES.map(
  (village) => ({
    id: village.id,
    village: village.village,
    candidate: village.candidates.find(
      (candidate) =>
        candidate.politicalPartyName ===
        POLITICAL_PARTY_NAME[EPoliticalPartyId.DPP],
    ),
  }),
);
// 所有鄉鎮區的投票狀況 - 國民黨
const KMT_VOTE_VILLAGES: IVoteVillage[] = ALL_POLITICAL_PARTY_VOTE_VILLAGES.map(
  (village) => ({
    id: village.id,
    village: village.village,
    candidate: village.candidates.find(
      (candidate) =>
        candidate.politicalPartyName ===
        POLITICAL_PARTY_NAME[EPoliticalPartyId.KMT],
    ),
  }),
);
// 所有鄉鎮區的投票狀況 - 親民黨
const PFP_VOTE_VILLAGES: IVoteVillage[] = ALL_POLITICAL_PARTY_VOTE_VILLAGES.map(
  (village) => ({
    id: village.id,
    village: village.village,
    candidate: village.candidates.find(
      (candidate) =>
        candidate.politicalPartyName ===
        POLITICAL_PARTY_NAME[EPoliticalPartyId.PFP],
    ),
  }),
);
export const ALL_POLITICAL_PARTY_VOTE_VILLAGES_DATA = {
  [EPoliticalPartyId.DPP]: DPP_VOTE_VILLAGES,
  [EPoliticalPartyId.KMT]: KMT_VOTE_VILLAGES,
  [EPoliticalPartyId.PFP]: PFP_VOTE_VILLAGES,
};
