const ExcelJS = require('exceljs');
const fs = require('fs');
const TAIWAN_AREA_JSON = require('../public/vote-data/taiwanArea.json');
const POLITICAL_PARTY_JSON = require('../public/vote-data/politicalParty.json');
const CANDIDATE_DETAIL_JSON = require('../public/vote-data/candidateDetail.json');

/* 產生政黨代號 JSON */
async function generatePoliticalPartyJson() {
  const elpatyFilePath = `${__dirname}/elpaty.csv`;
  const workbook = new ExcelJS.Workbook();
  const worksheet = await workbook.csv.readFile(elpatyFilePath);
  const politicalParty = {};

  worksheet.eachRow((row) => {
    // 政黨代號
    const politicalPartyId = String(row.getCell(1).value);
    // 政黨名稱
    const politicalPartyNameCell = String(row.getCell(2).value);
    politicalParty[politicalPartyId] = politicalPartyNameCell;
  });

  const politicalPartyString = JSON.stringify(politicalParty);
  const politicalPartyFilePath = `${__dirname}/politicalParty.json`;
  fs.writeFileSync(politicalPartyFilePath, politicalPartyString);
}

/* 產生候選人詳細資料 */
async function generateCandidateDetailJson() {
  const elcandFilePath = `${__dirname}/elcand.csv`;
  const workbook = new ExcelJS.Workbook();
  const worksheet = await workbook.csv.readFile(elcandFilePath);
  const candidateDetails = [];
  const candidateDetailJson = {};

  worksheet.eachRow((row) => {
    // 候選人 id
    const candidateId = String(row.getCell(6));
    // 候選人名字
    const candidateName = String(row.getCell(7));
    // 政黨代號
    const politicalPartyId = String(row.getCell(8));
    // 副手
    const isVice = String(row.getCell(16)) === 'Y' ? true : false;

    candidateDetails.push({
      candidateId,
      candidateName,
      politicalPartyId,
      isVice,
    });
  });

  candidateDetails.forEach((candidateDetail) => {
    const { candidateId, candidateName, politicalPartyId, isVice } =
      candidateDetail;
    // 政黨名
    const politicalPartyName = POLITICAL_PARTY_JSON[politicalPartyId];
    // 副總統名
    const vicePresidentName = isVice ? candidateName : null;
    // 總統名
    const presidentName = isVice ? null : candidateName;

    candidateDetailJson[candidateId] = {
      ...candidateDetailJson[candidateId],
      politicalPartyName,
      ...(isVice ? { vicePresidentName } : { presidentName }),
    };
  });

  const candidateDetailString = JSON.stringify(candidateDetailJson);
  const candidateDetailFilePath = `${__dirname}/candidateDetail.json`;
  fs.writeFileSync(candidateDetailFilePath, candidateDetailString);
}

/* 產生臺灣地區資料 */
async function generateTaiwanAreaMap() {
  const elbaseFilePath = `${__dirname}/elbase.csv`;
  const workbook = new ExcelJS.Workbook();
  const worksheet = await workbook.csv.readFile(elbaseFilePath);
  const cities = [];
  const towns = [];
  const villages = [];

  worksheet.eachRow((row) => {
    // 直轄市
    const cityCell = row.getCell(1).value;
    const cityCellId = String(cityCell).padStart(2, '0');
    // 縣轄市
    const countyCell = row.getCell(2).value;
    const countyCellId = String(countyCell).padStart(3, '0');
    // 縣市 id
    const cityId = `${cityCellId}${countyCellId}`;

    // 鄉鎮區
    const townCell = row.getCell(4).value;
    const townId = String(townCell).padStart(3, '0');
    // 村里
    const villageCell = row.getCell(5).value;
    const villageId = String(villageCell).padStart(4, '0');
    // 城鎮名
    const areaName = row.getCell(6).value;

    if (villageCell) {
      const id = `${cityId}-${townId}-${villageId}`;
      const currCityName = cities[cities.length - 1].name;
      const currTownName = towns[towns.length - 1].name;
      villages.push({
        id,
        city: currCityName,
        town: currTownName,
        village: areaName,
      });
    } else if (townCell) {
      const currCityName = cities[cities.length - 1].name;
      const id = `${cityId}-${townId}`;
      towns.push({
        id,
        city: currCityName,
        town: areaName,
      });
    } else if (cityCell) {
      const notRequiredAreas = ['臺灣省', '福建省'];
      const hasNotRequiredArea = notRequiredAreas.includes(areaName);
      if (hasNotRequiredArea) return;
      const id = cityId;
      cities.push({
        id,
        city: areaName,
      });
    }
  });

  const taiwanArea = {
    cities,
    towns,
    villages,
  };
  const taiwanAreaString = JSON.stringify(taiwanArea);
  const taiwanAreaFilePath = `${__dirname}/taiwanArea.json`;
  fs.writeFileSync(taiwanAreaFilePath, taiwanAreaString);
}

/* 產生得票明細資料 */
async function generateVoteDetail() {
  const elctksFilePath = `${__dirname}/elctks.csv`;
  const workbook = new ExcelJS.Workbook();
  const worksheet = await workbook.csv.readFile(elctksFilePath);
  const cities = [];
  const cityVoteDetails = [];
  const towns = [];
  const townVoteDetails = [];
  const villages = [];
  const villageVoteDetails = [];
  let candidates = [];
  let voteDetail = {};

  /* csv to city, town, village array */
  worksheet.eachRow((row) => {
    // 直轄市
    const cityCell = row.getCell(1).value;
    const cityCellId = String(cityCell).padStart(2, '0');
    // 縣轄市
    const countyCell = row.getCell(2).value;
    const countyCellId = String(countyCell).padStart(3, '0');
    // 縣市 id
    const cityId = `${cityCellId}${countyCellId}`;

    // 鄉鎮區
    const townCell = row.getCell(4).value;
    const townId = String(townCell).padStart(3, '0');
    // 村里
    const villageCell = row.getCell(5).value;
    const villageId = String(villageCell).padStart(4, '0');
    // 候選人 id
    const candidateCell = row.getCell(7).value;
    const candidateId = String(candidateCell);
    // 得票數
    const voteCountCell = row.getCell(8).value;
    const voteCount = Number(voteCountCell);
    // 得票率
    const voteRateCell = row.getCell(9).value;
    const voteRate = Number(voteRateCell);

    if (villageCell) {
      const id = `${cityId}-${townId}-${villageId}`;
      const village = TAIWAN_AREA_JSON.villages.find(
        (village) => village.id === id,
      );
      if (village) {
        villages.push({
          ...village,
          candidateId,
          voteCount,
          voteRate,
        });
      }
    } else if (townCell) {
      const id = `${cityId}-${townId}`;
      const town = TAIWAN_AREA_JSON.towns.find((town) => town.id === id);
      if (town) {
        towns.push({
          ...town,
          candidateId,
          voteCount,
          voteRate,
        });
      }
    } else if (cityCell) {
      const city = TAIWAN_AREA_JSON.cities.find((city) => city.id === cityId);
      if (city) {
        cities.push({
          ...city,
          candidateId,
          voteCount,
          voteRate,
        });
      }
    }
  });

  /* 將相同地區的資料合併 */
  cities.forEach((city, i) => {
    const { candidateId, voteCount, voteRate, ...rest } = city;
    const candidate = {
      ...CANDIDATE_DETAIL_JSON[candidateId],
      voteCount,
      voteRate,
    };

    if (i % 3 === 0) candidates = [];
    candidates.push(candidate);

    if (i % 3 === 2) {
      voteDetail = {
        ...rest,
        candidates: candidates,
      };
      cityVoteDetails.push(voteDetail);
    }
  });
  towns.forEach((town, i) => {
    const { candidateId, voteCount, voteRate, ...rest } = town;
    const candidate = {
      ...CANDIDATE_DETAIL_JSON[candidateId],
      voteCount,
      voteRate,
    };

    if (i % 3 === 0) candidates = [];
    candidates.push(candidate);

    if (i % 3 === 2) {
      voteDetail = {
        ...rest,
        candidates: candidates,
      };
      townVoteDetails.push(voteDetail);
    }
  });

  villages.reduce((prev, curr, index) => {
    const { candidateId, voteCount, voteRate, ...rest } = curr;

    if (prev.length > 0 && curr.id !== prev[prev.length - 1]?.id) {
      if (index === villages.length - 1) {
        prev.push(curr);
      }
      // 民進黨
      const dppCandidates = prev.filter(
        ({ candidateId }) => candidateId === '1002',
      );
      const dppCandidate = dppCandidates.reduce((prev, curr, i) => {
        const dppCandidatesLen = dppCandidates.length;
        const voteCount = (prev?.voteCount || 0) + curr.voteCount;
        const voteRate =
          i === dppCandidatesLen - 1
            ? Math.round(
                ((prev?.voteRate || 0 + curr.voteRate) / dppCandidatesLen) *
                  100,
              ) / 100
            : (prev?.voteRate || 0) + curr.voteRate;
        return {
          ...CANDIDATE_DETAIL_JSON['1002'],
          voteCount,
          voteRate,
        };
      }, {});
      // 國民黨
      const kmtCandidates = prev.filter(
        ({ candidateId }) => candidateId === '1001',
      );
      const kmtCandidate = kmtCandidates.reduce((prev, curr, i) => {
        const kmtCandidatesLen = kmtCandidates.length;
        const voteCount = (prev?.voteCount || 0) + curr.voteCount;
        const voteRate =
          i === kmtCandidatesLen - 1
            ? Math.round(
                ((prev?.voteRate || 0 + curr.voteRate) / kmtCandidatesLen) *
                  100,
              ) / 100
            : (prev?.voteRate || 0) + curr.voteRate;
        return {
          ...CANDIDATE_DETAIL_JSON['1001'],
          voteCount,
          voteRate,
        };
      }, {});
      // 親民黨
      const pfpCandidates = prev.filter(
        ({ candidateId }) => candidateId === '1000',
      );
      const pfpCandidate = pfpCandidates.reduce((prev, curr, i) => {
        const pfpCandidatesLen = pfpCandidates.length;
        const voteCount = (prev?.voteCount || 0) + curr.voteCount;
        const voteRate =
          i === pfpCandidatesLen - 1
            ? Math.round(
                ((prev?.voteRate || 0 + curr.voteRate) / pfpCandidatesLen) *
                  100,
              ) / 100
            : (prev?.voteRate || 0) + curr.voteRate;
        return {
          ...CANDIDATE_DETAIL_JSON['1000'],
          voteCount,
          voteRate,
        };
      }, {});

      const candidates = [dppCandidate, kmtCandidate, pfpCandidate];

      const voteDetail = {
        id: prev[prev.length - 1].id,
        village: prev[prev.length - 1].village,
        candidates: candidates,
      };

      // if (index < 15) {
      //   // console.log('prev', prev)
      //   // console.log('curr', curr)
      //   // console.log('candidates', candidates)
      //   console.log('voteDetail', voteDetail)
      //   // console.log('villageVoteDetails', villageVoteDetails)
      // }

      villageVoteDetails.push(voteDetail);
      prev = [curr];
      return prev;
    } else {
      prev.push(curr);
      return prev;
    }
  }, []);
  // villages.forEach((village, i) => {
  //   const { candidateId, voteCount, voteRate, ...rest } = village
  //   const candidate = {
  //     ...CANDIDATE_DETAIL_JSON[candidateId],
  //     voteCount,
  //     voteRate,
  //   }

  //   if (i % 3 === 0) candidates = []
  //   candidates.push(candidate)

  //   if (i % 3 === 2) {
  //     voteDetail = {
  //       ...rest,
  //       candidates: candidates,
  //     }
  //     villageVoteDetails.push(voteDetail)
  //   }
  // })

  const allVoteDetail = {
    cities: cityVoteDetails,
    towns: townVoteDetails,
    villages: villageVoteDetails,
  };
  const voteDetailString = JSON.stringify(allVoteDetail);
  const voteDetailFilePath = `${__dirname}/voteDetail.json`;
  fs.writeFileSync(voteDetailFilePath, voteDetailString);
}

// generatePoliticalPartyJson();
// generateCandidateDetailJson();
// generateTaiwanAreaMap();
generateVoteDetail();
