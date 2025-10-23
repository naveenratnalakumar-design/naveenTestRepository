const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");

exports.AgingPage = class AgingPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.currentMonthToggle = page.locator(
      "//span[text()='Current Month']/parent::label/preceding-sibling::button"
    );
    this.allPriorBalancesToggle = page.locator(
      "//span[text()='All Prior Balances']/parent::label/preceding-sibling::button"
    );
    this.totalDisplayedBalanceToggle = page.locator(
      "//span[text()='Total Displayed Balance']/parent::label/preceding-sibling::button"
    );
    this.currentMonthColumn = page.locator(
      "(//div[@data-column-definition-name='currentMonth'])[1]"
    );
    this.allPriorBalancesColumn = page.locator(
      "(//div[@data-column-definition-name='priorBalances'])[1]"
    );
    this.totalDisplayedBalanceColumn = page.locator(
      "(//div[@data-column-definition-name='totalBalance'])[1]"
    );

    this.currentMonthSummaryColumn = page.locator(
      "(//span[text()='Summary']/parent::div/following-sibling::div)[1]"
    );
    this.allPriorBalancesSummaryColumn = page.locator(
      "(//span[text()='Summary']/parent::div/following-sibling::div)[last()-1]"
    );
    this.totalDisplayedBalanceSummaryColumn = page.locator(
      "(//span[text()='Summary']/parent::div/following-sibling::div)[last()]"
    );
    this.agingEachamountRows = page.locator("//div[@class='overflow-hidden text-ellipsis']")
    this.agingBtn = page.locator("//span[normalize-space(text())='AR Aging']")
    this.totalBalanceColumns = page.locator("//div[@data-column-definition-name='totalBalance']//div[@class='overflow-hidden text-ellipsis']")
  }

  clickOnCurrentMonthToggle = async () => {
    await excuteSteps(
      this.test,
      this.currentMonthToggle,
      "click",
      `Click on Current Month Toggle`
    );
  };
  clickOnAgingBtn = async()=>{
    await excuteSteps(
      this.test,
      this.agingBtn,
      "click",
      "Click on the aging button"
    )
  }
  clickOnAllPriorBalancesToggle = async () => {
    await excuteSteps(
      this.test,
      this.allPriorBalancesToggle,
      "click",
      `Click on All Prior Balances Toggle`
    );
  };

  clickOnTotalDisplayedBalanceToggle = async () => {
    await excuteSteps(
      this.test,
      this.totalDisplayedBalanceToggle,
      "click",
      `Click on Total Displayed Balance Toggle`
    );
  };

  getBalance = async (locator) => {
    const text = await locator.innerText();
    if (!text || text.trim() === "") {
      return 0;
    }
    const cleanedText = text.replace(/,/g, "").trim();
    const balance = parseFloat(cleanedText);
    if (isNaN(balance)) {
      return 0;
    }
    return Math.round(balance * 100) / 100;
  };

  verifyToggleStatusWhenOn = async () => {
    await expect(
      this.currentMonthToggle,
      "Current Month toggle should be visible on the Aging screen"
    ).toBeVisible();
    await expect(
      this.allPriorBalancesToggle,
      "All Prior Balance toggle should be visible on the Aging screen"
    ).toBeVisible();
    await expect(
      this.totalDisplayedBalanceToggle,
      "Total Displayed Balance toggle should be visible on the Aging screen"
    ).toBeVisible();
    await expect(
      this.currentMonthToggle,
      "Current Month toggle is visible and enabled by default."
    ).toBeEnabled();
    await expect(
      this.allPriorBalancesToggle,
      "All Prior Balance toggle is visible and enabled by default."
    ).toBeEnabled();
    await expect(
      this.totalDisplayedBalanceToggle,
      "Total Displaying Balance toggle is visible and enabled by default."
    ).toBeEnabled();
    await expect(
      this.currentMonthColumn,
      "Current Month Column should be visible on the Aging screen"
    ).toBeVisible();
    await expect(
      this.allPriorBalancesColumn,
      "All Prior Balance Column should be visible on the Aging screen"
    ).toBeVisible();
    await expect(
      this.totalDisplayedBalanceColumn,
      "Total Displayed Balance Column should be visible on the Aging screen"
    ).toBeVisible();
  };

  verifyToggleStatusWhenOff = async () => {
    await this.clickOnCurrentMonthToggle();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await expect(
      this.currentMonthToggle,
      "Verify the the Current Month toggle is in disabled mode when it is turned off"
    ).toHaveAttribute("aria-checked", "false");
    await expect(
      this.currentMonthColumn,
      "Current Month column should be hidden when the toggle is turned off"
    ).toBeHidden();

    await this.clickOnAllPriorBalancesToggle();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await expect(
      this.allPriorBalancesToggle,
      "Verify the the All Prior Balance toggle is in disabled mode when it is turned off"
    ).toHaveAttribute("aria-checked", "false");
    await expect(
      this.allPriorBalancesColumn,
      "All Prior Balance column should be hidden when the toggle is turned off"
    ).toBeHidden();

    await this.clickOnTotalDisplayedBalanceToggle();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await expect(
      this.totalDisplayedBalanceToggle,
      "Verify the the Total Balance  toggle is in disabled mode when it is turned off"
    ).toHaveAttribute("aria-checked", "false");
    await expect(
      this.totalDisplayedBalanceColumn,
      "Total Displayed Balance column should be hidden when the toggle is turned off"
    ).toBeHidden();
  };

  verifyDataWhenTogglesAreOn = async () => {
      await this.test.step("Wait until the aging screen appears",async()=>{
      await this.page.waitForSelector("//span[text()='Current Month']", { state: 'visible' })
    })
    await this.currentMonthSummaryColumn.waitFor({ state: "visible" });
    await this.allPriorBalancesSummaryColumn.waitFor({ state: "visible" });
    await this.totalDisplayedBalanceSummaryColumn.waitFor({ state: "visible" });

    this.currentMonthBalance = await this.getBalance(
      this.currentMonthSummaryColumn
    );
    this.allPriorBalance = await this.getBalance(
      this.allPriorBalancesSummaryColumn
    );
    this.totalDisplayedBalance = await this.getBalance(
      this.totalDisplayedBalanceSummaryColumn
    );

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });

    await expect(this.currentMonthBalance).toBeGreaterThan(0);
    await expect(this.allPriorBalance).toBeGreaterThan(0);
    await expect(this.totalDisplayedBalance).toBeGreaterThan(0);
  };

  verifyDataWhenTogglesAreOff = async () => {
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    let totalBefore = await this.getBalance(
      this.totalDisplayedBalanceSummaryColumn
    );
    await this.clickOnCurrentMonthToggle();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    let totalAfter = await this.getBalance(
      this.totalDisplayedBalanceSummaryColumn
    );
    await expect(
      Number((totalBefore - this.currentMonthBalance).toFixed(2))
    ).toBe(Number(totalAfter.toFixed(2)));

    totalBefore = totalAfter;
    await this.clickOnAllPriorBalancesToggle();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    totalAfter = await this.getBalance(this.totalDisplayedBalanceSummaryColumn);
    await expect(
      Number((totalBefore - this.allPriorBalance).toFixed(2)),
      "Validatin total summary balance when priorbalance toggle is off"
    ).toBe(Number(totalAfter.toFixed(2)));

    await this.clickOnTotalDisplayedBalanceToggle();
  };

  verifyDefaultToggles = async () => {
       await this.test.step("Wait until the aging screen appears",async()=>{
      await this.page.waitForSelector("//span[text()='Current Month']", { state: 'visible' })
    })
    await this.verifyToggleStatusWhenOn();
    await this.verifyToggleStatusWhenOff();
  };

  verifyActiveAndInactiveToggles = async () => {
    await this.verifyDataWhenTogglesAreOn();
    await this.verifyDataWhenTogglesAreOff();
  };
// VerifyingTotalBlanceMitchingSixmonthsView = async () => {
//   await this.clickOnAgingBtn();

//   await this.test.step("Wait for grid to load", async () => {
//     await this.page.waitForTimeout(parseInt(process.env.largeWait));
//   });

//   // Get the locator count
//   const rowCount = await this.agingEachamountRows.count();
//   console.log("monthRowsCount==", rowCount);

//   let sum = 0;

//   for (let i = 0; i < rowCount - 1; i++) {
//     const txt = await this.agingEachamountRows.nth(i).innerText();
//     const num = parseFloat(txt.replace(/[^0-9.-]+/g, "")) || 0;
//     sum += num;
//     console.log(`Index ${i} | Text: "${txt}" | Numeric: ${num} | Running Sum: ${sum.toFixed(2)}`);
//   }

//   console.log(`Total Sum of all values: ${sum.toFixed(2)}`);
// };

VerifyingTotalBlanceMitchingSixmonthsView = async () => {
  await this.clickOnAgingBtn();

  await this.test.step("Wait for grid to load", async () => {
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
  });

  // Locate only actual data rows (exclude headers, footers/summary)
  const dataRowLocator = this.page.locator('div[role="row"]'); // Replace with actual row selector/class if different
  const dataRowCount = await dataRowLocator.count();
  console.log("Data Row Count:", dataRowCount);

  let sum = 0;

  // Loop through each row except the last one (assuming it's summary)
  for (let i = 0; i < dataRowCount - 1; i++) {
    // For each row, get its cells but exclude the last cell (Total Displayed Balance)
    const cellLocator = dataRowLocator.nth(i).locator('div[role="gridcell"]'); // Replace with cell selector/class
    const cellCount = await cellLocator.count();

    for (let j = 0; j < cellCount - 1; j++) {
      const cellText = await cellLocator.nth(j).innerText();
      const num = parseFloat(cellText.replace(/[^0-9.-]+/g, "")) || 0;
      sum += num;
      console.log(`Row ${i}, Col ${j}: "${cellText}" -> ${num}, Sum: ${sum}`);
    }
  }

  console.log(`Total Sum of all values: ${sum.toFixed(2)}`);
};


};
