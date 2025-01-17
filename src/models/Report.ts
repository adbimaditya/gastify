import { ReportRecord, ReportSummary, Transaction } from '../types/report';

export default class Report {
  private readonly summary: ReportSummary;
  private readonly transactions: Transaction[];

  constructor({ summary, transactions }: ReportRecord) {
    this.summary = summary;
    this.transactions = transactions;
  }

  public toJSON(): Readonly<ReportRecord> {
    return {
      summary: this.summary,
      transactions: this.transactions,
    };
  }
}
