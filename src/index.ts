import { config } from 'dotenv';

import BrowserManager from './managers/BrowserManager';
import LoginPage from './pages/LoginPage';
import Credentials from './types/Credentials';
import NationalityIDVerificationPage from './pages/NationalityIDVerificationPage';

config();

(async () => {
  const credentials: Credentials = {
    phoneNumber: process.env.PHONE_NUMBER as string,
    pin: process.env.PIN as string,
  };

  const browser = new BrowserManager();
  const page = await browser.createPage();

  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(credentials);

  const nationalityIDVerificationPage = new NationalityIDVerificationPage(page);
  await nationalityIDVerificationPage.waitForURL();
  await nationalityIDVerificationPage.closeAnnouncementModal();

  await page.close();
  await browser.close();
})();
