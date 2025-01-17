import { CustomerType } from './customer';

export type ReportRecord = {
  summary: ReportSummary;
  transactions: Transaction[];
};

export type ReportSummary = {
  sold: number;
  modal: number;
  profit: number;
  income: number;
};

export type Transaction = {
  id: string;
  customer: {
    nationalityId: string;
    name: string;
    types: CustomerType[];
  };
  product: {
    quantity: number;
  };
};
