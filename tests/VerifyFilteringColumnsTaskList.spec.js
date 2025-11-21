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
  test("@smoke Verify filtering columns on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test, page);
    const createTaskPage = new sections.CreateTaskPage(test, page);
    await createTaskPage.clickOnTaskList();
    await taskListPage.varifyingTaskNameFilter();
    await taskListPage.VerifyingFacilityFilter();
    await taskListPage.verifyingBalanceFilter();
    await taskListPage.verifyingBalanceStatusFilter();
    await taskListPage.verifyingDuedateFilter();
    await taskListPage.verifyingTaskStatusFilter();
    await taskListPage.verifyingResidentNameFilter();
    await taskListPage.verifyingPayerFilter();
    await taskListPage.verifyingAssignedToFilter();
    await taskListPage.verifyingRootIssueFilter();
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
