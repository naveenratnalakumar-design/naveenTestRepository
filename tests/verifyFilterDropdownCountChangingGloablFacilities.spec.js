const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify Payers, Resident, Facility, Assigned To users counts changes in filter dropdown values on on Task list when global facility is updated", () => {
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
  test("@smoke Verify Payers, Resident, Facility, Assigned To users counts changes in filter dropdown values on on Task list when global facility is updated", async () => {
    const taskListPage = new sections.TaskListPage(test,page);
       const createTaskPage= new sections.CreateTaskPage(test,page);
       await createTaskPage.clickOnTaskList();
       await taskListPage.VerifyResidentPayerFacilityAssignedToDropdownOptionsCountChangingGlobalFacilities()
  });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
