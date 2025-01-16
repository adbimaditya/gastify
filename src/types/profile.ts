export type ProfileRecord = {
  registrationId: string;
  nationalityId: string;
  name: string;
  phoneNumber: string;
  email: string;
  location: ProfileLocation;
  agent: ProfileAgent;
  flags: ProfileFlags;
};

export type ProfileLocation = {
  province: string;
  city: string;
  district: string;
  village: string;
  address: string;
  zipCode: string;
  coordinate: string;
};

export type ProfileAgent = {
  id: string;
  name: string;
};

export type ProfileFlags = {
  isSubsidyProduct: boolean;
  isActiveMyPertamina: boolean;
  isAvailableTransaction: boolean;
};
