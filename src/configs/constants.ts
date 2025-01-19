export const BASE_URL = 'https://subsiditepatlpg.mypertamina.id/merchant';
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const PROFILE_URL = `${BASE_URL}/app/profile-merchant`;
export const PRODUCT_URL = `${BASE_URL}/app/manage-product`;
export const REPORT_URL = `${BASE_URL}/app/transaction-report`;
export const NATIONALITY_ID_VERIFICATION_URL = `${BASE_URL}/app/verification-nik`;

export const BASE_ENDPOINT = 'https://api-map.my-pertamina.id';
export const PROFILE_ENDPOINT = `${BASE_ENDPOINT}/general/v1/users/profile`;
export const PRODUCT_ENDPOINT = `${BASE_ENDPOINT}/general/v2/products`;
export const REPORT_ENDPOINT = `${BASE_ENDPOINT}/general/v1/transactions/report`;
export const NATIONALITY_ID_VERIFICATION_ENDPOINT = `${BASE_ENDPOINT}/customers/v1/verify-nik`;

export const VERIFY_NATIONALITY_ID_DELAY = 6_000;
export const VERIFY_NATIONALITY_ID_REQUEST_TIMEOUT = 60_000;
export const CUSTOMER_TYPES = {
  HOUSEHOLD: 'Rumah Tangga',
  MICRO_BUSINESS: 'Usaha Mikro',
  RETAILER: 'Pengecer',
} as const;
export const MAPPING_CUSTOMER_TYPE_TO_QUOTA = {
  [CUSTOMER_TYPES.HOUSEHOLD]: 'parent',
  [CUSTOMER_TYPES.MICRO_BUSINESS]: 'microBusiness',
  [CUSTOMER_TYPES.RETAILER]: 'retailer',
} as const;
