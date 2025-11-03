const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const testData = require("../../test_Data/testData.json");

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
    this.agingEachamountRows = page.locator(
      "//div[@class='overflow-hidden text-ellipsis']"
    );
    this.agingBtn = page.locator("//span[normalize-space(text())='AR Aging']");
    this.totalBalanceColumns = page.locator(
      "//div[@data-column-definition-name='totalBalance']//div[@class='overflow-hidden text-ellipsis']"
    );
    this.payerFilter = page.locator(
      "(//div[@class='mat-mdc-menu-content']/descendant::div[contains(@class,'whitespace-nowrap')])[1]"
    );
    this.filterBtn = page.locator("//span[normalize-space(text())='Filters']");
    this.clearFilterBtn = page.locator(
      "//span[normalize-space(text())='Clear Filter']"
    );
    this.applyFilterBtn = page.locator(
      "//arw-button//button[contains(@class,'arw-button--primary')]"
    );
    this.resetDefaultBtn = page.locator(
      "//span[normalize-space(text())='Reset to Default']"
    );
    this.downArrowBtn = page.locator("//arw-icon[@name='arrowNarrowDown']");
    this.addTaskBtn = page.locator(
      "//arw-template-renderer[@class='ng-star-inserted']//arw-button[@icon='plusSquareDefault']"
    );
    this.loadMore = page.locator("//div[contains(text(),'Load more results')]");
  }

  clickOnCurrentMonthToggle = async () => {
    await excuteSteps(
      this.test,
      this.currentMonthToggle,
      "click",
      `Click on Current Month Toggle`
    );
  };
  clickOnDownArrowBtn = async () => {
    await excuteSteps(
      this.test,
      this.downArrowBtn,
      "click",
      "Click on Expand all button"
    );
  };
  clickOnAddTaskBtn = async () => {
    await excuteSteps(
      this.test,
      this.addTaskBtn,
      "click",
      "Click on add task button"
    );
  };
  clickOnAgingBtn = async () => {
    await excuteSteps(
      this.test,
      this.agingBtn,
      "click",
      "Click on the aging button"
    );
  };
  clickOnFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.filterBtn,
      "click",
      "Click on filter button"
    );
  };
  clickOnClearFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.clearFilterBtn,
      "click",
      "Click on the clear filter button"
    );
  };
  clickOnResetDefaultBtn = async () => {
    await excuteSteps(
      this.test,
      this.resetDefaultBtn,
      "click",
      "Click on reset default button"
    );
  };
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
  createTaskWithAttachment = async () => {
    await this.clickOnAgingBtn();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const iconCount = await this.downArrowBtn.count();
    console.log(`Total down arrow icons found: ${iconCount}`);
    for (let i = 0; i < iconCount; i++) {
      const currentIcon = this.downArrowBtn.nth(i);
      await this.test.step("Clicking down arrow icon", async () => {
        await currentIcon.click();
        await this.page.waitForTimeout(1000);
      });
      while (!(await this.loadMore.isVisible())) {
        await this.page.mouse.wheel(0, 500); // scroll down by 500 pixels
        await this.page.waitForTimeout(500); // wait a bit for content to load
      }
      // Check if "Load more results" is visible
      if (await this.loadMore.isVisible()) {
        await this.test.step("Clicking Load more results", async () => {
          await this.loadMore.click();
          await this.page.waitForTimeout(1000);
        });
      }
      // Check if Add Task button has the 'disabled' attribute
      const isDisabled = await this.page
        .locator(
          "//button[@class='arw-button arw-button--accent arw-button--small arw-button--tertiary arw-button--icon-only']"
        )
        .first()
        .evaluate((el) => el.hasAttribute("disabled"));
      if (!isDisabled) {
        await this.test.step(
          "Add Task button active — clicking it",
          async () => {
            await this.addTaskBtn.first().click();
          }
        );
      }
      break;
    }
  };

  getBalance = async (locator) => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
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
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step("Wait until the aging screen appears", async () => {
      await this.page.waitForSelector(
        "(//div[@data-column-definition-name='currentMonth'])[1]",
        { state: "hidden" }
      );
    });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await expect(
      this.currentMonthToggle,
      "Verify the the Current Month toggle is in disabled mode when it is turned off"
    ).toHaveAttribute("aria-checked", "false");
    await expect(
      this.currentMonthColumn,
      "Current Month column should be hidden when the toggle is turned off"
    ).toBeHidden();

    await this.clickOnAllPriorBalancesToggle();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step("Wait until the aging screen appears", async () => {
      await this.page.waitForSelector(
        "(//div[@data-column-definition-name='priorBalances'])[1]",
        { state: "hidden" }
      );
    });
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
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step("Wait until the aging screen appears", async () => {
      await this.page.waitForSelector(
        "(//div[@data-column-definition-name='totalBalance'])[1]",
        { state: "hidden" }
      );
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
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step("Wait until the aging screen appears", async () => {
      await this.page.waitForSelector("//span[text()='Current Month']", {
        state: "visible",
      });
    });
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
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await expect(this.currentMonthBalance).toBeGreaterThan(0);
    await expect(this.allPriorBalance).toBeGreaterThan(0);
    await expect(this.totalDisplayedBalance).toBeGreaterThan(0);
  };

  verifyDataWhenTogglesAreOff = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let totalBefore = await this.getBalance(
      this.totalDisplayedBalanceSummaryColumn
    );
    await this.clickOnCurrentMonthToggle();
    let totalAfter = await this.getBalance(
      this.totalDisplayedBalanceSummaryColumn
    );
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await expect(
      Number((totalBefore - this.currentMonthBalance).toFixed(2))
    ).toBe(Number(totalAfter.toFixed(2)));

    totalBefore = totalAfter;
    await this.clickOnAllPriorBalancesToggle();
    totalAfter = await this.getBalance(this.totalDisplayedBalanceSummaryColumn);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await expect(
      Number((totalBefore - this.allPriorBalance).toFixed(2)),
      "Validatin total summary balance when priorbalance toggle is off"
    ).toBe(Number(totalAfter.toFixed(2)));

    await this.clickOnTotalDisplayedBalanceToggle();
  };

  verifyDefaultToggles = async () => {
    await this.test.step("Wait until the aging screen appears", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      await this.page.waitForSelector("//span[text()='Current Month']", {
        state: "visible",
      });
    });
    await this.verifyToggleStatusWhenOn();
    await this.verifyToggleStatusWhenOff();
  };

  verifyActiveAndInactiveToggles = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });

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

  // VerifyingTotalBlanceMitchingSixmonthsView = async () => {
  //   await this.clickOnAgingBtn();

  //   await this.test.step("Wait for grid to load", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.largeWait));
  //   });

  //   // Locate only actual data rows (exclude headers, footers/summary)
  //   const dataRowLocator = this.page.locator('div[role="row"]'); // Replace with actual row selector/class if different
  //   const dataRowCount = await dataRowLocator.count();
  //   console.log("Data Row Count:", dataRowCount);

  //   let sum = 0;

  //   // Loop through each row except the last one (assuming it's summary)
  //   for (let i = 0; i < dataRowCount - 1; i++) {
  //     // For each row, get its cells but exclude the last cell (Total Displayed Balance)
  //     const cellLocator = dataRowLocator.nth(i).locator('div[role="gridcell"]'); // Replace with cell selector/class
  //     const cellCount = await cellLocator.count();

  //     for (let j = 0; j < cellCount - 1; j++) {
  //       const cellText = await cellLocator.nth(j).innerText();
  //       const num = parseFloat(cellText.replace(/[^0-9.-]+/g, "")) || 0;
  //       sum += num;
  //       console.log(`Row ${i}, Col ${j}: "${cellText}" -> ${num}, Sum: ${sum}`);
  //     }
  //   }

  //   console.log(`Total Sum of all values: ${sum.toFixed(2)}`);
  // };
  VerifyingTotalBlanceMitchingSixmonthsView = async () => {
    await this.clickOnAgingBtn();

    //console.log("Wait for grid to load...");
    //await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.page.waitForSelector(
      '//arw-ar-aging-cell[@class="flex items-center justify-between gap-8 w-full group ng-star-inserted"]',
      { timeout: 20000 }
    );

    // Fetch all cell values
    const allValues = await this.page
      .locator(
        '//arw-ar-aging-cell[@class="flex items-center justify-between gap-8 w-full group ng-star-inserted"]'
      )
      .allInnerTexts();

    console.log("Total cells found:", allValues.length);

    // Take first 8 and 9th values
    const firstEight = allValues.slice(0, 8);
    const totalDisplayed = allValues[8]; // 9th value

    // Function to clean and convert both (negative) and normal numbers
    const cleanNumber = (val) => {
      if (!val) return 0;
      val = val.replace(/,/g, "").trim();

      // Handle negative numbers in parentheses, e.g. (5,649.15)
      if (/^\(.*\)$/.test(val)) {
        val = "-" + val.replace(/[()]/g, "");
      }
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

    // Convert to numeric (keep decimals, remove commas)
    const monthNumbers = firstEight.map(cleanNumber);
    const totalNumber = cleanNumber(totalDisplayed);

    // Calculate sum of first 8
    const sum = monthNumbers.reduce((acc, val) => acc + val, 0);

    console.log("Month values:", monthNumbers);
    console.log("Sum of all Months balance :", sum.toFixed(2));
    console.log("Total Displayed Balance :", totalNumber.toFixed(2));

    // Assertion (allowing rounding difference)
    expect(Math.abs(sum - totalNumber)).toBeLessThan(1);

    console.log(
      "Validation passed — sum of all month total equals displayed Total Displayed Balance!"
    );
  };
  verifysummaryTotal = async () => {
    await this.clickOnAgingBtn();

    // Wait for all cells in the 'currentMonth' column to load
    await this.page.waitForSelector(
      "//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')]",
      { timeout: 60000 }
    );

    // Get all cell text values
    const allValues = await this.page
      .locator(
        "//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')]"
      )
      .allInnerTexts();

    console.log(" Total cells found:", allValues.length);

    // Helper: clean text → number
    const cleanNumber = (val) => {
      if (!val) return 0;
      val = val.replace(/,/g, "").trim();
      if (/^\(.*\)$/.test(val)) val = "-" + val.replace(/[()]/g, "");
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

    // Convert all values to numeric
    const numericValues = allValues.map(cleanNumber);

    // Split into month cells and total cell
    const lastIndex = numericValues.length - 1;
    const monthValues = numericValues.slice(0, lastIndex);
    const totalValue = numericValues[lastIndex];

    // Sum of month values
    const sum = monthValues.reduce((acc, val) => acc + val, 0);

    // Logs
    console.log(" Month values:", monthValues);
    console.log(" Sum of months summary:", sum.toFixed(2));
    console.log(" Total Summary:", totalValue.toFixed(2));

    // Assertion (allow rounding difference)
    expect(Math.abs(sum - totalValue)).toBeLessThan(1);

    console.log(" Validation passed — Sum of months equals displayed summary!");
  };
  VerifyResetDefaultOnAging = async () => {
    await this.clickOnAgingBtn();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step(
      "Wait Until Filter button is visible on task list page",
      async () => {
        await this.page.waitForSelector(
          "//span[normalize-space(text())='Filters']",
          { state: "visible" }
        );
      }
    );
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();
    await this.clickOnFilterBtn();
    await expect(
      this.applyFilterBtn,
      "Verifying the 'Apply' button is visible and disabled after clearing the filter"
    ).toBeDisabled();
    await this.page.keyboard.press("Escape");
    await this.clickOnResetDefaultBtn();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let restDefaultIsDisable = await this.page.locator(
      "//arw-button[@class='ng-star-inserted']//button[contains(@class,'arw-button--accent')]"
    );
    await expect(
      restDefaultIsDisable,
      "Verify the 'Reset Defaults' button is in disabled mode"
    ).toBeDisabled();
    await this.clickOnFilterBtn();
    await expect(
      this.payerFilter,
      "Verify the 'Payer' default filter is visible in the filter dropdown after resetting to defaults"
    ).toHaveText(testData.RevflowData.agingData.payerFiler);
    await this.page.keyboard.press("Escape");
  };
};
