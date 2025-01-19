import { StatusCodes } from 'http-status-codes';
import { Page, Response } from 'playwright';

import {
  NATIONALITY_ID_VERIFICATION_ENDPOINT,
  NATIONALITY_ID_VERIFICATION_URL,
  VERIFY_NATIONALITY_ID_REQUEST_TIMEOUT,
} from '../configs/constants';
import Customer from '../models/Customer';
import { parseResponseToCustomerRecord } from '../utils/dto';

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

  public async verify(nationalityID: string): Promise<Customer> {
    const responsePromise = this.waitForResponse(nationalityID);
    await this.fillForm(nationalityID);
    await this.submitForm();
    const response = await responsePromise;

    if (!response.ok()) {
      throw new Error(response.status().toString());
    }

    const customerRecord = await parseResponseToCustomerRecord(
      response,
      nationalityID
    );
    const customer = new Customer(customerRecord);

    return customer;
  }

  private async waitForResponse(nationalityID: string): Promise<Response> {
    return this.page.waitForResponse(
      (response) =>
        response.request().method() === 'GET' &&
        response.url() ===
          `${NATIONALITY_ID_VERIFICATION_ENDPOINT}?nationalityId=${nationalityID}`
    );
  }

  private async fillForm(nationalityID: string): Promise<void> {
    await this.page
      .getByPlaceholder('Masukkan 16 digit NIK KTP Pelanggan')
      .fill(nationalityID);
    await this.page
      .getByPlaceholder('Masukkan 16 digit NIK KTP Pelanggan')
      .press('Escape');
  }

  private async submitForm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Cek' }).click();
  }

  public async logout(): Promise<void> {
    await this.page.getByTestId('btnLogout').click();
    await this.page
      .getByRole('dialog')
      .getByRole('button', { name: 'Keluar' })
      .click();
  }

  public async handleVerifyError(status: StatusCodes): Promise<void> {
    switch (status) {
      case StatusCodes.NOT_FOUND:
        await this.closeNationalityIdRegistrationModal();
        break;
      case StatusCodes.TOO_MANY_REQUESTS:
        await this.page.waitForTimeout(VERIFY_NATIONALITY_ID_REQUEST_TIMEOUT);
        break;
      default:
        break;
    }
  }

  private async closeNationalityIdRegistrationModal(): Promise<void> {
    await this.page.getByRole('dialog').getByTestId('btnModalBack').click();
  }

  public async closeModals(customer: Customer): Promise<void> {
    if (customer.hasOutdatedRecommendationLetter()) {
      await this.closeUpdateCustomerModal();
      return;
    }

    if (customer.isMultipleTypes()) {
      await this.closeChooseCustomerTypeModal();
    }
  }

  private async closeUpdateCustomerModal(): Promise<void> {
    await this.page.getByRole('dialog').getByText('Kembali').click();
  }

  private async closeChooseCustomerTypeModal(): Promise<void> {
    await this.page.getByRole('dialog').getByTestId('btnBack').click();
  }

  public async closeAnnouncementModal(): Promise<void> {
    await this.page.locator('[data-testid^="btnClose"]').click();
  }
}
