const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify Sorting all columns on TaskList", () => {
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
  test("@smoke Verify Sorting all columns on TaskList", async () => {
    const taskListPage = new sections.TaskListPage(test,page);
    const createTaskPage= new sections.CreateTaskPage(test,page);
    await createTaskPage.clickOnTaskList();
    await taskListPage.verifyingTaskNameSortingFunctionality();
    await taskListPage.verifyingFacilityColumnSortingFunctionality()
    await taskListPage.verifyResidentColumnSortingFunctionality()
    await taskListPage.verifyPayerColumnSortingFunctionality()
    await taskListPage.verifyingBalanceColumnSortingFunctionality()
    await taskListPage.verifyingBalanceStatusSortingFunctionality()
    await taskListPage.verifyingDuedateSortingFunctionality()
    await taskListPage.verifyingTaskStatusSortingFunctionality()
    await taskListPage.verifyingAssignedToSortingFunctionality()
    await taskListPage.verifyingRootIssuesSortingFunctionality();
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
