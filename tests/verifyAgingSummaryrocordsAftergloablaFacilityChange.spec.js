const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify the summary after selecting the facilities from the search", () => {
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
  test("@regression Verify the summary after selecting the facilities from the search.", async () => {
    const agingPage = new sections.AgingPage(test, page)
    await agingPage.GetSearchResultSummary()

  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page)
    await logoutPage.logout();
  });

});
