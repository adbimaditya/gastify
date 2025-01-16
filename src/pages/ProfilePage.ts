import { Page, Response } from 'playwright';

import { PROFILE_ENDPOINT, PROFILE_URL } from '../configs/constants';
import Profile from '../models/Profile';
import { parseResponseToProfileRecord } from '../utils/dto';

export default class ProfilePage {
  private readonly url: string = PROFILE_URL;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  public async fetch(): Promise<Profile> {
    const response = await this.waitForResponse();
    const profileRecord = await parseResponseToProfileRecord(response);
    const profile = new Profile(profileRecord);

    return profile;
  }

  private async waitForResponse(): Promise<Response> {
    return this.page.waitForResponse(
      (response) =>
        response.request().method() === 'GET' &&
        response.url() === PROFILE_ENDPOINT
    );
  }
}
