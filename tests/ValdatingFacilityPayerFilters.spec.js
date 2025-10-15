const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const testData = require("../test_Data/testData.json");
require("dotenv").config();

test.describe("Validating facility and payer filters", () => {
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
    test("@regression Verifying facility and payer filters", async () => {
        const facilityPage = new sections.FacilityPage(test, page);
        await facilityPage.validateFacilityPayerFilter()
    });
    test.afterAll(async () => {
        const logoutPage = new sections.LogoutPage(test, page);
        await logoutPage.logout();
    });
});