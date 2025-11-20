const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify clearing of specific filters on the Ar Aging when changing the Global Facility Filter(Resident,Payer)", () => {
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
  test("@smoke Verify clearing of specific filters on the Ar Aging when changing the Global Facility Filter(Resident,Payer)", async () => {
    const agingPage = new sections.AgingPage(test, page);
    await agingPage.verifyAgingFiltersResetGlobalFacilityChange()
    
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
