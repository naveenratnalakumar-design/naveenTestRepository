const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify Reset to Default functionality on TaskList", () => {
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
  test("@regression Verify Reset to Default functionality on TaskList", async () => {
    await page.waitForTimeout(parseInt(process.env.largeWait));
    const createTaskPage = new sections.CreateTaskPage(test, page);
    const taskListPage = new sections.TaskListPage(test,page);
    await createTaskPage.clickOnTaskList();
    await page.waitForTimeout(parseInt(process.env.largeWait));
    // await page.pause()
    await taskListPage.verifyingResetToDefaultsOnTaskList();
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
