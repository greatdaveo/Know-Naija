export interface ElectedRep {
  president: string;
  governors: number;
  national_assembly: number;
  federal_house_of_representatives: number;
  local_government_chairmen: number;
  councilors: number;
}

export interface HistoricalEvent {
  _id: string;
  date: string;
  event: string;
}

export interface HistoryOfFuelPrice {
  leader: string;
  year: string;
  price_change: string;
  percentage_increase?: string;
  _id: string;
}

export interface SenatePresidentsSince1960 {
  name: string;
  term: string;
  image: string;
  _id: string;
}

export interface SpeakersOfTheHouseOfRepSince1960 {
  name: string;
  image: string;
  _id: string;
}

export interface StateCreation {
  name: string;
  date: string;
  details: string;
  _id: string;
}

export interface HistoryOfNigCurrency {
  event: string;
  date: string;
  details: string;
  _id: string;
}

export interface HistoryInfoData {
  _id: string;
  numbers_of_elected_rep_in_political_offices: ElectedRep;
  historical_events_since_2009: HistoricalEvent[];
  history_of_fuel_price_increase: HistoryOfFuelPrice[];
  senate_presidents_since_1960: SenatePresidentsSince1960[];
  speakers_of_the_house_of_rep_since_1960: SpeakersOfTheHouseOfRepSince1960[];
  state_creation_in_nigeria: StateCreation[];
  history_of_nigerian_currency: HistoryOfNigCurrency[];
}
