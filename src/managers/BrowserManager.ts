import { Browser, BrowserContext, chromium, Page } from 'playwright';

import {
  browserConfig,
  browserContextConfig,
} from '../configs/playwrightConfig';

export default class BrowserManager {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;

  async createPage(): Promise<Page> {
    if (!this.context) {
      await this.createContext();
    }

    const page = await this.context!.newPage();
    return page;
  }

  async createContext(): Promise<BrowserContext> {
    if (!this.browser) {
      await this.launch();
    }

    this.context = await this.browser!.newContext(browserContextConfig);
    return this.context;
  }

  async launch(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await chromium.launch(browserConfig);
    }

    return this.browser;
  }

  async close(): Promise<void> {
    if (this.context) {
      await this.context.close();
      this.context = null;
    }

    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
