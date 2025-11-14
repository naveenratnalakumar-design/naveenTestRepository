const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify Sort behavior for all applicable columns on User View", () => {
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
  test("@smoke Verify Sort behavior for all applicable columns on User View", async () => {
    const userManagementPage = new sections.UserManagementPage(test,page);
    await userManagementPage.verifyFirstNameSortFunctunality();
    // await userManagementPage.verifyLastNameSortFunctunality()
    await userManagementPage.verifyAddedOnRevFlowSortFunctunality()
    await userManagementPage.verifyRevFlowAccessSortFunctunality()
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
