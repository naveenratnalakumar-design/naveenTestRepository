const { excuteSteps } = require("../../utilities/actions");
const { renameFile, invalidrenameFile } = require("../../utilities/renameFile");
const { expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");
const testData = require("../../test_Data/testData.json");
// const { FakerDataPage } = require("../../utilities/faker_data");
// const { th } = require("@faker-js/faker");
const randomPickAssignedUserOptions =
  testData.RevflowData.assignedUserList[
    Math.floor(Math.random() * testData.RevflowData.assignedUserList.length)
  ];

const randomPickBalanceStatusOptions =
  testData.RevflowData.balanceStatusOptions[
    Math.floor(Math.random() * testData.RevflowData.balanceStatusOptions.length)
  ];
const randomPickRootIssuesOptions =
  testData.RevflowData.rootIssuesOptions[
    Math.floor(Math.random() * testData.RevflowData.rootIssuesOptions.length)
  ];
const docTypesList =
  testData.RevflowData.documentTypeOptionsList[
    Math.floor(
      Math.random() * testData.RevflowData.documentTypeOptionsList.length
    )
  ];
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const dueDate =
  (now.getMonth() + 1).toString().padStart(2, "0") +
  "/" +
  now.getDate().toString().padStart(2, "0") +
  "/" +
  now.getFullYear();
let timeStamp = `${year}-${month}-${day}T${hours}:${minutes}`;
let taskTitle = `Task_${timeStamp}`;
let taskTitleAtt = `FTask_${timeStamp}`;
let rename = `rename_${timeStamp}`;
let tname = `Vyaghram`;
let invalidDate = `2066/21/12`;
let exp = "svg";
exports.CreateTaskPage = class CreateTaskPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.taskNamecolumn = page.locator(
      "//div[@data-column-definition-name='name']"
    );

    this.arAgingBtn = page.locator("//span[text()=' AR Aging ']");
    this.arAgingExpandIcon = page.locator(
      "(//div[@data-column-definition-name='_groupColumn']//arw-icon[@name='arrowNarrowDown'])"
    );
    //this.residentPayerAmount =page.locator("((//div[contains(@data-row-id,'resident_payer_payerCategory_facility_facilityGroup')])[1]/div/div)[3]");
    this.residentPayerRow = page.locator(
      "(//div[contains(@data-row-id,'resident_payer_payerCategory_facility_facilityGroup')])"
    );
    //this.residentPayerCreateTaskIcon=this.residentPayerRow.locator("//arw-button[@icon='plusSquareDefault']")
    this.arAgingCreateCloseBtn = page.locator("(//arw-button[@icon='x'])[1]");
    this.saveTaskBtn = page.locator("//span[text()='Save Task ']");

    this.dueDateFilter = page.locator(
      "//div[contains(text(),' Overdue, Today')]"
    );
    this.taskStatusFilter = page.locator(
      "//div[contains(text(),' Not Started, In Progress')]"
    );
    this.customSortFilter = page.locator(
      "//span[contains(text(),' Custom Sort ')]"
    );
    this.customSortDateFilter = page.locator(
      "//div[normalize-space(text())='Oldest → Newest']"
    );
    this.customSortBalanceFilter = page.locator(
      "//div[normalize-space(text())='Highest → Lowest']"
    );

    this.firstTaskName = page.locator(
      "((//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1])//div[@data-column-definition-name='name']//a"
    );
    this.firstTaskFacilityName = page.locator(
      "(((//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1])//div[@data-column-definition-name='facility']//span)[2]"
    );
    this.firstTaskResidentName = page.locator(
      "((//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1])//div[@data-column-definition-name='caseDetails']//a"
    );
    this.firstTaskBalance = page.locator(
      "(((//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1])//div[@data-column-definition-name='balance']//span)[2]"
    );
    this.firstTaskBalanceStatus = page.locator(
      "(((//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1])//div[@data-column-definition-name='balanceStatusId']//span)[2]"
    );
    this.firstTaskDueDate = page.locator(
      "(((//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1])//div[@data-column-definition-name='dueDate']//span)[2]"
    );
    this.firstTaskTaskStatus = page.locator(
      "(((//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1])//div[@data-column-definition-name='taskStatusId']//span)[2]"
    );
    this.firstTaskAssigned = page.locator(
      "(((//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1])//div[@data-column-definition-name='assignedToUser']//span)[2]"
    );
    this.paginationAfter = page.locator(
      "//div[contains(@class,'mat-mdc-tab-header-pagination-after')]"
    );
    this.activityTab = page.locator("//span[contains(text(),' Activity ')]");

    this.TaskListBtn = page.locator("//span[text()=' Task List ']");
    this.createTaskBtn = page.locator("//span[text()='Create Task']");
    this.taskTitleInputFiled = page.locator(
      "//div[@class='arw-page-container__title']//input"
    );
    this.discriptionInputFiled = page.locator(
      "//div[@data-placeholder='Add a description...']"
    );
    this.checkedLinkFiles = page.locator(
      "//mat-checkbox[contains(@class,'mat-mdc-checkbox-checked')]/../../../div[@data-column-definition-name='name']//span/span "
    );
    this.blanceStatusDropdown = page.locator(
      "//span[text()=' Balance Status ']"
    );
    this.assignedUserDropdown = page.locator(
      "//mat-select[@id='mat-select-3']"
    );
    this.SearchInput = page.locator("//input[@placeholder='Search']");
    this.selectOptions = page.locator("(//mat-option[@role='option'])[1]");
    this.rootIssuesDropdown = page.locator("//span[text()=' Root Issue ']");
    this.pickRootIssueOptionFromDropdown = page.locator(
      "(//mat-option[@role='option'])[1]"
    );
    this.addFileIcon = page.locator("//span[normalize-space()='Add File']");
    this.UploadFileInput = page.locator("//input[@type='file']");
    this.browseBtn = page.locator("//span[text()='Browse']");
    this.fileNameInput = page.locator("//input[@id='mat-input-6']");
    this.documentTypeDropdown = page.locator("//span[text()='Select']");
    this.editdocumentTypeDropdown = page.locator(
      "//arw-select[@formcontrolname='documentTypeId']/child::div/mat-select[contains(@id,'mat-select-')]"
    );
    this.attachBtn = page.locator("//span[text()=' Attach ']");
    this.dueDateField = page.locator("//input[@placeholder='mm/dd/yyyy']");
    this.dueDateCalendarLabel = page.locator(
      "//div[@class='mat-calendar-controls']/descendant::span[@class='mdc-button__label']"
    );
    this.pickYearFromCalendar = page.locator("//span[text()=' 2028 ']");
    this.pickMonthFromCalendar = page.locator("//span[text()=' OCT ']");
    this.pickDateFromCalendar = page.locator("//span[text()=' 17 ']");
    this.saveTaskButton = page.locator("//span[contains(text(),'Save Task')]");
    this.cancelButton = page.locator("//span[contains(text(),'Cancel')]");
    this.CloseButton = page.locator("//span[text()='Close ']");
    this.sucessMessage = page.locator(
      "//span[text()='Task has been successfully created']"
    );
    this.existingTask = page.locator("(//arw-template-renderer)[1]//a");
    this.taskNameheader = page.locator(
      "(//div[normalize-space()='Task Name'])[1]"
    );
    this.taskNameFilters = page.locator(
      "//span[normalize-space(text())='Filters']"
    );
    this.taskFilterClearBtn = page.locator(
      "//span[normalize-space(text())='Clear Filter']"
    );
    this.addTaskFilterBtn = page.locator(
      "//span[normalize-space(text())='Add Filter']"
    );
    this.selectTaskFilterdropdown = page.locator("//span[text()='Select']");
    this.pickFilterOptionFromdropdown = page.locator(
      "//mat-option[@role='option']"
    );
    this.linkBtn = page.locator("//span[text()=' Link ']");
    this.dueDateheader = page.locator(
      "(//div[normalize-space()='Due Date'])[1]"
    );
    this.dueDateFillter = page.locator(
      "(//div[normalize-space()='Due Date']//button[@aria-haspopup='menu'])[1]"
    );
    this.checkBox = page.locator("(//input[@type='checkbox'])[1]");
    this.clearFillterBtn = page.locator("//span[text()='Clear filters']");
    this.filterSearchInput = page.locator("//input[@id='mat-input-1']");
    this.searchfilterField = page.locator(
      "(//input[contains(@id,'mat-input')])[2]"
    );
    this.applyBtn = page.locator("//span[text()='Apply']");
    this.morethan500Error = page.locator(
      "//div[contains(@class,'mat-mdc-dialog-surface')]/descendant::div[contains(text(),'administrator')]"
    );
    this.filesHeader = page.locator(
      "//span[normalize-space(text()) = 'Files']"
    );
    this.taskNameFilter = page.locator(
      "(//arw-icon[@name='filterFunnel01'])[1]"
    );
    this.searchTaskNameFilter = page.locator(
      "(//div[@class='relative flex']/input)[2]"
    );
    this.applyFilterBtn = page.locator(
      "//span[normalize-space(text())='Apply Filter']"
    );
    this.firstTask = page.locator(
      "(//a[@class='ng-star-inserted']/parent::span)[1]"
    );
    this.fileNameEditIcon = page.locator("(//arw-button[@icon='edit01'])[1]");
    this.editFileNameInput = page.locator(
      "(//div[@class='relative flex'])[5]//input"
    );
    this.saveBtn = page.locator("//span[text()=' Save ']");
    this.taskRow = page.locator(
      "(//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1]"
    );
    this.linkFromCaseBtn = page.locator("//span[text()='Link from a Case']");
    //this.firstlinkfile=page.locator("(//div[@data-column-definition-name='checkbox'])[2]");
    this.linkfileList = page.locator(
      "(//div[@data-column-definition-name='checkbox'])"
    );
    this.filesPresent = page.locator("(//arw-file-card/div/span)[1]");
    this.files = page.locator("//arw-file-card/div/span");
    this.unlinkBtn = page.locator(
      "(//arw-file-card//arw-button[@arwconfirm])[1]"
    );
    this.navigateBackToTaskListBtn = page.locator(
      "//div[@class='arw-page-container__title']/arw-button"
    );
    this.finameofUnlinkbtn = page.locator(
      "(//arw-file-card//arw-button[@arwconfirm])[1]/parent::div/preceding-sibling::div[1]"
    );
    this.unlinkFromTaskBtn = page.locator(
      "//span[text()=' Unlink from Task ']"
    );
    this.fileNameField = page.locator(
      "(//div[@class='relative flex'])[5]//input"
    );
    this.emptyTaskMessage = page.locator(
      "//span[text()='Please fill out required fields']"
    );
    this.emptyTaskName = page.locator(
      "//span[@class='text-status-error-full'][text()='Add Task Title...']"
    );
    this.emptyBalance = page.locator(
      "//arw-select[@icon='coinsStacked01']//arw-validation-errors/div[text()=' Value required ']"
    );
    this.emptyRootIssue = page.locator(
      "//arw-select[@icon='annotationAlert']//arw-validation-errors/div[text()=' Value required ']"
    );
    this.emptyDueDate = page.locator(
      "//arw-input[@icon='calendar']//arw-validation-errors/div[text()=' Value required ']"
    );
    this.fileHeader = page.locator("//span[text()='Files']");
    this.cancelTaskHeader = page.locator(
      "//h2[contains(text(),'You have unsaved changes')]"
    );
    this.continueBtn = page.locator("//span[text()=' Continue ']");
    this.commentfield = page.locator(
      "//div[@data-placeholder='Add comment...']"
    );
    this.commenterrmsg = page.locator(
      "//div[text()=' 500 max number of characters exceeded. ']"
    );
    this.discriptionInputFiled = page.locator(
      "//div[@data-placeholder='Add a description...']"
    );
    this.descriptionerrmsg = page.locator(
      "//div[text()=' 500 max number of characters exceeded. ']"
    );
    this.errMessage = page.locator(
      "//div[contains(text(), ' Value should end ')]"
    );
    this.sortFilterBtn = page.locator(
      "//span[normalize-space(text())='Custom Sort']"
    );
    this.gridHeadings = (txt) =>
      page.locator(`//div[normalize-space(text()) = '${txt}']`);
    this.gridFiltersIcons = (txt) =>
      page.locator(
        `(//div[normalize-space(text()) = '${txt}']//../../..//*[name()='svg'])[1]`
      );
    this.gridSortIcons = (txt) =>
      page.locator(
        `(//div[normalize-space(text()) = '${txt}']//../../..//*[name()='svg'])[2]`
      );
    this.taskListModuleCard = page.locator("(//div[@class='module-card'])[1]");
    this.dashboardBtn = page.locator("//span[text()=' Dashboard ']");
    this.arAgingModuleCard = page.locator("(//div[@class='module-card'])[2]");
    this.groupingDropdown = page.locator(
      "(//button[@aria-haspopup='menu'])[2]"
    );
    this.agingFilterBtn = page.locator(
      "//span[normalize-space(text())='Filters']"
    );
    this.quickDatePicker = page.locator(
      "//mat-button-toggle-group[@role='radiogroup']"
    );
    this.downloadExcelBtn = page.locator(
      "//arw-icon[contains(@name,'download')]"
    );
    this.currentMonthToggleBtn = page.locator("//span[text()='Current Month']");
    this.allPriorBalenecToggleBtn = page.locator(
      "//span[text()='All Prior Balances']"
    );
    this.totalBalanceToggleBtn = page.locator(
      "//span[text()='Total Displayed Balance']"
    );
    this.slectGrouping = page.locator(
      "//div[text()='Facility → Payer → Resident']"
    );
    this.verifyCreatedIsVisibleOnTaskGrid = (txt) =>
      page.locator(`//a[text()='${txt}']`);
  }

  hoverOnCustomSort = async () => {
    await excuteSteps(
      this.test,
      this.customSortFilter,
      "hover",
      `Hovering over custom sort filter`
    );
  };
  clickOnCustomSortFilter = async () => {
    await excuteSteps(
      this.test,
      this.customSortFilter,
      "click",
      `Clicking on custom sort filter`
    );
  };

  clickOnArAgingCloseBtn = async () => {
    await excuteSteps(
      this.test,
      this.arAgingCreateCloseBtn,
      "click",
      `Clicking on close button`
    );
  };
  clickOnCreateTaskIcon = async () => {
    await excuteSteps(
      this.test,
      this.residentPayerCreateTaskIcon,
      "click",
      `Clicking on create task icon for resident payee`
    );
  };

  fillDueDate = async () => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "dblclick",
      `Filing date in due date field`
    );
  };

  hoverOnResidentPayerAmount = async (x) => {
    await excuteSteps(
      this.test,
      x,
      "hover",
      `Hovering on resident payer amount`
    );
  };
  clickOnArAgingExpandIcon = async () => {
    await excuteSteps(
      this.test,
      this.arAgingExpandIcon,
      "click",
      `Click on Ar aging expand icon`
    );
  };
  clickOnArAgingBtn = async () => {
    await excuteSteps(
      this.test,
      this.arAgingBtn,
      "click",
      `Click on Ar aging button`
    );
  };

  clickOnSaveTaskbtn = async () => {
    await excuteSteps(
      this.test,
      this.saveTaskBtn,
      "click",
      `Clicking onsave task button`
    );
  };
  clickOnPagination = async () => {
    await excuteSteps(
      this.test,
      this.paginationAfter,
      "click",
      `Clicking on arrow to move tab until activity tab is visible`
    );
  };

  clickOnSaveBtn = async () => {
    await excuteSteps(this.test, this.saveBtn, "click", `Click on save button`);
  };
  clickOnActivity = async () => {
    await excuteSteps(
      this.test,
      this.activityTab,
      "click",
      `Click on Activity tab`
    );
  };
  clickonLinkFromCaseBtn = async () => {
    await excuteSteps(
      this.test,
      this.linkFromCaseBtn,
      "click",
      `Click on Link from Case button to link files`
    );
  };
  clickoneditDocType = async () => {
    await excuteSteps(
      this.test,
      this.editdocumentTypeDropdown,
      "click",
      `Clicking on document type dropdown`
    );
  };

  clickOnfileNameEditIcon = async () => {
    await excuteSteps(
      this.test,
      this.fileNameEditIcon,
      "click",
      `Clicking on edit name icon`
    );
  };
  clickOnFirstTask = async () => {
    await excuteSteps(
      this.test,
      this.firstTask,
      "click",
      `Clicking on task name`
    );
  };
  hoverOverTaskNameHeader = async () => {
    await excuteSteps(
      this.test,
      this.taskNameheader,
      "hover",
      `Hover over task name header`
    );
  };
  clickOnTaskList = async () => {
    await excuteSteps(
      this.test,
      this.TaskListBtn,
      "click",
      `Click on the Task list button`
    );
  };
  clickOnCancelBtn = async () => {
    await excuteSteps(
      this.test,
      this.cancelButton,
      "click",
      `Clicking on cancel button`
    );
  };
  // clickOnTaskNameFilter = async () => {
  //   await excuteSteps(
  //     this.test,
  //     this.taskNameFilter,
  //     "click",
  //     `Click on task name filter`
  //   );
  // };
  clickOnAddTaskFilterBtn = async () => {
    await excuteSteps(
      this.test,
      this.addTaskFilterBtn,
      "click",
      `Click on Add Filter Button`
    );
  };
  clickOnSelectTaskFilterdropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectTaskFilterdropdown,
      "click",
      `Click on select task filter dropdown`
    );
  };
  clickOnPickFilterOptionFromdropdown = async () => {
    await excuteSteps(
      this.test,
      this.pickFilterOptionFromdropdown,
      "click",
      `Click on the filter option from the dropdown`
    );
  };
  fillTaskNameFilter = async (ftxt) => {
    await excuteSteps(
      this.test,
      this.searchTaskNameFilter,
      "fill",
      `Entering task name to apply filter`,
      ftxt
    );
  };
  filluniqueTaskName = async (tname) => {
    await excuteSteps(
      this.test,
      this.searchTaskNameFilter,
      "fill",
      `Entering unique name into search filter`,
      tname
    );
  };
  clickOnCreateTaskBtn = async () => {
    await excuteSteps(
      this.test,
      this.createTaskBtn,
      "click",
      `Click on the create task button`
    );
  };
  fillTasktitle = async (txt) => {
    await excuteSteps(
      this.test,
      this.taskTitleInputFiled,
      "fill",
      `Entering task title`,
      txt
    );
  };
  fillTaskDescription = async (txt) => {
    await excuteSteps(
      this.test,
      this.discriptionInputFiled,
      "fill",
      `Entering description`,
      txt
    );
  };
  editFileName = async (newName) => {
    await excuteSteps(
      this.test,
      this.editFileNameInput,
      "fill",
      `Entering edited file name`,
      newName
    );
  };
  clickOnBalanceStatusdrop = async () => {
    await excuteSteps(
      this.test,
      this.blanceStatusDropdown,
      "click",
      `Click on the Balance Status btn`
    );
  };
  SearchDropdownOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.SearchInput,
      "fill",
      `Search dropdownOptions`,
      txt
    );
  };
  selectDropdownOptions = async () => {
    await excuteSteps(
      this.test,
      this.pickRootIssueOptionFromDropdown,
      "click",
      `Select dropdown options`
    );
  };
  dbClickDueDateField = async () => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "dblclick",
      `Double clicking on date field to fill input`
    );
  };
  clicOnRootIssuedrop = async () => {
    await excuteSteps(
      this.test,
      this.rootIssuesDropdown,
      "click",
      `Click on the root issues`
    );
  };
  clickOnDueDatedropdown = async () => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "click",
      `click on the due date filed`
    );
  };
  clickOnCalendarYearlabel = async () => {
    await excuteSteps(
      this.test,
      this.dueDateCalendarLabel,
      "click",
      `click on the calendar year label`
    );
  };
  selectYearFromCalandar = async () => {
    await excuteSteps(
      this.test,
      this.pickYearFromCalendar,
      "click",
      `Select year from canlendar`
    );
  };
  selectMonthFromCalendar = async () => {
    await excuteSteps(
      this.test,
      this.pickMonthFromCalendar,
      "click",
      `Select month from calendar`
    );
  };
  selectDateFromCalendar = async () => {
    await excuteSteps(
      this.test,
      this.pickDateFromCalendar,
      "click",
      `Click on the date in the calender`
    );
  };
  clickOnFileSection = async () => {
    await excuteSteps(
      this.test,
      this.filesHeader,
      "click",
      `Navigate to the Files section on the Create Task screen`
    );
  };
  clickOnAddFilebtn = async () => {
    await excuteSteps(
      this.test,
      this.addFileIcon,
      "click",
      `Click on the Add file button`
    );
  };
  clickOnFirstLinkFile = async () => {
    await excuteSteps(
      this.test,
      this.firstlinkfile,
      "click",
      `Clicking on checkbox to link file`
    );
  };
  clickOnBrowseBtn = async () => {
    await excuteSteps(
      this.test,
      this.browseBtn,
      "click",
      `Click on the browser button`
    );
  };
  clickDocumentTypdrop = async () => {
    await excuteSteps(
      this.test,
      this.documentTypeDropdown,
      "click",
      `Click on document type dropdown`
    );
  };
  clickOnAttachBtn = async () => {
    await excuteSteps(
      this.test,
      this.attachBtn,
      "click",
      `Click on the attach button`
    );
  };
  clickOnTaskApplyFilter = async () => {
    await excuteSteps(
      this.test,
      this.applyFilterBtn,
      "click",
      `Click on apply filter button`
    );
  };
  clickOnSaveTaskButton = async () => {
    await excuteSteps(
      this.test,
      this.saveTaskButton,
      "click",
      `Click on the save task button`
    );
  };

  clickOnFileHeader = async () => {
    await excuteSteps(this.test, this.fileHeader, "click");
  };

  fillDueDate = async (date) => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "fill",
      `Filling due date field with invalid date format`,
      date
    );
  };
  clickOnTaskCloseButton = async () => {
    await excuteSteps(
      this.test,
      this.CloseButton,
      "click",
      `Click on close button`
    );
  };
  hoverTaskNameHeader = async () => {
    await excuteSteps(
      this.test,
      this.taskNameheader,
      "hover",
      `Hovering task name header`
    );
  };
  clickOnTaskNameFilters = async () => {
    await excuteSteps(
      this.test,
      this.taskNameFilters,
      "click",
      `Click on the task name filter icon`
    );
  };
  searchfilterNameInput = async (txt) => {
    await excuteSteps(
      this.test,
      this.filterSearchInput,
      "fill",
      `Search task name`,
      txt
    );
  };
  searchfilterInputFiled = async (txt) => {
    await excuteSteps(
      this.test,
      this.searchfilterField,
      "fill",
      `Search task name`,
      txt
    );
  };
  clickOnApplyBtn = async () => {
    await excuteSteps(
      this.test,
      this.applyBtn,
      "click",
      `Click on the apply button`
    );
  };
  clickOnExistingTask = async () => {
    await excuteSteps(
      this.test,
      this.existingTask,
      "click",
      `Click on the existing task`
    );
  };
  hoverDuedateHeader = async () => {
    await excuteSteps(
      this.test,
      this.dueDateheader,
      "hover",
      `Hovering duedate header`
    );
  };
  clickOnDuedateFilter = async () => {
    await excuteSteps(
      this.test,
      this.dueDateFillter,
      "click",
      `Click on due date filter`
    );
  };
  clickOnDocumentType = async () => {
    await excuteSteps(
      this.test,
      this.documentTypeDropdown,
      "click",
      `Click on document type dropdown`
    );
  };
  uncheckduedatefillter = async () => {
    await excuteSteps(
      this.test,
      this.checkBox,
      "click",
      `Uncheck due date filter`
    );
  };
  scrollToClearFilter = async () => {
    await excuteSteps(
      this.test,
      this.clearFillterBtn,
      "scroll",
      `Scroll till clear filter comes into view port`
    );
  };
  clickOnClearallFilterbtn = async () => {
    await excuteSteps(
      this.test,
      this.clearFillterBtn,
      "click",
      `Click on clear all filter button`
    );
  };
  clickTaskFilterClearBtn = async () => {
    await excuteSteps(
      this.test,
      this.taskFilterClearBtn,
      "click",
      `Remove all filters from the task list`
    );
  };
  clickOnLinkBtn = async () => {
    await excuteSteps(this.test, this.linkBtn, "click", `Click on link button`);
  };
  selectAssignedUser = async () => {
    await excuteSteps(
      this.test,
      this.assignedUserDropdown,
      "click",
      `Click on Assigned user dropdown`
    );
  };
  clickOnContinueBtn = async () => {
    excuteSteps(
      this.test,
      this.continueBtn,
      "click",
      `Clicking on continue button`
    );
  };

  fillCommentDescription = async (txt) => {
    await excuteSteps(
      this.test,
      this.commentfield,
      "fill",
      `Fill description ${txt}`,
      txt
    );
  };

  fillTaskDescription = async (txt) => {
    await excuteSteps(
      this.test,
      this.discriptionInputFiled,
      "fill",
      `Fill description ${txt}`,
      txt
    );
  };

  countElementsPresent = async (locator) => {
    const rowLocator = locator;
    let previousCount = 0;
    let currentCount = await rowLocator.count();
    while (currentCount > previousCount) {
      previousCount = currentCount;
      await rowLocator.nth(currentCount - 1).scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      currentCount = await rowLocator.count();
    }
    return previousCount;
  };

  CreateTaskWithAttachment = async () => {
    await this.fillFieldsForCreateTask();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnAddFilebtn();
    const file = path.resolve(__dirname, "../files/36Docx_word.docx");
    await this.UploadFileInput.setInputFiles(file);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickDocumentTypdrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([docTypesList]);
    //await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectDropdownOptions();
    //await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnAttachBtn();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.sucessMessage).toBeVisible();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnTaskCloseButton();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterInputFiled([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
  };

  fillFieldsForCreateTask = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillTasktitle([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.fillTaskDescription([
      testData.RevflowData.addTaskData.discription,
    ]);
    //await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnBalanceStatusdrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([randomPickBalanceStatusOptions]);
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clicOnRootIssuedrop();
    await this.SearchDropdownOptions([randomPickRootIssuesOptions]);
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnDueDatedropdown();
    await this.clickOnCalendarYearlabel();
    await this.selectYearFromCalandar();
    await this.selectMonthFromCalendar();
    await this.selectDateFromCalendar();
  };

  CreateTaskWithoutAttachmentDefaultUser = async () => {
    await this.fillFieldsForCreateTask();
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(
      this.sucessMessage,
      "Verify the task creation success message is displayed correctly"
    ).toBeVisible();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnTaskCloseButton();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterInputFiled([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
  };

  CreateTaskWithoutAttachmentSelectedUser = async () => {
    await this.fillFieldsForCreateTask();
    await this.selectAssignedUser();
    await this.SearchDropdownOptions([randomPickAssignedUserOptions]);
    await this.selectDropdownOptions();
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(
      this.sucessMessage,
      "Verify the task creation success message is displayed correctly"
    ).toBeVisible();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnTaskCloseButton();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterInputFiled([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
  };

  uploadFileUsingBrowser = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.fillTasktitle([taskTitleAtt]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.fillTaskDescription([
      testData.RevflowData.addTaskData.discription,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clickOnBalanceStatusdrop();
    await this.SearchDropdownOptions([randomPickBalanceStatusOptions]);
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clicOnRootIssuedrop();
    await this.SearchDropdownOptions([randomPickRootIssuesOptions]);
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clickOnDueDatedropdown();
    await this.clickOnCalendarYearlabel();
    await this.selectYearFromCalandar();
    await this.selectMonthFromCalendar();
    await this.selectDateFromCalendar();
    await this.clickOnAddFilebtn();
    const file = path.resolve(__dirname, "../../files/kane.png");
    await this.UploadFileInput.setInputFiles(file);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnDocumentType();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([docTypesList]);
    await this.selectDropdownOptions();
    await this.clickOnAttachBtn();
  };

  renameAttachedFile = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnTaskList();
    await this.test.step("wait for until Fileter icon is visible", async () => {
      await this.page.waitForSelector(
        "//span[normalize-space(text())='Filters']",
        { state: "visible" }
      );
    });
    await this.clickOnTaskNameFilters();
    await this.test.step(
      "wait for until clearFilter btn is visible",
      async () => {
        await this.page.waitForSelector(
          "//span[normalize-space(text())='Clear Filter']",
          { state: "visible" }
        );
      }
    );
    await this.clickTaskFilterClearBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const count = await this.taskNamecolumn.count();
    for (let i = 1; i < count; i++) {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      const task = this.taskNamecolumn.nth(i);
      await task.click();
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      if (await this.filesPresent.isVisible()) {
        await this.clickOnfileNameEditIcon();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        const x = await renameFile(this.page, this.fileNameField, [rename]);
        await this.editFileName([x]);
        await this.clickoneditDocType();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.SearchDropdownOptions([docTypesList]);
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.selectDropdownOptions();
        await this.clickOnSaveBtn();
        await expect(
          this.files.filter({ hasText: x }),
          `verifying file ${x} is linked to task or not`
        ).toHaveCount(1);
        break;
      } else {
        await this.navigateBackToTaskListBtn.click();
      }
    }
  };

  linkFiles = async () => {
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.test.step("wait for until Fileter icon is visible", async () => {
      await this.page.waitForSelector(
        "//span[normalize-space(text())='Filters']",
        { state: "visible" }
      );
    });
    await this.clickOnTaskNameFilters();
    await this.test.step(
      "wait for until clearFilter btn is visible",
      async () => {
        await this.page.waitForSelector(
          "//span[normalize-space(text())='Clear Filter']",
          { state: "visible" }
        );
      }
    );
    await this.clickTaskFilterClearBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnFirstTask();
    await this.clickOnAddFilebtn();
    await this.clickonLinkFromCaseBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let count;
    await this.test.step(
      "Retrieve the number of linked files from the table",
      async () => {
        count = await this.linkfileList.count();
      }
    );
    console.log("cont=", count);
    if (count > 0) {
      let randomIndex = Math.floor(Math.random() * count);
      console.log(randomIndex);
      if (randomIndex === 1) {
        randomIndex = 2;
      }
      console.log(randomIndex);
      await this.test.step("The Page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      const randomCheckbox = this.linkfileList.nth(randomIndex);
      await randomCheckbox.click();
    }
    const linkfileselector = this.checkedLinkFiles;
    const linkFilename = await linkfileselector.innerText();
    await console.log(linkFilename);
    await this.clickOnLinkBtn();
    await expect(
      this.files.filter({ hasText: linkFilename }),
      `verifying file ${linkFilename} is linked to task or not`
    ).toHaveCount(1);
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnTaskCloseButton();
  };

  clearAllFiltersFeature = async () => {
    if (this.taskRow.isVisible()) {
      await this.hoverOverTaskNameHeader();
      await this.clickOnTaskNameFilter();
      await this.filluniqueTaskName([tname]);
      await this.clickOnTaskApplyFilter();
      await this.clickOnClearallFilterbtn();
    } else {
      await this.clickOnClearallFilterbtn();
    }
  };

  uploadFileSizegreaterthan500MB = async () => {
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnClearallFilterbtn();
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterNameInput([
      testData.RevflowData.addTaskData.namefilter,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnExistingTask();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnAddFilebtn();
    const file = path.resolve(__dirname, "../files/506mb.pdf");
    await this.UploadFileInput.setInputFiles(file);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.morethan500Error).toHaveText(
      testData.RevflowData.addTaskData.fileexceededErMess
    );
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  unlinkFile = async () => {
    this.test.step("smallWaitawait this.linkfileList.count();", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const count = await this.taskNamecolumn.count();
    for (let i = 1; i < count; i++) {
      await this.test.step("The Page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
      });
      const task = this.taskNamecolumn.nth(i);
      await task.click();
      await this.test.step("The Page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      if (await this.unlinkBtn.isVisible()) {
        const unlinkFilename = await this.finameofUnlinkbtn.innerText();
        console.log(unlinkFilename);
        await this.unlinkBtn.click();
        await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.unlinkFromTaskBtn.click();
        if (await this.filesPresent.isVisible()) {
          await expect(
            this.files.filter({ hasText: unlinkFilename }),
            `Verifying file ${unlinkFilename} is NOT linked to task`
          ).toHaveCount(0);
        }
        break;
      } else {
        await this.navigateBackToTaskListBtn.click();
      }
    }
  };

  emptyTaskFieldValidation = async () => {
    this.test.step("Please wait for loading page", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(
      this.emptyTaskMessage,
      "Verifying if it is throwing error for empty task message"
    ).toBeVisible();
    await expect(
      this.emptyTaskName,
      "Verifying if it is throwing error for empty task name"
    ).toBeVisible();
    await expect(
      this.emptyBalance,
      "Verifying if it is throwing error for empty balance "
    ).toBeVisible();
    await expect(
      this.emptyRootIssue,
      "Verifying if it is throwing error for empty root issue"
    ).toBeVisible();
    await expect(
      this.emptyDueDate,
      "Verifying if it is throwing error for empty due date"
    ).toBeVisible();
    await this.navigateBackToTaskListBtn.click();
  };
  searchFieldsValidation = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const fakerPage = new FakerDataPage();
    const data = await fakerPage.fakerData();
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnBalanceStatusdrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([data.additionalneeds]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await expect(
      this.selectOptions,
      "Verifying if option is not visible"
    ).not.toBeVisible();
    await this.page.keyboard.press("Escape");
    await this.clicOnRootIssuedrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([data.additionalneeds]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(
      this.selectOptions,
      "Verifying if option is not available"
    ).not.toBeVisible();
    await this.page.keyboard.press("Escape");
  };

  dueDateFieldValidation = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.dbClickDueDateField();
    await this.fillDueDate([invalidDate]);
    await this.clickOnFileHeader();
    await expect(
      this.emptyDueDate,
      "Verifying if error message is displayed invalid date"
    ).toBeVisible();
  };

  fillFieldsCancelValidation = async () => {
    await this.fillFieldsForCreateTask();
    await this.clickOnCancelBtn();
    await expect(
      this.cancelTaskHeader,
      "Verifying if cancel button is visible"
    ).toBeVisible();
    await this.clickOnContinueBtn();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await expect(
      this.createTaskBtn,
      "Verifying if create task button is visible"
    ).toBeVisible();
  };

  commentsFieldValidation = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillCommentDescription([
      testData.RevflowData.extentinputfield.value,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await expect(
      this.commenterrmsg,
      "Verifying if error message is displayed for exceeding character count"
    ).toBeVisible();
  };

  descriptionFieldValidation = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillTasktitle([taskTitleAtt]);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillTaskDescription([
      testData.RevflowData.extentinputfield.value,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnBalanceStatusdrop();
    await expect(
      this.descriptionerrmsg,
      "Verifying if error message is displayed for exceeding character count"
    ).toBeVisible();
  };

  enterInvalidFileExtension = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    const count = await this.taskNamecolumn.count();
    for (let i = 1; i < count; i++) {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      const task = this.taskNamecolumn.nth(i);
      await task.click();
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      if (await this.filesPresent.isVisible()) {
        await this.clickOnfileNameEditIcon();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        const x = await invalidrenameFile(this.page, this.fileNameField, [
          rename,
        ]);
        await this.editFileName([x]);
        await this.clickoneditDocType();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.SearchDropdownOptions([docTypesList]);
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.selectDropdownOptions();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await expect(
          this.errMessage,
          "Verifying if error message is displayed for invalid file extension"
        ).toBeVisible();
        break;
      }
    }
  };

  editFileInputBox = async () => {
    await this.fillFieldsForCreateTask();
    await this.clickOnAddFilebtn();
    await this.clickonLinkFromCaseBtn();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    const count = await this.linkfileList.count();
    console.log(count);
    if (count > 0) {
      let randomIndex = Math.floor(Math.random() * count);
      if (randomIndex === 1 && count > 2) {
        randomIndex = 2;
      }
      const randomCheckbox = this.linkfileList.nth(randomIndex);
      await randomCheckbox.click();
    }
    const linkfileselector = this.checkedLinkFiles;
    const originalFileName = await linkfileselector.innerText();
    console.log("Original File Name:", originalFileName);
    await this.clickOnLinkBtn();
    await this.clickOnfileNameEditIcon();
    await this.editFileName([exp]);
    await this.clickoneditDocType();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([docTypesList]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectDropdownOptions();
    await expect(this.errMessage).toBeVisible();
  };

  enterInvalidFileExtension1 = async () => {
    this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    const count = await this.taskNamecolumn.count();
    for (let i = 1; i < count; i++) {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      //nth playwright element to return current index
      const task = this.taskNamecolumn.nth(i);
      await task.click();
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      if (await this.filesPresent.isVisible()) {
        await this.clickOnfileNameEditIcon();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        const x = await invalidrenameFile(this.page, this.fileNameField, [
          rename,
        ]);
        await this.editFileName([x]);
        await this.clickoneditDocType();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.SearchDropdownOptions([docTypesList]);
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.selectDropdownOptions();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await expect(
          this.errMessag,
          "Expected error message to be displayed"
        ).toBeVisible();
        break;
      }
    }
  };
  hoveOnTaskListGridHeadings = async (txt) => {
    await excuteSteps(
      this.test,
      this.gridHeadings(txt),
      "hover",
      `Hover over the task list header.`
    );
  };
  clickOnTaskListModuleCard = async () => {
    await excuteSteps(
      this.test,
      this.taskListModuleCard,
      "click",
      `Click on the Task List module card on the dashboard page`
    );
  };
  clickOnDashboardBtn = async () => {
    await excuteSteps(
      this.test,
      this.dashboardBtn,
      "click",
      `Click on the Dashboard button in the left navigation bar`
    );
  };
  clickOnARAgingModuleCard = async () => {
    await excuteSteps(
      this.test,
      this.arAgingModuleCard,
      "click",
      `Click on the AR-Aging module card on the dashboard page`
    );
  };
  VerifyingDetailsForTaskListPage = async () => {
    await this.test.step(
      "wait for until clearFilter btn is visible",
      async () => {
        await this.page.waitForSelector("(//div[@class='module-card'])[1]", {
          state: "visible",
        });
      }
    );
    await this.clickOnTaskListModuleCard();
    await expect(
      this.sortFilterBtn,
      "Verify the custom sort button is visible on the Task List page"
    ).toBeVisible();
    for (const gridelement of testData.RevflowData.TaskListPage.gridHeadings) {
      await expect(
        this.gridHeadings(gridelement),
        "Verify the task grid headings are visible on the Task List page"
      ).toBeVisible();
    }
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    for (const gridFilters of testData.RevflowData.TaskListPage.gridHeadings) {
      await this.hoveOnTaskListGridHeadings(gridFilters);
      await expect(
        this.gridFiltersIcons(gridFilters),
        "Verify the task grid filters are visible on the Task List page"
      ).toBeVisible();
    }
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    for (const gridSortOptions of testData.RevflowData.TaskListPage
      .gridHeadings) {
      await this.hoveOnTaskListGridHeadings(gridSortOptions);
      await expect(
        this.gridSortIcons(gridSortOptions),
        "Verify the task grid sorting options are visible on the Task List page"
      ).toBeVisible();
    }
  };
  VerifyingDetailsForARAgingPage = async () => {
    await this.clickOnDashboardBtn();
    await this.test.step("The page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnARAgingModuleCard();
    await expect(
      this.groupingDropdown,
      "Verify the Grouping dropdown is visible on the AR-Aging page."
    ).toBeVisible();
    await expect(
      this.agingFilterBtn,
      "Verify the Aging Filter button is visible on the AR-Aging page."
    ).toBeVisible();
    await expect(
      this.quickDatePicker,
      "Verify the Quick Date Pick option is visible on the AR-Aging page"
    ).toBeVisible();
    await expect(
      this.downloadExcelBtn,
      "Verify the Download Excel button is visible on the AR-Aging page"
    ).toBeVisible();
    await expect(
      this.currentMonthToggleBtn,
      "Verify the Current Month toggle button is visible on the AR-Aging page"
    ).toBeVisible();
    await expect(
      this.allPriorBalenecToggleBtn,
      "Verify the All Prior Balance toggle is visible on the AR-Aging page"
    ).toBeVisible();
    await expect(
      this.totalBalanceToggleBtn,
      "Verify the Total Balance toggle is visible on the AR-Aging page"
    ).toBeVisible();
  };

  residentPayerRowCheck = async () => {
    let flag = 0;
    await this.page.waitForSelector(
      "(//div[@data-column-definition-name='_groupColumn']//arw-icon[@name='arrowNarrowDown'])",
      { state: "visible" }
    );
    // const thumb = this.page.locator("(//div[@class='ng-scrollbar-thumb'])[1]");
    // await thumb.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    const expandIcons = await this.arAgingExpandIcon;
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    const noOfExpandIcons = await expandIcons.count();
    console.log(noOfExpandIcons);
    for (let j = 0; j < noOfExpandIcons; j++) {
      const arAgingExpandIcon = expandIcons.nth(j);
      console.log(arAgingExpandIcon);
      await arAgingExpandIcon.click();
      await this.page.waitForSelector(
        "(//div[contains(@data-row-id,'resident_payer_payerCategory_facility_facilityGroup')])",
        { state: "visible" }
      );
      await this.test.step("The Page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      });
      const count = await this.countElementsPresent(this.residentPayerRow);
      console.log("count==", count);
      for (let i = 1; i <= count; i++) {
        const amountLocator = this.page.locator(
          `((//div[contains(@data-row-id,'resident_payer_payerCategory_facility_facilityGroup')])[${i}]/div/div)[3]`
        );
        const residentPayerCreateTaskIcon = this.page.locator(
          `(//arw-button[@icon='plusSquareDefault']//button)[${i}]`
        );
        await this.hoverOnResidentPayerAmount(amountLocator);
        const status = await residentPayerCreateTaskIcon.isDisabled();
        if (!status) {
          flag = 1;
          await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.mediumWait));
          });
          await residentPayerCreateTaskIcon.click();
          await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.mediumWait));
          });
          break;
        }
      }
      if (flag == 1) {
        break;
      }
    }
  };

  fillFieldsforArAging = async () => {
    await this.clickOnArAgingBtn();
    await this.residentPayerRowCheck();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillTasktitle([taskTitle]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.fillTaskDescription([
      testData.RevflowData.addTaskData.discription,
    ]);
    await this.clickOnBalanceStatusdrop();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.selectDropdownOptions();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clicOnRootIssuedrop();
    await this.selectDropdownOptions();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    // await this.fillDueDate([dueDate]);
    // await this.page.keyboard.press("Escape");
    // await this.clickOnDueDatedropdown();
    // await this.fillDueDate();
  };

  arAgingCreateTask = async () => {
    await this.fillFieldsforArAging();
    await this.clickOnSaveTaskbtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnArAgingCloseBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.searchfilterInputFiled([taskTitle]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnApplyBtn();
  };

  arAgingBrowseFile = async () => {
    await this.fillFieldsforArAging();
    await this.clickOnFileSection();
    await this.clickOnAddFilebtn();
    const file = path.resolve(__dirname, "../../files/kane.png");
    await this.UploadFileInput.setInputFiles(file);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnDocumentType();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.SearchDropdownOptions([docTypesList]);
    await this.selectDropdownOptions();
    await this.clickOnAttachBtn();
    await this.clickOnSaveTaskbtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForSelector("//span[text()=' Task List ']", {
        state: "visible",
      });
    });
    await this.clickOnTaskList();
    await this.test.step("wait for until Fileter icon is visible", async () => {
      await this.page.waitForSelector(
        "//span[normalize-space(text())='Filters']",
        { state: "visible" }
      );
    });
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnTaskNameFilters();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.test.step(
      "wait for until clearFilter btn is visible",
      async () => {
        await this.page.waitForSelector(
          "//span[normalize-space(text())='Clear Filter']",
          { state: "visible" }
        );
      }
    );
    await this.clickTaskFilterClearBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForSelector(
        "//span[normalize-space(text())='Filters']",
        { state: "visible" }
      );
    });
    await this.clickOnTaskNameFilters();
    await this.clickOnAddTaskFilterBtn();
    await this.clickOnSelectTaskFilterdropdown();
    await this.searchfilterInputFiled([
      testData.RevflowData.addTaskData.searchTearm,
    ]);
    await this.clickOnPickFilterOptionFromdropdown();
    await this.searchfilterInputFiled([taskTitle]);
    await this.clickOnTaskApplyFilter();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForSelector(
        "(//span[@class='arw-template-renderer'])[1]",
        { state: "visible" }
      );
    });
    await expect(
      this.verifyCreatedIsVisibleOnTaskGrid(taskTitle)
    ).toBeVisible();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
  };

  arAgingLinkFromCase = async () => {
    await this.fillFieldsforArAging();
    await this.clickOnFileSection();
    await this.clickOnAddFilebtn();
    await this.clickonLinkFromCaseBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const count = await this.linkfileList.count();
    console.log("cont=", count);
    if (count > 0) {
      let randomIndex = Math.floor(Math.random() * count);
      console.log(randomIndex);
      if (randomIndex === 1) {
        randomIndex = 2;
      }
      console.log(randomIndex);
      const randomCheckbox = this.linkfileList.nth(randomIndex);
      await randomCheckbox.click();
    }
    const linkfileselector = this.checkedLinkFiles;
    const linkFilename = await linkfileselector.innerText();
    await console.log(linkFilename);
    await this.clickOnLinkBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await expect(
      this.files.filter({ hasText: linkFilename }),
      `verifying file ${linkFilename} is linked to task or not`
    ).toHaveCount(1);
    await this.clickOnSaveTaskbtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnArAgingCloseBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.searchfilterInputFiled([taskTitle]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnApplyBtn();
  };

  verifyDefaultFilters = async () => {
    await this.test.step(
      "Wait Until Filter button is visible on task list page",
      async () => {
        await this.page.waitForSelector(
          "//span[normalize-space(text())='Filters']",
          { state: "visible" }
        );
      }
    );
    await this.clickOnTaskNameFilters();
    await expect(
      this.dueDateFilter,
      "Verify the default due date filter is visible on the Task List page"
    ).toBeVisible();
    await expect(
      this.taskStatusFilter,
      "Verify the default taskStatus filter is visible on the Task List page"
    ).toBeVisible();
    await expect(
      this.customSortFilter,
      "Verify the Custom filter dropdown is visible on the Task List page"
    ).toBeVisible();
    await this.page.keyboard.press("Escape");
    await this.hoverOnCustomSort();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(
      this.customSortDateFilter,
      "Verify the default custom date filter filter is visible on the Task List page"
    ).toBeVisible();
    await expect(
      this.customSortBalanceFilter,
      "Verify the default custom balance filter is visible on the Task List page"
    ).toBeVisible();
  };

  verifyTaskDetailsListView = async () => {
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    let taskName = await this.firstTaskName.innerText();
    let residentName = await this.firstTaskResidentName.innerText();
    let balance = await this.firstTaskBalance.innerText();
    let balanceStatus = await this.firstTaskBalanceStatus.innerText();
    let dueDate = await this.firstTaskDueDate.innerText();
    let taskStatus = await this.firstTaskTaskStatus.innerText();
    let assignedUser = await this.firstTaskAssigned.innerText();

    await this.clickOnFirstTask();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));

    let tasknameV = await this.taskTitleInputFiled.inputValue();
    let residentV = await this.page
      .locator("//a[contains(@href,'/cases/details/')]")
      .innerText();
    let balanceStatusV = await this.page
      .locator(
        "//arw-select[@formcontrolname='balanceStatusId']//arw-tag//span"
      )
      .innerText();
    let dueDateV = await this.page
      .locator("//arw-input[@formcontrolname='dueDate']//input")
      .inputValue();
    let taskStatusV = await this.page
      .locator("//arw-select[@formcontrolname='taskStatusId']//arw-tag//span")
      .innerText();
    let assignedUserV = await this.page
      .locator("//arw-select[@formcontrolname='assigneeId']//button/span")
      .innerText();
    await expect(taskName.trim()).toBe(tasknameV.trim());
    await expect(residentName.trim()).toBe(residentV.trim());
    await expect(balanceStatus.trim()).toBe(balanceStatusV.trim());
    await expect(dueDate.trim()).toBe(dueDateV.trim());
    await expect(taskStatus.trim()).toBe(taskStatusV.trim());
    await expect(assignedUser.trim()).toBe(assignedUserV.trim());

    await this.clickOnBalanceStatusdrop();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.page.locator("(//mat-option)[1]").click();
    let newbalanceStatus = await this.page
      .locator(
        "//arw-select[@formcontrolname='balanceStatusId']//arw-tag//span"
      )
      .innerText();
    console.log("newbalanceStatus==", newbalanceStatus);
    await this.clickOnPagination();
    await this.clickOnActivity();
    await this.page
      .locator("(//div[@data-column-definition-name='_hierarchyColumn'])[2]")
      .click();
    const activity = await this.page.locator(
      `(//span[text()='${newbalanceStatus}'])[1]`
    );
    await expect(
      activity,
      "Verify that an Activity Log is recorded when updating a required field on a task"
    ).toBeVisible();
  };
};
