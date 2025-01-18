import { config } from 'dotenv';

import BrowserManager from './managers/BrowserManager';
import getProfile from './my-pertamina/getProfile';
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

  await page.close();
  await browser.close();
})();
