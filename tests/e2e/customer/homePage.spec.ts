import { test, expect } from "../../../fixtures/test-fixtures";
import { allure } from "allure-playwright";
test.describe("Recherche et filtres", () => {
  test(
    "CAT-01 recherche avec resultat",
    { tag: ["@smoke", "@catalog"] },
    async ({ homePage, page }) => {
      allure.severity("critical");

      allure.description("Rechercher un produit .");

      await test.step("Aller sur la page d'accueil", async () => {
    await page.goto("/");
      });
      await test.step("Rechercher un produit existant", async () => {
        await homePage.search("saw");
      });

      await test.step("Verifier qu'au moins un resultat s'affiche", async () => {
        await expect((await homePage.productCards()).first()).toBeVisible();
      });

      //await page.screenshot({ path: "screenshot.png", fullPage: true });
    }
  );
});
