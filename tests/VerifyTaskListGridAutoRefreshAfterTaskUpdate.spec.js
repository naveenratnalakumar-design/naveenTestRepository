const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify task list opens in slide out and updating any field refreshes the tasklist grid", () => {
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
  test("@smoke Verify task list opens in slide out and updating any field refreshes the tasklist grid", async () => {
     const createTaskPage= new sections.CreateTaskPage(test,page);
      await createTaskPage.clickOnTaskList();
      const taskListPage = new sections.TaskListPage(test,page);
      await taskListPage.verifyingTasklistOpensSlideOutAndUpdatingAnyFieldRefreshesTasklistGrid()
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
