interface IAllPoliticalPartyVote {
  id: string
  candidates: {
    politicalPartyName: string
    presidentName: string
    vicePresidentName: string
    voteCount: number
    voteRate: number
  }[]
}
export interface IAllPoliticalPartyVoteCity extends IAllPoliticalPartyVote {
  city: string
}
export interface IAllPoliticalPartyVoteTown extends IAllPoliticalPartyVote {
  town: string
}
export interface IAllPoliticalPartyVoteVillage extends IAllPoliticalPartyVote {
  village: string
}

interface IPoliticalPartyVote {
  id: string
  candidate?: {
    politicalPartyName: string
    presidentName: string
    vicePresidentName: string
    voteCount: number
    voteRate: number
  }
}
export interface IVoteCity extends IPoliticalPartyVote {
  city: string
}
export interface IVoteTown extends IPoliticalPartyVote {
  town: string
}
export interface IVoteVillage extends IPoliticalPartyVote {
  village: string
}
export interface IVoteArea extends IPoliticalPartyVote {
  area: string
}
