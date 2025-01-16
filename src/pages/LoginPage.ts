import { Page } from 'playwright';

import { LOGIN_URL } from '../configs/constants';
import { Credentials } from '../types/credentials';

export default class LoginPage {
  private readonly url: string = LOGIN_URL;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: 'networkidle' });
  }

  public async login(credentials: Credentials): Promise<void> {
    await this.fillForm(credentials);
    await this.submitForm();
  }

  private async fillForm({ phoneNumber, pin }: Credentials): Promise<void> {
    await this.page
      .getByPlaceholder('Email atau No. Handphone')
      .fill(phoneNumber);
    await this.page.getByPlaceholder('PIN (6-digit)').fill(pin);
  }

  private async submitForm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Masuk' }).click();
  }
}
