const{test,expect}= require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();


test.describe("Creating Task from Aging with file attachment", () => {
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

    test("Create task with file attachment using browse",async()=>{
        const createTaskpage=new sections.CreateTaskPage(test,page);
        // await page.pause();
        await createTaskpage.arAgingBrowseFile();
    });
    test.afterAll(async () => {
        const logoutPage = new sections.LogoutPage(test,page);
        await logoutPage.logout();
      });

});