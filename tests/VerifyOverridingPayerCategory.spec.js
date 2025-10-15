const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
require("dotenv").config();

test.describe("Verify overriding payer category", () => {
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
    test("@regression Verify overriding payer category", async () => {
        const facilityPage = new sections.FacilityPage(test, page);
        await facilityPage.VerifyOverridingPayerCategory()
    });
    test.afterAll(async () => {
        const logoutPage = new sections.LogoutPage(test, page);
        await logoutPage.logout();
    });
});