import { Page } from 'playwright';

import ProfilePage from '../pages/ProfilePage';
import { Credentials } from '../types/credentials';
import { writeJSONFile } from '../utils/file';

import performAuthenticatedAction from './performAuthenticatedAction';

export default async function getProfile(page: Page, credentials: Credentials) {
  await performAuthenticatedAction(page, credentials, async () => {
    const profilePage = new ProfilePage(page);

    try {
      await profilePage.navigate();
      const profile = await profilePage.fetch();

      writeJSONFile(profile, 'profile.json');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during getting profile:', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  });
}
