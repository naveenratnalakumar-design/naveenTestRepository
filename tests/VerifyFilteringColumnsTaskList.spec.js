const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify filtering columns on TaskList", () => {
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
  test("Verify filtering columns on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test,page);
    const createTaskPage= new sections.CreateTaskPage(test,page);
    await createTaskPage.clickOnTaskList()
    // await taskListPage.varifyingTaskNameFilter()
    // await taskListPage.VerifyingFacilityFilter()
    await page.pause()
    await taskListPage.verifyingBalanceFilter()
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
