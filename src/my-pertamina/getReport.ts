import { Page } from 'playwright';

import ReportPage from '../pages/ReportPage';
import { Credentials } from '../types/credentials';
import { Dates } from '../types/dates';
import writeJSONFile from '../utils/file';

import performAuthenticatedAction from './performAuthenticatedAction';

export default async function getReport(
  page: Page,
  credentials: Credentials,
  dates: Dates
) {
  try {
    await performAuthenticatedAction(page, credentials, async () => {
      const reportPage = new ReportPage(page);
      await reportPage.navigate(dates);
      const report = await reportPage.fetch(dates);

      writeJSONFile(
        report.toJSON(),
        `report-${dates.started}_to_${dates.ended}.json`
      );
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during getting report:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
