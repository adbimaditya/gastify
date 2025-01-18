import { Page } from 'playwright';

import NationalityIDVerificationPage from '../pages/NationalityIDVerificationPage';
import { Credentials } from '../types/credentials';
import writeJSONFile from '../utils/file';

import performAuthenticatedAction from './performAuthenticatedAction';

export default async function verifyNationalityID(
  page: Page,
  credentials: Credentials,
  nationalityID: string
) {
  await performAuthenticatedAction(page, credentials, async () => {
    const nationalityIDVerificationPage = new NationalityIDVerificationPage(
      page
    );

    try {
      const customer =
        await nationalityIDVerificationPage.verify(nationalityID);
      await nationalityIDVerificationPage.closeModals(customer);

      writeJSONFile(customer.toJSON(), `customer-${nationalityID}.json`);
    } catch (error) {
      if (error instanceof Error) {
        const statusCode = parseInt(error.message, 10);
        await nationalityIDVerificationPage.handleVerifyError(statusCode);
      }
    }
  });
}
