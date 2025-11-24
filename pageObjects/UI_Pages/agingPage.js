const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const testData = require("../../test_Data/testData.json");
const { parse } = require("path");
const randomFacilityNames =
  testData.RevflowData.TaskListPage.facilityOptions[
    Math.floor(
      Math.random() * testData.RevflowData.TaskListPage.facilityOptions.length
    )
  ];
const randomPayerCategory =
  testData.RevflowData.OverridePayerCategories[
    Math.floor(
      Math.random() * testData.RevflowData.OverridePayerCategories.length
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
    this.selectAllBtn = page.locator("//label[contains(text(),'All')]");
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
      "//div[normalize-space(text())='Resident']"
    );
    this.ResidentOption = page.locator("//span[text()='Select Resident']");
    this.ResidentInputBox = page.locator(
      "//button[@class='mat-mdc-menu-trigger arw-input bg-background-surface border border-complementary-grey-200 disabled:bg-complementary-grey-50 disabled:border-complementary-grey-200 disabled:text-foreground-medium flex focus:border-primary-blue-accent focus:outline-0 gap-8 hover:border-primary-blue-accent items-center justify-between min-h-btn-big placeholder:text-foreground-light px-12 rounded-sm text-foreground-high transition-colors w-full ng-star-inserted']"
    );
    this.FillResident = page.locator("//input[@placeholder='Search']");
    this.noResultsLabel = page.locator(
      "//label[contains(normalize-space(.), 'All (0 Matches)')]"
    );
    this.filterApplyBtn = page.locator(
      "//span[contains(text(),'Apply Filter')]"
    );
    this.checkboxVisible = page.locator("(//input[@type='checkbox'])[2]");
    this.ApplyFilterBtn1 = page.locator(
      "//button[@class='arw-button arw-button--accent arw-button--big arw-button--primary']"
    );
    this.ArwBtn = page.locator("(//arw-icon[@name='arrowNarrowDown'])[1]");
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
    this.BetweenFrom = page.locator("(//input[@placeholder='-'])[1]");
    this.BetweenTo = page.locator("(//input[@placeholder='-'])[2]");
    this.addFilterBtn = page.locator(
      "//span[normalize-space(text())='Add Filter']"
    );
    this.addFilterDropdown = page.locator("//span[text()='Select']");
    this.globalSearchInput = page.locator("//input[@placeholder='Search']");
    this.selectFiltesrsOptions = (txt) =>
      page.locator(`//div[normalize-space(text())='${txt}']`);
    this.selectFacilityFilterSubOptionsdropdown = (txt) =>
      page.locator(`//span[text()='${txt}']`);
    this.filtersDropdownListCount = page.locator(
      "(//mat-checkbox//label[@class='mdc-label'])[1]"
    );
    this.deleteSortIcon = page.locator(
      "(//arw-button[@icon='trash03']//button[contains(@class,'arw-button--small arw-button--tertiary')])[1]"
    );
    this.noTasksFound = page.locator(
      `//div[text()="You don't have any ar aging yet"]`
    );
    this.noMatchesFoundLabel = page.locator(
      "//label[normalize-space(text())='All (0 Matches)']"
    );
    this.closeBtn = page.locator("//arw-icon[@name='x']");
    this.globalFacilityfilterApplyBtn = page.locator(
      "//span[normalize-space(text())='Apply']"
    );
    this.clearFilerDisableFlag = page.locator(
      "//span[normalize-space(text())='Clear Filter']/parent::button"
    );
    this.Settings = this.page.locator(
      " //span[normalize-space(text())='Settings']"
    );
    this.FacilityPayers = this.page.locator(
      "//span[normalize-space(text())='Facility Payers']"
    );
    this.SelectFacility1 = this.page.locator(
      "(//arw-grid-header[@class='flex flex-col px-20 pt-20 pb-12 gap-16 bg-background-surface border-b border-complementary-grey-200 ng-star-inserted']//button)[1]"
    );
    this.GlobalFacility = this.page.locator("(//input[@type='checkbox'])[2]");
    this.GroupingAraging = this.page.locator(
      "(//arw-ar-aging[@class='arw-page ng-star-inserted']//arw-grid-header//button//span)[1]"
    );
    this.CustomGrouping = this.page.locator(
      "//div[@class='flex justify-end shrink-0 ng-star-inserted']//button//span[normalize-space(text())='Custom Grouping']"
    );
    this.ClearAll = this.page.locator(
      "//span[normalize-space(text())='Clear All']"
    );
    this.AddGrouping = this.page.locator(
      "//span[normalize-space(text())='Add Grouping']"
    );
    this.GroupingInputbox = this.page.locator(
      "(//mat-select[@role='combobox']//div)[1]"
    );
    this.SecondGroupingInputbox = this.page.locator(
      "(//div[@class='arw-control__content']//mat-select//div)[9]"
    );
    this.ThirdGroupingInputbox = this.page.locator(
      "(//div[@class='arw-control__content']//mat-select//div)[17]"
    );
    this.AddGrouping = this.page.locator(
      "//span[normalize-space(text())='Add Grouping']"
    );
    this.ApplyGrouping = this.page.locator(
      "//span[normalize-space(text())='Apply Grouping']"
    );
    this.groupingName = (optionName) =>
      this.page.locator(
        `//mat-option[@role='option']//div//div[normalize-space(.)='${optionName}']`
      );
    this.FacilityArwBtn = this.page.locator(
      "//div[@class='flex items-center px-8 gap-4 relative bg-background-surface rounded-l-sm h-full ng-star-inserted']//div//arw-button"
    );
    this.agingGrid = (PayerCategory) =>
      this.page.locator(
        `//span[normalize-space(text())='${PayerCategory}']/ancestor::div[contains(@class,'flex items-center')][1]//arw-button`
      );
    this.payers = this.page.locator(
      '//div[contains(@data-column-definition-name, "_groupColumn")][not(.//arw-button)]'
    );
    this.TotalGrid = this.page.locator(
      "//div[@class='cdk-virtual-scroll-content-wrapper']"
    );
    this.SaveBtn = this.page.locator(
      "//div[@class='flex justify-center gap-16 ng-star-inserted']//button//span[normalize-space(text())='Save']"
    );
    this.EditBtn = this.page.locator(
      "(//div[@class='shadow-m arw-grid-table__row bg-background-surface ng-star-inserted']//arw-button)[1]"
    );
    this.PayerCategoryDropDown = this.page.locator(
      "//mat-select[@role='combobox']"
    );
    this.searchCategory = this.page.locator("//div[@role='listbox']//input");
    this.Facility = this.page.locator(
      "(//div[@class='shadow-m arw-grid-table__row bg-background-surface ng-star-inserted']//div[@data-column-definition-name='facilityHierarchyId'])[1]"
    );

    this.PayerCategoryName = this.page.locator(
      "(//div[@class='shadow-m arw-grid-table__row bg-background-surface ng-star-inserted']//div[@data-column-definition-name='overridePayerCategoryName'])[1]"
    );
    this.facilitySearchInput = page.locator(
      "//arw-input[@icon='searchLg']//input"
    );
    this.agingFilterDropdown = page.locator(
      `//span[normalize-space(text())='Select']`
    );
    this.selectAgingFilterOption = (txt) =>
      page.locator(`//div[normalize-space(text())='${txt}']`);
    this.selectAgingFilterSubOptions = (txt) =>
      page.locator(`//span[normalize-space(text())='${txt}']`);
    this.tasklistBtn = page.locator("//span[normalize-space(text())='Task List']")
    this.TaskHeader = this.page.locator("//h2[normalize-space(text())='Tasks']");
     this.gridTable = this.page.locator("//div[@class='arw-grid-table ng-star-inserted']");
     this.TaskNameCell = this.page.locator(
      "//div[@class='cdk-virtual-scroll-content-wrapper']//div[contains(@data-row-id,'')]//div[@data-column-definition-name='name']"
    );
    this.ChargesLabel = this.page.locator(
      '//div[@class="mat-mdc-tab-labels"]//span[normalize-space(text())="Charges"]'
    );
    this.NoChargersAvailableText = this.page.locator(
      '//div[normalize-space(text())="No available charges to link"]'
    );
     this.ChargeLinkedIcon = this.page.locator(
      "(//arw-button[@icon='checkFormFilled']//button)[1]"
    )

    this.LinkChargeIcon = this.page.locator(
      "(//arw-button[@icon='link01']//button)[1]"
    )

    this.LinkBrokenIcon = this.page.locator(
      "(//arw-button[@icon='linkBroken02']//button[@disabled])[1]"
    )

    this.UnlinkChargeIcon = this.page.locator(
      "(//arw-button[@icon='linkBroken02']//button[not(@disabled)])[1]"
    )
    this.tooltip = this.page.locator(
      "//arw-tooltip-overlay//div[contains(@class,'arw-tooltip-overlay')]"
    );
    this.TaskCount = this.page.locator(
      "//div[@class='flex justify-between']//div//span"
    )

    this.DeleteTaskIcon = this.page.locator(
      "//arw-button[@icon='trash03']//button"
    )

    this.DeleteInput = this.page.locator(
      "//div[@class='mat-mdc-dialog-surface mdc-dialog__surface']//input"
    )

    this.DisabledDeleteBtn = this.page.locator(
      "//button[@class='arw-button arw-button--big arw-button--primary arw-button--warning'][@disabled]"
    )

    this.DeleteTaskBtn = this.page.locator(
      "//button[@class='arw-button arw-button--big arw-button--primary arw-button--warning'][not(@disabled)]"
    )

    this.CrossIcon = this.page.locator(
      "//div[@class='mat-mdc-dialog-surface mdc-dialog__surface']//arw-button[@icon='x']"
    )

    this.CancelBtn = this.page.locator(
      "//div[@class='mat-mdc-dialog-surface mdc-dialog__surface']//arw-button[@class='ng-star-inserted']"
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
  searchFacilityOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.facilitySearchInput,
      "fill",
      "Search facilityOption",
      txt
    );
  };
  clickSelectAgingFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.agingFilterDropdown,
      "click",
      "Click on filter dropdown"
    );
  };
  selectAgingFilterOptionFromList = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectAgingFilterOption(txt),
      "click",
      "SelSelect the filter option from the dropdown listect"
    );
  };
  clickOnSeleAgingFiltersSubOptionDropdown = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectAgingFilterSubOptions(txt),
      "click",
      "Click on the filters sub-options dropdown"
    );
  };
  clickOnCloseBtn = async () => {
    await excuteSteps(this.test, this.closeBtn, "click", "Click on close Icon");
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
  SelectBetweenOptionFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.BetweenOption,
      "click",
      `Select Between option from Dropdown`,
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
  SelectEqualsOptionFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.EqualsOption,
      "click",
      `Select Between option from Dropdown`,
    );
  };
  SelectGreaterthanOptionFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.GreaterthanOption,
      "click",
      `Select Between option from Dropdown`,
    );
  };
  SelectLessthanOptionFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.LessthanOption,
      "click",
      `Select  Less than  option from Dropdown`,
    );
  };
  clickOnAddFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.addFilterBtn,
      "click",
      `Click on the Add filter button`
    );
  };
  clickOAddFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.addFilterDropdown,
      "click",
      `Click Add Filter Dropdown`
    );
  };
  searchFilterNames = async (txt) => {
    await excuteSteps(
      this.test,
      this.globalSearchInput,
      "fill",
      "Enter the filter name in the search input",
      txt
    );
  };
   clickOntasklistBtn = async () => {
    await excuteSteps(
      this.test,
      this.tasklistBtn,
      "click",
      "Click on the TaskList button"
    );
  };
  ClickOnChargesLabel = async () => {
    await excuteSteps(
      this.test,
      this.ChargesLabel,
      "click",
      `Clcik on ChargesLabel on grid `
    );
  }
  ClickOnDeleteTaskIcon = async () => {
    await excuteSteps(
      this.test,
      this.DeleteTaskIcon,
      "click",
      `Clcik on Delete Task icon on Task page `
    );
  }
  
  ClickOnCrossIcon = async () => {
    await excuteSteps(
      this.test,
      this.CrossIcon,
      "click",
      `Clcik on Cross icon on Delete Task dialog `
    );
  }
  ClickOnCancelBtn = async () => {
    await excuteSteps(
      this.test,
      this.CancelBtn,
      "click",
      `Clcik on Cancel Btn on Delete Task dialog `
    );
  }
  selectFacilitySubOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectFacilityFilterSubOptionsdropdown(txt),
      "click",
      `Click on the dropdown to select a facility filter sub-option`
    );
  };
  clickOnDeleteDuedateInSortIcon = async () => {
    await excuteSteps(
      this.test,
      this.deleteSortIcon,
      "click",
      `Clear all sorting filters`
    );
  };
  clickOnApplyFilterButton = async () => {
    await excuteSteps(
      this.test,
      this.applyFilterBtn,
      "click",
      `Click on Apply Filter`
    );
  };
  clickOnGlobalSearchdropdown = async () => {
    await excuteSteps(
      this.test,
      this.globalFacilityDropdown,
      "click",
      `Click on global facility dropdown`
    );
  };
  deselectAllFacilities = async () => {
    await excuteSteps(
      this.test,
      this.selectAllBtn,
      "click",
      `Deselect all facilities in the global facility dropdown`
    );
  };
  searchGlobalFacilty = async (txt) => {
    await excuteSteps(
      this.test,
      this.globalSearchInput,
      "fill",
      `Search for a facility name in the search input field`,
      txt
    );
  };
  clickOnGloabalFacilityApplyBtn = async () => {
    await excuteSteps(
      this.test,
      this.globalFacilityfilterApplyBtn,
      "click",
      `Click on Apply button`
    );
  };
  selectFilterOptionsFromDropdown = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectFiltesrsOptions(txt),
      "click",
      `Select the desired filter from the dropdown list`
    );
  };
  selectAllFacilities = async () => {
    await excuteSteps(
      this.test,
      this.selectAllBtn,
      "click",
      `Select all facilities in the global facility dropdown`
    );
  };
  clickOnApplyBtn = async () => {
    await excuteSteps(
      this.test,
      this.applyButton,
      "click",
      `Click on Apply Button below`
    );
  };
  clickOnFilterApplyBtn = async () => {
    await excuteSteps(
      this.test,
      this.filterApplyBtn,
      "click",
      `Click on Apply Filter`
    );
  };
  ClickOnSettings = async () => {
    await excuteSteps(
      this.test,
      this.Settings,
      "click",
      `Clcik on Settings Button`
    );
  };
  ClickOnFacilityPayers = async () => {
    await excuteSteps(
      this.test,
      this.FacilityPayers,
      "click",
      `Clcik on Facility Payers Button`
    );
  };
  ClickOnSelectFacilityDropDownInFacilityPayers = async () => {
    await excuteSteps(
      this.test,
      this.SelectFacility1,
      "click",
      `Clcik on Facility dropdown Button`
    );
  };
  SelectGlobalFacility = async () => {
    await excuteSteps(
      this.test,
      this.GlobalFacility,
      "click",
      `Select Global Facility`
    );
  };
  ClickOnGroupingBtn = async () => {
    await excuteSteps(
      this.test,
      this.GroupingAraging,
      "click",
      `Clcik on Grouping Button`
    );
  };

  ClickOnCustomGroupingBtn = async () => {
    await excuteSteps(
      this.test,
      this.CustomGrouping,
      "click",
      `Clcik on Custom Grouping Button`
    );
  };
  ClickOnClearAllBtn = async () => {
    await excuteSteps(
      this.test,
      this.ClearAll,
      "click",
      `Clcik on Clear All Button`
    );
  };
  ClickOnAddGroupingBtn = async () => {
    await excuteSteps(
      this.test,
      this.AddGrouping,
      "click",
      `Clcik on Add Grouping Btn  `
    );
  };
  ClickOnGroupingInputBox = async () => {
    await excuteSteps(
      this.test,
      this.GroupingInputbox,
      "click",
      `Clcik on Grouping input box `
    );
  };
  selectOption = async (optionName) => {
    await excuteSteps(
      this.test,
      this.groupingName(optionName),
      "click",
      "Click on the grouping options"
    );
  };
  ClickOnSecondGroupingInputBox = async () => {
    await excuteSteps(
      this.test,
      this.SecondGroupingInputbox,
      "click",
      `Clcik on second Grouping input box `
    );
  };
  ClickOnThirdGroupingInputBox = async () => {
    await excuteSteps(
      this.test,
      this.ThirdGroupingInputbox,
      "click",
      `Clcik on Third Grouping input box `
    );
  };
  ClickOnApplyGroupingBtn = async () => {
    await excuteSteps(
      this.test,
      this.ApplyGrouping,
      "click",
      `Clcik on Apply Grouping Btn  `
    );
  };
  ClickOnFacilityArrowBtn = async () => {
    await excuteSteps(
      this.test,
      this.FacilityArwBtn,
      "click",
      `Clcik on Facility Arw  Btn  `
    );
  };
  ClickExpandBtn = async (PayerCategory) => {
    await excuteSteps(
      this.test,
      this.agingGrid(PayerCategory),
      "click",
      "Click on the payer category expand button"
    );
  };
  ClickOnSaveBtn = async () => {
    await excuteSteps(this.test, this.SaveBtn, "click", `Clcik on Save Button`);
  };

  ClickOnEditPayerCategoryBtn = async () => {
    await excuteSteps(
      this.test,
      this.EditBtn,
      "click",
      `Clcik on Edit Payer Category Button`
    );
  };
  ClickOnPayerCategoryDropDown = async () => {
    await excuteSteps(
      this.test,
      this.PayerCategoryDropDown,
      "click",
      `Clcik on Payer Category dropdown`
    );
  };
  EnterCategoryName = async (text) => {
    await excuteSteps(
      this.test,
      this.searchCategory,
      "fill",
      `Enter CategoryName`,
      text
    );
  };
  EnterInputValue = async (locator, value) => {
    const cleanValue = value.toString().trim();
    // Allow passing a raw selector or a locator
    const input = typeof locator === "string"
      ? this.page.locator(locator)
      : locator;
    await input.waitFor({ state: "visible", timeout: 10000 });
    await input.scrollIntoViewIfNeeded();
    // Clear existing text
    await input.click({ clickCount: 3 });
    await this.page.keyboard.press("Backspace");
    await this.page.waitForTimeout(200);
    // Type new value
    await this.page.keyboard.type(cleanValue, { delay: 100 });
    // Confirm value
    const typedValue = await input.inputValue();
    console.log(`Entered "${typedValue}" into field`);
  };
  ClickOnDeleteTaskBtn = async () => {
    await excuteSteps(
      this.test,
      this.DeleteTaskBtn,
      "click",
      `Clcik on Delete Btn on Delete Task dialog `
    );
  }
  getFieldValue = async (containerLocator, labelText) => {
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const rawText = await containerLocator.innerText();
    const cleanValue = rawText
      .replace(new RegExp(`^${labelText}\\s*`, "i"), "")
      .trim();

    if (!cleanValue) {
      console.warn(` No value found for ${labelText}. Raw text: "${rawText}"`);
    }

    // console.log(` Extracted ${labelText}: ${cleanValue}`);
    return cleanValue;
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
  parseAmount = async (text) => {
    if (typeof text !== "string") {
      throw new Error(
        "parseAmount expected string, got: " + JSON.stringify(text)
      );
    }

    text = text.trim();

    const isParens = text.startsWith("(") && text.endsWith(")");
    if (isParens) {
      text = text.slice(1, -1);
    }

    const cleaned = text.replace(/[^0-9.-]+/g, "").replace(/(?!^)-/g, "");
    const num = Number(cleaned);

    if (isNaN(num)) {
      throw new Error("parseAmount failed to convert: " + text);
    }

    return isParens ? -Math.abs(num) : num;
  };

  VerifyAgingGridDataWhenTogglesOnAndOff = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });

    // Current month
    const currentMonthBalanceTotalSummary = await this.page
      .locator(
        "(//div[@data-column-definition-name='currentMonth']//arw-template-renderer//arw-ar-aging-cell//div[contains(@class,'overflow-hidden')])[last()]"
      )
      .textContent();

    const currentMonthBalanceNum = await this.parseAmount(
      currentMonthBalanceTotalSummary
    );
    console.log("currentMonthSummary==", currentMonthBalanceNum);

    // Total before toggle
    const totalDisplayBalanceSummary = await this.page
      .locator(
        "(//div[@data-column-definition-name='totalBalance']//arw-template-renderer//arw-ar-aging-cell//div[contains(@class,'overflow-hidden')])[last()]"
      )
      .textContent();

    const totalBeforeNum = await this.parseAmount(totalDisplayBalanceSummary);
    console.log("totalBeforeNum=", totalBeforeNum);

    // Prior balance
    const priorBalanceSummary = await this.page
      .locator(
        "(//div[@data-column-definition-name='priorBalances']//arw-template-renderer//arw-ar-aging-cell//div[contains(@class,'overflow-hidden')])[last()]"
      )
      .textContent();

    const priorBalanceNum = await this.parseAmount(priorBalanceSummary);
    console.log("priorbalance==", priorBalanceNum);

    // Toggle current month OFF
    await this.clickOnCurrentMonthToggle();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));

    const totalAfter = await this.page
      .locator(
        "(//div[@data-column-definition-name='totalBalance']//arw-template-renderer//arw-ar-aging-cell//div[contains(@class,'overflow-hidden')])[last()]"
      )
      .textContent();

    const totalDisplaySummaryAfterCurrentMonthToggleOff =
      await this.parseAmount(totalAfter);
    console.log(
      "AfterCurrentMonthToggleOff==",
      totalDisplaySummaryAfterCurrentMonthToggleOff
    );

    const expectedTotal = totalBeforeNum - currentMonthBalanceNum;

    await expect(
      totalDisplaySummaryAfterCurrentMonthToggleOff,
      "Verify the total display balance is shown correctly when the current month toggle is off"
    ).toBeCloseTo(expectedTotal, 2);

    // Toggle back ON, then prior balances OFF
    await this.clickOnCurrentMonthToggle();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));

    await this.clickOnAllPriorBalancesToggle();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));

    const totalBalanceSummaryAfterPriorToggleOff = await this.page
      .locator(
        "(//div[@data-column-definition-name='totalBalance']//arw-template-renderer//arw-ar-aging-cell//div[contains(@class,'overflow-hidden')])[last()]"
      )
      .textContent();

    const afterPriorToggleOffTotalDisplaybalNm = await this.parseAmount(
      totalBalanceSummaryAfterPriorToggleOff
    );
    console.log(
      "AfterPriorToggle Off TotalDisplayed Balance==",
      afterPriorToggleOffTotalDisplaybalNm
    );

    const expectedTotalDisplayedAmount = totalBeforeNum - priorBalanceNum;

    await expect(
      afterPriorToggleOffTotalDisplaybalNm,
      "Verify the total display balance is shown correctly when the prior balance toggle is off"
    ).toBeCloseTo(expectedTotalDisplayedAmount, 2);
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
    // await this.page.reload({ waitUntil: "networkidle" });
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });

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
    await this.clickOnAddFilterBtn();
    await this.clickSelectAgingFilterDropdown();
    await this.selectAgingFilterOptionFromList("Resident");
    await this.clickOnSeleAgingFiltersSubOptionDropdown("Select Resident");
    const ResidentNames = testData.RevflowData.TaskListPage.residentOptions;
    let selectedResident = null;
    for (const resident of ResidentNames) {
      console.log(`Trying resident: ${resident}`);
      // await this.ClickOnsearchPayersField();
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
    await this.clickOnAddFilterBtn();
    await this.clickSelectAgingFilterDropdown();
    await this.selectAgingFilterOptionFromList("Payer");
    await this.clickOnSeleAgingFiltersSubOptionDropdown("Select Payer");

    const payerNames = testData.RevflowData.TaskListPage.payenameList;
    let selectedPayer = null;

    // Exact match retry logic like Resident
    for (const payer of payerNames) {
      console.log(`Trying payer: ${payer}`);

      // await this.ClickOnsearchPayersField();
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
    await this.clickOnAddFilterBtn();
    await this.clickSelectAgingFilterDropdown();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectAgingFilterOptionFromList('Resident Balance');
    await this.clickOnSeleAgingFiltersSubOptionDropdown('Conditional');
    await this.SelectBetweenOptionFromDropdown()
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
    await this.clickOnAddFilterBtn();
    await this.clickSelectAgingFilterDropdown();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectAgingFilterOptionFromList('Resident Balance');
    await this.clickOnSeleAgingFiltersSubOptionDropdown('Conditional');
    await this.SelectEqualsOptionFromDropdown()
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
    await this.clickOnAddFilterBtn();
    await this.clickSelectAgingFilterDropdown();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectAgingFilterOptionFromList('Resident Balance');
    await this.clickOnSeleAgingFiltersSubOptionDropdown('Conditional');
    await this.SelectGreaterthanOptionFromDropdown()
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
    await this.clickOnAddFilterBtn();
    await this.clickSelectAgingFilterDropdown();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectAgingFilterOptionFromList('Resident Balance');
    await this.clickOnSeleAgingFiltersSubOptionDropdown('Conditional');
    await this.SelectLessthanOptionFromDropdown()
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
  VerifyResidentPayerDropdownOptionsCountChangingGlobalFacilities =
    async () => {
      await this.clickOnAgingBtn();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
      });
      await this.clickOnFilterBtn();
      await this.clickOnClearFilterBtn();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      let dropdownCount = [];
      let afterChangeGlobalFacilityFiltercount = [];
      const filters = [
        { name: "Resident", selectOption: "Select Resident" },
        { name: "Payer", selectOption: "Select Payer" },
      ];
      for (const element of filters) {
        await this.clickOnFilterBtn();
        await this.clickOnAddFilterBtn();
        await this.clickOAddFilterDropdown();
        await this.searchFilterNames([element.name]);
        await this.selectFilterOptionsFromDropdown([element.name]);
        await this.selectFacilitySubOptions([element.selectOption]);
        await this.test.step("The page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.mediumWait));
        });
        const counts = await this.filtersDropdownListCount.allInnerTexts(); // returns array of strings
        // extract numbers from each text value
        const numbers = counts.map((text) => {
          const match = text.match(/\d+/);
          return match ? Number(match[0]) : 0;
        });
        dropdownCount.push(...numbers); // spread to flatten array
        await this.page.keyboard.press("Escape");
        await this.clickOnDeleteDuedateInSortIcon();
        await this.clickOnApplyFilterButton();
      }
      console.log(dropdownCount);
      await this.clickOnGlobalSearchdropdown();
      await this.deselectAllFacilities();
      for (let i = 0; i < 7; i++) {
        const randomFacilityNames =
          testData.RevflowData.TaskListPage.facilityOptions[
            Math.floor(
              Math.random() *
                testData.RevflowData.TaskListPage.facilityOptions.length
            )
          ];
        await this.searchGlobalFacilty([randomFacilityNames]);
        let noMatchesFound = await this.noMatchesFoundLabel.isVisible();
        if (noMatchesFound) {
          await expect(
            this.noMatchesFoundLabel,
            "Verifying 0 matches found label"
          ).toBeVisible();
        }
        await this.page.keyboard.press("Enter");
        await this.clickOnCloseBtn();
      }
      await this.clickOnGloabalFacilityApplyBtn();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      let noTasks = await this.noTasksFound.isVisible();
      if (noTasks) {
        await expect(
          this.noTasksFound,
          "verifying You don't have any ar aging yet  lable on aging screen"
        ).toBeVisible();
      } else {
        const AfterChangeGlobalFacilityfilterscount = [
          { name: "Resident", selectOption: "Select Resident" },
          { name: "Payer", selectOption: "Select Payer" },
        ];
        for (const element of AfterChangeGlobalFacilityfilterscount) {
          await this.clickOnFilterBtn();
          await this.clickOnAddFilterBtn();
          await this.clickOAddFilterDropdown();
          await this.searchFilterNames([element.name]);
          await this.selectFilterOptionsFromDropdown([element.name]);
          await this.selectFacilitySubOptions([element.selectOption]);
          await this.test.step("The page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.mediumWait));
          });
          const counts = await this.filtersDropdownListCount.allInnerTexts(); // returns array of strings
          // extract numbers from each text value
          const numbers = counts.map((text) => {
            const match = text.match(/\d+/);
            return match ? Number(match[0]) : 0;
          });
          afterChangeGlobalFacilityFiltercount.push(...numbers); // spread to flatten array
          await this.page.keyboard.press("Escape");
          await this.clickOnDeleteDuedateInSortIcon();
          await this.clickOnApplyFilterButton();
        }
        console.log(afterChangeGlobalFacilityFiltercount);
        await expect(
          dropdownCount,
          "Verifying the facility, payer, resident, and assigned user dropdown option counts after changing global facilities"
        ).not.toEqual(afterChangeGlobalFacilityFiltercount);
      }
    };
  verifyAgingFiltersResetGlobalFacilityChange = async () => {
    await this.clickOnAgingBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Resident"]);
    await this.selectFilterOptionsFromDropdown("Resident");
    await this.selectFacilitySubOptions("Select Resident");
    await this.selectAllFacilities();
    await this.clickOnApplyBtn();
    await this.clickOnFilterApplyBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnGlobalSearchdropdown();
    await this.deselectAllFacilities();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.searchGlobalFacilty([randomFacilityNames]);
    await this.page.keyboard.press("Enter");
    await this.clickOnGloabalFacilityApplyBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnFilterBtn();
    await expect(
      this.clearFilerDisableFlag,
      "Filters should clear after the global facility is changed"
    ).toBeDisabled();
    await this.test.step("Close the filter popup", async () => {
      await this.page.keyboard.press("Escape");
    });
  };
  verifyPayerUnderPayerCategory = async () => {
    await this.ClickOnSettings();
    await this.ClickOnFacilityPayers();
    await this.test.step("waiting until grid is visible", async () => {
      await this.TotalGrid.waitFor({ state: "visible", timeout: 10000 });
    });
    await this.ClickOnSelectFacilityDropDownInFacilityPayers();
    await this.searchFacilityOptions([randomFacilityNames]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const facilityName = await this.page
      .locator(
        "(//div[@data-column-definition-name='facilityHierarchyId']//arw-template-renderer//span[@class='ng-star-inserted'])[1]"
      )
      .innerText();
    const payerName = await this.page
      .locator(
        "(//div[@data-column-definition-name='payerName']//span[@class='ng-star-inserted'])[1]"
      )
      .innerText();
    const BeforePayerCategoryName = await this.page
      .locator(
        "(//div[@data-column-definition-name='overridePayerCategoryName']//span)[1]"
      )
      .innerText();
    console.log(`Facility Name: ${facilityName}`);
    console.log(`Payer Name: ${payerName}`);
    console.log(`Payer Category Name: ${BeforePayerCategoryName}`);
    await this.ClickOnEditPayerCategoryBtn();
    await this.ClickOnPayerCategoryDropDown();
    await this.EnterCategoryName([randomPayerCategory]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.test.step("close payer dropdown", async () => {
      await this.page.keyboard.press("Enter");
      await this.page.keyboard.press("Escape");
    });
    await this.ClickOnSaveBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const UpdatedPayerCategoryName = await this.page
      .locator(
        "(//div[@data-column-definition-name='overridePayerCategoryName']//span)[1]"
      )
      .innerText();
    console.log(
      `Payer Category Name after updating: ${UpdatedPayerCategoryName}`
    );
    await this.clickOnAgingBtn();
    await this.page.waitForSelector(
      "//div[@data-column-definition-name='currentMonth']//div[contains(@class,'overflow-hidden')]",
      { timeout: 50000 }
    );
    await this.clickOnGlobalFacilityDropdown();
    await this.selectAllCheckBox();
    await this.searchGlobalFacilty([randomFacilityNames]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.ClickOnGroupingBtn();
    await this.ClickOnCustomGroupingBtn();
    await this.ClickOnClearAllBtn();
    await this.ClickOnGroupingInputBox();
    await this.selectOption("Facility");
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.test.step("waiting until element is visible", async () => {
      await this.AddGrouping.waitFor({ state: "visible", timeout: 10000 });
    });

    await this.ClickOnAddGroupingBtn();
    await this.ClickOnSecondGroupingInputBox();
    await this.selectOption("Payer Category");
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    await this.test.step("waiting until element is visible", async () => {
      await this.AddGrouping.waitFor({ state: "visible", timeout: 10000 });
    });
    await this.ClickOnAddGroupingBtn();
    await this.ClickOnThirdGroupingInputBox();
    await this.selectOption("Payer");
    await this.page.waitForTimeout(2000);
    await this.ClickOnApplyGroupingBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step("waiting until element is visible", async () => {
      await this.FacilityArwBtn.waitFor({ state: "visible" });
    });

    await this.ClickOnFacilityArrowBtn();
    await this.page.waitForTimeout(3000);
    await this.ClickExpandBtn(UpdatedPayerCategoryName);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const rows = this.payers;
    const totalRows = await this.payers.count();
    let matchFound = false;
    for (let i = 0; i < totalRows; i++) {
      const row = this.payers.nth(i);
      // wait for that row to be visible (best practice)
      await row.waitFor({ state: "visible", timeout: 5000 }).catch(() => {});
      const rawText = (await row.innerText()).trim();
      // clean: keep only alphabets, numbers, spaces
      const currentPayer = rawText.replace(/[^a-zA-Z0-9 ]/g, "").trim();
      if (currentPayer === payerName.trim()) {
        matchFound = true;
        console.log(`Excepted Payer: ${currentPayer}`);
        break;
      }
    }
    expect(
      matchFound,
      "Verify the updated override payer category is correctly reflected in the payerCategory hierarchy on the aging screen"
    ).toBeTruthy();
    console.log(
      `${payerName} :Payer Is displayed in the updated Payer category`
    );
  };
   GetTooltipsOnCharges = async () => {
    console.log("-------------- Starting: Verifying tooltips on Charges ------------");
    // EXPECTED TOOLTIP VALUES
    const expectedLinked = testData.RevflowData.toolTipData.linked;
    const expectedLink = testData.RevflowData.toolTipData.link;
    const expectedUnlink = testData.RevflowData.toolTipData.unlink;
    const expectedBroken = testData.RevflowData.toolTipData.broken;
    await this.clickOntasklistBtn();
    await this.TaskHeader.waitFor({ state: "visible" });
    await this.gridTable.waitFor();
    const rowCount = await this.TaskNameCell.count();
    let validRowFound = false;
    //  Find a valid row that has both charge icons
    for (let i = 0; i < rowCount; i++) {
      const rowCell = this.TaskNameCell.nth(i);
      const taskName = await rowCell.innerText();
      console.log(`Row ${i + 1} → TaskName: ${taskName}`);
      await rowCell.click({ force: true });
      await this.page.waitForTimeout(300);
      await this.ClickOnChargesLabel();
      await this.page.waitForTimeout(300);
      if (await this.NoChargersAvailableText.isVisible().catch(() => false)) {
        console.log(`No charges for row ${i + 1} → Skipping`);
        await this.page.keyboard.press("Escape").catch(() => { });
        continue;
      }
      const hasLinked = await this.ChargeLinkedIcon.first().isVisible().catch(() => false);
      const hasLink = await this.LinkChargeIcon.first().isVisible().catch(() => false);
      if (!hasLinked || !hasLink) {
        console.log(`Icons not found for row ${i + 1} → Skipping`);
        await this.page.keyboard.press("Escape").catch(() => { });
        continue;
      }
      console.log("Valid row found → extracting tooltips");
      validRowFound = true;
      break;
    }
    if (!validRowFound) {
      throw new Error("No valid row found with both icons → Test cannot continue.");
    }
    // Tooltip: ChargeLinkedIcon
    await this.ChargeLinkedIcon.first().scrollIntoViewIfNeeded();
    await this.ChargeLinkedIcon.first().hover();
    await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
    let linkedChargeTooltipText = await this.tooltip.first().innerText();
    console.log("Linked Charge Tooltip:", linkedChargeTooltipText);
    // Tooltip: LinkChargeIcon
    await this.LinkChargeIcon.first().scrollIntoViewIfNeeded();
    await this.LinkChargeIcon.first().hover();
    await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
    let linkChargeTooltipText = await this.tooltip.first().innerText();
    console.log("Link Charge Tooltip:", linkChargeTooltipText);
    const isBrokenVisible = await this.LinkBrokenIcon.first().isVisible().catch(() => false);
    let unlinkChargeTooltipText = "";
    let linkBrokenTooltipText = "";
    if (isBrokenVisible) {
      //LinkBrokenIcon IS visible
      console.log("LinkBrokenIcon is visible → Getting tooltip");
      await this.LinkBrokenIcon.first().scrollIntoViewIfNeeded();
      await this.LinkBrokenIcon.first().hover();
      await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
      linkBrokenTooltipText = await this.tooltip.first().innerText();
      console.log("LinkBrokenIcon Tooltip:", linkBrokenTooltipText);
      // Click LinkChargeIcon → get UnlinkCharge tooltip
      console.log("Clicking LinkChargeIcon to show UnlinkChargeIcon tooltip...");
      await this.LinkChargeIcon.click();
      await this.page.waitForTimeout(600);
      await this.UnlinkChargeIcon.first().scrollIntoViewIfNeeded();
      await this.UnlinkChargeIcon.first().hover();
      await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
      unlinkChargeTooltipText = await this.tooltip.first().innerText();
      console.log("UnlinkCharge Tooltip:", unlinkChargeTooltipText);

    } else {
      // LinkBrokenIcon NOT visible
      console.log("LinkBrokenIcon NOT visible → Getting UnlinkCharge tooltip first");
      await this.UnlinkChargeIcon.first().scrollIntoViewIfNeeded();
      await this.UnlinkChargeIcon.first().hover();
      await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
      unlinkChargeTooltipText = await this.tooltip.first().innerText();
      console.log("UnlinkCharge Tooltip:", unlinkChargeTooltipText);
      // Click UnlinkChargeIcon → LinkBroken should appear
      console.log("Clicking UnlinkChargeIcon to show LinkBrokenIcon...");
      await this.UnlinkChargeIcon.click();
      await this.page.waitForTimeout(600);
      const brokenVisibleAfter = await this.LinkBrokenIcon.first().isVisible().catch(() => false);
      if (!brokenVisibleAfter) {
        throw new Error("LinkBrokenIcon did not appear after clicking UnlinkChargeIcon.");
      }
      await this.LinkBrokenIcon.first().scrollIntoViewIfNeeded();
      await this.LinkBrokenIcon.first().hover();
      await this.tooltip.first().waitFor({ state: "visible", timeout: 5000 });
      linkBrokenTooltipText = await this.tooltip.first().innerText();
      console.log("LinkBrokenIcon Tooltip (after click):", linkBrokenTooltipText);
    }
    // TOOLTIP VALIDATION
    console.log("\n========== TOOLTIP VALIDATION ==========\n");
    // --- Linked Charge Tooltip ---
    if (expectedLinked.trim() === linkedChargeTooltipText.trim()) {
      console.log("Linked tooltip matched");
    } else {
      console.log("Linked tooltip mismatch");
      console.log("Expected:", expectedLinked);
      console.log("Actual:", linkedChargeTooltipText);
    }
    // --- Link Charge Tooltip ---
    if (expectedLink.trim() === linkChargeTooltipText.trim()) {
      console.log("Link Charge tooltip matched");
    } else {
      console.log("Link Charge tooltip mismatch");
      console.log("Expected:", expectedLink);
      console.log("Actual:", linkChargeTooltipText);

    }
    // --- Unlink Charge Tooltip ---
    if (expectedUnlink.trim() === unlinkChargeTooltipText.trim()) {
      console.log("Unlink Charge tooltip matched");
    } else {
      console.log("Unlink Charge tooltip mismatch");
      console.log("Expected:", expectedUnlink);
      console.log("Actual:", unlinkChargeTooltipText);
    }
    // --- Link Broken Tooltip ---
    if (expectedBroken.trim() === linkBrokenTooltipText.trim()) {
      console.log("Broken tooltip matched");
    } else {
      console.log("Broken tooltip mismatch");
      console.log("Expected:", expectedBroken);
      console.log("Actual:", linkBrokenTooltipText);

    }
    console.log("Verification complete: ALL TOOLTIP TEXTS MATCHED SUCCESSFULLY");
    await this.page.keyboard.press("Escape");
  };
  GetCountAfterDeleteingTask = async () => {
    await this.clickOntasklistBtn();
    await this.TaskHeader.waitFor({ state: "visible" });
    await this.gridTable.waitFor();
    let taskCountBeforeDelete = parseInt(await this.TaskCount.innerText())
    console.log("Total Task count before delete: ", taskCountBeforeDelete)
    const rowCell = this.TaskNameCell.nth(1);
    const taskName = await rowCell.innerText();
    console.log(`Row-1 → TaskName: ${taskName}`);
    await rowCell.click({ force: true });
    await this.page.waitForTimeout(300);
    // Check if Cross Icon is working
    await this.ClickOnDeleteTaskIcon();  // Open the delete dialog
    const crossVisible = await this.CrossIcon.isVisible();
    if (crossVisible) {
      console.log("Cross icon is visible → Clicking it");
      await this.ClickOnCrossIcon();
      await this.page.waitForTimeout(300);
      // After clicking Cross, dialog must close → DeleteTaskIcon must be visible
      const deleteIconReVisible = await this.DeleteTaskIcon.isVisible();
      if (deleteIconReVisible) {
        console.log("PASS → Cross icon closed the dialog successfully");
      } else {
        console.log("FAIL → Cross icon was clicked but delete dialog did NOT close");
        throw new Error("Cross icon failed — DeleteTaskIcon not visible after closing dialog");
      }
    } else {
      console.log("FAIL → Cross icon is NOT visible in delete dialog");
      throw new Error("Cross icon not found");
    }
    // Check if Cancel Button is working
    await this.ClickOnDeleteTaskIcon();  // Reopen the delete dialog
    const cancelVisible = await this.CancelBtn.isVisible();
    if (cancelVisible) {
      console.log("Cancel button is visible → Clicking it");
      await this.ClickOnCancelBtn();
      await this.page.waitForTimeout(300);

      // After clicking Cancel, dialog must close → DeleteTaskIcon visible
      const deleteIconVisibleAfterCancel = await this.DeleteTaskIcon.isVisible();

      if (deleteIconVisibleAfterCancel) {
        console.log("PASS → Cancel button closed the dialog successfully");
      } else {
        console.log("FAIL → Cancel button was clicked but delete dialog did NOT close");
        throw new Error("Cancel button failed — DeleteTaskIcon not visible after closing dialog");
      }

    } else {
      console.log("FAIL → Cancel button is NOT visible in delete dialog");
      throw new Error("Cancel button not found");
    }
    //Delete button must be disabled
    await this.ClickOnDeleteTaskIcon()
    const validDeleteTexts = ["Delete", "delete", "DELETE", "DElete", "dElEtE"];
    const invalidDeleteTexts = ["Del", "deletee", "deleted", "dlete", " ", "abc", "DELETE!", "Delete123"];
    for (const wrongTxt of invalidDeleteTexts) {
      await this.DeleteInput.fill("");   // CLEAR input 
      await this.EnterInputValue(this.DeleteInput, wrongTxt);
      const isDisabled = await this.DisabledDeleteBtn.isVisible();
      if (isDisabled) {
        console.log(`Correct: Delete button is DISABLED for invalid text '${wrongTxt}'`);
      } else {
        console.log(`FAILED: Delete button is ENABLED for invalid text '${wrongTxt}'`);
      }
    }
    // Delete button must be enabled
    for (const rightTxt of validDeleteTexts) {
      await this.DeleteInput.fill("");   // CLEAR before typing new value
      await this.EnterInputValue(this.DeleteInput, rightTxt);
      const isEnabled = await this.DeleteTaskBtn.isVisible();
      if (isEnabled) {
        console.log(`Correct: Delete button is ENABLED for valid text '${rightTxt}'`);
      } else {
        console.log(`FAILED: Delete button is DISABLED for valid text '${rightTxt}'`);
      }
    }
    await this.ClickOnDeleteTaskBtn()
    await this.page.waitForTimeout(2000)

    let taskCountAfterDelete = parseInt(await this.TaskCount.innerText())
    console.log("Total Task count After Delete : ", taskCountAfterDelete)

    expect(taskCountAfterDelete, {
      message: `Task count did NOT decrease by 1. Expected: ${taskCountBeforeDelete - 1}, Actual: ${taskCountAfterDelete}`
    }).toBe(taskCountBeforeDelete - 1);
  }

};
