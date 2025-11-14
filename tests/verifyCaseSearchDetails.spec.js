const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify that the resident name is correctly displayed for the searched name", () => {
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

  test("@smoke Verify that the resident name is correctly displayed for the searched name", async () => {
    const tasklistPage = new sections.TaskListPage(test, page);
    await tasklistPage.validateCaseDetailsUsingCaseSearch();
  });
  test("@smoke Verify the resident name is correctly displayed after searching a case using the Global Facility filter", async () => {
    const tasklistPage = new sections.TaskListPage(test, page);
    const createTaskpage = new sections.CreateTaskPage(test, page);
    await createTaskpage.clickOnTaskList();
    await tasklistPage.validateResidentNameAndFacilityForSelectedCaseOnGlobalFacility();
  });

  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
