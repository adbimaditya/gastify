import { config } from 'dotenv';

import BrowserManager from './managers/BrowserManager';
import getProduct from './my-pertamina/getProduct';
import getProfile from './my-pertamina/getProfile';
import getReport from './my-pertamina/getReport';
import { Credentials } from './types/credentials';

config();

(async () => {
  const credentials: Credentials = {
    phoneNumber: process.env.PHONE_NUMBER as string,
    pin: process.env.PIN as string,
  };

  const browser = new BrowserManager();
  const page = await browser.createPage();

  await getProfile(page, credentials);
  await page.waitForTimeout(1000);
  await getProduct(page, credentials);
  await page.waitForTimeout(1000);
  await getReport(page, credentials, {
    started: '2025-01-01',
    ended: '2025-01-17',
  });

  await page.close();
  await browser.close();
})();
