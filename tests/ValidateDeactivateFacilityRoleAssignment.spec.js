const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

test.describe("Facility Role Assignment Deactivation", () => {
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
    test("Validate Deactivate Facility Role Assignment", async () => {
        const userManagementPage = new sections.UserManagementPage(test, page);
        await page.pause()
        await userManagementPage.validateDeactivateFacilityRoleAssignment();
    });
    test.afterAll(async () => {
        const logoutPage = new sections.LogoutPage(test, page);
        await logoutPage.logout();
    });
});