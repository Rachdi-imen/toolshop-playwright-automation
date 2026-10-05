import { test, expect } from "../../../fixtures/test-fixtures";
import { allure } from "allure-playwright";

// Ces tests ne doivent PAS utiliser le storageState
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login Feature", () => {
  test.beforeEach(async ({ page, homePage }) => {
    await page.goto("/");

    await test.step("Choisir la langue français", async () => {
      await homePage.selectFrenchLanguage();
    });

    await test.step("Aller sur la page de login", async () => {
      await homePage.clickSignInLink();
    });
  });

  test(
    "LOG-01 identifiants valides -> connecté",
    { tag: ["@smoke", "@auth"] },
    async ({ loginPage, page }) => {
      allure.severity("critical");

      allure.description(
        "Un client peut se connecter avec un email et un mot de passe valides.",
      );

      await test.step("Se connecter avec des identifiants valides", async () => {
        await loginPage.login(
          process.env.CUSTOMER_EMAIL!,
          process.env.CUSTOMER_PASSWORD!,
        );
      });

      await test.step("Vérifier la redirection vers le compte", async () => {
        await expect(page).toHaveURL(/\/account/);
      });
    },
  );

  test(
    "LOG-02 mot de passe incorrect -> erreur",
    { tag: ["@regression", "@auth"] },
    async ({ loginPage }) => {
      allure.severity("critical");

      allure.description(
        "Un mot de passe incorrect doit afficher un message d'erreur et refuser la connexion.",
      );

      await test.step("Tenter une connexion avec un mauvais mot de passe", async () => {
        await loginPage.login(process.env.CUSTOMER_EMAIL!, "WrongPass!23");
      });

      await test.step("Vérifier le message d'erreur", async () => {
        await expect(loginPage.loginErrorMsg).toContainText(
          "Invalid email or password",
        );
      });
    },
  );

  test(
    "LOG-03 champs vides -> pas de connexion",
    { tag: ["@regression", "@auth"] },
    async ({ page, loginPage }) => {
      allure.story("Login");
      allure.severity("critical");

      allure.description(
        "Un email vide doit afficher un message d'erreur et bloquer la connexion.",
      );

      await test.step("Tenter une connexion avec un email vide", async () => {
        await loginPage.login("", process.env.CUSTOMER_PASSWORD!);
      });

      await test.step("Vérifier le message d'erreur", async () => {
        await expect(loginPage.emailRequiredError).toContainText(
          "L'email est requis",
        );
      });

      await test.step("Vérifier qu'on reste sur la page de login", async () => {
        await expect(page).toHaveURL(/\/auth\/login/);
      });
    },
  );
});



