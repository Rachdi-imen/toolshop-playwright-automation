import { test, expect } from "@playwright/test";

test.describe("Tests visuels", () => {
  test(
    "VIS-01 la page d'accueil ne change pas visuellement",
    { tag: ["@visual"] },
    async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveScreenshot("homepage.png", {
        maxDiffPixelRatio: 0.02,
        fullPage: true,
      });
    },
  );

//   test(
//     "VIS-02 la fiche produit ne change pas visuellement",
//     { tag: ["@visual"] },
//     async ({ page }) => {
//       await page.goto("/product/01M3M1M6BREZ1YYNAZGJTCTC3S");
//       await expect(page).toHaveScreenshot("product-page.png", {
//         maxDiffPixelRatio: 0.02,
//       });
//     },
//   );
});
