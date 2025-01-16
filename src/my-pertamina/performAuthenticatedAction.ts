import { Page } from 'playwright';

import LoginPage from '../pages/LoginPage';
import NationalityIDVerificationPage from '../pages/NationalityIDVerificationPage';
import { Credentials } from '../types/credentials';

export default async function performAuthenticatedAction(
  page: Page,
  credentials: Credentials,
  action: () => Promise<void>
) {
  try {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials);

    const nationalityIdVerificationPage = new NationalityIDVerificationPage(
      page
    );
    await nationalityIdVerificationPage.waitForURL();
    await nationalityIdVerificationPage.closeAnnouncementModal();

    await action();

    await nationalityIdVerificationPage.navigate();
    await nationalityIdVerificationPage.logout();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during authenticated action:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
