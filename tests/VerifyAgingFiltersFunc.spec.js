const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
require("dotenv").config();

test.describe("Verify filtering on Aging (Payer, Resident, Resident Balance, Balance Status)", () => {
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
  test("@smoke Verify filtering on Aging (Payer, Resident, Resident Balance, Balance Status)", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.GetResidentFilter()
    await agingPage.GetPayerFilter()
    await agingPage.GetResidentBalanceFilter()
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
