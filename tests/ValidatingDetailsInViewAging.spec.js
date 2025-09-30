const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");

require("dotenv").config();

test.describe("Navigate to View Aging and validate Resident and Facility Name", () => {
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

  test("Validating Details in View Aging", async () => {
    const createTaskPage = new sections.CreateTaskPage(test, page);
    await createTaskPage.clickOnTaskList();
      await test.step("The page is loading, please wait", async () => {
      await page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await createTaskPage.clickOnCustomSortFilter();
    const taskListPage = new sections.TaskListPage(test, page);
    // await page.pause();
    await taskListPage.validateFiltersInViewAging();
  });

  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
})