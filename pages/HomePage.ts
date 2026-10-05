import {Page , Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly signInLink: Locator;
  readonly languageSwitcher: Locator;
  readonly cartCounter: Locator;    
  readonly languageButton: Locator;
  readonly searchInput: Locator;
  readonly searchSubmitBtn: Locator;
  readonly homePageLink: Locator;
  



  constructor(page: Page) {
    super(page);
    this.signInLink = page.getByTestId('nav-sign-in');
    this.languageSwitcher = page.getByTestId('language-switcher');
    this.cartCounter = page.getByTestId('cart-quantity');
    this.languageButton = page.locator('#language');
    this.searchInput = page.getByTestId('search-query');
    this.searchSubmitBtn = page.getByTestId('search-submit');
    this.homePageLink = page.getByTestId('nav-home');
  }

      async goToHomePage() {
    await this.homePageLink.click();
  }
  
  async selectFrenchLanguage() {

    const currentLanguage = (await this.languageButton.innerText()).trim();

    if (currentLanguage !== 'FR') {
      await this.languageButton.click();
      await this.page.locator('[data-test="lang-fr"]').click();
    }
  }

    async clickSignInLink() {
    await this.signInLink.click();
  }


async search(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchSubmitBtn.click();
  }

  productCards() {
    return this.page.getByTestId('product-name');
  }

  async openFirstProduct() {
    await this.page.getByTestId('product-name').first().click();
  }



}