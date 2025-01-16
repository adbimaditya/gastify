import { Page, Response } from 'playwright';

import { PRODUCT_ENDPOINT, PRODUCT_URL } from '../configs/constants';
import Product from '../models/Product';
import { parseResponseToProductRecord } from '../utils/dto';

export default class ProductPage {
  private readonly url: string = PRODUCT_URL;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate() {
    await this.page.goto(this.url);
  }

  public async fetch(): Promise<Product> {
    const response = await this.waitForResponse();
    const productRecord = await parseResponseToProductRecord(response);
    const product = new Product(productRecord);

    return product;
  }

  private async waitForResponse(): Promise<Response> {
    return this.page.waitForResponse(
      (response) =>
        response.request().method() === 'GET' &&
        response.url() === PRODUCT_ENDPOINT
    );
  }
}
