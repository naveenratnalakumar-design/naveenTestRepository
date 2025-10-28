const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Verify data is populated correctly when the toggles are on and off on Aging Screen", () => {
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
    test("Verify data when toggles are On and Off", async () => {
        const createTaskPage = new sections.CreateTaskPage(test, page);
        await createTaskPage.clickOnArAgingBtn();
        const agingPage = new sections.AgingPage(test, page);
        // await page.pause();
        await agingPage.verifyActiveAndInactiveToggles();
    });
    test.afterAll(async () => {
        const logoutPage = new sections.LogoutPage(test, page);
        await logoutPage.logout();
    });
});
