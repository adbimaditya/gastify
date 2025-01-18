import { CUSTOMER_TYPES } from '../configs/constants';

export type CustomerRecord = {
  nationalityID: string;
  name: string;
  quotas: CustomerQuota[];
  flags: CustomerFlags;
};

export type CustomerQuota = {
  type: CustomerType;
  quantity: number;
};

export type CustomerType = (typeof CUSTOMER_TYPES)[keyof typeof CUSTOMER_TYPES];

export type CustomerFlags = {
  isAgreedTermsConditions: boolean;
  isCompleted: boolean;
  isSubsidy: boolean;
  isRecommendationLetter: boolean;
  isBlocked: boolean;
  isBusinessType: boolean;
};
