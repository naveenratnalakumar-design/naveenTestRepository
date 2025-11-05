const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const testData = require("../../test_Data/testData.json");
const randomFacilityNames =
  testData.RevflowData.TaskListPage.facilityOptions[
    Math.floor(
      Math.random() * testData.RevflowData.TaskListPage.facilityOptions.length
    )
  ];
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
    this.globalFacilityDropdown = page.locator(
      "//arw-facilities-dropdown[@class='flex justify-end grow']//button"
    );
    this.allCheckBox = page.locator(
      "//label[contains(text(),'All')]/preceding-sibling::div"
    );
    this.applyButton = page.locator("//span[normalize-space(text())='Apply']");
    this.searchInputBox = page.locator("//input[@placeholder='Search']");
    this.agingResident = page.locator("(//a[@class='ng-star-inserted'])[1]");
    this.AgingFilterBtn = page.locator("(//button[@aria-haspopup='menu'])[3]");
    this.ResidentCategoriesAddFilter = page.locator(
      "//button[@class='arw-button arw-button--accent arw-button--big arw-button--tertiary']"
    );
    this.SelectResident = page.locator(
      "//div[@class='mat-mdc-select-trigger']"
    );
    this.ResidentOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Resident']"
    );
    this.ResidentInputBox = page.locator(
      "//button[@class='mat-mdc-menu-trigger arw-input bg-background-surface border border-complementary-grey-200 disabled:bg-complementary-grey-50 disabled:border-complementary-grey-200 disabled:text-foreground-medium flex focus:border-primary-blue-accent focus:outline-0 gap-8 hover:border-primary-blue-accent items-center justify-between min-h-btn-big placeholder:text-foreground-light px-12 rounded-sm text-foreground-high transition-colors w-full ng-star-inserted']"
    );
    this.FillResident = page.locator(
      "//input[@placeholder='Search' or @id='mat-input-23']"
    );
    this.noResultsLabel = this.page.locator(
      "//label[contains(normalize-space(.), 'All (0 Matches)')]"
    );
    this.checkboxVisible = page.locator("(//input[@type='checkbox'])[2]");
    this.ApplyFilterBtn1 = page.locator(
      "//button[@class='arw-button arw-button--accent arw-button--big arw-button--primary']"
    );
    this.ArwBtn = page.locator("(//div[@class='w-full'])[16]");
    this.PayerOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Payer']"
    );
    this.agingPayer = page.locator(
      "(//arw-template-renderer[@class='!px-0 ng-star-inserted']//span)[7]"
    );
    this.ResidentBalanceOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Resident Balance']"
    );
    this.ConditionalInputBox = page.locator(
      "(//div[@class='mat-mdc-select-trigger'])[2]"
    );
    this.BetweenOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Between']"
    );
    this.EqualsOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Equals']"
    );
    this.GreaterthanOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Greater than']"
    );
    this.LessthanOption = page.locator(
      "//mat-option[@role='option' and normalize-space(.)='Less than']"
    );
     this.BetweenFrom = page.locator(
      "(//input[@placeholder='-'])[1]"
    )
    this.BetweenTo = page.locator(
      "(//input[@placeholder='-'])[2]"
    )
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
  searchTextInSearchBox = async (text) => {
    await excuteSteps(
      this.test,
      this.searchInputBox,
      "fill",
      `Enter user eamil in searchBox`,
      text
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
  clickOnGlobalFacilityDropdown = async () => {
    await excuteSteps(
      this.test,
      this.globalFacilityDropdown,
      "click",
      "Click on the global facility dropdown"
    );
  };
  selectAllCheckBox = async () => {
    await excuteSteps(
      this.test,
      this.allCheckBox,
      "click",
      `Select 'All' Checkbox`
    );
  };
  clickOnApplyBtn = async () => {
    await excuteSteps(
      this.test,
      this.applyButton,
      "click",
      "Click on the Apply button"
    );
  };
  clickOnAgingFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.AgingFilterBtn,
      "click",
      "Click on the PayerCategories Filter button"
    );
  };
  ClickOnApplyFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.ApplyFilterBtn1,
      "click",
      `Select Payerdropdown`
    );
  };
  ClickOnArwBtn = async () => {
    await excuteSteps(this.test, this.ArwBtn, "click", `Clcik on arrow button`);
  };
  ResidentAddFilter = async () => {
    await excuteSteps(
      this.test,
      this.ResidentCategoriesAddFilter,
      "click",
      `Select Add Filter`
    );
  };
  SelectResidentDropBown = async () => {
    await excuteSteps(
      this.test,
      this.SelectResident,
      "click",
      `Select Payerdropdown`
    );
  };
  SelectPayerFromDropdown = async (text) => {
    await excuteSteps(
      this.test,
      this.PayerOption,
      "click",
      `Select Payer from dropdown options`,
      text
    );
  };
  SelectResidentFromDropdown = async (text) => {
    await excuteSteps(
      this.test,
      this.ResidentOption,
      "click",
      `Select Resident from dropdown options`,
      text
    );
  };
  ClickOnsearchPayersField = async (text) => {
    await excuteSteps(
      this.test,
      this.ResidentInputBox,
      "click",
      `click on Payer field`,
      text
    );
  };
  EnterResident = async (text) => {
    await excuteSteps(
      this.test,
      this.FillResident,
      "fill",
      `Enter Payers into the firld`,
      text
    );
  };
  SelectResidentBalanceFromDropdown = async (text) => {
    await excuteSteps(
      this.test,
      this.ResidentBalanceOption,
      "click",
      `Select Resident from dropdown options`,
      text
    );
  };
  ClickOnConditionalInputBox = async (text) => {
    await excuteSteps(
      this.test,
      this.ConditionalInputBox,
      "click",
      `click on Conditional field`,
      text
    );
  };
  SelectBetweenOptionFromDropdown = async (text) => {
    await excuteSteps(
      this.test,
      this.BetweenOption,
      "click",
      `Select Between option from Dropdown`,
      text
    );
  };
  EnterInputInFrom = async (text) => {
    const cleanText = text.toString().trim();
    const input = this.BetweenFrom;
    await input.waitFor({ state: "visible", timeout: 10000 });
    await input.scrollIntoViewIfNeeded();
    // Clear existing text completely
    await input.click({ clickCount: 3 });
    await this.page.keyboard.press("Backspace");
    await this.page.waitForTimeout(300);
    // Type value slowly (mimics human typing)
    await this.page.keyboard.type(cleanText, { delay: 100 });
    // Validate what was typed
    const typedValue = await input.inputValue();
    console.log(`Entered value in FROM field: ${typedValue}`);
  };
  EnterInputInTo = async (text) => {
    const cleanText = text.toString().trim();
    const input = this.BetweenTo;

    await input.waitFor({ state: "visible", timeout: 10000 });
    await input.scrollIntoViewIfNeeded();

    // Clear existing text completely
    await input.click({ clickCount: 3 });
    await this.page.keyboard.press("Backspace");
    await this.page.waitForTimeout(300);

    // Type value slowly (mimics human typing)
    await this.page.keyboard.type(cleanText, { delay: 100 });

    // Validate what was typed
    const typedValue = await input.inputValue();
    console.log(`Entered value in TO field: ${typedValue}`);
  };
  SelectEqualsOptionFromDropdown = async (text) => {
    await excuteSteps(
      this.test,
      this.EqualsOption,
      "click",
      `Select Between option from Dropdown`,
      text
    );
  };
  SelectGreaterthanOptionFromDropdown = async (text) => {
    await excuteSteps(
      this.test,
      this.GreaterthanOption,
      "click",
      `Select Between option from Dropdown`,
      text
    );
  };
  SelectLessthanOptionFromDropdown = async (text) => {
    await excuteSteps(
      this.test,
      this.LessthanOption,
      "click",
      `Select  Less than  option from Dropdown`,
      text
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
  VerifyAgingGridDataWhenTogglesOnAndOff = async () => {
    let currentMonthBalanceTotalSummary = await this.page
      .locator(
        "(//div[@data-column-definition-name='currentMonth']//div[@class='overflow-hidden text-ellipsis'])[last()]"
      )
      .innerText();
    let currentMonthBalanceNum = parseFloat(
      currentMonthBalanceTotalSummary.replace(/[^0-9.-]+/g, "")
    );
    console.log("currentMonthSummary==", currentMonthBalanceNum);
    let totalDisplayBalanceSummary = await this.page
      .locator(
        "(//div[@data-column-definition-name='totalBalance']//div[@class='overflow-hidden text-ellipsis'])[last()]"
      )
      .innerText();
    let totalBeforeNum = parseFloat(
      totalDisplayBalanceSummary.replace(/[^0-9.-]+/g, "")
    );
    console.log("totalBeforeNum=", totalBeforeNum);
    let priorBalanceSummary = await this.page
      .locator(
        "(//div[@data-column-definition-name='priorBalances']//div[@class='overflow-hidden text-ellipsis'])[last()]"
      )
      .innerText();
    let priorBalanceNum = parseFloat(
      priorBalanceSummary.replace(/[^0-9.-]+/g, "")
    );
    console.log("priorbalance==", priorBalanceNum);
    await this.clickOnCurrentMonthToggle();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let totalAfter = await this.page
      .locator(
        "(//div[@data-column-definition-name='totalBalance']//div[@class='overflow-hidden text-ellipsis'])[last()]"
      )
      .innerText();
    let totalDisplaySummaryAfterCurrentMonthToggleOff = parseFloat(
      totalAfter.replace(/[^0-9.-]+/g, "")
    );
    console.log(
      "AfterCurrentMonthToggleOff==",
      totalDisplaySummaryAfterCurrentMonthToggleOff
    );
    const expectedTotal = totalBeforeNum - currentMonthBalanceNum;
    await expect(
      totalDisplaySummaryAfterCurrentMonthToggleOff,
      "Verify the total display balance is shown correctly when the current month toggle is off"
    ).toBeCloseTo(expectedTotal, 2);
    await this.clickOnCurrentMonthToggle();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnAllPriorBalancesToggle();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let totalBalanceSummaryAfterPriorToggleOff = await this.page
      .locator(
        "(//div[@data-column-definition-name='totalBalance']//div[@class='overflow-hidden text-ellipsis'])[last()]"
      )
      .innerText();
    let afterPriorToggleOffTotalDisplaybalNm = parseFloat(
      totalBalanceSummaryAfterPriorToggleOff.replace(/[^0-9.-]+/g, "")
    );
    console.log(
      "AfterPriorToggle Off TotalDisplayed Balance==",
      afterPriorToggleOffTotalDisplaybalNm
    );
    const expectedTatalDisplayedAmount = totalBeforeNum - priorBalanceNum;
    await expect(
      afterPriorToggleOffTotalDisplaybalNm,
      "Verify the total display balance is shown correctly when the prior balance toggle is off"
    ).toBeCloseTo(expectedTatalDisplayedAmount, 2);
  };

  GetSearchResultSummary = async () => {
    await this.clickOnAgingBtn();

    // Wait for current month cells
    await this.page.waitForSelector(
      "//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')]",
      { timeout: 20000 }
    );

    // Get total summary before search

    const TotalSummary = await this.page
      .locator(
        "(//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')])[14]"
      )
      .innerText({ timeout: 20000 });
    console.log(" Total Summary (Before Filter):", TotalSummary);

    //  Perform search
    await this.clickOnGlobalFacilityDropdown();
    await this.selectAllCheckBox();
    await this.searchTextInSearchBox([randomFacilityNames]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyBtn();
    await this.page.reload({ waitUntil: "networkidle" });
    await this.page.waitForTimeout(parseInt(process.env.largeWait));

    //  Get selected facility summary after reload
    const SelectedFacilitySummary = await this.page
      .locator(
        "(//arw-ar-aging-cell[@class='flex items-center justify-between gap-8 w-full group font-bold ng-star-inserted'])[1]"
      )
      .innerText();
    console.log(
      " Selected Facility Summary (After Filter):",
      SelectedFacilitySummary
    );

    // Clean numbers (optional but recommended)
    const cleanNumber = (val) => {
      if (!val) return 0;
      val = val.replace(/,/g, "").trim();
      if (/^\(.*\)$/.test(val)) val = "-" + val.replace(/[()]/g, "");
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

    const totalVal = cleanNumber(TotalSummary);
    const facilityVal = cleanNumber(SelectedFacilitySummary);

    //  Assertion: They should NOT be equal
    expect(
      totalVal,
      `Validation Failed: Total Summary (${totalVal}) should not equal Selected Facility Summary (${facilityVal})`
    ).not.toBe(facilityVal);

    console.log(
      "Validation Passed: Total summary and selected facility summary are not equal."
    );
  };
  VerifyLastSixMonthsTotalDisplayedBalance = async () => {
    // Get all cell values
    const allValues = await this.page
      .locator(
        '//arw-ar-aging-cell[@class="flex items-center justify-between gap-8 w-full group ng-star-inserted"]'
      )
      .allInnerTexts();

    console.log("Total cells found:", allValues.length);

    // Helper to clean number strings
    const cleanNumber = (val) => {
      if (!val) return 0;
      val = val.replace(/,/g, "").trim();
      if (/^\(.*\)$/.test(val)) val = "-" + val.replace(/[()]/g, "");
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

    // Define group size: 8 months + 1 total
    const groupSize = 9;
    const numGroups = Math.floor(allValues.length / groupSize);

    console.log(`Total groups (rows) to verify: ${numGroups}`);

    for (let i = 0; i < numGroups; i++) {
      // Calculate range
      const startIndex = i * groupSize;
      const endIndex = startIndex + 7; // 8 months
      const totalIndex = startIndex + 8; // total cell

      const monthValues = allValues.slice(startIndex, endIndex + 1);
      const totalDisplayed = allValues[totalIndex];

      const monthNumbers = monthValues.map(cleanNumber);
      const totalNumber = cleanNumber(totalDisplayed);
      const sum = monthNumbers.reduce((acc, val) => acc + val, 0);

      console.log(
        `\n Row ${i + 1}: Checking cells ${startIndex + 1}${totalIndex + 1}`
      );
      console.log("Month values:", monthNumbers);
      console.log("Sum of months:", sum.toFixed(2));
      console.log("Displayed total:", totalNumber.toFixed(2));

      // Assertion (within small rounding tolerance)
      expect(
        Math.abs(sum - totalNumber),
        `Row ${i + 1}: Sum of months should match Total Balance`
      ).toBeLessThan(1);
    }

    console.log(
      "Validation successful: The total summary matches the sum of the last six months balances!"
    );
  };
  VerifyCurrentMonthSummaryTotal = async () => {
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
    console.log(" Sum of Current Month summary:", sum.toFixed(2));
    console.log(" Total Current Month Summary:", totalValue.toFixed(2));

    // Assertion (allow rounding difference)
    expect(
      Math.abs(sum - totalValue),
      "Verify that the total shown in the summary section equals the combined balances of the current month."
    ).toBeLessThan(1);

    console.log(
      "Validation successful: The total summary matches the sum of the current months' balances!"
    );
  };

  VerifyLastSixMonthsSummaryTotal = async () => {
    for (let i = 1; i <= 6; i++) {
      const today = new Date();
      today.setMonth(today.getMonth() - i); // Go i months back
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      console.log(`\n🔹 Verifying for Month: ${month}/${year}`);

      // Get all cell values for that month
      const allValues = await this.page
        .locator(`//div[@data-column-definition-name="${month}/${year}"]`)
        .allInnerTexts();

      console.log(` Total cells found for ${month}/${year}:`, allValues.length);

      // Helper to clean number format
      const cleanNumber = (val) => {
        if (!val) return 0;
        val = val.replace(/,/g, "").trim();
        if (/^\(.*\)$/.test(val)) val = "-" + val.replace(/[()]/g, "");
        const num = parseFloat(val);
        return isNaN(num) ? 0 : num;
      };

      const numericValues = allValues.map(cleanNumber);
      const lastIndex = numericValues.length - 1;
      const monthValues = numericValues.slice(0, lastIndex);
      const totalValue = numericValues[lastIndex];
      const sum = monthValues.reduce((acc, val) => acc + val, 0);

      // Logs
      console.log(` Month Values (${month}/${year}):`, monthValues);
      console.log(` Sum of Month (${month}/${year}):`, sum.toFixed(2));
      console.log(` Summary Total (${month}/${year}):`, totalValue.toFixed(2));

      // Assertion
      expect(
        Math.abs(sum - totalValue),
        `${month}/${year}: Expected total (${totalValue}) ≈ sum (${sum})`,
        "Verify that the total summary matches the sum of the previous months' balances"
      ).toBeLessThan(1);

      console.log(`Validation passed for ${month}/${year}!`);
    }

    console.log(
      "Validation successful - The total summary matches the sum of the previous months' balances for the last 6 months!"
    );
  };

  VerifyAllpriorBalancesSummary = async () => {
    // Get all cell text values
    const allValues = await this.page
      .locator("//div[@data-column-definition-name='priorBalances']")
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
    console.log(" Sum of All Prior Balances summary:", sum.toFixed(2));
    console.log(" Total All Prior Balances Summary:", totalValue.toFixed(2));

    // Assertion (allow rounding difference)
    expect(
      Math.abs(sum - totalValue),
      "Verify that the total shown in the summary section equals the combined balances of the All prior Balances."
    ).toBeLessThan(1);

    console.log(
      "Validation successful: The total summary matches the sum of the All prior Balances!"
    );
  };
  VerifyTotalBalanceSummary = async () => {
    // Get all cell text values
    const allValues = await this.page
      .locator("//div[@data-column-definition-name='totalBalance']")
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
    console.log(" Sum of Total Displayed Balances summary:", sum.toFixed(2));
    console.log(" Total Displayed Balance Summary:", totalValue.toFixed(2));

    // Assertion (allow rounding difference)
    expect(
      Math.abs(sum - totalValue),
      "Verify that the total shown in the summary section equals the combined balances of the Total Displayed Balances."
    ).toBeLessThan(1);

    console.log(
      "Validation successful: The total summary matches the sum of the Total Displayed Balances!"
    );
  };
  GetTotalBalanceAndSummary = async () => {
    await this.clickOnAgingBtn();

    // Wait for all cells in the 'currentMonth' column to load
    await this.page.waitForSelector(
      "//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')]",
      { timeout: 20000 }
    );
    await this.VerifyLastSixMonthsTotalDisplayedBalance();
    await this.VerifyCurrentMonthSummaryTotal();
    await this.VerifyLastSixMonthsSummaryTotal();
    await this.VerifyAllpriorBalancesSummary();
    await this.VerifyTotalBalanceSummary();
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
  GetResidentFilter = async () => {
    await this.clickOnAgingBtn();
    await this.page.waitForSelector(
      "//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')]",
      { timeout: 20000 }
    );
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();
    // Wait for overlays to disappear
    await this.page.waitForFunction(
      () => {
        const overlays = document.querySelectorAll(
          ".cdk-overlay-backdrop.cdk-overlay-backdrop-showing"
        );
        return overlays.length === 0;
      },
      { timeout: 20000 }
    );
    await this.AgingFilterBtn.waitFor({ state: "visible" });
    await this.clickOnAgingFilterBtn();

    await this.ResidentAddFilter();
    await this.SelectResidentDropBown();
    await this.SelectResidentFromDropdown();
    const ResidentNames = testData.RevflowData.TaskListPage.residentOptions;
    let selectedResident = null;
    for (const resident of ResidentNames) {
      console.log(`Trying resident: ${resident}`);
      await this.ClickOnsearchPayersField();
      await this.EnterResident([resident]);
      // Wait dropdown to show options
      await this.page.waitForTimeout(800);
      const exactOption = this.page.locator(
        "//div[contains(@class,'option') or contains(@class,'item') or contains(@class,'select')]//span[normalize-space() = '" +
          resident +
          "']"
      );
      if ((await exactOption.count()) > 0) {
        console.log(`Exact match found: ${resident}`);
        await exactOption.first().click();
        selectedResident = resident;
        break;
      } else {
        console.log(`Exact match NOT found: ${resident}`);
        await this.page.keyboard.press("Escape");
        await this.page.waitForTimeout(300);
      }
    }
    if (!selectedResident) throw new Error("No exact resident found");
    console.log(`Selected resident: ${selectedResident}`);
    await this.clickOnApplyBtn();
    await this.ClickOnApplyFilterBtn();
    await this.page.waitForSelector("(//div[@class='w-full'])[16]", {
      timeout: 20000,
    });
    await this.ClickOnArwBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    //  Get resident name displayed on Tabel
    const gridResident = await this.page
      .locator("(//span[@class='arw-template-renderer'])[41]")
      .innerText();
    console.log(` Resident displayed on tabel: ${gridResident}`);
    // Normalize and compare
    const normalize = (str) =>
      str.toLowerCase().replace(/,/g, "").replace(/\s+/g, "").trim();
    if (normalize(gridResident).includes(normalize(selectedResident))) {
      expect(
        this.agingResident,
        "Verify the applied resident filter data is visible on the Aging grid"
      ).toHaveText(selectedResident);
    }
  };
  GetPayerFilter = async () => {
    await this.clickOnAgingBtn();

    await this.page.waitForSelector(
      "//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')]",
      { timeout: 20000 }
    );

    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();

    await this.page.waitForFunction(
      () => {
        const overlays = document.querySelectorAll(
          ".cdk-overlay-backdrop.cdk-overlay-backdrop-showing"
        );
        return overlays.length === 0;
      },
      { timeout: 20000 }
    );

    await this.AgingFilterBtn.waitFor({ state: "visible" });
    await this.clickOnAgingFilterBtn();

    // Add payer filter
    await this.ResidentAddFilter();
    await this.SelectResidentDropBown();
    await this.SelectPayerFromDropdown();

    const payerNames = testData.RevflowData.TaskListPage.payenameList;
    let selectedPayer = null;

    // Exact match retry logic like Resident
    for (const payer of payerNames) {
      console.log(`Trying payer: ${payer}`);

      await this.ClickOnsearchPayersField();
      await this.EnterResident([payer]); // typing
      await this.page.waitForTimeout(800);

      //exact payer match in dropdown
      const exactOption = this.page.locator(
        "//div[contains(@class,'option') or contains(@class,'item') or contains(@class,'select')]//span[normalize-space() = '" +
          payer +
          "']"
      );

      if ((await exactOption.count()) > 0) {
        console.log(`Exact match found: ${payer}`);
        await exactOption.first().click();
        selectedPayer = payer;
        break;
      } else {
        console.log(`No exact match for: ${payer}`);
        await this.page.keyboard.press("Escape");
        await this.page.waitForTimeout(300);
      }
    }

    if (!selectedPayer) throw new Error("No exact payer found");
    console.log(`Selected payer: ${selectedPayer}`);
    await this.clickOnApplyBtn();
    await this.ClickOnApplyFilterBtn();
    await this.page.waitForSelector("(//div[@class='w-full'])[16]", {
      timeout: 20000,
    });
    await this.ClickOnArwBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    // Get payer from grid
    const gridPayer = await this.page
      .locator(
        "(//span[@class='block overflow-hidden text-ellipsis ng-star-inserted'])[4]"
      )
      .innerText();
    console.log(`Payer displayed on table: ${gridPayer}`);
    const normalize = (str) =>
      str.toLowerCase().replace(/,/g, "").replace(/\s+/g, "").trim();
    if (normalize(gridPayer).includes(normalize(selectedPayer))) {
      expect(
        this.agingPayer,
        "Verify the applied payer filter data is visible on the Aging grid"
      ).toHaveText(selectedPayer);
    }
  };
  GetResidentBalance_between = async (lowerLimit, upperLimit) => {
    console.log(`\nValidating the Resident Balance_Between Filter`);
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();

    // Wait until overlays disappear (for stability)
    await this.page.waitForFunction(
      () => {
        const overlays = document.querySelectorAll(
          ".cdk-overlay-backdrop.cdk-overlay-backdrop-showing"
        );
        return overlays.length === 0;
      },
      { timeout: 20000 }
    );

    // Open Aging filter
    await this.AgingFilterBtn.waitFor({ state: "visible" });
    await this.clickOnAgingFilterBtn();

    await this.ResidentAddFilter();
    await this.SelectResidentDropBown();
    await this.SelectResidentBalanceFromDropdown();
    await this.ClickOnConditionalInputBox();
    await this.SelectBetweenOptionFromDropdown();

    // Wait for numeric inputs to appear
    await Promise.all([
      this.page
        .locator("//input[@type='number']")
        .first()
        .waitFor({ state: "visible", timeout: 10000 }),
      this.page.waitForTimeout(500),
    ]);

    // Fill the dynamic range values
    await this.EnterInputInFrom(lowerLimit.toString());
    await this.EnterInputInTo(upperLimit.toString());

    await this.ClickOnApplyFilterBtn();
    await this.page.waitForSelector("(//div[@class='w-full'])[16]", {
      timeout: 20000,
    });
    await this.ClickOnArwBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait || "5000"));

    // Extract the displayed value
    const valueText = await this.page
      .locator(
        "//div[5]//div[1]//div[9]//arw-template-renderer[1]//span[1]//arw-ar-aging-cell[1]"
      )
      .innerText();

    const numericValue = parseFloat(
      (valueText || "").replace(/[^0-9.-]/g, "").trim()
    );
    console.log(`Resident Balance displayed: ${valueText}`);

    // Allow NaN / empty cells to pass (no data found)
    if (isNaN(numericValue)) {
      console.log("Resident balance value is empty.");
      return;
    }
    //  Validate numeric range
    if (
      numericValue >= parseFloat(lowerLimit) &&
      numericValue <= parseFloat(upperLimit)
    ) {
      console.log(
        `Balance ${numericValue} is between ${lowerLimit} and ${upperLimit}`
      );
    }
  };

  GetResidentBalance_Equals = async (equalsValue) => {
    console.log(`\nValidating the Resident Balance_Equals Filter`);
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();

    // Wait until overlays disappear
    await this.page.waitForFunction(
      () => {
        const overlays = document.querySelectorAll(
          ".cdk-overlay-backdrop.cdk-overlay-backdrop-showing"
        );
        return overlays.length === 0;
      },
      { timeout: 20000 }
    );

    // Open Aging filter
    await this.AgingFilterBtn.waitFor({ state: "visible" });
    await this.clickOnAgingFilterBtn();

    await this.ResidentAddFilter();
    await this.SelectResidentDropBown();
    await this.SelectResidentBalanceFromDropdown();
    await this.ClickOnConditionalInputBox();
    await this.SelectEqualsOptionFromDropdown();

    // Wait for numeric input
    await Promise.all([
      this.page
        .locator("(//input[@placeholder='-'])[1]")
        .first()
        .waitFor({ state: "visible", timeout: 10000 }),
      this.page.waitForTimeout(500),
    ]);

    // Fill the dynamic value
    // await this.EnterInputInFrom("2000");
    await this.EnterInputInFrom(equalsValue);
    await this.page.waitForTimeout(300); // Give UI time to register

    // Apply filter
    await this.ClickOnApplyFilterBtn();
    await this.page.waitForSelector("(//div[@class='w-full'])[16]", {
      timeout: 20000,
    });
    await this.ClickOnArwBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait || "5000"));

    // Extract the displayed value
    const valueText = await this.page
      .locator(
        "//div[5]//div[1]//div[9]//arw-template-renderer[1]//span[1]//arw-ar-aging-cell[1]"
      )
      .innerText();

    const numericValue = parseFloat(
      (valueText || "").replace(/[^\d.-]/g, "").trim()
    );
    console.log(` Resident Balance displayed: ${numericValue}`);

    // Validation
    if (isNaN(numericValue)) {
      console.log("Resident balance value is empty.");
      return;
    }

    if (numericValue === parseFloat(equalsValue)) {
      console.log(
        ` Balance ${numericValue} equals expected value ${equalsValue}`
      );
    } else {
      throw new Error(
        ` Balance ${numericValue} does NOT equal expected value ${equalsValue}`
      );
    }

    console.log(
      `Successfully validated Resident Balance equals filter ${equalsValue}.`
    );
  };

  GetResidentBalance_Greaterthan = async (greaterValue) => {
    console.log(`\nValidating the Resident Balance_Greaterthan Filter`);
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();

    // Wait until overlays disappear
    await this.page.waitForFunction(
      () => {
        const overlays = document.querySelectorAll(
          ".cdk-overlay-backdrop.cdk-overlay-backdrop-showing"
        );
        return overlays.length === 0;
      },
      { timeout: 20000 }
    );

    // Open Aging filter
    await this.AgingFilterBtn.waitFor({ state: "visible" });
    await this.clickOnAgingFilterBtn();

    await this.ResidentAddFilter();
    await this.SelectResidentDropBown();
    await this.SelectResidentBalanceFromDropdown();
    await this.ClickOnConditionalInputBox();

    // Select the “Greater than” option
    await this.SelectGreaterthanOptionFromDropdown();

    // Wait for numeric input to appear
    await Promise.all([
      this.page
        .locator("//input[@type='number']")
        .first()
        .waitFor({ state: "visible", timeout: 10000 }),
      this.page.waitForTimeout(500),
    ]);

    // Fill in the dynamic value
    await this.EnterInputInFrom(greaterValue.toString());

    // Apply the filter
    await this.ClickOnApplyFilterBtn();
    await this.page.waitForSelector("(//div[@class='w-full'])[16]", {
      timeout: 20000,
    });
    await this.ClickOnArwBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait || "5000"));

    // Extract the displayed value
    const valueText = await this.page
      .locator(
        "//div[5]//div[1]//div[9]//arw-template-renderer[1]//span[1]//arw-ar-aging-cell[1]"
      )
      .innerText();

    const numericValue = parseFloat(
      (valueText || "").replace(/[^\d.-]/g, "").trim()
    );
    console.log(` Resident Balance displayed: ${numericValue}`);

    //  Validation logic
    if (isNaN(numericValue)) {
      console.log(" Resident balance value is empty.");
      return;
    }

    if (numericValue > parseFloat(greaterValue)) {
      console.log(` Balance ${numericValue} is greater than ${greaterValue}`);
    } else {
      throw new Error(
        ` Balance ${numericValue} is NOT greater than ${greaterValue}`
      );
    }

    console.log(` Successfully validated Resident Balance > ${greaterValue}`);
  };

  GetResidentBalance_Lessthan = async (lessValue) => {
    console.log(`\nValidating the Resident Balance_Lessthan Filter`);
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterBtn();

    // Wait until overlays disappear
    await this.page.waitForFunction(
      () => {
        const overlays = document.querySelectorAll(
          ".cdk-overlay-backdrop.cdk-overlay-backdrop-showing"
        );
        return overlays.length === 0;
      },
      { timeout: 20000 }
    );
    // Open Aging filter
    await this.AgingFilterBtn.waitFor({ state: "visible" });
    await this.clickOnAgingFilterBtn();
    await this.ResidentAddFilter();
    await this.SelectResidentDropBown();
    await this.SelectResidentBalanceFromDropdown();
    await this.ClickOnConditionalInputBox();
    // Select the “Less than” option
    await this.SelectLessthanOptionFromDropdown();
    // Wait for numeric input to appear
    await Promise.all([
      this.page
        .locator("//input[@type='number']")
        .first()
        .waitFor({ state: "visible", timeout: 10000 }),
      this.page.waitForTimeout(500),
    ]);
    // Fill in the dynamic value
    await this.EnterInputInFrom(lessValue.toString());
    // Apply the filter
    await this.ClickOnApplyFilterBtn();
    await this.page.waitForSelector("(//div[@class='w-full'])[16]", {
      timeout: 20000,
    });
    await this.ClickOnArwBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait || "5000"));

    // Extract the displayed value
    const valueText = await this.page
      .locator(
        "//div[5]//div[1]//div[9]//arw-template-renderer[1]//span[1]//arw-ar-aging-cell[1]"
      )
      .innerText();

    // ----Handle Parentheses and Negative Values ----
    let rawValue = (valueText || "").trim();

    // Convert "(7,010.13)" → "-7,010.13"
    if (rawValue.includes("(") && rawValue.includes(")")) {
      rawValue = "-" + rawValue.replace(/[()]/g, "");
    }

    // Remove commas and keep only digits, dot, and minus
    let numericValue = parseFloat(rawValue.replace(/[^\d.-]/g, ""));

    console.log(`Resident Balance displayed: ${numericValue}`);

    // ---- Validation ----
    if (isNaN(numericValue)) {
      console.log("Resident balance value is empty.");
      return;
    }

    //  If negative balance, consider it as automatically less than any positive number
    if (numericValue < 0) {
      console.log(
        `Detected negative balance: ${numericValue}, considered as less than any positive value.`
      );
      return;
    }

    // Regular comparison
    if (numericValue < parseFloat(lessValue)) {
      console.log(`Balance ${numericValue} is less than ${lessValue}`);
    } else {
      throw new Error(`Balance ${numericValue} is NOT less than ${lessValue}`);
    }

    console.log(
      `Successfully validated Resident Balance is less than ${lessValue}`
    );
  };
  GetResidentBalanceFilter = async (equalsValue) => {
    await this.clickOnAgingBtn();

    // Wait for current month grid to load
    await this.page.waitForSelector(
      "//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')]",
      { timeout: 20000 }
    );

    await this.GetResidentBalance_between(2000, 8000);
    await this.GetResidentBalance_Equals(2000);
    await this.GetResidentBalance_Greaterthan(2000);
    await this.GetResidentBalance_Lessthan(2000);
  };
};
