import { Page } from 'playwright';

import {
  NATIONALITY_ID_VERIFICATION_URL,
  VERIFY_NATIONALITY_ID_DELAY,
} from '../configs/constants';
import Customer from '../models/Customer';
import NationalityIDVerificationPage from '../pages/NationalityIDVerificationPage';
import { Credentials } from '../types/credentials';
import { readJSONFile, writeJSONFile } from '../utils/file';

import performAuthenticatedAction from './performAuthenticatedAction';

export default async function verifyNationalityIDs(
  page: Page,
  credentials: Credentials
) {
  const nationalityIDs: string[] = readJSONFile(
    '/public/data/nationality-ids.json'
  );
  const nationalityIDVerificationPage = new NationalityIDVerificationPage(page);

  await performAuthenticatedAction(page, credentials, async () => {
    const customers: Customer[] = [];

    await nationalityIDs.reduce(async (previousPromise, nationalityID) => {
      await previousPromise;

      try {
        const customer =
          await nationalityIDVerificationPage.verify(nationalityID);

        if (customer.hasOnlyHouseholdType()) {
          await page.goto(NATIONALITY_ID_VERIFICATION_URL);
        } else {
          await nationalityIDVerificationPage.closeModals(customer);
        }

        customers.push(customer);
      } catch (error) {
        if (error instanceof Error) {
          const statusCode = parseInt(error.message, 10);
          await nationalityIDVerificationPage.handleVerifyError(statusCode);
        }
      } finally {
        await page.waitForTimeout(VERIFY_NATIONALITY_ID_DELAY);
      }
    }, Promise.resolve());

    writeJSONFile(customers, 'customers.json');
  });
}
