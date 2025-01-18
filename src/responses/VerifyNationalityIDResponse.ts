import MyResponse from './MyResponse';

type VerifyNationalityIDResponse = MyResponse<VerifyNationalityIDData>;

type VerifyNationalityIDData = {
  nationalityId: string;
  name: string;
  email: string;
  phoneNumber: string;
  businessType: string;
  quotaRemaining: QuotaRemaining;
  quotaRemainingLastMonth: QuotaRemainingLastMonth;
  customerTypes: CustomerType[];
  channelInject: string;
  isAgreedTermsConditions: boolean;
  isCompleted: boolean;
  isSubsidi: boolean;
  isRecommendationLetter: boolean;
  isBlocked: boolean;
  isBusinessType: boolean;
};

type QuotaRemaining = {
  type: number;
  parent: number;
  retailer: number;
  fisherman: number;
  farmer: number;
  microBusiness: number;
  all: number;
};

type QuotaRemainingLastMonth = {
  type: number;
  parent: number;
  retailer: number;
  fisherman: number;
  farmer: number;
  microBusiness: number;
  all: number;
};

type CustomerType = {
  name: string;
  sourceTypeId: number;
  status: number;
  verifications: any[];
  merchant: any;
  isBlocked: boolean;
};

export default VerifyNationalityIDResponse;
