import MyResponse from './MyResponse';

type ProfileResponse = MyResponse<ProfileData>;

type ProfileData = {
  registrationId: string;
  name: string;
  address: string;
  city: string;
  province: string;
  coordinate: string;
  storeName: string;
  storeAddress: string;
  phoneNumber: string;
  tid: string;
  mid: any;
  spbu: string;
  merchantType: string;
  midMap: string;
  isSubsidiProduct: boolean;
  storePhoneNumber: string;
  email: string;
  nationalityId: string;
  ditrictName: string;
  villageName: string;
  zipcode: string;
  agen: Agen;
  isActiveMyptm: boolean;
  bank: Bank;
  myptmActivationStatus: any;
  isAvailableTransaction: boolean;
};

type Agen = {
  id: string;
  name: string;
};

type Bank = {
  bankName: any;
  accountName: any;
  accountNumber: any;
};

export default ProfileResponse;
