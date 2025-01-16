import { Page } from 'playwright';

import { NATIONALITY_ID_VERIFICATION_URL } from '../configs/constants';

export default class NationalityIDVerificationPage {
  private readonly url: string = NATIONALITY_ID_VERIFICATION_URL;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  public async waitForURL(): Promise<void> {
    await this.page.waitForURL(this.url);
  }

  public async closeAnnouncementModal(): Promise<void> {
    await this.page.locator('[data-testid^="btnClose"]').click();
  }
}
