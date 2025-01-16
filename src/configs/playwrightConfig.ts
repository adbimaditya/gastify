import { BrowserContextOptions, LaunchOptions } from 'playwright';

export const browserConfig: LaunchOptions = {
  headless: false,
  args: ['--start-maximized'],
};

export const browserContextConfig: BrowserContextOptions = {
  viewport: null,
};
