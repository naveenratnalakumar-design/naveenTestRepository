const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify Dashboard and Task List Items", () => {
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
  test("@smoke Verify Dashboard Items", async () => {
    const dashboardPage = new sections.DashboardPage(test, page);
    await dashboardPage.validateTaskListModuleCardOnDashboard();
    await dashboardPage.validateArAgingModuleCardOnDashboard();
  });
  test("@smoke Verify details on Task list page", async () => {
    const createTaskPage = new sections.CreateTaskPage(test, page);
    await createTaskPage.VerifyingDetailsForTaskListPage();
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
