export enum EPoliticalPartyId {
  DPP = 'DPP',
  KMT = 'KMT',
  PFP = 'PFP',
}
export const POLITICAL_PARTY_NAME = {
  [EPoliticalPartyId.DPP]: '民主進步黨',
  [EPoliticalPartyId.KMT]: '中國國民黨',
  [EPoliticalPartyId.PFP]: '親民黨',
}
export const POLITICAL_PARTY_COLOR = {
  [EPoliticalPartyId.DPP]: '#79D46A',
  [EPoliticalPartyId.KMT]: '#4299FF',
  [EPoliticalPartyId.PFP]: '#FF8C22',
}
