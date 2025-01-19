import { CUSTOMER_TYPES } from '../configs/constants';
import {
  CustomerFlags,
  CustomerQuota,
  CustomerRecord,
} from '../types/customer';

export default class Customer {
  private readonly nationalityID: string;
  private readonly name: string;
  private readonly quotas: CustomerQuota[];
  private readonly flags: CustomerFlags;

  constructor({ nationalityID, name, quotas, flags }: CustomerRecord) {
    this.nationalityID = nationalityID;
    this.name = name;
    this.quotas = quotas;
    this.flags = flags;
  }

  public hasOnlyHouseholdType(): boolean {
    return (
      this.quotas.length === 1 &&
      this.quotas[0].type === CUSTOMER_TYPES.HOUSEHOLD
    );
  }

  public hasOutdatedRecommendationLetter(): boolean {
    return this.hasMicroBusinessType() && !this.flags.isRecommendationLetter;
  }

  private hasMicroBusinessType(): boolean {
    return Boolean(
      this.quotas.find((quota) => quota.type === CUSTOMER_TYPES.MICRO_BUSINESS)
    );
  }

  public isMultipleTypes(): boolean {
    return this.quotas.length > 1;
  }

  public toJSON(): Readonly<CustomerRecord> {
    return {
      nationalityID: this.nationalityID,
      name: this.name,
      quotas: this.quotas,
      flags: this.flags,
    };
  }
}
