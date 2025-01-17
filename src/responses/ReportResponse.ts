import MyResponse from './MyResponse';

type ReportResponse = MyResponse<ReportData>;

type ReportData = {
  summaryReport: SummaryReport[];
  customersReport: CustomersReport[];
};

type SummaryReport = {
  sold: number;
  modal: number;
  profit: number;
  incomeMyptm: number;
};

type CustomersReport = {
  customerReportId: string;
  nationalityId: string;
  name: string;
  categories: string[];
  total: number;
};

export default ReportResponse;
