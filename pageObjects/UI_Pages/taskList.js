const { test, expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const test_Data = require("../../test_Data/testData.json");
const randomFacilityNames =
  test_Data.RevflowData.TaskListPage.facilityOptions[
    Math.floor(
      Math.random() * test_Data.RevflowData.TaskListPage.facilityOptions.length
    )
  ];
const randomPayerNames =
  test_Data.RevflowData.TaskListPage.payenameList[
    Math.floor(
      Math.random() * test_Data.RevflowData.TaskListPage.payenameList.length
    )
  ];
require("dotenv").config();
let facilitiesDrodownValues;
exports.TaskListPage = class TaskListPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.filterBtn = page.locator("//span[normalize-space(text())='Filters']");
    this.dueDateDropDown = page.locator("(//mat-select[@role='combobox' ])[1]");
    this.taskStatusDropDown = page.locator(
      "(//mat-select[@role='combobox' ])[2]"
    );
    this.assignedToDropDown = page.locator(
      "(//mat-select[@role='combobox' ])[3]"
    );
    this.defaultOptionInDueDate = page.locator(
      "//arw-select-tree[@formcontrolname='operator']"
    );
    this.overdueCheckBox = page.locator("(//input[@type='checkbox'])[1]");
    this.todayCheckBox = page.locator("(//input[@type='checkbox'])[2]");
    this.defaultOptionInTaskStatus = page.locator(
      "//arw-select-tree[@formcontrolname='value']"
    );
    this.clearFilter = page.locator("//span[text()=' Clear Filter ']");
    this.selectResidentDropDown = page.locator(
      "//span[contains(text(),'Select Resident')]"
    );
    this.applyFilterBtn = page.locator(
      "//span[contains(text(),'Apply Filter')]"
    );
    this.clearAssignedToFilter = page.locator("(//arw-icon[@name='x'])[3]");
    this.deleteSortIcon = page.locator(
      "(//arw-button[@icon='trash03']//button[contains(@class,'arw-button--small arw-button--tertiary')])[1]"
    );
    this.deleteBalanceInSort = page.locator(
      "(//button[@class='arw-button arw-button--neutral arw-button--small arw-button--tertiary arw-button--icon-only'])[2]"
    );
    this.applySortButton = page.locator(
      "//span[text()=' Apply Sort ']/ancestor::arw-button"
    );
    this.residentHeader = page.locator(
      "//div[normalize-space(text()) = 'Resident']"
    );
    this.gridFilterIcon = page.locator(
      "(//div[normalize-space(text()) = 'Resident']//../../..//*[name()='svg'])[1]"
    );
    this.searchBoxInResidentFilterIcon = page.locator(
      "//input[@placeholder='Search']"
    );
    this.allCheckbox = page.locator("(//input[@type='checkbox'])[1]");
    this.applyButton = page.locator("//span[text()=' Apply ']");
    this.facilityNameBox = page.locator(
      "((//div[@data-column-definition-name='facility'])[2]//span)[2]"
    );
    this.residentNameBox = page.locator(
      "(//div[@data-column-definition-name='caseDetails'])[2]//a"
    );
    this.residentNameLink = page.locator(
      "(//div[@data-column-definition-name='caseDetails'])[2]//a"
    );
    this.viewAgingButton = page.locator("//arw-button[@category='secondary']");
    this.viewTaskListButton = page.locator(
      "//arw-button[@category='secondary']/following-sibling::arw-button"
    );
    this.visibleFacilityName = page.locator("//div[text()=' Achieve ']");
    this.visibleResidentName = page.locator("//span[text()='Wells, Eleanor']");
    this.appliedFilter1 = page.locator(
      "(//div[contains(@class,'web-body-1 text-foreground-high grow overflow-hidden')])[1]"
    );
    this.appliedFilter2 = page.locator(
      "(//div[contains(@class,'web-body-1 text-foreground-high grow overflow-hidden')])[2]"
    );
    this.downArrow = page.locator("//arw-icon[@name='arrowNarrowDown']");
    this.firstGroup = page.locator("//span[text()='Achieve']");
    this.filtersDropDown = page.locator(
      "//span[text()=' Filters ']/ancestor::arw-grid-header-filters"
    );
    this.firstFilter = page.locator("//div[@class='mat-mdc-select-value']");
    this.firstFilterInput = page.locator(
      "//div[@class='web-body-1 text-foreground-high grow overflow-hidden text-ellipsis whitespace-nowrap text-left ng-star-inserted']"
    );
    this.hoverOut = page.locator(
      "//div[contains(@class,'cdk-overlay-backdrop')]"
    );
    this.caseSearchInput = page.locator(
      "//input[@placeholder='Search for a Case']"
    );
    this.residentDob = page.locator(
      "(//span[text()='DOB'])[1]/following-sibling::span"
    );
    this.residentSSNNunber = page.locator(
      "(//span[text()='SSN'])[1]/following-sibling::span"
    );
    this.billingSystemId = page.locator(
      "(//span[text()='Billing System ID'])[1]/following-sibling::span"
    );
    this.billingSystemType = page.locator(
      "(//span[text()='Billing System ID'])[1]/following-sibling::div"
    );
    this.residentFacilityName = page.locator(
      "(//span[contains(@class, 'web-subtitle-1')])[1]/following-sibling::span"
    );
    this.caseViewResidentName = page.locator(
      "//span[contains(@class, 'web-title-2')]"
    );
    this.caseViewResidentFacility = page.locator(
      "//div[contains(@class, 'web-title-2')]"
    );
    this.caseViewBillingSystemId = page.locator(
      "(//arw-case-details//div[@class='arw-control arw-control--inline items-center'])[4]"
    );
    this.caseviewDob = page.locator(
      "(//div[contains(@class,'arw-control')])[9]"
    );
    this.caseViewSSNNumber = page.locator(
      "(//div[contains(@class,'arw-control')])[10]"
    );
    this.caseViewBillingSystemType = page.locator(
      "(//div[contains(@class, 'text-foreground-medium')])[2]"
    );
    this.residentNameInSearchList = page.locator(
      "//span[contains(@class,'web-subtitle-1')]//span"
    );
    this.clearCaseSearchBtn = page.locator("//arw-icon[@name='x']");
    this.residentOptionList = page.locator("(//div[@role='link'])[1]");
    this.globalFacilityDropdown = page.locator(
      "//button[contains(text(),'Selected Facilities')]"
    );
    this.selectAllBtn = page.locator("//label[contains(text(),'All')]");
    this.globalSearchInput = page.locator("//input[@placeholder='Search']");
    this.facilityCheckBox = page.locator("(//input[@type='checkbox'])[2]");
    this.globalFacilityfilterApplyBtn = page.locator(
      "//span[normalize-space(text())='Apply']"
    );
    this.addFilterBtn = page.locator(
      "//span[normalize-space(text())='Add Filter']"
    );
    this.addFilterDropdown = page.locator("//span[text()='Select']");
    this.selectFiltesrsOptions = (txt) =>
      page.locator(`(//div[normalize-space(text())='${txt}'])[2]`);
    this.taskNameSearchInput = page.locator("(//input)[2]");
    this.taskNameGidRow = page.locator(
      "//div[@data-column-definition-name='name']//a"
    );
    this.noTaskFound = page.locator("//div[text()='No tasks found']");
    this.customSortBtn = page.locator(
      "//span[normalize-space(text())='Custom Sort']"
    );
    this.clearFilterOnNoTaskFoundScreen = page.locator(
      "//span[text()='Clear filters']"
    );
    this.editFilterOnNoTaskFoundScreen = page.locator(
      "//span[text()='Edit Filters']"
    );
    this.selectFacilityFilterSubOptionsdropdown = (txt) =>
      page.locator(`//span[text()='${txt}']`);
    this.facilitydropdownOptions = page.locator(
      "//div[@class='px-12 flex items-center grow gap-8 overflow-hidden text-ellipsis whitespace-nowrap ng-star-inserted']//span"
    );
    this.addSortBtn = page.locator(
      "//span[normalize-space(text())='Add Sort']"
    );
    this.slectSortingFilterName = page.locator("(//span[text()='Select'])[1]");
    this.sortingOptionDropdown = page.locator("(//span[text()='Select'])[2]");
    this.selectSortingOption = (txt) =>
      page.locator(`//div[normalize-space(text())='${txt}']`);
    this.sortBtn = page.locator("//span[normalize-space(text())='Sort']");
    this.facilityGridColumns = page.locator(
      "//div[@data-column-definition-name='facility']//span"
    );
    this.residentGridColumns = page.locator(
      "//div[@data-column-definition-name='caseDetails']//a"
    );
    this.payerGridColumns = page.locator(
      "//div[@data-column-definition-name='payer']//span[contains(@class,'block overflow-hidden')]"
    );
    this.balanceGridColumn = page.locator(
      "//div[@data-column-definition-name='balance']//span[contains(@class,'block overflow-hidden')]"
    );
    this.balanceStatusGridColumn = page.locator(
      "//div[@data-column-definition-name='balanceStatusId']//span[contains(@class,'grow overflow-ellipsis')]"
    );
    this.taskStatusGridColumn = page.locator(
      "//div[@data-column-definition-name='taskStatusId']//span[contains(@class,'grow overflow-ellipsis')]"
    );
    this.assignedToGridColums = page.locator(
      "//div[@data-column-definition-name='assignedToUser']//span[contains(@class,'overflow-hidden')]"
    );
    this.rootsIssuesGridColumns = page.locator(
      "//div[@data-column-definition-name='issue']//span[contains(@class,'block overflow-hidden')]"
    );
    this.dueDateGridColums = page.locator(
      "//div[@data-column-definition-name='dueDate']//span[contains(@class,'block overflow-hidden')]"
    );
    this.facilityOptioncheckBox = (txt) =>
      page.locator(
        `//div[@class='overflow-hidden text-ellipsis whitespace-nowrap']//span[text()='${txt}']`
      );
    this.tasklistGridColumns = (txt) =>
      page.locator(
        `//div[@data-column-definition-name='${txt}']//span[contains(@class,'block overflow-hidden')]`
      );
    this.noMatchesFoundLabel = page.locator(
      "//label[normalize-space(text())='All (0 Matches)']"
    );
    this.dropdownOptionList = page.locator(
      "//div[@class='overflow-hidden text-ellipsis whitespace-nowrap']//span[contains(@class,'bg-complementary-blue')]"
    );
    this.balanceOptions = (txt) =>
      page.locator(`//div[normalize-space(text())='${txt}']`);
    this.betweenInputOne = page.locator("(//input[@type='number'])[1]");
    this.betweenInputTwo = page.locator("(//input[@type='number'])[2]");
    this.dueDateOptions = (txt) =>
      page.locator(`//span[normalize-space(text())='${txt}']`);
    this.dueDateDefaultValuePath = page.locator(
      "(//div[@class='mat-mdc-menu-content']/descendant::div[contains(@class,'whitespace-nowrap')])[2]"
    );
    this.defaultBalanceAndTaskStatusValuePath = page.locator(
      "(//div[@class='mat-mdc-menu-content']/descendant::div[contains(@class,'whitespace-nowrap')])[4]"
    );
    this.resetDefaultBtn = page.locator("//span[normalize-space(text())='Reset to Default']")
    this.selectFirstTask = page.locator("(//div[@data-column-definition-name='name']//a)[1]")
    this.taskNameInput = page.locator("//div[@class='relative flex h-full']//input");
    this.taskViewFacilityName = page.locator("//span[normalize-space(text())='Facility']/ancestor::div[contains(@class,'items-center')]")
    this.taskViewResidentName = page.locator("//span[normalize-space(text())='Resident']/ancestor::div[contains(@class,'items-center')]")
    this.taskViewPayerName = page.locator("//span[normalize-space(text())='Payer']/ancestor::div[contains(@class,'items-center')]");
    this.taskCloseBtn = page.locator("(//arw-button[@category='tertiary']//button[contains(@class,'arw-button--icon-only')])[2]")
    this.rootIssueSelectDrodown = page.locator("//arw-select[@formcontrolname='issueId']//div[@class='mat-mdc-select-trigger']");
    this.selectRootOption = page.locator("(//mat-option[@role='option'])[1]")
  }
  clickOnFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.filterBtn,
      "click",
      `Click on Filters Icon in Task List`
    );
  };
  clickOnTaskCloseBtn = async ()=>{
    await excuteSteps(
      this.test,
      this.taskCloseBtn,
      "click",
      "Click close button"
    )
  }
  clickOnRootIssueDropdown = async ()=>{
    await excuteSteps(
      this.test,
      this.rootIssueSelectDrodown,
      "click",
      "Click On rootIssue dropdown"
    )
  }
  selectRootIssueOptionFromDropdown = async()=>{
    await excuteSteps(
      this.test,
      this.selectRootOption,
      "click",
      "Select rootIssue option from the dropdown"
    )
  }
  clickOnTaskName = async () =>{
    await excuteSteps(
      this.test,
      this.selectFirstTask,
      "click",
      "Navigate to task view"
    )
  }
  clickOnClearFilterIcon = async () => {
    await excuteSteps(
      this.test,
      this.clearFilter,
      "click",
      `Click on Clear Filter Icon to Clear All Default Filters`
    );
  };
  clickOnClearAssignedToFilterIcon = async () => {
    await excuteSteps(
      this.test,
      this.clearAssignedToFilter,
      "click",
      `Click on clear filter 'X' icon on assignedTo filter`
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
  clickOnDeleteBalanceInSortIcon = async () => {
    await excuteSteps(
      this.test,
      this.deleteBalanceInSort,
      "click",
      `Click on trash/delete icon beside Balance option in Sort DropDown`
    );
  };
  clickOnApplySortButtonIcon = async () => {
    await excuteSteps(
      this.test,
      this.applySortButton,
      "click",
      `Click on Apply Sort Button below`
    );
  };
  hoverOverResidentHeaderIcon = async () => {
    await excuteSteps(
      this.test,
      this.residentHeader,
      "hover",
      `Hovering over Resident Filter icon`
    );
  };
  clickOnGridFilterIcon = async () => {
    await excuteSteps(
      this.test,
      this.gridFilterIcon,
      "click",
      `Click on Filter icon beside Resident`
    );
  };
  clickOnSelectResidentDropDownIcon = async () => {
    await excuteSteps(
      this.test,
      this.selectResidentDropDown,
      "click",
      `Click on Select Resident DropDown`
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
  fillSearchBoxInResidentFilterIcon = async (name) => {
    await excuteSteps(
      this.test,
      this.searchBoxInResidentFilterIcon,
      "fill",
      `Enter/fill Resident Name ${name}`,
      name
    );
  };
  clickOnAllCheckboxIcon = async () => {
    await excuteSteps(
      this.test,
      this.allCheckbox,
      "click",
      `Select All Checkbox`
    );
  };
  clickOnApplyButton = async () => {
    await excuteSteps(
      this.test,
      this.applyButton,
      "click",
      `Click on Apply Button below`
    );
  };
  clickOnResidentNameLink = async () => {
    await excuteSteps(
      this.test,
      this.residentNameLink,
      "click",
      `Click on Resident Name Link in Resident Column`
    );
  };
  clickOnViewTaskListButton = async () => {
    await excuteSteps(
      this.test,
      this.viewTaskListButton,
      "click",
      `Click on View Task List Button on the top right`
    );
  };
  clickOnResetDefaultBtn = async()=>{
    await excuteSteps(
      this.test,
      this.resetDefaultBtn,
      "click",
      "Click on reset default button"
    )
  }
  clickOnViewAgingButton = async () => {
    await excuteSteps(
      this.test,
      this.viewAgingButton,
      "click",
      `Click on View Aging Button`
    );
  };
  clickOnDownArrow = async () => {
    await excuteSteps(
      this.test,
      this.downArrow,
      "click",
      `Click on Down Arrow in AR Aging`
    );
  };
  verifyFirstGroupName = async () => {
    let nameOfFirstGroup = await this.firstGroup.innerText();
    expect(nameOfFirstGroup.split(" ")[0].trim()).toBe("Achieve");
  };
  clickOnFiltersDropDownInArAging = async () => {
    await excuteSteps(
      this.test,
      this.filtersDropDown,
      "click",
      `Click on Filters DropDown in AR Aging`
    );
  };
  searchCaseName = async (txt) => {
    await excuteSteps(
      this.test,
      this.caseSearchInput,
      "fill",
      `Search for a resident's name in case of search input`,
      txt
    );
  };
  clickOnClearcaseSearchBtn = async () => {
    await excuteSteps(
      this.test,
      this.clearCaseSearchBtn,
      "click",
      `Click on the Clear button to clear the search field`
    );
  };
  clickOnResidentOption = async () => {
    await excuteSteps(
      this.test,
      this.residentOptionList,
      "click",
      `Navigate to case view detials`
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
  clickOnCustomSortBtn = async () => {
    await excuteSteps(
      this.test,
      this.customSortBtn,
      "click",
      `Click on the custom sort button`
    );
  };
  selectSearchFacilityInDropdown = async () => {
    await excuteSteps(
      this.test,
      this.facilityCheckBox,
      "click",
      `Select a facility from the global facility dropdown`
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
  searchTaskName = async (txt) => {
    await excuteSteps(
      this.test,
      this.taskNameSearchInput,
      "fill",
      "Enter the filter name in the search input",
      txt
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
  selectFilterOptionsFromDropdown = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectFiltesrsOptions(txt),
      "click",
      `Select the desired filter from the dropdown list`
    );
  };
  selectFacilitySubOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectFacilityFilterSubOptionsdropdown(txt),
      "click",
      `Click on the dropdown to select a facility filter sub-option`
    );
  };
  searchSortName = async (txt) => {
    await excuteSteps(
      this.test,
      this.globalSearchInput,
      "fill",
      "Enter the sorting filter name in the search input.",
      txt
    );
  };
  clickOnAddSortBtn = async () => {
    await excuteSteps(
      this.test,
      this.addSortBtn,
      "click",
      "Click on the add sort button"
    );
  };
  clickOnSlectSortingFilterName = async () => {
    await excuteSteps(
      this.test,
      this.slectSortingFilterName,
      "click",
      "Click on the sorting filter name dropdown"
    );
  };
  clickOnSortingOptionDropdown = async () => {
    await excuteSteps(
      this.test,
      this.sortingOptionDropdown,
      "click",
      "Click on the sorting option dopdown"
    );
  };
  selectSortingOptionFromDropdown = async (txt) => {
    await excuteSteps(
      this.test,
      this.selectSortingOption(txt),
      "click",
      "Select the desired sorting option from the dropdown"
    );
  };
  clickOnSortBtn = async () => {
    await excuteSteps(
      this.test,
      this.sortBtn,
      "click",
      "Click on the sort button"
    );
  };
  clickOnBalanceOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.balanceOptions(txt),
      "click",
      "Select required option from the dropdown"
    );
  };
  fillBetweenbalanceInputOne = async (txt) => {
    await excuteSteps(
      this.test,
      this.betweenInputOne,
      "fill",
      "Enta data in input filed",
      txt
    );
  };
  fillBetweenbalanceInputTwo = async (txt) => {
    await excuteSteps(
      this.test,
      this.betweenInputTwo,
      "fill",
      "Enta data in input filed",
      txt
    );
  };
  clickOnDueDateOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.dueDateOptions(txt),
      "click",
      "Select due date option from the dropdown"
    );
  };
  verifyDefaultFiltersInTaskList = async () => {
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    const dueDateDropDown = await this.dueDateDropDown;
    const taskStatusDropDown = await this.taskStatusDropDown;
    await expect(dueDateDropDown).toBeVisible();
    await expect(taskStatusDropDown).toBeVisible();
    let defaultOptionInDueDate = await this.defaultOptionInDueDate.innerText();
    expect(defaultOptionInDueDate.trim()).toBe("Overdue, Today");
    let defaultOptionInTaskStatus =
      await this.defaultOptionInTaskStatus.innerText();
    expect(defaultOptionInTaskStatus.trim()).toBe("Not Started, In Progress");
  };
  verifyFacilityAndResidentName = async () => {
    await this.clickOnFilterBtn();
    await this.clickOnApplyFilterButton();
    let nameOfFacility = await this.facilityNameBox.innerText();
    let nameOfResident = await this.residentNameBox.innerText();
    // await this.hoverOutFromFilterDropDown();
    await this.clickOnResidentNameLink();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    let visibFacilityName = await this.visibleFacilityName.innerText();
    let visibResidentName = await this.visibleResidentName.innerText();
    expect(nameOfFacility.trim()).toBe(visibFacilityName.split("/")[0].trim());
    expect(nameOfResident.trim()).toBe(visibResidentName.trim());
  };
  verifyViewAgingAndViewTaskListButtonsAreVisible = async () => {
    const viewAgingBtn = await this.viewAgingButton;
    const viewTaskListBtn = await this.viewTaskListButton;
    await expect(
      viewAgingBtn,
      "Validating whether the 'View Aging' button is visible on the case view page"
    ).toBeVisible();
    await expect(
      viewTaskListBtn,
      "Validating whether the 'View TaskList' button is visible on the case view page"
    ).toBeVisible();
  };
  checkingTextOnAppliedFilters = async () => {
    await this.clickOnFilterBtn();
    let textOnFilter1 = await this.appliedFilter1.innerText();
    let textOnFilter2 = await this.appliedFilter2.innerText();
    await expect(
      textOnFilter1.trim(),
      "Verify the Resident filters is applied correctly on the View Task List page"
    ).toBe("Wells, Eleanor");
    await expect(
      textOnFilter2.trim(),
      "Verify the Facilty filters are applied correctly on the View Task List page"
    ).toBe("Achieve");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.page.keyboard.press("Escape");
  };
  verifyFirstFilterNameAndOption = async () => {
    let textOnFirstFilter = await this.firstFilter.innerText();
    await expect(
      textOnFirstFilter.trim(),
      "Verify that the Resident  filters is applied correctly on the View view aging page"
    ).toBe("Resident");
    let nameOnFirstFilterInput = await this.firstFilterInput.innerText();
    await expect(
      nameOnFirstFilterInput.trim(),
      "Verify that the Resident  filters is applied correctly on the View aging page"
    ).toBe("Wells, Eleanor");
  };
  hoverOutFromFilterDropDown = async () => {
    await excuteSteps(
      this.test,
      this.hoverOut,
      "click",
      `Click somewhere outside to come out of Filter Dropdown`
    );
  };
  clickChecbox = async (txt) => {
    await excuteSteps(
      this.test,
      this.facilityOptioncheckBox(txt),
      "click",
      "Select check box opetion"
    );
  };
  checkingFiltersForTrackerAccount = async () => {
    await this.clickOnFilterBtn();
    const dueDateDropDown = await this.dueDateDropDown;
    const taskStatusDropDown = await this.taskStatusDropDown;
    const assignedToDropDown = await this.assignedToDropDown;
    await expect(dueDateDropDown).toBeVisible();
    await expect(taskStatusDropDown).toBeVisible();
    await expect(assignedToDropDown).toBeVisible();
    await this.clickOnApplyFilterButton();
  };
  validateResidentAndFacilityFilters = async () => {
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteBalanceInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    // await this.verifyDefaultFiltersInTaskList();
    await this.clickOnClearFilterIcon();
    await this.hoverOverResidentHeaderIcon();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnGridFilterIcon();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSelectResidentDropDownIcon();
    await this.fillSearchBoxInResidentFilterIcon([
      test_Data.RevflowData.taskListData.resident,
    ]);
    await this.clickOnAllCheckboxIcon();
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.verifyFacilityAndResidentName();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.verifyViewAgingAndViewTaskListButtonsAreVisible();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnViewTaskListButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.checkingTextOnAppliedFilters();
  };
  validateFiltersInViewAging = async () => {
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    // await this.verifyDefaultFiltersInTaskList();
    await this.clickOnClearFilterIcon();
    await this.hoverOverResidentHeaderIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnGridFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSelectResidentDropDownIcon();
    await this.fillSearchBoxInResidentFilterIcon([
      test_Data.RevflowData.taskListData.resident,
    ]);
    await this.clickOnAllCheckboxIcon();
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.verifyFacilityAndResidentName();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.verifyViewAgingAndViewTaskListButtonsAreVisible();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnViewAgingButton();
    await this.clickOnDownArrow();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.verifyFirstGroupName();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnFiltersDropDownInArAging();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.verifyFirstFilterNameAndOption();
    await this.hoverOutFromFilterDropDown();
  };
  validateCaseDetailsUsingCaseSearch = async () => {
    await this.searchCaseName([
      test_Data.RevflowData.TaskListPage.residentName,
    ]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await expect(
      this.residentNameInSearchList,
      "Verify that the resident name is correctly displayed for the searched name"
    ).toHaveText([test_Data.RevflowData.TaskListPage.residentName]);
    let residentNameSearchList =
      await this.residentNameInSearchList.innerText();
    console.log("residentName==", residentNameSearchList);
    let getResidentfacility = await this.residentFacilityName.innerText();
    let residentFacility = getResidentfacility.split(" ")[0];
    console.log("facilityName==", residentFacility);
    let residentDoB = await this.residentDob.innerText();
    console.log("searchlistDOB==", residentDoB);
    let ssnNoForResident = await this.residentSSNNunber.innerText();
    console.log("SSNNoSearchlist==", ssnNoForResident);
    let billinsysNo = await this.billingSystemId.innerText();
    console.log("billinsysNoSearchlist==", billinsysNo);
    let billingsysType = await this.billingSystemType.innerText();
    console.log("billingsysTypeSearchlist==", billingsysType);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnResidentOption();
    await expect(
      this.caseViewResidentName,
      "Verify the resident name is displayed correctly on the case view screen"
    ).toHaveText(test_Data.RevflowData.TaskListPage.residentName);
    await expect(
      this.caseViewResidentFacility,
      "Verify the facility name is displayed correctly on the case view screen"
    ).toHaveText(residentFacility);
    let dob = await this.caseviewDob.innerText();
    let caseViewResidentDOB = dob.trim().replace("DOB", "").trim();
    console.log("CasedOB==", caseViewResidentDOB);
    let ssnNo = await this.caseViewSSNNumber.innerText();
    let caseviewResidentSSNNo = ssnNo.replace("SSN", "").trim();
    console.log("SSN==", caseviewResidentSSNNo);
    let getBillingsysID = await this.caseViewBillingSystemId.innerText();
    let caseviewResidentBillingSysId = getBillingsysID
      .replace("Billing System ID", "")
      .replace(billingsysType, "")
      .trim();
    console.log("Case-BillingsysNo==", caseviewResidentBillingSysId);
    await expect(
      caseViewResidentDOB,
      "Verify the DOB is displayed correctly on the case view screen"
    ).toBe(residentDoB);
    await expect(
      caseviewResidentSSNNo,
      "Verify the SSN number is displaying correctly on the case view screen"
    ).toBe(ssnNoForResident);
    await expect(
      caseviewResidentBillingSysId,
      "Verify the Billing systemID is displaying correctly on the case view screen"
    ).toBe(billinsysNo);
    await expect(
      this.caseViewBillingSystemType,
      "Verify the Billing System Type is correctly displaying on the case view screen"
    ).toHaveText(billingsysType);
  };
  validateResidentNameAndFacilityForSelectedCaseOnGlobalFacility = async () => {
    await this.clickOnGlobalSearchdropdown();
    await this.deselectAllFacilities();
    await this.searchGlobalFacilty([
      test_Data.RevflowData.TaskListPage.facilityname,
    ]);
    await this.selectSearchFacilityInDropdown();
    await this.clickOnGloabalFacilityApplyBtn();
    await this.searchCaseName([
      test_Data.RevflowData.taskListData.residentName,
    ]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    let getresidentFacility = await this.residentFacilityName.innerText();
    let residentFacility = getresidentFacility.replace("The ", "");
    await this.clickOnResidentOption();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    let caseResidentFacilityName =
      await this.caseViewResidentFacility.innerText();
    let facilityName = caseResidentFacilityName
      .replace(/[-–—]?\s*st\s*mary\b/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    console.log("Facility@==", facilityName);
    await expect(
      this.caseViewResidentName,
      "Verify the resident name is displayed correctly on the case view screen"
    ).toHaveText(test_Data.RevflowData.taskListData.residentName);
    await expect(
      facilityName,
      "Verify the facility name is displayed correctly on the case view screen"
    ).toBe(residentFacility);
  };
  varifyingTaskNameFilter = async () => {
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Task"]);
    await this.selectFilterOptionsFromDropdown(["Task"]);
    await this.searchTaskName(["DaliyTaskCreation"]);
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const noTasksMsgIsVisible = await this.noTaskFound.isVisible();
    if (noTasksMsgIsVisible) {
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible on the 'No Tasks Found' screen"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible on the 'No Tasks Found' screen."
      ).toBeVisible();
    } else {
      let count = await this.taskNameGidRow.count();
      for (let i = 0; i <= count; i++) {
        const row = this.taskNameGidRow.nth(i);
        await row.scrollIntoViewIfNeeded();
        await expect(row).toContainText("DaliyTaskCreation");
      }
    }
  };
  VerifyingFacilityFilter = async () => {
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Facility"]);
    await this.selectFilterOptionsFromDropdown("Facility");
    await this.selectFacilitySubOptions("Select Facilities");
    await this.searchTaskName([randomFacilityNames]);
    await this.page.keyboard.press("Enter");
    let checkBoxIsvisble = await this.facilityOptioncheckBox(
      randomFacilityNames
    ).isVisible();
    if (checkBoxIsvisble) {
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      let count = await this.tasklistGridColumns("facility").count();
      for (let i = 0; i <= count; i++) {
        const row = this.tasklistGridColumns("facility").nth(i);
        await row.scrollIntoViewIfNeeded();
        await expect(row).toContainText(randomFacilityNames);
      }
    } else {
      await expect(
        this.noMatchesFoundLabel,
        "Verify 0 Matches' message should be displayed when the searched facility is not available in the dropdown list"
      ).toBeVisible();
      await this.page.keyboard.press("Escape");
    }
  };
  //  verifyingPayerFilter = async () => {
  //   await this.clickOnFilterBtn();
  //   await this.clickOnClearFilterIcon();
  //   await this.test.step("The page is loading, please wait", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  //   });
  //   await this.clickOnFilterBtn();
  //   await this.clickOnAddFilterBtn();
  //   await this.clickOAddFilterDropdown();
  //   await this.searchFilterNames(["Payer"]);
  //   await this.selectFilterOptionsFromDropdown("Payer");
  //   await this.selectFacilitySubOptions("Select Payer");
  //   await this.searchTaskName(["Blue Cross"]);

  //   const checkBoxLocator = this.dropdownOptionList.innerText();
  //    await this.test.step("The page is loading, please wait", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.smallWait));
  //   });
  //   const isCheckBoxVisible = await checkBoxLocator.isVisible();
  //   const isNoMatchVisible = await this.noMatchesFoundLabel.isVisible();

  //   if (isCheckBoxVisible) {
  //     await this.clickChecbox("Blue Cross");
  //     await this.clickOnApplyButton();
  //     await this.clickOnApplyFilterButton();

  //     const count = await this.tasklistGridColumns("payer").count();
  //     for (let i = 0; i < count; i++) {
  //       const row = this.tasklistGridColumns("payer").nth(i);
  //       await row.scrollIntoViewIfNeeded();
  //       await expect(row).toContainText("Blue Cross");
  //     }

  //   } else if (!isCheckBoxVisible && !isNoMatchVisible) {
  //     // ✅ Partial match case (No exact match, but partial matches exist)
  //     console.log(`Payer was not found in the list (only partial matches shown)`);

  //   } else if (isNoMatchVisible) {
  //     // ✅ No results found at all
  //     await expect(
  //       this.noMatchesFoundLabel,
  //       "Verify '0 Matches' message should be displayed when searched payer is not available"
  //     ).toBeVisible();
  //     console.log(`No matches found — 0 Matches message displayed`);
  //   }
  // };
  verifyingPayerFilter = async () => {
    const searchPayer = "Blue Cross"; // The payer name you are searching
    const searchNormalized = searchPayer.trim().toLowerCase();

    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });

    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Payer"]);
    await this.selectFilterOptionsFromDropdown("Payer");
    await this.selectFacilitySubOptions("Select Payer");
    await this.searchTaskName([searchPayer]);

    await this.test.step("Wait for search results to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    const checkBoxLocator = this.dropdownOptionList;
    const allOptionsText = await checkBoxLocator.allInnerTexts();

    // ✅ Normalize text for exact and partial match check
    const cleanedOptions = allOptionsText.map((t) => t.trim());
    const cleanedNormalized = cleanedOptions.map((t) => t.toLowerCase());

    // ✅ Find exact and partial matches
    const exactMatchIndex = cleanedNormalized.findIndex(
      (t) => t === searchNormalized
    );
    const partialMatches = cleanedOptions.filter(
      (t, i) =>
        cleanedNormalized[i].includes(searchNormalized) && i !== exactMatchIndex
    );

    const isNoMatchVisible = await this.noMatchesFoundLabel.isVisible();

    if (exactMatchIndex !== -1) {
      // ✅ Exact match found
      await this.clickChecbox(searchPayer);
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();

      const count = await this.tasklistGridColumns("payer").count();
      for (let i = 0; i < count; i++) {
        const row = this.tasklistGridColumns("payer").nth(i);
        await row.scrollIntoViewIfNeeded();
        await expect(row).toContainText(searchPayer);
      }
    } else if (partialMatches.length > 0) {
      // ✅ Partial match found
      console.log(`Partial matches found: ${partialMatches.join(", ")}`);
      console.log(`Exact payer '${searchPayer}' was not found in the list`);
    } else if (isNoMatchVisible) {
      // ✅ No results at all
      await expect(
        this.noMatchesFoundLabel,
        "Verify '0 Matches' message should be displayed when searched payer is not available"
      ).toBeVisible();
      console.log(`No matches found — 0 Matches message displayed`);
    }
  };
  verifyingBalanceFilter = async () => {
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Between");
    await this.fillBetweenbalanceInputOne(["100"]),
      await this.fillBetweenbalanceInputTwo(["1000"]);
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const noTasksMsgIsVisible = await this.noTaskFound.isVisible();
    if (noTasksMsgIsVisible) {
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible on the 'No Tasks Found' screen"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible on the 'No Tasks Found' screen."
      ).toBeVisible();
    } else {
      let count = await this.tasklistGridColumns("balance").count();
      const minAmount = 100;
      const maxAmount = 1000;
      for (let i = 0; i <= count; i++) {
        const row = this.tasklistGridColumns("balance").nth(i);
        await row.scrollIntoViewIfNeeded();
        const balanceText = await row.innerText(); // get the balance text
        const balanceAmount = parseFloat(balanceText.replace(/[^0-9.-]+/g, "")); // convert to number
        // Assertion: check if balance is between min and max
        expect(
          balanceAmount,
          "Verifying that balance is between min and max"
        ).toBeGreaterThanOrEqual(minAmount);
        expect(
          balanceAmount,
          "Verifying that balance is between min and max"
        ).toBeLessThanOrEqual(maxAmount);
      }
    }
    //Equals
    const expectedAmount = 2000;
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Equals");
    await this.fillBetweenbalanceInputOne(["2000"]);
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let noFilterscreen = await this.noTaskFound.isVisible();
    if (noFilterscreen) {
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible on the 'No Tasks Found' screen"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible on the 'No Tasks Found' screen."
      ).toBeVisible();
    } else {
      let count = await this.tasklistGridColumns("balance").count();
      for (let i = 0; i <= count; i++) {
        const row = this.tasklistGridColumns("balance").nth(i);
        await row.scrollIntoViewIfNeeded();
        const balanceText = await row.innerText(); // get the balance text
        const balanceAmount = parseFloat(balanceText.replace(/[^0-9.-]+/g, "")); // convert to number
        // Assertion: check if balance equals expectedAmount
        expect(
          balanceAmount,
          "Verifying that balance equals expectedAmount"
        ).toBe(expectedAmount);
      }
    }
    //GreaterThan
    const minAmount = 2000;
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Greater than");
    await this.fillBetweenbalanceInputOne(["2000"]);
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let noFiltersscreen = await this.noTaskFound.isVisible();
    if (noFiltersscreen) {
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible on the 'No Tasks Found' screen"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible on the 'No Tasks Found' screen."
      ).toBeVisible();
    } else {
      let count = await this.tasklistGridColumns("balance").count();
      for (let i = 0; i <= count; i++) {
        const row = this.tasklistGridColumns("balance").nth(i);
        await row.scrollIntoViewIfNeeded();
        const balanceText = await row.innerText(); // get the balance text
        const balanceAmount = parseFloat(balanceText.replace(/[^0-9.-]+/g, "")); // convert to number
        // Assertion: check if balance is greater than minAmount
        expect(
          balanceAmount,
          "Verifying that balance is greater than minAmount"
        ).toBeGreaterThan(minAmount);
      }
    }
    //Lessthan
    const maxAmount = 2000;
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Less than");
    await this.fillBetweenbalanceInputOne(["2000"]);
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let noTaskFiltersscreen = await this.noTaskFound.isVisible();
    if (noTaskFiltersscreen) {
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible on the 'No Tasks Found' screen"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible on the 'No Tasks Found' screen."
      ).toBeVisible();
    } else {
      let count = await this.tasklistGridColumns("balance").count();
      for (let i = 0; i <= count; i++) {
        const row = this.tasklistGridColumns("balance").nth(i);
        await row.scrollIntoViewIfNeeded();
        const balanceText = await row.innerText(); // get the balance text
        const balanceAmount = parseFloat(balanceText.replace(/[^0-9.-]+/g, "")); // convert to number
        // Assertion: check if balance is less than maxAmount
        expect(
          balanceAmount,
          "Verifying that balance less than maxAmount"
        ).toBeLessThan(maxAmount);
      }
    }
  };
  verifyingDuedateFilter = async () => {
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions(["Select"]);
    await this.clickOnDueDateOptions([]);
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
  };
  // verifyingTaskNameSortingFunctionality = async () => {
  //   // Step 1: Clear existing sort/filter
  //   await this.clickOnCustomSortBtn();
  //   await this.clickOnDeleteDuedateInSortIcon();
  //   await this.clickOnDeleteDuedateInSortIcon();
  //   await this.clickOnApplySortButtonIcon();

  //   await this.clickOnFilterBtn();
  //   await this.clickOnClearFilterIcon();

  //   await this.test.step("Wait for grid to load", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
  //   });

  //   const taskgridRows = await this.taskNameGidRow;
  //   await expect(
  //     taskgridRows.first(),
  //     "TaskName row should be visible"
  //   ).toBeVisible();

  //   //  Apply Ascending (A → Z) Sort
  //   await this.clickOnSortBtn();
  //   await this.clickOnAddSortBtn();
  //   await this.clickOnSlectSortingFilterName();
  //   await this.searchSortName(["Task"]);
  //   await this.selectFilterOptionsFromDropdown(["Task"]);
  //   await this.clickOnSlectSortingFilterName();
  //   await this.selectSortingOptionFromDropdown("A → Z");
  //   await this.clickOnApplySortButtonIcon();

  //   await this.test.step("Wait for grid to load", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.mediumWait, 10));
  //   });

  //   //Ascending Values from UI
  //   const ascValues = (await taskgridRows.allTextContents()).map((v) =>
  //     v.trim()
  //   );
  //   console.log("Ascending Values:", ascValues);
  //   const normalizeString = (str) =>
  //     str
  //       ?.toLowerCase()
  //       .replace(/\s+/g, " ") // normalize spaces
  //       .trim();
  //   const naturalCompare = (a, b) => {
  //     const normalizedA = normalizeString(a);
  //     const normalizedB = normalizeString(b);
  //     return normalizedA.localeCompare(normalizedB, undefined, {
  //       numeric: true,
  //       sensitivity: "base",
  //     });
  //   };

  //   // Verify Ascending Order
  //   let isSortedAsc = true;
  //   for (let i = 1; i < ascValues.length; i++) {
  //     if (naturalCompare(ascValues[i - 1], ascValues[i]) > 0) {
  //       console.log(
  //         `Out of order (Ascending): "${ascValues[i - 1]}" > "${ascValues[i]}"`
  //       );
  //       isSortedAsc = false;
  //     }
  //   }
  //   expect(
  //     isSortedAsc,
  //     "AVerify that task names are displayed in ascending order when the ascending sort is applied."
  //   ).toBeTruthy();

  //   // 🟥 Step 5: Apply Descending (Z → A) Sort
  //   await this.clickOnSortBtn();
  //   await this.clickOnDeleteDuedateInSortIcon().catch(() => {});
  //   await this.clickOnApplySortButtonIcon();

  //   await this.test.step("Wait for grid to load", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
  //   });

  //   await this.clickOnSortBtn();
  //   await this.clickOnAddSortBtn();
  //   await this.clickOnSlectSortingFilterName();
  //   await this.searchSortName(["Task"]);
  //   await this.selectFilterOptionsFromDropdown(["Task"]);
  //   await this.clickOnSlectSortingFilterName();
  //   await this.selectSortingOptionFromDropdown("Z → A");
  //   await this.clickOnApplySortButtonIcon();
  //   await this.test.step("Wait for grid to load", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.mediumWait, 10));
  //   });
  //   // Step 6: Get Descending Values from UI
  //   const descValues = (await taskgridRows.allTextContents()).map((v) =>
  //     v.trim()
  //   );
  //   console.log("Descending Values:", descValues);

  //   // Step 7: Verify Descending Order
  //   let isSortedDesc = true;
  //   for (let i = 1; i < descValues.length; i++) {
  //     if (naturalCompare(descValues[i - 1], descValues[i]) < 0) {
  //       console.log(
  //         `Out of order (Descending): "${descValues[i - 1]}" < "${
  //           descValues[i]
  //         }"`
  //       );
  //       isSortedDesc = false;
  //     }
  //   }
  //   expect(
  //     isSortedDesc,
  //     "Verify that task names are displayed in descending order when the descending sort is applied."
  //   ).toBeTruthy();
  // };
  verifyingTaskNameSortingFunctionality = async () => {
    // Step 1: Clear existing sort/filter
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon().catch(() => {});
    await this.clickOnDeleteDuedateInSortIcon().catch(() => {});
    await this.clickOnApplySortButtonIcon();

    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
    });

    const taskgridRows = this.taskNameGidRow;
    await expect(
      taskgridRows.first(),
      "TaskName row should be visible"
    ).toBeVisible();

    // 🟩 Step 2: Apply Ascending (A → Z) Sort
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Task"]);
    await this.selectFilterOptionsFromDropdown(["Task"]);
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait, 10));
    });

    // 🟢 Step 3: Verify Ascending Order
    const ascValues = (await taskgridRows.allTextContents()).map((v) =>
      v.trim()
    );
    console.log("Ascending Values:", ascValues);

    // 🧩 Pure lexicographic (UI-style) comparison
    const normalizeString = (str) =>
      str?.toLowerCase().replace(/\s+/g, " ").trim();

    const sortedAsc = [...ascValues].sort((a, b) =>
      normalizeString(a).localeCompare(normalizeString(b))
    );

    let isSortedAsc = true;
    for (let i = 0; i < ascValues.length; i++) {
      if (ascValues[i] !== sortedAsc[i]) {
        console.log(
          `Out of order (Ascending): Expected "${sortedAsc[i]}" but found "${ascValues[i]}" at index ${i}`
        );
        isSortedAsc = false;
      }
    }

    expect(
      isSortedAsc,
      "Verify that task names are displayed in ascending order when ascending sort is applied."
    ).toBeTruthy();

    // 🟥 Step 4: Apply Descending (Z → A) Sort
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
    });

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Task"]);
    await this.selectFilterOptionsFromDropdown(["Task"]);
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait, 10));
    });

    // 🔻 Step 5: Verify Descending Order
    const descValues = (await taskgridRows.allTextContents()).map((v) =>
      v.trim()
    );
    console.log("Descending Values:", descValues);

    const sortedDesc = [...descValues]
      .sort((a, b) => normalizeString(a).localeCompare(normalizeString(b)))
      .reverse();

    let isSortedDesc = true;
    for (let i = 0; i < descValues.length; i++) {
      if (descValues[i] !== sortedDesc[i]) {
        console.log(
          `Out of order (Descending): Expected "${sortedDesc[i]}" but found "${descValues[i]}" at index ${i}`
        );
        isSortedDesc = false;
      }
    }

    expect(
      isSortedDesc,
      "Verify that task names are displayed in descending order when descending sort is applied."
    ).toBeTruthy();
  };

  verifyingFacilityColumnSortingFunctionality = async () => {
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Facility"]);
    await this.selectFilterOptionsFromDropdown("Facility");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.facilityGridColumns.allInnerTexts();
    console.log("facilities==", Ascitems);
    // For Ascending order check
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that facility names are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
    });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Facility"]);
    await this.selectFilterOptionsFromDropdown("Facility");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.facilityGridColumns.allInnerTexts();
    console.log("facilities==", Dscitems);
    // For Descending order check
    const sortedDesc = [...Dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      Dscitems,
      "Verifying that facility names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyResidentColumnSortingFunctionality = async () => {
    // Apply Ascending Sort
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Resident"]);
    await this.selectFilterOptionsFromDropdown("Resident");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });

    // ASC check
    const Ascitems = await this.residentGridColumns.allInnerTexts();
    const firstNames = Ascitems.map((name) => name.split(",")[1]?.trim());
    const sortedAscending = [...firstNames].sort((a, b) => a.localeCompare(b));

    // Verify ascending order
    expect(
      firstNames,
      "Verifying that resident names are visible in ascending order when ascending sort is applied"
    ).toEqual(sortedAscending);
    // Apply Descending Sort
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Resident"]);
    await this.selectFilterOptionsFromDropdown("Resident");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });

    // DESC check
    const Dscitems = await this.residentGridColumns.allInnerTexts();
    const descendingFirstNames = Dscitems.map((name) =>
      name.split(",")[1]?.trim()
    );
    const sortedDescending = [...descendingFirstNames].sort((a, b) =>
      b.localeCompare(a)
    );

    // Verify descending order
    expect(
      descendingFirstNames,
      "Verifying that resident names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDescending);
  };
  verifyPayerColumnSortingFunctionality = async () => {
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Payer"]);
    await this.selectFilterOptionsFromDropdown("Payer");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.payerGridColumns.allInnerTexts();
    console.log("payers==", Ascitems);
    // For Ascending order check
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that payers names are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Payer"]);
    await this.selectFilterOptionsFromDropdown("Payer");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.payerGridColumns.allInnerTexts();
    console.log("payers==", Dscitems);
    // For Descending order check
    const sortedDesc = [...Dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      Dscitems,
      "Verifying that payers names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyingBalanceColumnSortingFunctionality = async () => {
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Highest → Lowest");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    // Extract displayed balances after descending sort
    const highToLowItems = await this.balanceGridColumn.allInnerTexts();
    console.log("Balances Highest to Lowest:", highToLowItems);
    const highToLowNumbers = highToLowItems.map((str) =>
      Number(str.replace(/[^0-9.-]+/g, ""))
    );
    // Sort a copy descending
    const sortedDesc = [...highToLowNumbers].sort((a, b) => b - a);
    // Assert descending order
    expect(
      highToLowNumbers,
      "Verify balances sorted from highest to lowest"
    ).toEqual(sortedDesc);
    await this.test.step(
      "Wait for grid to load after descending check",
      async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      }
    );
    // Now apply "Lowest → Highest" sort
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Lowest → Highest");
    await this.clickOnApplySortButtonIcon();
    await this.test.step(
      "Wait for grid to load after ascending sort",
      async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
      }
    );
    // Extract balances after ascending sort
    const lowToHighItems = await this.balanceGridColumn.allInnerTexts();
    console.log("Balances Lowest to Highest:", lowToHighItems);
    const lowToHighNumbers = lowToHighItems.map((str) =>
      Number(str.replace(/[^0-9.-]+/g, ""))
    );
    const sortedAsc = [...lowToHighNumbers].sort((a, b) => a - b);
    expect(
      lowToHighNumbers,
      "Verify balances sorted from lowest to highest"
    ).toEqual(sortedAsc);
  };

  verifyingBalanceStatusSortingFunctionality = async () => {
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Balance Status"]);
    await this.selectFilterOptionsFromDropdown("Balance Status");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.balanceStatusGridColumn.allInnerTexts();
    console.log("balanceStatus==", Ascitems);
    // For Ascending order check
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that balance status are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Balance Status"]);
    await this.selectFilterOptionsFromDropdown("Balance Status");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.balanceStatusGridColumn.allInnerTexts();
    console.log("balancestatus==", Dscitems);
    // For Descending order check
    const sortedDesc = [...Dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      Dscitems,
      "Verifying that balance status are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyingTaskStatusSortingFunctionality = async () => {
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Task Status"]);
    await this.selectFilterOptionsFromDropdown("Task Status");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.taskStatusGridColumn.allInnerTexts();
    console.log("taskStatus==", Ascitems);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    // For Ascending order check
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that task status are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Task Status"]);
    await this.selectFilterOptionsFromDropdown("Task Status");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.taskStatusGridColumn.allInnerTexts();
    console.log("taskStatus==", Dscitems);
    // For Descending order check
    const sortedDesc = [...Dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      Dscitems,
      "Verifying that task status are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyingAssignedToSortingFunctionality = async () => {
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Assigned To"]);
    await this.selectFilterOptionsFromDropdown("Assigned To");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.assignedToGridColums.allInnerTexts();
    console.log("assignedTo==", Ascitems);
    // For Ascending order check
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that assigned To users are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Assigned To"]);
    await this.selectFilterOptionsFromDropdown("Assigned To");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.assignedToGridColums.allInnerTexts();
    console.log("assignedTo==", Dscitems);
    // For Descending order check
    const sortedDesc = [...Dscitems].sort((a, b) =>
      b.toLowerCase().localeCompare(a.toLowerCase())
    );
    expect(
      Dscitems,
      "Verifying that Assigned To users are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyingRootIssuesSortingFunctionality = async () => {
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Root Issue"]);
    await this.selectFilterOptionsFromDropdown("Root Issue");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.rootsIssuesGridColumns.allInnerTexts();
    console.log("rootIssue==", Ascitems);
    // For Ascending order check
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that root issues visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Root Issue"]);
    await this.selectFilterOptionsFromDropdown("Root Issue");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Z → A");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.rootsIssuesGridColumns.allInnerTexts();
    console.log("rootIssue==", Dscitems);
    // For Descending order check
    const sortedDesc = [...Dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      Dscitems,
      "Verifying that roots Issues are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyingDuedateSortingFunctionality = async () => {
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Due Date"]);
    await this.selectFilterOptionsFromDropdown("Due Date");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Newest → Oldest");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.dueDateGridColums.allInnerTexts();
    const dates = Dscitems.map((text) => new Date(text.trim()));
    const sortedDesc = [...dates].sort((a, b) => b - a);
    const isDescending = dates.every(
      (val, i) => i === 0 || val <= dates[i - 1]
    );
    expect(
      isDescending,
      "Verify that due dates are sorted from newest to oldest when the 'Newest to Oldest' sort is applied"
    ).toBeTruthy();
    await this.clickOnSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Due Date"]);
    await this.selectFilterOptionsFromDropdown("Due Date");
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("Oldest → Newest");
    await this.clickOnApplySortButtonIcon();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.dueDateGridColums.allInnerTexts();
    const dueDates = Ascitems.map((text) => new Date(text.trim()));

    // --- Validation for Ascending (Oldest to Newest) ---
    const sortedAsc = [...dueDates].sort((a, b) => a - b);
    const isAscending = dueDates.every(
      (val, i) => i === 0 || val >= dueDates[i - 1]
    );
    expect(
      isAscending,
      "Verify that due dates are sorted from oldest to newest when the 'Oldest to Newest' sort is applied"
    ).toBeTruthy();
  };
  verifyingResetToDefaultsOnTaskList = async () => {
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.clickOnSortBtn();
    await expect(
      this.addSortBtn,
      "Verifying the 'Add Sort' button is visible on the custom sort filter after resetting to defaults"
    ).toBeVisible();
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await expect(
      this.addFilterBtn,
      "Verifying the 'Add Sort' button is visible on the custom sort filter"
    ).toBeVisible();
      await this.page.keyboard.press("Escape");
    await this.clickOnResetDefaultBtn()
     await this.clickOnCustomSortBtn();
     await expect(this.dueDateDefaultValuePath,"Verify the default 'Due Date' sort  is visible in the custom sort dropdown after resetting to defaults").toHaveText(test_Data.RevflowData.taskListData.dueDateDefaultSortData);
     await expect(this.defaultBalanceAndTaskStatusValuePath,"Verifying default balance sort is displaying on custom sort dropdown after resetting to defaults").toHaveText(test_Data.RevflowData.taskListData.balanceDefaultSortData);
       await this.page.keyboard.press("Escape");
     await this.clickOnFilterBtn();
     await expect(this.dueDateDefaultValuePath,"Verify the default 'Due Date' filter is visible in the filter dropdown after resetting to defaults").toHaveText(test_Data.RevflowData.taskListData.dueDateDefaultFilterData);
     await expect(this.defaultBalanceAndTaskStatusValuePath,"Verifying the default 'TaskStatus' filter is visible in the filter dropdown after resetting to defaults").toHaveText(test_Data.RevflowData.taskListData.taskStatusDefaultFilterData);
       await this.page.keyboard.press("Escape");
  };
  verifyingTasklistOpensSlideOutAndUpdatingAnyFieldRefreshesTasklistGrid = async ()=>{
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnTaskName();
    let facilityName = await this.taskViewFacilityName.innerText();
    let facility = facilityName.replace(/^Facility\s*/i, "");
    let residentName = await this.taskViewResidentName.innerText();
    let resident =residentName.replace(/^Resident\s*/i, "");
    let payerName = await this.taskViewPayerName.innerText();
    let payer = payerName.replace(/^Payer\s*/i, "");
    console.log("FacilityName ==",facility);
    console.log("ResidentName ==",resident);
    console.log("payerName==",payer);
   await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnRootIssueDropdown();
    let rootIssue = await this.selectRootOption.innerText();
    console.log("rootIssue==",rootIssue)
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.selectRootIssueOptionFromDropdown();
    await this.clickOnTaskCloseBtn()
     await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Facility"]);
    await this.selectFilterOptionsFromDropdown("Facility");
    await this.selectFacilitySubOptions("Select Facilities");
    await this.searchTaskName([facility]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Resident"]);
    await this.selectFilterOptionsFromDropdown("Resident");
    await this.selectFacilitySubOptions("Select Resident");
    await this.searchTaskName([resident]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Payer"]);
    await this.selectFilterOptionsFromDropdown("Payer");
    await this.selectFacilitySubOptions("Select Payer");
    await this.searchTaskName([payer]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await expect().toHaveText(rootIssue)
  }
};
