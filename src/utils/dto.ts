import { Response } from 'playwright';

import ProductResponse from '../responses/ProductResponse';
import ProfileResponse from '../responses/ProfileResponse';
import { ProductRecord } from '../types/product';
import { ProfileRecord } from '../types/profile';

export async function parseResponseToProfileRecord(
  response: Response
): Promise<ProfileRecord> {
  const { data } = (await response.json()) as ProfileResponse;

  return {
    registrationId: data.registrationId,
    nationalityId: data.nationalityId,
    name: data.name,
    phoneNumber: data.phoneNumber,
    email: data.email,
    location: {
      province: data.province,
      city: data.city,
      district: data.ditrictName,
      village: data.villageName,
      address: data.address,
      zipCode: data.zipcode,
      coordinate: data.coordinate,
    },
    agent: {
      id: data.agen.id,
      name: data.agen.name,
    },
    flags: {
      isSubsidyProduct: data.isSubsidiProduct,
      isActiveMyPertamina: data.isActiveMyptm,
      isAvailableTransaction: data.isAvailableTransaction,
    },
  };
}

export async function parseResponseToProductRecord(
  response: Response
): Promise<ProductRecord> {
  const { data } = (await response.json()) as ProductResponse;

  return {
    id: data.productId,
    name: data.productName,
    modal: data.modal,
    price: data.price,
    stock: {
      available: data.stockAvailable,
      redeem: data.stockRedeem,
      sold: data.sold,
      date: data.stockDate,
    },
  };
}
