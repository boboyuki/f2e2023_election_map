export enum EPoliticalPartyId {
  DPP = 'DPP', // 美丁美黨
  KMT = 'KMT', // 麥當黨
  PFP = 'PFP', // 丁丁黨
}
export const POLITICAL_PARTY_NAME = {
  [EPoliticalPartyId.DPP]: '丁丁黨',
  [EPoliticalPartyId.KMT]: '麥當黨',
  [EPoliticalPartyId.PFP]: '美丁美黨',
};
export const POLITICAL_PARTY_COLOR = {
  [EPoliticalPartyId.DPP]: '#79D46A',
  [EPoliticalPartyId.KMT]: '#4299FF',
  [EPoliticalPartyId.PFP]: '#FF8C22',
};
