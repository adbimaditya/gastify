import { Page, Response } from 'playwright';

import { REPORT_ENDPOINT, REPORT_URL } from '../configs/constants';
import Report from '../models/Report';
import { Dates } from '../types/dates';
import { parseResponseToReportRecord } from '../utils/dto';

export default class ReportPage {
  private readonly url: string = REPORT_URL;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate(dates: Dates): Promise<void> {
    await this.page.goto(
      `${this.url}?startDate=${dates.started}&endDate=${dates.ended}`
    );
  }

  public async fetch(dates: Dates): Promise<Report> {
    const response = await this.waitForResponse(dates);
    const reportRecord = await parseResponseToReportRecord(response);
    const report = new Report(reportRecord);

    return report;
  }

  private async waitForResponse(dates: Dates): Promise<Response> {
    return this.page.waitForResponse(
      (response) =>
        response.request().method() === 'GET' &&
        response.url() ===
          `${REPORT_ENDPOINT}?startDate=${dates.started}&endDate=${dates.ended}`
    );
  }
}
