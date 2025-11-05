const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const test_Data = require("../../test_Data/testData.json");
const randomFacilities =
  test_Data.RevflowData.TaskListPage.facilityOptions[
    Math.floor(
      Math.random() * test_Data.RevflowData.TaskListPage.facilityOptions.length
    )
  ];
const roleNames =
  test_Data.RevflowData.userManagementData.roleOptions[
    Math.floor(
      Math.random() *
        test_Data.RevflowData.userManagementData.roleOptions.length
    )
  ];
const usersNames =
  test_Data.RevflowData.userManagementData.Users[
    Math.floor(
      Math.random() * test_Data.RevflowData.userManagementData.Users.length
    )
  ];
exports.UserManagementPage = class UserManagementPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.settingsButton = page.locator("//span[text()=' Settings ']");
    this.userManagementOption = page.locator(
      "//span[text()=' User Management ']"
    );
    this.newUserButton = page.locator(
      "//span[normalize-space(text())='Assign New']"
    );
    this.searchUserInputBox = page.locator(
      "//input[@placeholder='Search Users by First Name, Last Name or Email']"
    );
    this.searchResults = page.locator("//div[@role='listbox']/div");
    this.inRevflowFlags = page.locator("//span[contains(text(),'In RevFlow')]");
    this.errorMessageBox = page.locator(
      "//div[@class='w-full text-foreground-high']/div"
    );
    this.closeButton = page.locator("//arw-button[@icon='x']");
    this.selectUsersDropDown = page.locator(
      "//span[text()='Select Users']/parent::button"
    );
    this.searchInputBox = page.locator("//input[@placeholder='Search']");
    this.allCheckBox = page.locator(
      "//label[contains(text(),'All')]/preceding-sibling::div"
    );
    this.applyButton = page.locator("//span[text()=' Apply ']/parent::button");
    this.facilityRoleAssignments = page.locator(
      "(//div[@data-column-definition-name='facilityRoleAssignments'])[2]//div"
    );
    this.selectRoleFilterDropdown = page.locator(
      "//span[text()='Select Roles']"
    );
    this.facilityFilterDropdown = page.locator(
      "//span[text()='Select Facilities']"
    );
    this.selectUsersFilter = page.locator(
      "//span[normalize-space(text())='Select Users']"
    );
    this.userViewSearchResults = page.locator("//div[@role='link']");
    this.assignNewLink = page.locator(
      "//span[text()=' Assign New ']/parent::button"
    );
    this.facilityDropDown = page.locator(
      "//arw-select-tree[@formcontrolname='facilityHierarchyIds']"
    );
    this.facilityOptions = page.locator(
      "//div[@class='flex grow items-center px-12 overflow-hidden ng-star-inserted']"
    );
    this.roleDropDown = page.locator("//arw-select[@formcontrolname='roleId']");
    this.roleOptions = page.locator("//mat-option[@role='option']");
    this.saveButton = page.locator("//span[text()=' Save ']/parent::button");
    this.chevronLeftButton = page.locator("//arw-button[@icon='chevronLeft']");
    this.userViewButton = page.locator("//div[text()=' USER VIEW ']");
    this.facilityAndRoleViewButton = page.locator(
      "//div[text()=' FACILITY & ROLE VIEW ']"
    );
    this.selectFacilitiesDropdown = page.locator(
      "//span[text()='Select Facilities']/ancestor::arw-select-tree"
    );
    this.selectRolesDropdown = page.locator(
      "//span[text()='Select Roles']/ancestor::arw-select-tree"
    );
    this.facilityHierarchyId = page.locator(
      "((//div[@data-column-definition-name='facilityHierarchyId'])[2]//span)[2]"
    );
    this.facilityLocations = page.locator(
      "//div[@data-column-definition-name='facilityHierarchyId']"
    );
    this.activeToggles = page.locator("//span[text()='Active']/parent::button");
    this.deactivateAndReassignTasksButton = page.locator(
      "//span[text()=' Deactivate and Reassign Tasks ']/ancestor::arw-button"
    );
    this.closeButton = page.locator("//span[text()='Close ']/parent::button");
    this.facilityColumn = page.locator(
      "//div[@data-column-definition-name='facilityName']"
    );
    this.roleColumn = page.locator(
      "//div[@data-column-definition-name='roleName']"
    );
    this.primaryLabel = page.locator(
      "//arw-chip[@class='inline-flex overflow-hidden max-w-full shrink-0 ng-star-inserted']"
    );
    this.assignPrimaryUserButton = page.locator(
      "//span[text()=' Assign a Primary User ']/parent::button"
    );
    this.resetFilters = page.locator(
      "//span[text()=' Reset to Default ']/parent::button"
    );
    this.userGidHeaders = page.locator(
      "(//div[contains(@id,'cdk-drop-list')])[2]//arw-header-cell"
    );
    this.userViewGridHeaders = (sortName) =>
      page.locator(`//div[normalize-space(text())='${sortName}']`);
    this.lastName = page.locator("//span[normalize-space(text())='Last Name']");
    this.sortBtn = (txt) =>
      page.locator(
        `//div[normalize-space(text())='${txt}']/../../..//div//button`
      );
    this.userViewGridColums = (gridCol) =>
      page.locator(
        `//div[@data-column-definition-name='${gridCol}']//span[contains(@class,'block overflow-hidden')]`
      );
    this.revFlowActiveInactiveGridColumn = page.locator(
      "//div[@data-column-definition-name='isActive']//div[contains(@class,'text-center')]"
    );
    this.activeInactiveToggleBtn = page.locator("//button[@role='switch']");
    this.lastNameGridSortBtn = page.locator(
      "(//span[normalize-space(text())='Last Name']/../..//div)[2]//button"
    );
    this.lastNameGridColums = page.locator(
      "//div[@class='flex gap-20 items-center ng-star-inserted']"
    );
    this.roleGridColums = page.locator(
      "//div[@data-column-definition-name='roleId']//div[@class='overflow-hidden text-ellipsis']"
    );
    this.userGridRow = page.locator(
      "(//div[@data-column-definition-name='lastName'])[2]"
    );
    this.userNameEditBtn = page.locator(
      "(//div[@class='relative flex items-center']//button)[1]"
    );
    this.userEmailEditBtn = page.locator(
      "(//div[@class='relative flex items-center']//button)[2]"
    );
    this.firstNameInput = page.locator(
      "(//div[@class='relative flex']//input)[1]"
    );
    this.lastNameInput = page.locator(
      "(//div[@class='relative flex']//input)[2]"
    );
    this.updateBtn = page.locator(
      "//button[contains(@class,'success arw-button')]"
    );
    this.userDetailsSuccussPopup = page.locator(
      "//div[contains(@class,'mat-mdc-snack-bar-label')]"
    );
    this.cancelBtn = page.locator("//span[normalize-space(text())='Cancel']");
    this.primaryTagInRoleview = page.locator(
      "(//div[@data-column-definition-name='roleId']//span[normalize-space(text())='Primary'])[1]"
    );
    this.primaryUserRoleColumn = page.locator(
      "(//span[normalize-space(text())='Primary'])[1]/ancestor::div[@data-column-definition-name='roleId']"
    );
    this.backUsermanagementscreenBtn = page.locator(
      "//a[normalize-space(text())='User Management']"
    );
    this.userViewBtn = page.locator(
      "//div[normalize-space(text())='USER VIEW']"
    );
    this.userFilterClearBtn = page.locator(
      "//button[contains(@class,'arw-select__clear')]"
    );
    this.facilitydroDownAddNewuser = page.locator(
      "//button[@aria-haspopup='menu']"
    );
    this.rolwDropdownAddNewuser = page.locator(
      "//div[@class='mat-mdc-select-value']//span[text()='Select']"
    );
    this.selectRoleOptionIndropdown = page.locator(
      "//mat-option[@role='option']"
    );
    this.newUserBtn = page.locator(
      "//span[normalize-space(text())='New User']"
    );
    this.roleColumnGrid = page.locator(
      "(//div[@data-column-definition-name='roleId']//div[contains(@class,'overflow-hidden')])[2]"
    );
    this.inActiveToggleBtn = page.locator(
      "//span[normalize-space(text())='Inactive']"
    );
    this.deactiveBtn = page.locator(
      "//span[normalize-space(text())='Deactivate']"
    );
    this.statusGridColumn = page.locator(
      "(//div[@data-column-definition-name='isActive']//div[contains(@class,'text-center')])[1]"
    );
    this.moreThanOnePrimaryUsersHyperText = page.locator(
      "(//a[contains(normalize-space(text()), 'Other Users')])[1]"
    );
    this.parmaryRadioBtn = page.locator("(//input[@tabindex='-1'])[1]");
    this.saveBtn = page.locator("//span[normalize-space(text())='Save']");
    this.usermanageGrid = page.locator(
      "//div[@data-column-definition-name='lastName']//arw-template-renderer"
    );
    this.roleStatus = page.locator(
      "//div[@data-column-definition-name='roleId']//span[@class='grow overflow-ellipsis overflow-hidden text-center whitespace-nowrap']"
    );
  }
  clickOnFacilityPayers = async () => {
    await excuteSteps(this.test, this.facilityPayers, "click", `click`);
  };
  clickOnInactiveToggleBtn = async () => {
    await excuteSteps(
      this.test,
      this.inActiveToggleBtn,
      "click",
      "Click on the inactive toggle"
    );
  };
  clickOnChangePrimaryRadioBtn = async () => {
    await excuteSteps(
      this.test,
      this.parmaryRadioBtn,
      "click",
      "Click change primary radio button"
    );
  };
  clickOnSavaBtn = async () => {
    await excuteSteps(this.test, this.saveBtn, "click", "Click on Save button");
  };
  clickOnDeactiveBtn = async () => {
    await excuteSteps(
      this.test,
      this.deactiveBtn,
      "click",
      "Click on the deactive button"
    );
  };
  clickResetToDefaultBtn = async () => {
    await excuteSteps(
      this.test,
      this.resetFilters,
      "click",
      `Click Reset to Default Button`
    );
  };
  clickOnSelectUserFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectUsersFilter,
      "click",
      "click on the selet users dropdown"
    );
  };
  getNoOfFacilities = async () => {
    const noOfFacilities = Number(
      await this.facilityRoleAssignments.innerText()
    );
    return noOfFacilities;
  };
  clickOnActiveInactiveToggleBtn = async () => {
    await excuteSteps(
      this.test,
      this.activeInactiveToggleBtn,
      "click",
      "Click active/Incative toggle button"
    );
  };
  clickDashboard = async () => {
    await excuteSteps(
      this.test,
      this.dashboard,
      "click",
      `Click on Dashboard in Homepage`
    );
  };
  clickOnSettingsButton = async () => {
    await excuteSteps(
      this.test,
      this.settingsButton,
      "click",
      `Click Settings Button in HomePage/Dashboard`
    );
  };
  clickUserManagementOption = async () => {
    await excuteSteps(
      this.test,
      this.userManagementOption,
      "click",
      `Click on User Management Option in Settings`
    );
  };
  clickOnNewUserButton = async () => {
    await excuteSteps(
      this.test,
      this.newUserButton,
      "click",
      `Click on New User Button`
    );
  };
  enterUserNameInSearchBox = async (name) => {
    await excuteSteps(
      this.test,
      this.searchUserInputBox,
      "fill",
      `Enter User Name ${name} in Search Box`,
      name
    );
  };
  clickOnUserbtn = async () => {
    await excuteSteps(
      this.test,
      this.newUserBtn,
      "click",
      "Click on the New user button"
    );
  };
  noOfSearchResults = async () => {
    return await this.searchResults.count();
  };
  noOfInRevflowFlags = async () => {
    return await this.inRevflowFlags.count();
  };
  closeAddNewUserWindow = async () => {
    await excuteSteps(
      this.test,
      this.closeButton,
      "click",
      `Click 'x' icon to close the Add New User Search Window`
    );
  };
  clickOnCancelBtn = async () => {
    await excuteSteps(
      this.test,
      this.cancelBtn,
      "click",
      "Click on the cancel button"
    );
  };
  clickSelectUsersDropDown = async () => {
    await excuteSteps(
      this.test,
      this.selectUsersDropDown,
      "click",
      `Click on Select Users Dropdown`
    );
  };
  clickOnBackToUserScreen = async () => {
    await excuteSteps(
      this.test,
      this.backUsermanagementscreenBtn,
      "click",
      "Navigate to usermanagement screen"
    );
  };
  clickOnUserViewBtn = async () => {
    await excuteSteps(
      this.test,
      this.userViewBtn,
      "click",
      "Navigate user view screen"
    );
  };
  clickOnUserFilterClearBtn = async () => {
    await excuteSteps(
      this.test,
      this.userFilterClearBtn,
      "click",
      "Click On the clearFilter button"
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
  selectAllCheckBox = async () => {
    await excuteSteps(
      this.test,
      this.allCheckBox,
      "click",
      `Select 'All' Checkbox`
    );
  };
  clickOnApplyButton = async () => {
    await excuteSteps(
      this.test,
      this.applyButton,
      "click",
      `Click on Apply Button`
    );
  };
  clickOnFacilityFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.facilityFilterDropdown,
      "click",
      "Click on the facility dropdown"
    );
  };
  clickOnSelectRoleFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectRoleFilterDropdown,
      "click",
      "Click on selectRoleFilterDropdown"
    );
  };
  clickOnUserViewSearchResultsLink = async () => {
    const resultsCount = await this.userViewSearchResults.count();
    const randomIndex = Math.floor(Math.random() * resultsCount);
    const resultLink = await this.userViewSearchResults.nth(randomIndex);
    await excuteSteps(
      this.test,
      resultLink,
      "click",
      `Click on the UserView Search Result Link`
    );
  };
  clickOnAssignNewLink = async () => {
    await excuteSteps(
      this.test,
      this.assignNewLink,
      "click",
      `Click on the Assign New Link`
    );
  };
  clickFacilityDropDown = async () => {
    await excuteSteps(
      this.test,
      this.facilityDropDown,
      "click",
      `Click on Facility Dropdown`
    );
  };
  selectFacilityOption = async () => {
    await this.clickFacilityDropDown();
    const visibleCount = await this.facilityOptions.count();
    const maxParentIndex = visibleCount - 3;
    const parentIndex = Math.floor(Math.random() * maxParentIndex);
    const parentRow = this.facilityOptions.nth(parentIndex);
    await excuteSteps(
      this.test,
      parentRow,
      "click",
      `Click on parent row at index ${parentIndex}`
    );
    await this.test.step("Waiting for child row to appear", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const childRow = this.facilityOptions.nth(parentIndex + 1);
    await excuteSteps(
      this.test,
      childRow,
      "click",
      `Click on child row at index ${parentIndex + 1}`
    );
    await this.test.step("Waiting for descendant row to appear", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const descendantRow = this.page
      .locator(
        "//div[@class='cdk-virtual-scroll-content-wrapper ng-scroll-content']/div"
      )
      .nth(parentIndex + 2);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    this.selectedFacility = await descendantRow.innerText();
    await excuteSteps(
      this.test,
      descendantRow,
      "click",
      `Click on descendant row at index ${parentIndex + 2} to select checkbox`
    );
    return this.selectedFacility;
  };
  clickRoleDropDown = async () => {
    await excuteSteps(
      this.test,
      this.roleDropDown,
      "click",
      `Click on Role Dropdown`
    );
  };
  selectRoleOption = async () => {
    await this.clickRoleDropDown();
    const noOfOptions = await this.roleOptions.count();
    const selectedOption = this.roleOptions.nth(
      Math.floor(Math.random() * noOfOptions)
    );
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    this.selectedRole = await selectedOption.innerText();
    await excuteSteps(
      this.test,
      selectedOption,
      "click",
      `Select a random option from Role Dropdown`
    );
    return this.selectedRole;
  };
  clickSaveButton = async () => {
    await excuteSteps(
      this.test,
      this.saveButton,
      "click",
      `Click on Save Button`
    );
  };
  clickOnChevronLeftButton = async () => {
    await excuteSteps(
      this.test,
      this.chevronLeftButton,
      "click",
      `Click on chevron left button to return to User Management Page`
    );
  };
  clickOnUserViewButton = async () => {
    await excuteSteps(
      this.test,
      this.userViewButton,
      "click",
      `Click on User View Button`
    );
  };
  clickFacilityAndRoleViewButton = async () => {
    await excuteSteps(
      this.test,
      this.facilityAndRoleViewButton,
      "click",
      `Click on Facility & Role View Button`
    );
  };
  clickSelectFacilitiesDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectFacilitiesDropdown,
      "click",
      `Click on Select Facilities Dropdown`
    );
  };
  clickSelectRolesDropdown = async () => {
    await excuteSteps(
      this.test,
      this.selectRolesDropdown,
      "click",
      `Click on Select Roles Dropdown`
    );
  };
  getFacilityHierarchyId = async () => {
    this.facilityName = await this.facilityHierarchyId.innerText();
    return this.facilityName;
  };
  clickOnCloseButton = async () => {
    await excuteSteps(
      this.test,
      this.closeButton,
      "click",
      `Click on Close Button`
    );
  };
  clickOnDeactivateAndReassignTasksButton = async () => {
    await excuteSteps(
      this.test,
      this.deactivateAndReassignTasksButton,
      "click",
      `Click on Deactive and Reassign Tasks Button`
    );
  };
  clickOnAssignPrimaryUserButton = async () => {
    await excuteSteps(
      this.test,
      this.assignPrimaryUserButton,
      "click",
      `Click on Assign a new user Button`
    );
  };
  clickOnUserGridRow = async () => {
    await excuteSteps(
      this.test,
      this.userGridRow,
      "click",
      "Click on the user row"
    );
  };
  clickOnFacilityDropdown = async () => {
    await excuteSteps(
      this.test,
      this.facilitydroDownAddNewuser,
      "click",
      "Click on facility dropdown option"
    );
  };
  clickOnRoleSelectDropdown = async () => {
    await excuteSteps(
      this.test,
      this.rolwDropdownAddNewuser,
      "click",
      "Click on role selection dropdown"
    );
  };
  selectRoleOptionFromDropdwon = async () => {
    await excuteSteps(
      this.test,
      this.selectRoleOptionIndropdown,
      "click",
      "Select the role option from the role dropdown"
    );
  };
  clickOnOtherHyperlink = async () => {
    await excuteSteps(
      this.test,
      this.moreThanOnePrimaryUsersHyperText,
      "click",
      "Click on the other hyperText"
    );
  };
  enterLocationInSearchFacilitiesDropDown = async () => {
    const noOfLocations = await this.facilityLocations.count();
    const locationIndex = Math.floor(Math.random() * (noOfLocations - 1)) + 1;
    const location = this.facilityLocations.nth(locationIndex + 1);
    const selectedLocation = await location.innerText();
    await this.clickSelectFacilitiesDropdown();
    await this.searchTextInSearchBox([selectedLocation]);
    await this.selectAllCheckBox();
    await this.clickOnApplyButton();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
  };
  changePrimaryUser = async () => {
    await this.primaryLabel
      .first()
      .waitFor({ state: "visible", timeout: 5000 });
    const primaryLabels = await this.primaryLabel.all();
    if (primaryLabels.length > 0) {
      let isDeactivated = false;
      while (!isDeactivated) {
        const randomIndex = Math.floor(Math.random() * primaryLabels.length);
        const inactiveToggleButton = this.page
          .locator(
            "//arw-chip[@class='inline-flex overflow-hidden max-w-full shrink-0 ng-star-inserted']" +
              "/ancestor::div[@data-column-definition-name='roleName']" +
              "/following-sibling::div[@data-column-definition-name='isActive']" +
              "//span[text()='Inactive']/parent::button"
          )
          .nth(randomIndex);
        this.facilityNameSelected = await this.facilityColumn
          .nth(randomIndex + 1)
          .innerText();
        console.log("Facility Name:", this.facilityNameSelected);
        this.roleNameSelected = await this.roleColumn
          .nth(randomIndex + 1)
          .innerText();
        console.log("Role Name:", this.roleNameSelected);
        await excuteSteps(
          this.test,
          inactiveToggleButton,
          "click",
          `Click on Inactive Toggle Button`
        );
        console.log(
          "Inactive toggle button clicked for primary label index:",
          randomIndex
        );
        const deactivateButtonVisible =
          await this.deactivateAndReassignTasksButton.isVisible();
        const assignButtonVisible =
          await this.assignPrimaryUserButton.isVisible();
        const closeButtonVisible = await this.closeButton.isVisible();
        if (deactivateButtonVisible) {
          await this.clickOnDeactivateAndReassignTasksButton();
          console.log("Deactivate and Reassign Tasks button clicked");
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
          const closeButtonVisibleAfterDeactivate =
            await this.closeButton.isVisible();
          if (closeButtonVisibleAfterDeactivate) {
            await this.clickOnCloseButton();
            console.log("Close button clicked after deactivation, retrying...");
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
          } else {
            //await expect(this.primaryLabel.locator(`nth=${randomIndex}`)).toHaveCount(0);
            console.log(
              "Primary label is no longer visible after Deactivate and Reassign Tasks button clicked"
            );
            isDeactivated = true;
          }
        } else if (assignButtonVisible) {
          await this.clickOnAssignPrimaryUserButton();
          const radioButtons = this.page.locator("//input[@type='radio']");
          const count = await radioButtons.count();
          const randomIndex = Math.floor(Math.random() * count);
          await excuteSteps(
            this.test,
            radioButtons.nth(randomIndex),
            "click",
            `Click on radio button`
          );
          const emailLocator = await page.locator(
            `//input[@type='radio'][${
              randomIndex + 1
            }]/parent::div/following-sibling::label//span[2]`
          );
          const userEmail = await emailLocator.innerText();
          console.log("Assigned Primary To: ", userEmail);
          await this.clickSaveButton();
          isDeactivated = true;
        } else if (closeButtonVisible) {
          await this.clickOnCloseButton();
          console.log("Close button clicked, retrying...");
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        } else {
          console.log("No button is visible. Ending process.");
          break;
        }
      }
    } else {
      console.log("No primary labels found!");
    }
  };
  handleUserDeactivation = async () => {
    await this.activeToggles
      .nth(0)
      .waitFor({ state: "visible", timeout: 5000 });
    const count = await this.activeToggles.count();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    let deactivated = false;
    let visitedCount = 0;
    while (!deactivated && visitedCount < count) {
      let randomIndex = Math.floor(Math.random() * count);
      let ariaChecked = "false";
      while (ariaChecked === "false") {
        const activeToggle = this.activeToggles.nth(randomIndex);
        ariaChecked = await activeToggle.getAttribute("aria-checked");
        if (ariaChecked === "false") {
          randomIndex = Math.floor(Math.random() * count);
        }
      }
      this.facilityNameSelected = await this.facilityColumn
        .nth(randomIndex + 1)
        .innerText();
      console.log("Facility Name:", this.facilityNameSelected);
      this.roleNameSelected = await this.roleColumn
        .nth(randomIndex + 1)
        .innerText();
      console.log("Role Name:", this.roleNameSelected);
      const inactiveToggle = this.page
        .locator(
          "//span[text()='Active']/ancestor::mat-button-toggle/following-sibling::mat-button-toggle"
        )
        .nth(randomIndex);
      await excuteSteps(
        this.test,
        inactiveToggle,
        "click",
        "Click on Inactive Toggle"
      );
      visitedCount++;
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
      if (await this.deactivateAndReassignTasksButton.isVisible()) {
        await excuteSteps(
          this.test,
          this.deactivateAndReassignTasksButton,
          "click",
          "Click on Deactivate and Reassign Tasks Button"
        );
        deactivated = true;
        break;
      } else if (await this.closeButton.isVisible()) {
        await this.clickOnCloseButton();
        continue;
      } else {
        console.log(
          "Neither Close button nor Deactivate and Reassign Tasks button is visible."
        );
      }
    }
    return this.facilityNameSelected, this.roleNameSelected;
  };
  checkActiveToggleIsDisabled = async () => {
    const correspondingActiveToggle = this.page.locator(
      `//span[text()='${this.facilityNameSelected}']` +
        `/ancestor::div[@data-column-definition-name='facilityName']` +
        `/following-sibling::div[@data-column-definition-name='roleName']` +
        `//div[text()=' ${this.roleNameSelected.split("\n")[0]} ']` +
        `/ancestor::div[@data-column-definition-name='roleName']` +
        `/following-sibling::div[@data-column-definition-name='isActive']` +
        `//span[text()='Active']/parent::button`
    );
    await correspondingActiveToggle.waitFor();
    const ariaChecked = await correspondingActiveToggle.getAttribute(
      "aria-checked"
    );
    console.log(
      `Checking toggle for ${this.facilityNameSelected} and ${this.roleNameSelected}: aria-checked = ${ariaChecked}`
    );
    expect(ariaChecked).toBe("false");
  };
  hoverOnUserViewGridHeaders = async (txt) => {
    await excuteSteps(
      this.test,
      this.userViewGridHeaders(txt),
      "hover",
      "Hover over the grid headers"
    );
  };
  hoverOnLastNameHeader = async () => {
    await excuteSteps(
      this.test,
      this.lastName,
      "hover",
      "Hover over the grid headers"
    );
  };
  clickOnSortBtn = async (txt) => {
    await excuteSteps(
      this.test,
      this.sortBtn(txt),
      "click",
      "Click On the sort button"
    );
  };
  clickOnLastNameSortBtn = async () => {
    await excuteSteps(
      this.test,
      this.lastNameGridSortBtn,
      "click",
      "Click On the sort button"
    );
  };
  clickOnUserNameEditbtn = async () => {
    await excuteSteps(
      this.test,
      this.userNameEditBtn,
      "click",
      "Click on the user name edit button"
    );
  };
  clickOnUserEmailEditbtn = async () => {
    await excuteSteps(
      this.test,
      this.userEmailEditBtn,
      "click",
      "Click on the user email edit button"
    );
  };
  userFirstnameInput = async (txt) => {
    await excuteSteps(
      this.test,
      this.firstNameInput,
      "fill",
      "Enter user first name in the first name input",
      txt
    );
  };
  userLastNameInput = async (txt) => {
    await excuteSteps(
      this.test,
      this.lastNameInput,
      "fill",
      "Enter user last name in the last name input",
      txt
    );
  };
  clickOnUpdateBtn = async () => {
    await excuteSteps(
      this.test,
      this.updateBtn,
      "click",
      "click Update button"
    );
  };
  updateEmailInput = async (txt) => {
    await excuteSteps(
      this.test,
      this.firstNameInput,
      "fill",
      "Enter user email address in the email input",
      txt
    );
  };
  verifySearchByExistingUser = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUserbtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const users = test_Data.RevflowData.userManagementData.existingUserNames;
    const existingUser = users[Math.floor(Math.random() * users.length)];
    await this.enterUserNameInSearchBox([existingUser]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    let noOfSearchResults = await this.noOfSearchResults();
    let noOfInRevflowFlags = await this.noOfInRevflowFlags();
    expect(noOfSearchResults).toBe(noOfInRevflowFlags);
    await this.clickOnCancelBtn();
  };
  verifySearchByNonExistingUser = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUserbtn();
    const users = test_Data.RevflowData.userManagementData.nonExistingUserNames;
    const nonExistingUser = users[Math.floor(Math.random() * users.length)];
    await this.enterUserNameInSearchBox([nonExistingUser]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    const errorMessage = await this.errorMessageBox.innerText();
    const expectedErrorMessage = errorMessage
      .replace(/\s+/g, " ")
      .replace("Found ", "Found. ")
      .trim();
    expect(expectedErrorMessage).toBe(
      "No Results Found. Consider refining your search or reviewing the entered name."
    );
    await this.clickOnCancelBtn();
  };
  verifyAddRoleAssignments = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    console.log("usersemail==", usersNames);
    console.log("roles==", roleNames);
    console.log("facilities==", randomFacilities);
    await this.clickSelectUsersDropDown();
    await this.searchTextInSearchBox([usersNames]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnUserGridRow();
    await this.clickOnNewUserButton();
    await this.clickOnFacilityDropdown();
    await this.searchTextInSearchBox([randomFacilities]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnRoleSelectDropdown();
    await this.searchTextInSearchBox([roleNames]);
    await this.selectRoleOptionFromDropdwon();
    await this.clickSaveButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnBackToUserScreen();
    await this.clickFacilityAndRoleViewButton();
    await this.clickOnFacilityFilterDropdown();
    await this.searchTextInSearchBox([randomFacilities]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnSelectRoleFilterDropdown();
    await this.searchTextInSearchBox([roleNames]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await expect(
      this.roleColumnGrid,
      "Verifying that a new role has been added to the user"
    ).toHaveText(roleNames);
  };
  verifyChangePrimaryToAnyUser = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickSelectUsersDropDown();
    await this.searchTextInSearchBox([
      test_Data.RevflowData.userManagementData.addRoleAssignmentUsername,
    ]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.selectAllCheckBox();
    await this.clickOnApplyButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickFacilityAndRoleViewButton();
    await this.enterLocationInSearchFacilitiesDropDown();
    await this.clickOnUserViewSearchResultsLink();
    await this.changePrimaryUser();
  };
  validateDeactivateFacilityRoleAssignment = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickSelectUsersDropDown();
    await this.searchTextInSearchBox([
      test_Data.RevflowData.userManagementData.addRoleAssignmentUsername,
    ]);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.selectAllCheckBox();
    await this.clickOnApplyButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUserViewSearchResultsLink();
    await this.handleUserDeactivation();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnChevronLeftButton();
    await this.clickOnUserViewButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUserViewSearchResultsLink();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.checkActiveToggleIsDisabled();
  };
  verifyFirstNameSortFunctunality = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector("//span[text()=' Settings ']", {
        state: "visible",
      });
    });
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector(
        "//div[normalize-space(text())='First Name']",
        { state: "visible" }
      );
    });
    await this.hoverOnUserViewGridHeaders("First Name");
    await this.clickOnSortBtn("First Name");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.userViewGridColums("firstName").allInnerTexts();
    console.log("firstNames==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that first names are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("First Name");
    await this.clickOnSortBtn("First Name");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const dscitems = await this.userViewGridColums("firstName").allInnerTexts();
    console.log("firstNames==", dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that First names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyLastNameSortFunctunality = async () => {
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector(
        "//div[normalize-space(text())='First Name']",
        { state: "visible" }
      );
    });
    await this.hoverOnLastNameHeader();
    await this.clickOnLastNameSortBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.lastNameGridColums.allInnerTexts();
    const cleanedNames = Ascitems.map(
      (text) =>
        text
          .trim()
          .replace(/^[A-Z]{2}\s*/, "") // remove initials like "AB ", "SA "
          .split("\n")
          .pop()
          .trim() // get only the last line (name)
    ).filter((name) => name);
    console.log("lastNames==", cleanedNames);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedAsc = [...cleanedNames].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

    expect(
      cleanedNames,
      "Verifying that last names are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnLastNameHeader();
    await this.clickOnLastNameSortBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const dscitems = await this.lastNameGridColums.allInnerTexts();
    const cleanedNamesDesc = dscitems
      .map(
        (text) =>
          text
            .trim()
            .replace(/^[A-Z]{2}\s*/, "") // remove initials like "AB ", "SA "
            .split("\n")
            .pop()
            .trim() // get only the last line (name)
      )
      .filter((name) => name);
    console.log("lastNames==", cleanedNamesDesc);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedDesc = [...cleanedNamesDesc].sort((a, b) =>
      b.localeCompare(a, undefined, { sensitivity: "base" })
    );

    expect(
      cleanedNamesDesc,
      "Verifying that last names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyEmailSortFunctunality = async () => {
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("Email");
    await this.clickOnSortBtn("Email");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.userViewGridColums("email").allInnerTexts();
    console.log("email==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that Emails are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("Email");
    await this.clickOnSortBtn("Email");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const dscitems = await this.userViewGridColums("email").allInnerTexts();
    console.log("email==", dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const cleanedItems = dscitems.map((txt) =>
      txt
        .replace(/[^a-z0-9]/gi, "")
        .trim()
        .toLowerCase()
    );

    // Step 2: Create a descending-sorted copy for expected order
    // Use localeCompare with base sensitivity for accurate, case-insensitive comparison
    const sortedDesc = [...cleanedItems].sort((a, b) =>
      b.localeCompare(a, undefined, { sensitivity: "base" })
    );
    expect(
      cleanedItems,
      "Verifying that Emails are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  // verifyEmailSortFunctunality = async () => {
  //   const normalizeEmail = (email) =>
  //     email.trim().toLowerCase().replace(/[-_]/g, ""); // remove - and _ for comparison

  //   // Wait for page/grid to load
  //   await this.test.step("Wait for page to load", async () => {
  //     await this.page.waitForTimeout(parseInt(process.env.largeWait));
  //   });

  //   // ---- ASCENDING SORT VALIDATION ----
  //   await this.hoverOnUserViewGridHeaders("Email");
  //   await this.clickOnSortBtn("Email");
  //   await this.page.waitForTimeout(parseInt(process.env.largeWait));

  //   const ascItemsRaw = await this.userViewGridColums("email").allInnerTexts();
  //   console.log("Ascending (raw):", ascItemsRaw);

  //   const ascItems = ascItemsRaw.map(normalizeEmail);

  //   for (let i = 0; i < ascItems.length - 1; i++) {
  //     expect(
  //       ascItems[i].localeCompare(ascItems[i + 1], undefined, { sensitivity: "base" }) <= 0,
  //       `Email list not sorted correctly at index ${i}: "${ascItemsRaw[i]}" vs "${ascItemsRaw[i + 1]}"`
  //     ).toBeTruthy();
  //   }
  //   console.log("All emails are correctly sorted in ascending order.");

  //   // ---- DESCENDING SORT VALIDATION ----
  //   await this.hoverOnUserViewGridHeaders("Email");
  //   await this.clickOnSortBtn("Email");
  //   await this.page.waitForTimeout(parseInt(process.env.largeWait));

  //   const descItemsRaw = await this.userViewGridColums("email").allInnerTexts();
  //   console.log("Descending (raw):", descItemsRaw);

  //   const descItems = descItemsRaw.map(normalizeEmail);

  //   for (let i = 0; i < descItems.length - 1; i++) {
  //     expect(
  //       descItems[i].localeCompare(descItems[i + 1], undefined, { sensitivity: "base" }) >= 0,
  //       `Email list not sorted correctly at index ${i}: "${descItemsRaw[i]}" vs "${descItemsRaw[i + 1]}"`
  //     ).toBeTruthy();
  //   }
  //   console.log("All emails are correctly sorted in descending order.");
  // };
  verifyAddedOnRevFlowSortFunctunality = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector("//span[text()=' Settings ']", {
        state: "visible",
      });
    });
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector(
        "//div[normalize-space(text())='First Name']",
        { state: "visible" }
      );
    });
    await this.hoverOnUserViewGridHeaders("Added to RevFlow On");
    await this.clickOnSortBtn("Added to RevFlow On");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.userViewGridColums("createdOn").allInnerTexts();
    console.log("createdOn==", Dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const dates = Dscitems.map((text) => new Date(text.trim()));
    const sortedDesc = [...dates].sort((a, b) => b - a);
    const isDescending = dates.every(
      (val, i) => i === 0 || val <= dates[i - 1]
    );
    expect(
      isDescending,
      "Verify that AddedRevFlow dates are sorted from newest to oldest when the 'Newest to Oldest' sort is applied"
    ).toBeTruthy();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("Added to RevFlow On");
    await this.clickOnSortBtn("Added to RevFlow On");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.userViewGridColums("createdOn").allInnerTexts();
    console.log("createdOn==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const dueDates = Ascitems.map((text) => new Date(text.trim()));

    // --- Validation for Ascending (Oldest to Newest) ---
    const sortedAsc = [...dueDates].sort((a, b) => a - b);
    const isAscending = dueDates.every(
      (val, i) => i === 0 || val >= dueDates[i - 1]
    );
    expect(
      isAscending,
      "Verify that AddedRevFlow dates are sorted from oldest to newest when the 'Oldest to Newest' sort is applied"
    ).toBeTruthy();
  };
  verifyRevFlowAccessSortFunctunality = async () => {
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnActiveInactiveToggleBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.hoverOnUserViewGridHeaders("RevFlow Access");
    await this.clickOnSortBtn("RevFlow Access");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.revFlowActiveInactiveGridColumn.allInnerTexts();
    console.log("isActive==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that RevFlow access  visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("RevFlow Access");
    await this.clickOnSortBtn("RevFlow Access");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const dscitems = await this.revFlowActiveInactiveGridColumn.allInnerTexts();
    console.log("isActive==", dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that RevFlow access visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyFacilitySortFunctionality = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector("//span[text()=' Settings ']", {
        state: "visible",
      });
    });
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.clickFacilityAndRoleViewButton();
    await this.hoverOnUserViewGridHeaders("Facility");
    await this.clickOnSortBtn("Facility");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.userViewGridColums(
      "facilityHierarchyId"
    ).allInnerTexts();
    console.log("facilityHierarchyId==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that facility names are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.hoverOnUserViewGridHeaders("Facility");
    await this.clickOnSortBtn("Facility");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const dscitems = await this.userViewGridColums(
      "facilityHierarchyId"
    ).allInnerTexts();
    console.log("facilityHierarchyId==", dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that Facility names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyFirstNameSortFunctunalityOnFacilityRow = async () => {
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("First Name");
    await this.clickOnSortBtn("First Name");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.userViewGridColums("firstName").allInnerTexts();
    console.log("firstNames==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that first names are visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("First Name");
    await this.clickOnSortBtn("First Name");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const dscitems = await this.userViewGridColums("firstName").allInnerTexts();
    console.log("firstNames==", dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that First names are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyAddedOnSortFunctunalityFacilityRoleView = async () => {
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector("//span[text()=' Settings ']", {
        state: "visible",
      });
    });
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForSelector(
        "//div[normalize-space(text())='First Name']",
        { state: "visible" }
      );
    });
    await this.hoverOnUserViewGridHeaders("Added On");
    await this.clickOnSortBtn("Added On");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Dscitems = await this.userViewGridColums("createdOn").allInnerTexts();
    console.log("createdOn==", Dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const dates = Dscitems.map((text) => new Date(text.trim()));
    const sortedDesc = [...dates].sort((a, b) => b - a);
    const isDescending = dates.every(
      (val, i) => i === 0 || val <= dates[i - 1]
    );
    expect(
      isDescending,
      "Verify that AddedRevFlow dates are sorted from newest to oldest when the 'Newest to Oldest' sort is applied"
    ).toBeTruthy();
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("Added On");
    await this.clickOnSortBtn("Added On");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.userViewGridColums("createdOn").allInnerTexts();
    console.log("createdOn==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const dueDates = Ascitems.map((text) => new Date(text.trim()));

    // --- Validation for Ascending (Oldest to Newest) ---
    const sortedAsc = [...dueDates].sort((a, b) => a - b);
    const isAscending = dueDates.every(
      (val, i) => i === 0 || val >= dueDates[i - 1]
    );
    expect(
      isAscending,
      "Verify that AddedRevFlow dates are sorted from oldest to newest when the 'Oldest to Newest' sort is applied"
    ).toBeTruthy();
  };
  verifyStatusSortFunctunalityFacilityRoleView = async () => {
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnActiveInactiveToggleBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.hoverOnUserViewGridHeaders("Status");
    await this.clickOnSortBtn("Status");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.revFlowActiveInactiveGridColumn.allInnerTexts();
    console.log("isActive==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that RevFlow access  visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("Status");
    await this.clickOnSortBtn("Status");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const dscitems = await this.revFlowActiveInactiveGridColumn.allInnerTexts();
    console.log("isActive==", dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that RevFlow access visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyStatusSortRoleFacilityRoleView = async () => {
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnActiveInactiveToggleBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.hoverOnUserViewGridHeaders("Role");
    await this.clickOnSortBtn("Role");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const Ascitems = await this.roleGridColums.allInnerTexts();
    console.log("role==", Ascitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedAsc = [...Ascitems].sort((a, b) => a.localeCompare(b));
    expect(
      Ascitems,
      "Verifying that Roles are  visible in ascending order when ascending sort is applied."
    ).toEqual(sortedAsc);
    await this.test.step("Wait for grid to load", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.hoverOnUserViewGridHeaders("Role");
    await this.clickOnSortBtn("Role");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const dscitems = await this.roleGridColums.allInnerTexts();
    console.log("role==", dscitems);
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    const sortedDesc = [...dscitems].sort((a, b) => b.localeCompare(a));
    expect(
      dscitems,
      "Verifying that roles are visible in descending order when descending sort is applied"
    ).toEqual(sortedDesc);
  };
  verifyUserEmailAndName = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.clickSelectUsersDropDown();
    await this.searchTextInSearchBox(["Santosh"]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.clickOnUserGridRow();
    let email = await this.page
      .locator("(//div[@class='relative flex items-center']//span)[3]")
      .innerText();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.clickOnUserNameEditbtn();
    await this.userFirstnameInput([
      test_Data.RevflowData.userManagementData.updatedUserFirstName,
    ]);
    await this.userLastNameInput([
      test_Data.RevflowData.userManagementData.updateUserLastName,
    ]);
    await this.clickOnUpdateBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await expect(
      this.userDetailsSuccussPopup,
      "Update user details success popup should visible"
    ).toBeVisible();
    await this.clickOnUserEmailEditbtn();
    await this.updateEmailInput([
      test_Data.RevflowData.userManagementData.updatedUserEmail,
    ]);
    await this.clickOnUpdateBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await expect(
      this.userDetailsSuccussPopup,
      "Update user details success popup should visible"
    ).toBeVisible();
    // update perivous details
    await this.clickOnUserNameEditbtn();
    await this.userFirstnameInput([
      test_Data.RevflowData.userManagementData.orginalUserFirstName,
    ]);
    await this.userLastNameInput([
      test_Data.RevflowData.userManagementData.orginalUserLastName,
    ]);
    await this.clickOnUpdateBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await expect(
      this.userDetailsSuccussPopup,
      "Update user details success popup should visible"
    ).toBeVisible();
    await this.clickOnUserEmailEditbtn();
    await this.updateEmailInput([email]);
    await this.clickOnUpdateBtn();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await expect(
      this.userDetailsSuccussPopup,
      "Update user details success popup should visible"
    ).toBeVisible();
  };
  verifyingChangePrimaryUser = async () => {
    await this.clickOnSettingsButton();
    await this.clickUserManagementOption();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let changeUserEmail;
    let getFacility;
    let getRole;
    let count = await this.usermanageGrid.count();
    console.log("count==", count);
    for (let i = 0; i < count; i++) {
      let usergrid = await this.usermanageGrid.nth(i);
      await this.test.step("Click on the user grid", async () => {
        await usergrid.click();
      });
      await this.test.step("The Page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
      });
      let moreThanOnePrimaryUserVisible =
        await this.moreThanOnePrimaryUsersHyperText.isVisible();
      if (moreThanOnePrimaryUserVisible) {
             await this.test.step("The Page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
      });
        getFacility = await this.page
          .locator(
            "((//a[contains(normalize-space(text()), 'Other Users')]) /ancestor::div[@data-column-definition-name='roleName'] /preceding-sibling::div[@data-column-definition-name='facilityName']//span[@class='arw-template-renderer'])[1]"
          )
          .innerText();
        console.log("facilityName=", getFacility);
        getRole = await this.page
          .locator(
            "(//a[contains(normalize-space(text()), 'Other Users')]/preceding-sibling::div[@class='overflow-hidden text-ellipsis'])[1]"
          )
          .innerText();
        console.log("Role==", getRole);
        await this.clickOnOtherHyperlink();
          await this.test.step("The Page is loading, please wait", async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeWait));
      });
        changeUserEmail = await this.page
          .locator(
            "(//input[@tabindex='-1']/ancestor::mat-radio-button//span[@class='web-body-1 text-foreground-high'])[1]"
          )
          .innerText();
        console.log("useremail==", changeUserEmail);
        await this.clickOnChangePrimaryRadioBtn();
        await this.clickOnSavaBtn();
        await this.clickOnBackToUserScreen();
        await this.clickFacilityAndRoleViewButton();
        await this.clickOnFacilityFilterDropdown();
        await this.searchTextInSearchBox([getFacility]);
        await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.page.keyboard.press("Enter");
        await this.clickOnApplyButton();
        await this.clickOnSelectRoleFilterDropdown();
        await this.searchTextInSearchBox([getRole]);
        await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.page.keyboard.press("Enter");
        await this.clickOnApplyButton();
        await this.clickOnSelectUserFilterDropdown();
        await this.searchTextInSearchBox([changeUserEmail]);
        await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.page.keyboard.press("Enter");
        await this.clickOnApplyButton();
         await this.test.step("The Page is loading, please wait", async () => {
          await this.page.waitForTimeout(parseInt(process.env.mediumWait));
        });
        await expect(
          this.roleStatus,
          "Verify the primary flag is visible after changing the user"
        ).toHaveText("Primary");
         break;
      } 
      else {
        await this.clickOnBackToUserScreen();
      }
    }
  };
};
