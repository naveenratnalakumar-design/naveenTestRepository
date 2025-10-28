const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify LinkAndUnlinkFileFromTask from Case", () => {
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
  test("Verify adding a file to Task from Case", async () => {
    const createTaskPage = new sections.CreateTaskPage(test, page);
    await page.pause()
    await createTaskPage.linkFiles();
  });
  // test("Verify the file can be unlinked from Task", async () => {
  //   const createTaskPage = new sections.CreateTaskPage(test, page);
  //   await createTaskPage.unlinkFile();
  // });
  test.afterAll(async () => {
    const logoutPage = new sections.LogoutPage(test, page);
    await logoutPage.logout();
  });
});
