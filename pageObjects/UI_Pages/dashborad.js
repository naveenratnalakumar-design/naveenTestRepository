const { expect } = require("@playwright/test");
exports.DashboardPage = class DashboardPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.taskListModuleCard = page.locator("(//div[@class='module-card'])[1]");
    this.agingModuleCard = page.locator("(//div[@class='module-card'])[2]");
  }
  validateTaskListModuleCardOnDashboard = async () => {
  await this.test.step("Wait until the dashboard items are Visible",async()=>{
      await this.page.waitForSelector("(//div[@class='module-card'])[1]",{ state: 'visible' })
    })
    await expect(
      this.taskListModuleCard,
      "Verify the Task List module is displayed on the dashboard page"
    ).toBeVisible();
  };
  validateArAgingModuleCardOnDashboard = async () => {
    await expect(
      this.agingModuleCard,
      "Verify the AR-Aging module is displayed on the dashboard page"
    ).toBeVisible();
  };
};
