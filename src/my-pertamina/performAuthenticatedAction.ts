import { Page } from 'playwright';

import LoginPage from '../pages/LoginPage';
import NationalityIDVerificationPage from '../pages/NationalityIDVerificationPage';
import { Credentials } from '../types/credentials';

export default async function performAuthenticatedAction(
  page: Page,
  credentials: Credentials,
  action: () => Promise<void>
) {
  const loginPage = new LoginPage(page);
  const nationalityIDVerificationPage = new NationalityIDVerificationPage(page);

  try {
    await loginPage.navigate();
    await loginPage.login(credentials);

    await nationalityIDVerificationPage.waitForURL();
    await nationalityIDVerificationPage.closeAnnouncementModal();

    await action();

    await nationalityIDVerificationPage.navigate();
    await nationalityIDVerificationPage.logout();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during authenticated action:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
