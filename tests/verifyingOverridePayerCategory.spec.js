const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify PayerCategory is overriden from Facility Payers page then on Aging that payer should display under the updated PayerCategory", () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    const loginPage = new sections.LoginPage(test, page);
    await loginPage.launchingApplication([process.env.baseURL]);
    await loginPage.loginWithValidCredentials(
      [process.env.userEmail],
      [process.env.password]
    );
  });
  test("@smoke Verify PayerCategory is overriden from Facility Payers page then on Aging that payer should display under the updated PayerCategory.", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.verifyPayerUnderPayerCategory();
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
