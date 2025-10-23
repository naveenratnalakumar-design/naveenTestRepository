const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");

require("dotenv").config();

test.describe("Verify resident & Facility filters applied correctly on ViewTask page", () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    const loginPage = new sections.LoginPage(test, page);
    await loginPage.launchingApplication([process.env.baseURL]);
    await loginPage.loginWithValidCredentials(
      [testData.RevflowData.loginDetails.userEmail],
      [testData.RevflowData.loginDetails.password]
    );
  });

  test("Validate Default Filters in Tracker Account", async () => {
        const createTaskPage = new sections.CreateTaskPage(test, page);
        await createTaskPage.clickOnTaskList();
        const taskListPage = new sections.TaskListPage(test, page);
        await taskListPage.checkingFiltersForTrackerAccount();
    }),

  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
})
    

 