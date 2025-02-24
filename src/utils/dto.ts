import { Response } from 'playwright';

import { MAPPING_CUSTOMER_TYPE_TO_QUOTA } from '../configs/constants';
import ProductResponse from '../responses/ProductResponse';
import ProfileResponse from '../responses/ProfileResponse';
import ReportResponse from '../responses/ReportResponse';
import VerifyNationalityIDResponse from '../responses/VerifyNationalityIDResponse';
import { CustomerRecord, CustomerType } from '../types/customer';
import { ProductRecord } from '../types/product';
import { ProfileRecord } from '../types/profile';
import { ReportRecord } from '../types/report';

export async function parseResponseToProfileRecord(
  response: Response
): Promise<ProfileRecord> {
  const { data } = (await response.json()) as ProfileResponse;

  return {
    registrationID: data.registrationId,
    nationalityID: data.nationalityId,
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

export async function parseResponseToReportRecord(
  response: Response
): Promise<ReportRecord> {
  const { data } = (await response.json()) as ReportResponse;
  const summaryReport = data.summaryReport[0];

  return {
    summary: {
      sold: summaryReport.sold,
      modal: summaryReport.modal,
      profit: summaryReport.profit,
      income: summaryReport.incomeMyptm,
    },
    transactions: data.customersReport.map((customerReport) => ({
      id: customerReport.customerReportId,
      customer: {
        nationalityID: customerReport.nationalityId,
        name: customerReport.name,
        types: customerReport.categories as CustomerType[],
      },
      product: {
        quantity: customerReport.total,
      },
    })),
  };
}

export async function parseResponseToCustomerRecord(
  response: Response,
  nationalityID: string
): Promise<CustomerRecord> {
  const { data } = (await response.json()) as VerifyNationalityIDResponse;

  return {
    nationalityID,
    name: data.name,
    quotas: data.customerTypes.map((customerType) => {
      const type = customerType.name as CustomerType;

      return {
        type,
        quantity: data.quotaRemaining[MAPPING_CUSTOMER_TYPE_TO_QUOTA[type]],
      };
    }),
    flags: {
      isAgreedTermsConditions: data.isAgreedTermsConditions,
      isCompleted: data.isCompleted,
      isSubsidy: data.isSubsidi,
      isRecommendationLetter: data.isRecommendationLetter,
      isBlocked: data.isBlocked,
      isBusinessType: data.isBusinessType,
    },
  };
}
