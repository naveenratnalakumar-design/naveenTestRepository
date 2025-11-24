const { test, expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const test_Data = require("../../test_Data/testData.json");
require("dotenv").config();
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
const randomBalanceStatus =
  test_Data.RevflowData.TaskListPage.balanceStatus[
    Math.floor(
      Math.random() * test_Data.RevflowData.TaskListPage.balanceStatus.length
    )
  ];
const randomTaskStatus =
  test_Data.RevflowData.taskStatusOptions[
    Math.floor(Math.random() * test_Data.RevflowData.taskStatusOptions.length)
  ];
const randomResidentNames =
  test_Data.RevflowData.TaskListPage.residentOptions[
    Math.floor(
      Math.random() * test_Data.RevflowData.TaskListPage.residentOptions.length
    )
  ];
const randomAssignedUsers =
  test_Data.RevflowData.TaskListPage.assignedToUserOptions[
    Math.floor(
      Math.random() *
        test_Data.RevflowData.TaskListPage.assignedToUserOptions.length
    )
  ];
const randomRootIssues =
  test_Data.RevflowData.TaskListPage.rootIssuesList[
    Math.floor(
      Math.random() * test_Data.RevflowData.TaskListPage.rootIssuesList.length
    )
  ];
// Pad single digits
const pad2 = (n) => String(n).padStart(2, "0");

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
    this.disableModeClearbtn = page.locator(
      "//div[text()='Filter by']/following-sibling::arw-button[@category='tertiary']//button"
    );
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
      "//arw-select-tree//button[@aria-haspopup='menu']//div[contains(@class,'arw-select-tree__value')]"
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
    this.residentOptionList = page.locator("(//div[@role='link']//span[contains(@class,'text-foreground-blue')])[1]");
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
    this.resetDefaultBtn = page.locator(
      "//span[normalize-space(text())='Reset to Default']"
    );
    this.selectFirstTask = page.locator(
      "(//div[@data-column-definition-name='name']//a)[1]"
    );
    this.taskNameInput = page.locator(
      "//div[@class='relative flex h-full']//input"
    );
    this.taskViewFacilityName = page.locator(
      "//span[normalize-space(text())='Facility']/ancestor::div[contains(@class,'items-center')]"
    );
    this.taskNameInputFiled = page.locator(
      "//arw-input[@formcontrolname='name']//input"
    );
    this.taskViewResidentName = page.locator(
      "//span[normalize-space(text())='Resident']/ancestor::div[contains(@class,'items-center')]"
    );
    this.taskViewPayerName = page.locator(
      "//span[normalize-space(text())='Payer']/ancestor::div[contains(@class,'items-center')]"
    );
    this.taskCloseBtn = page.locator(
      "(//arw-button[@category='tertiary']//button[contains(@class,'arw-button--icon-only')])[3]"
    );
    this.rootIssueSelectDrodown = page.locator(
      "//arw-select[@formcontrolname='issueId']//div[@class='mat-mdc-select-trigger']"
    );
    this.selectRootOption = page.locator("(//mat-option[@role='option'])[1]");
    this.customRangeStartDateInput = page.locator(
      "(//div[@class='mat-date-range-input-container']//input)[1]"
    );
    this.customRangeEndDateInput = page.locator(
      "(//div[@class='mat-date-range-input-container']//input)[2]"
    );
    this.taskStatusDropdownOptions = (txt) =>
      page.locator(
        `//div[@class='overflow-hidden text-ellipsis whitespace-nowrap']//span[normalize-space(text())='${txt}']`
      );
    this.pickPayerName = (txt) =>
      page.locator(
        `(//div[contains(@class,'overflow-hidden text-ellipsis whitespace-nowrap')]/descendant::span[normalize-space(text())='${txt}'])[1]`
      );
    this.filtersDropdownListCount = page.locator(
      "(//label[@class='mdc-label'])[1]"
    );
    this.activityTab = page.locator(
      "//span[normalize-space(text())='Activity']"
    );
    this.closeBtn = page.locator("//arw-icon[@name='x']");
    this.dueDateInput = page.locator("//input[@placeholder='mm/dd/yyyy']");
    this.daysBtn = (txt) =>
      page.locator(`//span[normalize-space(text())='${txt}']/ancestor::button`);
    this.pickDuedate = (txt) =>
      page.locator(`//span[normalize-space(text())='${txt}']`);
    this.filterCountlabel = page.locator(
      "//span[normalize-space(text())='Filters']//span"
    );
  }
  clickOnFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.filterBtn,
      "click",
      `Click on Filters Icon in Task List`
    );
  };
  selectDuedate = async (txt) => {
    await excuteSteps(
      this.test,
      this.pickDuedate(txt),
      "click",
      "Select the due date from the calendar"
    );
  };
  clickOnDuedateFiled = async () => {
    await excuteSteps(
      this.test,
      this.dueDateInput,
      "click",
      "Click on due date input"
    );
  };
  clickOnCloseBtn = async () => {
    await excuteSteps(this.test, this.closeBtn, "click", "Click on close Icon");
  };
  clickOnActivityTab = async () => {
    await excuteSteps(
      this.test,
      this.activityTab,
      "click",
      "Navigate to Activity section"
    );
  };
  clickOnTaskCloseBtn = async () => {
    await excuteSteps(
      this.test,
      this.taskCloseBtn,
      "click",
      "Click close button"
    );
  };
  selectTasstatusOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.taskStatusDropdownOptions(txt),
      "click",
      "Select task status dropdown Options"
    );
  };
  enterCustomsStartDate = async (txt) => {
    await excuteSteps(
      this.test,
      this.customRangeStartDateInput,
      "fill",
      "Enter the start date for the custom date range",
      txt
    );
  };
  enterCustomsEndDate = async (txt) => {
    await excuteSteps(
      this.test,
      this.customRangeEndDateInput,
      "fill",
      "Enter the end date for the custom date range",
      txt
    );
  };
  clickOnRootIssueDropdown = async () => {
    await excuteSteps(
      this.test,
      this.rootIssueSelectDrodown,
      "click",
      "Click On rootIssue dropdown"
    );
  };
  selectRootIssueOptionFromDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectRootOption,
      "click",
      "Select rootIssue option from the dropdown"
    );
  };
  clickOnTaskName = async () => {
    await excuteSteps(
      this.test,
      this.selectFirstTask,
      "click",
      "Navigate to task view"
    );
  };
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
  clickOnResetDefaultBtn = async () => {
    await excuteSteps(
      this.test,
      this.resetDefaultBtn,
      "click",
      "Click on reset default button"
    );
  };
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
  selectAllFacilities = async () => {
    await excuteSteps(
      this.test,
      this.selectAllBtn,
      "click",
      `Select all facilities in the global facility dropdown`
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
        break;
      }
    }
  };
  VerifyingFacilityFilter = async () => {
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Facility"]);
    await this.selectFilterOptionsFromDropdown("Facility");
    await this.selectFacilitySubOptions("Select Facilities");
    await this.searchTaskName([randomFacilityNames]);
    await this.page.keyboard.press("Enter");

    let checkBoxIsVisible = await this.facilityOptioncheckBox(
      randomFacilityNames
    ).isVisible();

    let noMatchVisible = await this.noMatchesFoundLabel.isVisible();
    if (checkBoxIsVisible) {
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      const noTasksScreenVisible =
        await this.clearFilterOnNoTaskFoundScreen.isVisible();

      if (noTasksScreenVisible) {
        await expect(
          this.clearFilterOnNoTaskFoundScreen,
          "Clear Filter button should be visible on 'No Tasks Found' screen"
        ).toBeVisible();
        await expect(
          this.editFilterOnNoTaskFoundScreen,
          "Edit Filter button should be visible on 'No Tasks Found' screen"
        ).toBeVisible();

        return;
      }
      let count = await this.tasklistGridColumns("facility").count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const row = this.tasklistGridColumns("facility").nth(i);
          await row.scrollIntoViewIfNeeded();
          await expect(row).toContainText(randomFacilityNames);
          break;
        }
      }
    } else if (noMatchVisible) {
      await expect(
        this.noMatchesFoundLabel,
        "Verify 0 Matches message should be displayed when the searched facility is not available"
      ).toBeVisible();
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      await this.page.keyboard.press("Escape");
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnApplyFilterButton();
    }
    // else {
    //   await expect(
    //     this.clearFilterOnNoTaskFoundScreen,
    //     "Clear Filter button should be visible on 'No Tasks Found' screen"
    //   ).toBeVisible();
    //   await expect(
    //     this.editFilterOnNoTaskFoundScreen,
    //     "Edit Filter button should be visible on 'No Tasks Found' screen"
    //   ).toBeVisible();
    // }
  };
  verifyingPayerFilter = async () => {
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Payer"]);
    await this.selectFilterOptionsFromDropdown("Payer");
    await this.selectFacilitySubOptions("Select Payer");
    await this.searchTaskName([randomPayerNames]);
    await this.test.step("Wait for dropdown search results", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const exactPayerLocator = this.page.locator(
      `//span[normalize-space(.)='${randomPayerNames}']`
    );
    const exactMatchVisible = await exactPayerLocator.isVisible();
    const noMatchVisible = await this.noMatchesFoundLabel.isVisible();

    if (exactMatchVisible) {
      await this.test.step("Select exact payer name", async () => {
        await exactPayerLocator.click();
      });
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      await this.test.step("Wait for dropdown search results", async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      });
      const count = await this.payerGridColumns.count();
      if (count === 0) {
        throw new Error(
          `Payer filter applied but grid returned 0 rows for "${randomPayerNames}"`
        );
      }
      for (let i = 0; i < count; i++) {
        const row = this.payerGridColumns.nth(i);
        await row.scrollIntoViewIfNeeded();

        await expect(
          row,
          `Grid row does NOT match applied payer filter: "${randomPayerNames}"`
        ).toHaveText(randomPayerNames);

        break;
      }
    } else if (noMatchVisible) {
      await expect(
        this.noMatchesFoundLabel,
        "Expected 'No matches found' when payer not available"
      ).toBeVisible();
      await this.test.step("Close filter dropdown & clear", async () => {
        await this.page.keyboard.press("Escape");
        await this.clickOnDeleteDuedateInSortIcon();
        await this.clickOnApplyFilterButton();
      });
    } else {
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible"
      ).toBeVisible();
    }
  };

  // verifyingAssignedToFilter = async () => {
  //    let randomAssignedUsers = "Vlad Savkin";
  //   await this.clickOnFilterBtn();
  //   let isClearDisabled = await this.disableModeClearbtn.isDisabled();
  //   if (!isClearDisabled) {
  //     await this.clickOnClearFilterIcon();
  //     await this.test.step("The page is loading, please wait", async () => {
  //       await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  //     });
  //   }
  //   await this.page.keyboard.press("Escape");
  //   await this.clickOnFilterBtn();
  //   await this.clickOnAddFilterBtn();
  //   await this.clickOAddFilterDropdown();
  //   await this.searchFilterNames(["Assigned To"]);
  //   await this.selectFilterOptionsFromDropdown("Assigned To");
  //   await this.selectFacilitySubOptions("Select Assigned To");
  //   await this.searchTaskName([randomAssignedUsers]);

  //   await this.test.step("Wait for search results to load", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.smallWait));
  //   });
  //   let checkBoxIsVisible = await this.facilityOptioncheckBox(
  //     randomAssignedUsers
  //   )
  //     .isVisible();
  //   let noMatchVisible = await this.noMatchesFoundLabel.isVisible();
  //   if (checkBoxIsVisible) {
  //     await this.page.keyboard.press("Enter");
  //     await this.clickOnApplyButton();
  //     await this.clickOnApplyFilterButton();
  //     const count = await this.assignedToGridColums.count();
  //     for (let i = 0; i < count; i++) {
  //       const row = this.assignedToGridColums.nth(i);
  //       await row.scrollIntoViewIfNeeded();
  //       await expect(
  //         row,
  //         "Verifying the applied AssignedTo filter name is displayed on the task list grid"
  //       ).toHaveText(randomAssignedUsers);
  //       break;
  //     }
  //   } else if (noMatchVisible) {
  //     await expect(
  //       this.noMatchesFoundLabel,
  //       "Verify 'No matches found' message should be displayed when the searched assignedTo user is not available in the dropdown list"
  //     ).toBeVisible();
  // await this.test.step("The page is loading, please wait", async () => {
  //   await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  // });
  //     await this.test.step("Close filter dropdown", async () => {
  //       await this.page.keyboard.press("Escape");
  //       await this.clickOnDeleteDuedateInSortIcon();
  //       await this.clickOnApplyFilterButton();
  //     });
  //   } else {
  //     await expect(
  //       this.clearFilterOnNoTaskFoundScreen,
  //       "Clear Filter button should be visible on the 'No Tasks Found' screen"
  //     ).toBeVisible();
  //     await expect(
  //       this.editFilterOnNoTaskFoundScreen,
  //       "Edit Filter button should be visible on the 'No Tasks Found' screen."
  //     ).toBeVisible();
  //   }
  // };

  verifyingAssignedToFilter = async () => {
    const randomAssignedUsers = "Vlad Savkin";

    await this.clickOnFilterBtn();
    const isClearDisabled = await this.disableModeClearbtn.isDisabled();

    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }

    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Assigned To"]);
    await this.selectFilterOptionsFromDropdown("Assigned To");
    await this.selectFacilitySubOptions("Select Assigned To");
    await this.searchTaskName([randomAssignedUsers]);

    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    const checkbox = this.facilityOptioncheckBox(randomAssignedUsers);
    const checkBoxIsVisible = await checkbox.isVisible();
    const noMatchVisible = await this.noMatchesFoundLabel.isVisible();

    if (checkBoxIsVisible) {
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      const noTasksScreenVisible =
        await this.editFilterOnNoTaskFoundScreen.isVisible();

      if (noTasksScreenVisible) {
        await expect(
          this.clearFilterOnNoTaskFoundScreen,
          "Clear Filter button should be visible on 'No Tasks Found' screen"
        ).toBeVisible();
        await expect(
          this.editFilterOnNoTaskFoundScreen,
          "Edit Filter button should be visible on 'No Tasks Found' screen"
        ).toBeVisible();

        return;
      }
      const count = await this.assignedToGridColums.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const row = this.assignedToGridColums.nth(i);
          await row.scrollIntoViewIfNeeded();
          await expect(
            row,
            "Verify that the selected username is displayed on the task list grid"
          ).toContainText(randomAssignedUsers);
          break;
        }
      }
    } else if (noMatchVisible) {
      await expect(
        this.noMatchesFoundLabel,
        "Verify 0 Matches message should be displayed when the searched facility is not available"
      ).toBeVisible();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      });
      await this.page.keyboard.press("Escape");
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnApplyFilterButton();
    }
  };

  verifyingRootIssueFilter = async () => {
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Root Issue"]);
    await this.selectFilterOptionsFromDropdown("Root Issue");
    await this.selectFacilitySubOptions("Select Root Issue");
    await this.searchTaskName([randomRootIssues]);

    await this.test.step("Wait for search results to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    let checkBoxIsVisible = await this.facilityOptioncheckBox(
      randomRootIssues
    ).isVisible();
    let noMatchVisible = await this.noMatchesFoundLabel.isVisible();
    if (checkBoxIsVisible) {
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      const count = await this.rootsIssuesGridColumns.count();
      for (let i = 0; i < count; i++) {
        const row = this.rootsIssuesGridColumns.nth(i);
        await row.scrollIntoViewIfNeeded();
        await expect(
          row,
          "Verifying the applied rootIssue filter name is displayed on the task list grid"
        ).toHaveText(randomAssignedUsers);
        break;
      }
    } else if (noMatchVisible) {
      await expect(
        this.noMatchesFoundLabel,
        "Verify 'No matches found' message should be displayed when the searched root issue is not available in the dropdown list"
      ).toBeVisible();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      await this.test.step("Close filter dropdown", async () => {
        await this.page.keyboard.press("Escape");
        await this.clickOnDeleteDuedateInSortIcon();
        await this.clickOnApplyFilterButton();
      });
    } else {
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible on the 'No Tasks Found' screen"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible on the 'No Tasks Found' screen."
      ).toBeVisible();
    }
  };
  verifyingBalanceFilter = async () => {
    // Handles normal + accounting style negative values "(200.00)"
    const parseBalance = (text) => {
      const clean = text.replace(/[^0-9.()\-]/g, "").trim();

      // Accounting format negative value: (200.00)
      if (clean.startsWith("(") && clean.endsWith(")")) {
        return -parseFloat(clean.replace(/[()]/g, ""));
      }

      return parseFloat(clean);
    };

    const safeScroll = async (locator) => {
      try {
        const isVisible = await locator.isVisible({ timeout: 2000 });
        if (isVisible) {
          await locator.scrollIntoViewIfNeeded({ timeout: 3000 });
        }
      } catch (e) {
        console.warn("Scroll skipped or element not visible:", e.message);
      }
    };

    // Centralized assertion logic with negative number support
    const assertBalanceRange = async (min, max, condition) => {
      const count = await this.tasklistGridColumns("balance").count();
      console.log(`Rows found for ${condition}:`, count);

      for (let i = 0; i < count; i++) {
        const row = this.tasklistGridColumns("balance").nth(i);
        await safeScroll(row);

        const balanceText = await row.innerText();
        const balanceAmount = parseBalance(balanceText);

        console.log(`Parsed Value: ${balanceAmount} from "${balanceText}"`);

        if (condition === "between") {
          expect(balanceAmount).toBeGreaterThanOrEqual(min);
          expect(balanceAmount).toBeLessThanOrEqual(max);
        } else if (condition === "equals") {
          expect(balanceAmount).toBe(expectedAmount);
        } else if (condition === "greater") {
          expect(balanceAmount).toBeGreaterThan(min);
        } else if (condition === "less") {
          expect(balanceAmount).toBeLessThan(max);
        }

        // Extra validation for overpayment values (negative)
        if (balanceAmount < 0) {
          console.log("Overpayment detected (negative formatted value).");
          expect(balanceAmount).toBeLessThan(0);
        }
        break;
      }
    };

    // ---------------- Between ----------------
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Between");
    await this.fillBetweenbalanceInputOne(["100"]);
    await this.fillBetweenbalanceInputTwo(["1000"]);
    await this.clickOnApplyFilterButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    if (await this.noTaskFound.isVisible()) {
      await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
      await expect(this.editFilterOnNoTaskFoundScreen).toBeVisible();
    } else {
      await assertBalanceRange(100, 1000, "between");
    }

    // ---------------- Equals ----------------
    const expectedAmount = 2000;
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Equals");
    await this.fillBetweenbalanceInputOne(["2000"]);
    await this.clickOnApplyFilterButton();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));

    if (await this.noTaskFound.isVisible()) {
      await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
      await expect(this.editFilterOnNoTaskFoundScreen).toBeVisible();
    } else {
      await assertBalanceRange(expectedAmount, null, "equals");
    }

    // ---------------- Greater Than ----------------
    const minAmount = 2000;
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Greater than");
    await this.fillBetweenbalanceInputOne(["2000"]);
    await this.clickOnApplyFilterButton();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));

    if (await this.noTaskFound.isVisible()) {
      await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
      await expect(this.editFilterOnNoTaskFoundScreen).toBeVisible();
    } else {
      await assertBalanceRange(minAmount, null, "greater");
    }

    // ---------------- Less Than ----------------
    const maxAmount = 2000;
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance"]);
    await this.selectFilterOptionsFromDropdown("Balance");
    await this.selectFacilitySubOptions("Conditional");
    await this.clickOnBalanceOptions("Less than");
    await this.fillBetweenbalanceInputOne(["2000"]);
    await this.clickOnApplyFilterButton();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));

    if (await this.noTaskFound.isVisible()) {
      await expect(this.clearFilterOnNoTaskFoundScreen).toBeVisible();
      await expect(this.editFilterOnNoTaskFoundScreen).toBeVisible();
    } else {
      await assertBalanceRange(null, maxAmount, "less");
    }
  };

  verifyingBalanceStatusFilter = async () => {
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();

    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Balance Status"]);
    await this.selectFilterOptionsFromDropdown("Balance Status");
    await this.selectFacilitySubOptions("Select Balance Status");
    await this.searchTaskName([randomBalanceStatus]);

    await this.test.step("Wait for filter search to complete", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });

    const checkBoxVisible = await this.facilityOptioncheckBox(
      randomBalanceStatus
    ).isVisible();

    if (checkBoxVisible) {
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();

      await this.test.step("Wait for filtered grid to load", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });

      const gridCount = await this.balanceStatusGridColumn.count();

      if (gridCount > 0) {
        //  Matching tasks found — verify text in grid
        for (let i = 0; i < gridCount; i++) {
          const row = this.balanceStatusGridColumn.nth(i);
          await row.scrollIntoViewIfNeeded();
          await expect(
            row,
            "Verify filtered Balance Status is displayed correctly in grid"
          ).toContainText(randomBalanceStatus);
          break;
        }
      } else {
        // Option exists but no matching tasks
        await expect(
          this.clearFilterOnNoTaskFoundScreen,
          "Verify 'Clear Filter' button is visible when no grid results found"
        ).toBeVisible();

        await expect(
          this.editFilterOnNoTaskFoundScreen,
          "Verify 'Edit Filter' button is visible when no grid results found"
        ).toBeVisible();
      }
    } else {
      // Filter option NOT found in dropdown
      await expect(
        this.noMatchesFoundLabel,
        "Verify '0 Matches' message appears when no filter options match search"
      ).toBeVisible();
      await this.page.keyboard.press("Escape");
      await this.test.step(
        "Closing filter modal since no match found",
        async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        }
      );
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnApplyFilterButton();
    }
  };
  // Convert JS date → MM/DD/YYYY
  formatDate(date) {
    const d = new Date(date);
    const pad2 = (n) => n.toString().padStart(2, "0");
    return `${pad2(d.getMonth() + 1)}/${pad2(d.getDate())}/${d.getFullYear()}`;
  }

  //  Normalize grid date (Today, Tomorrow, M/D/YYYY, etc.)
  parseGridDate = async (locator, index) => {
    let raw = (await locator.nth(index).innerText()).trim();
    if (!raw) return "";

    const lower = raw.toLowerCase();
    const pad2 = (n) => n.toString().padStart(2, "0");

    if (lower === "today") return this.formatDate(new Date());

    if (lower === "tomorrow") {
      const t = new Date();
      t.setDate(t.getDate() + 1);
      return this.formatDate(t);
    }

    const parts = raw.split("/");
    if (parts.length === 3) {
      return `${pad2(parts[0])}/${pad2(parts[1])}/${parts[2]}`;
    }

    const parsed = new Date(raw);
    if (!isNaN(parsed)) return this.formatDate(parsed);

    return raw;
  };
  verifyingDuedateFilter = async () => {
    const today = new Date();
    const next7Days = Array.from({ length: 7 }, (_, i) =>
      this.formatDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
      )
    );
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();

    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Due Date"]);
    await this.selectFilterOptionsFromDropdown("Due Date");
    await this.selectFacilitySubOptions(["Select"]);

    // ************ Next 7 Days Filter Check *************
    await this.clickOnDueDateOptions("Next 7 days");
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const rowsCount = await this.dueDateGridColums.count();
    for (let i = 0; i < rowsCount; i++) {
      const gridDate = await this.parseGridDate(this.dueDateGridColums, i);
      expect(
        next7Days.includes(gridDate),
        "Verifying the Due Date grid displays the correct dates when applying the 'Next 7 Days' filter"
      ).toBeTruthy();
    }
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    // *********** OVERDUE *******************
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Due Date"]);
    await this.selectFilterOptionsFromDropdown("Due Date");
    await this.selectFacilitySubOptions(["Select"]);
    await this.clickOnDueDateOptions("Overdue");
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    const rows = await this.dueDateGridColums.count();
    // Normalize today's date
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    for (let i = 0; i < rows; i++) {
      const gridDateStr = await this.parseGridDate(this.dueDateGridColums, i);
      // Skip blank/null/undefined
      if (!gridDateStr?.trim()) continue;
      const lower = gridDateStr.trim().toLowerCase();
      // Skip "today" because it's NOT overdue
      if (lower === "today") continue;
      // Parse into date
      const rowDate = new Date(gridDateStr);

      // Invalid date handling
      if (isNaN(rowDate.getTime())) {
        throw new Error(`Invalid date format in row ${i}: "${gridDateStr}"`);
      }
      // Normalize row date
      rowDate.setHours(0, 0, 0, 0);
      if (!(rowDate < todayMidnight)) {
        throw new Error(
          `Overdue filter failed: Row ${i} has "${gridDateStr}" which is NOT overdue.`
        );
      }
    }
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    // ***************** Today *******************
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Due Date"]);
    await this.selectFilterOptionsFromDropdown("Due Date");
    await this.selectFacilitySubOptions(["Select"]);
    await this.clickOnDueDateOptions("Today");
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    const todayrows = await this.dueDateGridColums.count();
    for (let i = 0; i < todayrows; i++) {
      // const value = await this.parseGridDate(this.dueDateGridColums, i);
      expect(
        this.dueDateGridColums.nth(i),
        "Verify the Due Date grid displays the correct dates when the 'Today' filter is applied"
      ).toHaveText("Today");
    }
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    // await this.page.pause()
    // // ************ Custom Range ****************
    // const startDate = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 2
    // );
    // const endDate = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() + 2
    // );

    // // Convert to string MM/DD/YYYY
    // const startDateStr = this.formatDate(startDate);
    // const endDateStr = this.formatDate(endDate);
    // await this.clickOnFilterBtn();
    // await this.clickOnClearFilterIcon();
    // await this.clickOnFilterBtn();
    // await this.clickOnAddFilterBtn();
    // await this.clickOAddFilterDropdown();
    // await this.searchFilterNames(["Due Date"]);
    // await this.selectFilterOptionsFromDropdown("Due Date");
    // await this.selectFacilitySubOptions(["Select"]);
    // await this.clickOnDueDateOptions("Custom range");
    //  await this.test.step("The page is loading, please wait", async () => {
    //   await this.page.waitForTimeout(parseInt(process.env.smallWait));
    // });
    // await this.enterCustomsStartDate([startDateStr]);
    // await this.test.step("Close canlander popup",async()=>{
    //   await this.page.locator("//div[normalize-space(text())='Filter by']").click({ force: true })
    // })
    // await this.test.step("The page is loading, please wait", async () => {
    //   await this.page.waitForTimeout(parseInt(process.env.smallWait));
    // });
    // await this.enterCustomsEndDate([endDateStr]);
    // await this.test.step("Close canlander popup",async()=>{
    //   await this.page.locator("//div[normalize-space(text())='Filter by']").click({ force: true })
    // })
    //  await this.test.step("The page is loading, please wait", async () => {
    //   await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    // });
    // await this.clickOnApplyButton();
    // await this.clickOnApplyFilterButton();
    // const customDateRangeRows = await this.dueDateGridColums.count();
    // for (let i = 0; i < customDateRangeRows; i++) {
    //   const value = await this.parseGridDate(this.dueDateGridColums, i);
    //   if (!value) continue; // skip empty rows
    //   const rowDate = new Date(value);
    //   rowDate.setHours(0, 0, 0, 0);
    //   expect(
    //     rowDate >= startDate && rowDate <= endDate,
    //     "Verify the Due Date grid displays the correct date when the 'Custom range' filter is applied"
    //   ).toBeTruthy();
    // }
  };
  verifyingTaskStatusFilter = async () => {
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();
    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Task Status"]);
    await this.selectFilterOptionsFromDropdown(["Task Status"]);
    await this.selectFacilitySubOptions(["Select Task Status"]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.selectTasstatusOptions(randomTaskStatus);
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
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
      const rows = await this.taskStatusGridColumn.count();
      for (let i = 0; i < rows; i++) {
        const row = this.taskStatusGridColumn.nth(i);
        await row.scrollIntoViewIfNeeded();
        await expect(
          row,
          "Verify the applied taskStatus filter is displayed in the taskStatus column on the task list screen"
        ).toContainText(randomTaskStatus);
        break;
      }
    }
  };
  verifyingResidentNameFilter = async () => {
    //Check if Clear Filter button is disabled
    await this.clickOnFilterBtn();
    let isClearDisabled = await this.disableModeClearbtn.isDisabled();

    if (!isClearDisabled) {
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
    }
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Resident"]);
    await this.selectFilterOptionsFromDropdown(["Resident"]);
    await this.selectFacilitySubOptions(["Select Resident"]);
    await this.searchTaskName([randomResidentNames]);
    let checkBoxIsvisble = await this.facilityOptioncheckBox(
      randomResidentNames
    ).isVisible();
    const noMatchVisible = await this.noMatchesFoundLabel.isVisible();
    if (checkBoxIsvisble) {
      await this.page.keyboard.press("Enter");
      await this.clickOnApplyButton();
      await this.clickOnApplyFilterButton();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
      });
      const count = await this.residentGridColumns.count();
      for (let i = 0; i < count; i++) {
        const row = this.residentGridColumns.nth(i);
        await row.scrollIntoViewIfNeeded();
        await expect(
          row,
          "Verifying the applied resident filter name is displayed on the task list grid"
        ).toHaveText(randomResidentNames);
        break;
      }
    } else if (noMatchVisible) {
      // "No matches found" visible
      await expect(
        this.noMatchesFoundLabel,
        "Verify 0 Matches message should be displayed when the searched facility is not available in the dropdown list"
      ).toBeVisible();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      await this.test.step("Close filter dropdown", async () => {
        await this.page.keyboard.press("Escape");
        await this.clickOnDeleteDuedateInSortIcon();
        await this.clickOnApplyFilterButton();
      });
    } else {
      // No Task Found → Clear + Edit buttons must be visible
      await expect(
        this.clearFilterOnNoTaskFoundScreen,
        "Clear Filter button should be visible on the 'No Tasks Found' screen"
      ).toBeVisible();
      await expect(
        this.editFilterOnNoTaskFoundScreen,
        "Edit Filter button should be visible on the 'No Tasks Found' screen."
      ).toBeVisible();
    }
  };
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

    //  Apply Ascending (A → Z) Sort
    await this.clickOnSortBtn();
    await this.clickOnAddSortBtn();
    await this.clickOnSlectSortingFilterName();
    await this.searchSortName(["Task"]);
    await this.selectFilterOptionsFromDropdown(["Task"]);
    await this.clickOnSlectSortingFilterName();
    await this.selectSortingOptionFromDropdown("A → Z");
    await this.clickOnApplySortButtonIcon();

    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
    });

    //   Verify Ascending Order
    const ascValues = (await taskgridRows.allTextContents()).map((v) =>
      v.trim()
    );
    console.log("Ascending Values:", ascValues);

    // Pure lexicographic (UI-style) comparison
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

    //  Apply Descending (Z → A) Sort
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait, 10));
    });

    // Verify Descending Order
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
  const parseUSBalance = (str) => {
    const t = str.trim();
    if (!t || t === "-" || t === "N/A") return null;
    const isNegative = t.startsWith("(") && t.endsWith(")");
    const numeric = t.replace(/[^0-9.]/g, "");
    if (!numeric) return null;
    const value = Number(numeric);
    return isNegative ? -value : value;
  };

  const waitForGrid = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
  };

  // Highest → Lowest
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
  await waitForGrid();

  const highToLowItems = await this.balanceGridColumn.allInnerTexts();
  const highToLowNumbers = highToLowItems.map(parseUSBalance).filter(v => v !== null);
  const sortedDesc = [...highToLowNumbers].sort((a, b) => b - a);
  expect(
    highToLowNumbers,
    "Verify balances sorted from highest to lowest"
  ).toEqual(sortedDesc);

  // Lowest → Highest
  await this.clickOnSortBtn();
  await this.clickOnDeleteDuedateInSortIcon();
  await this.clickOnApplySortButtonIcon();
  await waitForGrid();

  await this.clickOnSortBtn();
  await this.clickOnAddSortBtn();
  await this.clickOnSlectSortingFilterName();
  await this.searchSortName(["Balance"]);
  await this.selectFilterOptionsFromDropdown("Balance");
  await this.clickOnSlectSortingFilterName();
  await this.selectSortingOptionFromDropdown("Lowest → Highest");
  await this.clickOnApplySortButtonIcon();
  await waitForGrid();

  const lowToHighItems = await this.balanceGridColumn.allInnerTexts();
  const lowToHighNumbers = lowToHighItems.map(parseUSBalance).filter(v => v !== null);
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
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
    await this.clickOnResetDefaultBtn();
    await this.clickOnCustomSortBtn();
    await expect(
      this.dueDateDefaultValuePath,
      "Verify the default 'Due Date' sort  is visible in the custom sort dropdown after resetting to defaults"
    ).toHaveText(test_Data.RevflowData.taskListData.dueDateDefaultSortData);
    await expect(
      this.defaultBalanceAndTaskStatusValuePath,
      "Verifying default balance sort is displaying on custom sort dropdown after resetting to defaults"
    ).toHaveText(test_Data.RevflowData.taskListData.balanceDefaultSortData);
    await this.page.keyboard.press("Escape");
    await this.clickOnFilterBtn();
    await expect(
      this.dueDateDefaultValuePath,
      "Verify the default 'Due Date' filter is visible in the filter dropdown after resetting to defaults"
    ).toHaveText(test_Data.RevflowData.taskListData.dueDateDefaultFilterData);
    await expect(
      this.defaultBalanceAndTaskStatusValuePath,
      "Verifying the default 'TaskStatus' filter is visible in the filter dropdown after resetting to defaults"
    ).toHaveText(
      test_Data.RevflowData.taskListData.taskStatusDefaultFilterData
    );
    await this.page.keyboard.press("Escape");
  };
  verifyingTasklistOpensSlideOutAndUpdatingAnyFieldRefreshesTasklistGrid =
    async () => {
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
      let taskName = await this.taskNameInputFiled.inputValue();
      let facilityName = await this.taskViewFacilityName.innerText();
      let facility = facilityName.replace(/^Facility\s*/i, "");
      let residentName = await this.taskViewResidentName.innerText();
      let resident = residentName.replace(/^Resident\s*/i, "");
      let payerName = await this.taskViewPayerName.innerText();
      let payer = payerName.replace(/^Payer\s*/i, "");
      console.log("FacilityName ==", facility);
      console.log("ResidentName ==", resident);
      console.log("payerName==", payer);
      console.log("TaskName==", taskName);
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      await this.clickOnRootIssueDropdown();
      let rootIssue = await this.selectRootOption.innerText();
      console.log("rootIssue==", rootIssue);
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      await this.selectRootIssueOptionFromDropdown();
      await this.clickOnTaskCloseBtn();
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
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames(["Task"]);
      await this.selectFilterOptionsFromDropdown(["Task"]);
      await this.searchTaskName([taskName]);
      await this.clickOnApplyFilterButton();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
      });
      await expect(
        this.rootsIssuesGridColumns,
        "Verifying the updated root issue name is displayed on the task grid after the grid auto-refreshes"
      ).toHaveText(rootIssue);
    };
  VerifyResidentPayerFacilityAssignedToDropdownOptionsCountChangingGlobalFacilities =
    async () => {
      await this.clickOnCustomSortBtn();
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnDeleteDuedateInSortIcon();
      await this.clickOnApplySortButtonIcon();
      await this.clickOnFilterBtn();
      await this.clickOnClearFilterIcon();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      let dropdownCount = [];
      let afterChangeGlobalFacilityFiltercount = [];
      const filters = [
        { name: "Resident", selectOption: "Select Resident" },
        { name: "Payer", selectOption: "Select Payer" },
        { name: "Facility", selectOption: "Select Facilities" },
        { name: "Assigned To", selectOption: "Select Assigned To" },
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
          test_Data.RevflowData.TaskListPage.facilityOptions[
            Math.floor(
              Math.random() *
                test_Data.RevflowData.TaskListPage.facilityOptions.length
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
      let noTasks = await this.editFilterOnNoTaskFoundScreen.isVisible();
      if (noTasks) {
        await expect(
          this.editFilterOnNoTaskFoundScreen,
          "verifying edit filter is displaying on no task found screen"
        ).toBeVisible();
      } else {
        const AfterChangeGlobalFacilityfilterscount = [
          { name: "Resident", selectOption: "Select Resident" },
          { name: "Payer", selectOption: "Select Payer" },
          { name: "Facility", selectOption: "Select Facilities" },
          { name: "Assigned To", selectOption: "Select Assigned To" },
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
  verifyActivityLog = async () => {
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    let count = await this.taskNameGidRow.count();
    for (let i = 0; i < count; i++) {
      let tasknamerow = await this.taskNameGidRow.nth(i);
      console.log("tasks=", i);
      await this.test.step("click task name ", async () => {
        await tasknamerow.click();
      });
      await this.clickOnActivityTab();
      await this.test.step("The page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      await this.clickOnTaskCloseBtn();
    }
  };
  VerifyDueDateUpdateFunctionalityForFuturedates = async () => {
    const days = [];
    const start = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d.getDate());
    }

    console.log(days);
    await this.clickOnCustomSortBtn();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnDeleteDuedateInSortIcon();
    await this.clickOnApplySortButtonIcon();
    await this.clickOnFilterBtn();
    await this.clickOnClearFilterIcon();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnFilterBtn();
    await this.clickOnAddFilterBtn();
    await this.clickOAddFilterDropdown();
    await this.searchFilterNames(["Due Date"]);
    await this.selectFilterOptionsFromDropdown("Due Date");
    await this.selectFacilitySubOptions(["Select"]);
    await this.clickOnDueDateOptions("Next 7 days");
    await this.clickOnApplyButton();
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnTaskName();
    await this.clickOnDuedateFiled();
    for (const day of days) {
      let dayBtn = await this.daysBtn(day);
      let isAriaDisabled = await dayBtn.getAttribute("aria-disabled");
      let isVisible = dayBtn.isVisible();
      if (isAriaDisabled !== "true" && isVisible) {
        expect(
          dayBtn,
          "Verify that the due date calendar is editable for future dates"
        ).toBeVisible();
      }
    }
    const todayDate = new Date(); // this is a Date object
    const today = todayDate.getDate(); // number
    const tomorrowDate = new Date(); // another Date object
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const todayPlusOne = tomorrowDate.getDate();
    console.log("today =", today);
    console.log("tomorrow =", todayPlusOne);
    await this.selectDuedate(today);
    await this.clickOnDuedateFiled();
    let dayButton = this.daysBtn(todayPlusOne);
    expect(
      dayButton,
      "The dates should be disable mode after change due date future date to current date"
    ).not.toBeVisible();
    await this.page.keyboard.press("Escape");
    await this.clickOnTaskCloseBtn();
  };
  verifyTaskListFiltersResetOnGlobalFacilityChange = async () => {
    const filters = [
      { name: "Facility", selectOption: "Select Facilities" },
      { name: "Payer", selectOption: "Select Payer" },
      { name: "Resident", selectOption: "Select Resident" },
    ];
    await this.clickOnFilterBtn();
    for (const filter of filters) {
      await this.clickOnAddFilterBtn();
      await this.clickOAddFilterDropdown();
      await this.searchFilterNames([filter.name]);
      await this.selectFilterOptionsFromDropdown(filter.name);
      await this.selectFacilitySubOptions(filter.selectOption);
      await this.selectAllFacilities();
      await this.clickOnApplyButton();
    }
    await this.clickOnApplyFilterButton();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    let filtersCount = await this.filterCountlabel.innerText();
    console.log("filters count==", filtersCount);
    await this.clickOnGlobalSearchdropdown();
    await this.deselectAllFacilities();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.searchGlobalFacilty([randomFacilityNames]);
    await this.page.keyboard.press("Enter");
    await this.clickOnGloabalFacilityApplyBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    let AfterChangeFilityfiltersCount = await this.filterCountlabel.innerText();
    console.log("filters count==", AfterChangeFilityfiltersCount);
    expect(
      filtersCount,
      "Filters should clear after the global facility is changed"
    ).not.toBe(AfterChangeFilityfiltersCount);
  };
};
