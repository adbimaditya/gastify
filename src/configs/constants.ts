export const BASE_URL = 'https://subsiditepatlpg.mypertamina.id/merchant';
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const PROFILE_URL = `${BASE_URL}/app/profile-merchant`;
export const PRODUCT_URL = `${BASE_URL}/app/manage-product`;
export const NATIONALITY_ID_VERIFICATION_URL = `${BASE_URL}/app/verification-nik`;
export const REPORT_URL = `${BASE_URL}/app/transaction-report`;

export const BASE_ENDPOINT = 'https://api-map.my-pertamina.id';
export const PROFILE_ENDPOINT = `${BASE_ENDPOINT}/general/v1/users/profile`;
export const PRODUCT_ENDPOINT = `${BASE_ENDPOINT}/general/v2/products`;
export const REPORT_ENDPOINT = `${BASE_ENDPOINT}/general/v1/transactions/report`;

export const CUSTOMER_TYPES = [
  'Rumah Tangga',
  'Usaha Mikro',
  'Pengecer',
] as const;
