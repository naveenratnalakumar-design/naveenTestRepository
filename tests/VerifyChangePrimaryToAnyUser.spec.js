const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Assign Primary to Any User and Validate New Primary User", () => {
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
    test("@regression Verify Change Primary To Any User", async () => {
        const userManagementPage = new sections.UserManagementPage(test, page);
        await userManagementPage.verifyingChangePrimaryUser();
    });
    test.afterAll(async () => {
        const logoutPage = new sections.LogoutPage(test, page);
        await logoutPage.logout();
    });
});