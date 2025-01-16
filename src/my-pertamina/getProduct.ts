import { Page } from 'playwright';

import ProductPage from '../pages/ProductPage';
import { Credentials } from '../types/credentials';
import writeJSONFile from '../utils/file';

import performAuthenticatedAction from './performAuthenticatedAction';

export default async function getProduct(page: Page, credentials: Credentials) {
  try {
    await performAuthenticatedAction(page, credentials, async () => {
      const productPage = new ProductPage(page);
      await productPage.navigate();
      const product = await productPage.fetch();

      writeJSONFile(product, 'product.json');
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during getting product:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
