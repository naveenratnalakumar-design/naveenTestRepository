const { test, expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const test_Data = require("../../test_Data/testData.json");

require("dotenv").config();

exports.TaskListPage = class TaskListPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.filterBtn = page.locator("//span[contains(text(),'Filters')]");
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
      "(//div[@data-column-definition-name='facility']//span)[1]"
    );
    this.residentNameBox = page.locator(
      "(//div[@data-column-definition-name='caseDetails']//a)[1]"
    );
    this.residentNameLink = page.locator("//a[text()='Wells, Eleanor']");
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
    this.downArrow = page.locator("(//div[@class='w-full'])[15]");
    this.firstGroup = page.locator(
      "//span[text()='Achieve']"
    );
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
      "(//div[contains(@class,'arw-control')])[6]"
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
      "(//span[contains(@class, 'web-subtitle-1')])[1]"
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
  }
  clickOnFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.filterBtn,
      "click",
      `Click on Filters Icon in Task List`
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
    let nameOfFacility = await this.facilityNameBox.innerText();
    let nameOfResident = await this.residentNameBox.innerText();
    await this.hoverOutFromFilterDropDown();
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
    await expect(viewAgingBtn,"Validating whether the 'View Aging' button is visible on the case view page").toBeVisible();
    await expect(viewTaskListBtn,"Validating whether the 'View TaskList' button is visible on the case view page").toBeVisible();
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
    await this.verifyDefaultFiltersInTaskList();
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
    await this.searchCaseName([test_Data.RevflowData.taskListData.resident]);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await expect(
      this.residentNameInSearchList,
      "Verify that the resident name is correctly displayed for the searched name"
    ).toHaveText([test_Data.RevflowData.taskListData.resident]);
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
    ).toHaveText(test_Data.RevflowData.taskListData.resident);
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
      .replace("PCC", "")
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
      test_Data.RevflowData.taskListData.facility,
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
    let residentFacility = getresidentFacility.replace("The ", "")
    await this.clickOnResidentOption();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    let caseResidentFacilityName = await this.caseViewResidentFacility.innerText();
    let facilityName = caseResidentFacilityName.replace(/[-–—]?\s*st\s*mary\b/ig, '')
    .replace(/\s{2,}/g, ' ')              
    .trim();
    console.log("Facility@==",facilityName)
    await expect(
      this.caseViewResidentName,
      "Verify the resident name is displayed correctly on the case view screen"
    ).toHaveText(test_Data.RevflowData.taskListData.residentName);
    await expect(
      facilityName,
      "Verify the facility name is displayed correctly on the case view screen"
    ).toBe(residentFacility);
  };
};
