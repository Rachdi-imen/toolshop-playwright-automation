import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMsg: Locator;
  readonly emailRequiredError: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit');

    // Erreur retournée après une mauvaise authentification
    this.loginErrorMsg = page.getByTestId('login-error');

    // Erreur de validation du champ email
    this.emailRequiredError = page.getByText("L'email est requis");

    this.pageTitle = page.getByTestId('page-title');
  }



  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}