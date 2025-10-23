const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify update existing task auditLog", () => {
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
  test("@regression Validate details (Balance, Payer, Balance Status, Root Issue, Due Date, Charges) match Task List view; Update fields in Task View", async () => {
    await page.waitForTimeout(parseInt(process.env.largeWait));
    const createTaskPage = new sections.CreateTaskPage(test, page);
    const taskListPage = new sections.TaskListPage(test,page);
    await createTaskPage.clickOnTaskList();
    await page.waitForTimeout(parseInt(process.env.largeWait));
    await taskListPage.clickOnFilterBtn();
    await taskListPage.clickOnClearFilterIcon()
    await createTaskPage.verifyTaskDetailsListView();
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
