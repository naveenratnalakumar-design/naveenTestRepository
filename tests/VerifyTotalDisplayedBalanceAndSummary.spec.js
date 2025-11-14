const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify total summary balance", () => {
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
  test.only("@smoke Verify Total Displayed Balance and Summary", async () => {
    const agingPage = new sections.AgingPage(test,page)
    await agingPage.GetTotalBalanceAndSummary()  

   });
   test.afterAll(async () => {
     const logoutPage = new sections.LogoutPage(test, page);
     await logoutPage.logout();
   });
 });
