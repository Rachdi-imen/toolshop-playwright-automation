import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async waitForUrl(pattern: RegExp | string) {
    await this.page.waitForURL(pattern);
  }

  async reload() {
    await this.page.reload();
  }

  async screenshot(name: string) {
    await this.page.screenshot({
      path: `test-results/${name}.png`,
      fullPage: true,
    });
  }

  async waitForResponseContaining(urlPart: string) {
    return this.page.waitForResponse(
      (res) => res.url().includes(urlPart) && res.ok()
    );
  }


}