interface Master {
  name: string;
  year: string;
  image: string;
}

export interface ColonialMaster {
  title: string;
  masters: Master[];
}

export interface TiersOfGovt {
  tier: string[];
}

export interface ChiefExecutives {}

export interface titleOfHead {}

//:::::::::::
interface ServiceChief {
  name: string[];
  position: string[];
  _id: string;
}

export interface ServiceChiefs {
  title: string;
  chiefs: ServiceChief[];
}

// :::::::::::
interface Minister {
  name: string;
  position: string;
  _id: string;
}

export interface MinistersAndPortfolios {
  title: string;
  minister: Minister[];
}

// ::::::::::::
interface Agency {
  name: string;
  position: string;
  _id: string;
}

export interface HeadOfGovtAgency {
  title: string;
  agency: Agency[];
}

// :::::::::::
interface Appointee {
  name: string;
  position: string;
  _id: string;
}

export interface AppointedRepresentatives {
  title: string;
  appointee: Appointee[];
  _id: string;
}

// ::::::::::
interface Office {
  officeTitle: string;
  addressAs: string;
  _id: string;
}

export interface OfficeTitleAndModeOfAddress {
  title: string;
  office: Office[];
  _id: string;
}

// For Past Presidents
interface President {
  name: string;
  year: string;
  image: string;
  _id: string;
}

interface RepublicEra {
  republic_era: string;
  presidents: President[];
}

export interface PastPresidents {
  title: string;
  eras: RepublicEra[];
}

// :::::::::::::::
interface ArmsOfGovtOccupant {
  name: string;
  position: string;
  _id: string;
}

export interface ArmsOfGovt {
  title: string;
  arms_name: string;
  occupants: ArmsOfGovtOccupant;
  functions: string[];
  _id: string;
}

export interface GovtInfoData {
  _id: string;
  colonial_masters: ColonialMaster;
  tiers_of_govt: TiersOfGovt;
  head_or_chief_executives: any;
  title_of_head: any;
  service_chiefs: ServiceChief;
  ministers_and_portfolios: MinistersAndPortfolios;
  head_of_govt_agency: HeadOfGovtAgency;
  appointed_representatives: AppointedRepresentatives;
  office_title_and_mode_of_address: OfficeTitleAndModeOfAddress;
  past_presidents: PastPresidents;
  arms_of_govt: ArmsOfGovt;
}
