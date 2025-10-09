const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const test_Data = require("../../test_Data/testData.json");

exports.UserManagementPage = class UserManagementPage {
    constructor(test, page) {
        this.test = test;
        this.page = page;
        this.settingsButton = page.locator("//span[text()=' Settings ']");
        this.userManagementOption = page.locator("//span[text()=' User Management ']");
        this.newUserButton = page.locator("//span[text()='New User']/parent::button");
        this.searchUserInputBox = page.locator(
            "//input[@placeholder='Search Users by First Name, Last Name or Email']"
        );
        this.searchResults = page.locator("//div[@role='listbox']/div");
        this.inRevflowFlags = page.locator("//span[contains(text(),'In RevFlow')]");
        this.errorMessageBox = page.locator("//div[@class='w-full text-foreground-high']/div");
        this.closeButton = page.locator("//arw-button[@icon='x']");
        this.selectUsersDropDown = page.locator("//span[text()='Select Users']/parent::button");
        this.searchInputBox = page.locator("//input[@placeholder='Search']");
        this.allCheckBox = page.locator("//label[contains(text(),'All')]/preceding-sibling::div");
        this.applyButton = page.locator("//span[text()=' Apply ']/parent::button");
        this.facilityRoleAssignments = page.locator(
            "(//div[@data-column-definition-name='facilityRoleAssignments'])[2]//div"
        )
        this.userViewSearchResults = page.locator("//div[@role='link']");
        this.assignNewLink = page.locator("//span[text()=' Assign New ']/parent::button");
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
        this.facilityAndRoleViewButton = page.locator("//div[text()=' FACILITY & ROLE VIEW ']");
        this.selectFacilitiesDropdown = page.locator(
            "//span[text()='Select Facilities']/ancestor::arw-select-tree"
        );
        this.selectRolesDropdown = page.locator(
            "//span[text()='Select Roles']/ancestor::arw-select-tree"
        );
        this.facilityHierarchyId = page.locator(
            "((//div[@data-column-definition-name='facilityHierarchyId'])[2]//span)[2]"
        )
        this.facilityLocations = page.locator(
            "//div[@data-column-definition-name='facilityHierarchyId']"
        )
        this.activeToggles = page.locator("//span[text()='Active']/parent::button");
        this.deactivateAndReassignTasksButton = page.locator(
            "//span[text()=' Deactivate and Reassign Tasks ']/ancestor::arw-button"
        );
        this.closeButton = page.locator("//span[text()='Close ']/parent::button");
        this.facilityColumn = page.locator("//div[@data-column-definition-name='facilityName']");
        this.roleColumn = page.locator("//div[@data-column-definition-name='roleName']");
        this.primaryLabel = page.locator(
            "//arw-chip[@class='inline-flex overflow-hidden max-w-full shrink-0 ng-star-inserted']"
        );
        this.assignPrimaryUserButton = page.locator(
            "//span[text()=' Assign a Primary User ']/parent::button"
        );
        this.resetFilters = page.locator("//span[text()=' Reset to Default ']/parent::button");
    }
    clickOnFacilityPayers = async () => {
        await excuteSteps(
            this.test,
            this.facilityPayers,
            "click",
            `click`
        )
    }
    clickResetToDefaultBtn = async () => {
        await excuteSteps(
            this.test,
            this.resetFilters,
            "click",
            `Click Reset to Default Button`
        )
    }
    getNoOfFacilities = async () => {
        const noOfFacilities = Number(await this.facilityRoleAssignments.innerText());
        return noOfFacilities;
    };
    clickDashboard = async () => {
        await excuteSteps(
            this.test,
            this.dashboard,
            "click",
            `Click on Dashboard in Homepage`
        )
    }
    clickOnSettingsButton = async () => {
        await excuteSteps(
            this.test,
            this.settingsButton,
            "click",
            `Click Settings Button in HomePage/Dashboard`
        )
    }
    clickUserManagementOption = async () => {
        await excuteSteps(
            this.test,
            this.userManagementOption,
            "click",
            `Click on User Management Option in Settings`
        )
    }
    clickOnNewUserButton = async () => {
        await excuteSteps(
            this.test,
            this.newUserButton,
            "click",
            `Click on New User Button`
        )
    }
    enterUserNameInSearchBox = async (name) => {
        await excuteSteps(
            this.test,
            this.searchUserInputBox,
            "fill",
            `Enter User Name ${name} in Search Box`,
            name
        )
    }
    noOfSearchResults = async () => {
        return await this.searchResults.count();
    }
    noOfInRevflowFlags = async () => {
        return await this.inRevflowFlags.count();
    }
    closeAddNewUserWindow = async () => {
        await excuteSteps(
            this.test,
            this.closeButton,
            "click",
            `Click 'x' icon to close the Add New User Search Window`
        )
    }
    clickSelectUsersDropDown = async () => {
        await excuteSteps(
            this.test,
            this.selectUsersDropDown,
            "click",
            `Click on Select Users Dropdown`
        )
    }
    searchTextInSearchBox = async (text) => {
        await excuteSteps(
            this.test,
            this.searchInputBox,
            "fill",
            `Enter ${text} in searchBox`,
            text
        )
    }
    selectAllCheckBox = async () => {
        await excuteSteps(
            this.test,
            this.allCheckBox,
            "click",
            `Select 'All' Checkbox`
        )
    }
    clickOnApplyButton = async () => {
        await excuteSteps(
            this.test,
            this.applyButton,
            "click",
            `Click on Apply Button`
        )
    }
    clickOnUserViewSearchResultsLink = async () => {
        const resultsCount = await this.userViewSearchResults.count();
        const randomIndex = Math.floor(Math.random() * resultsCount);
        const resultLink = await this.userViewSearchResults.nth(randomIndex)
        await excuteSteps(
            this.test,
            resultLink,
            "click",
            `Click on the UserView Search Result Link`
        )
    }
    clickOnAssignNewLink = async () => {
        await excuteSteps(
            this.test,
            this.assignNewLink,
            "click",
            `Click on the Assign New Link`
        )
    }
    clickFacilityDropDown = async () => {
        await excuteSteps(
            this.test,
            this.facilityDropDown,
            "click",
            `Click on Facility Dropdown`
        )
    }
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
        const descendantRow = this.page.locator(
            "//div[@class='cdk-virtual-scroll-content-wrapper ng-scroll-content']/div"
        ).nth(parentIndex + 2);
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
    }
    clickRoleDropDown = async () => {
        await excuteSteps(
            this.test,
            this.roleDropDown,
            "click",
            `Click on Role Dropdown`
        )
    }
    selectRoleOption = async () => {
        await this.clickRoleDropDown();
        const noOfOptions = await this.roleOptions.count();
        const selectedOption = this.roleOptions.nth(Math.floor(Math.random() * (noOfOptions)));
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        this.selectedRole = await selectedOption.innerText();
        await excuteSteps(
            this.test,
            selectedOption,
            "click",
            `Select a random option from Role Dropdown`
        )
        return this.selectedRole;
    }
    clickSaveButton = async () => {
        await excuteSteps(
            this.test,
            this.saveButton,
            "click",
            `Click on Save Button`
        )
    }
    clickOnChevronLeftButton = async () => {
        await excuteSteps(
            this.test,
            this.chevronLeftButton,
            "click",
            `Click on chevron left button to return to User Management Page`
        )
    }
    clickOnUserViewButton = async () => {
        await excuteSteps(
            this.test,
            this.userViewButton,
            "click",
            `Click on User View Button`
        )
    }
    clickFacilityAndRoleViewButton = async () => {
        await excuteSteps(
            this.test,
            this.facilityAndRoleViewButton,
            "click",
            `Click on Facility & Role View Button`
        )
    }
    clickSelectFacilitiesDropdown = async () => {
        await excuteSteps(
            this.test,
            this.selectFacilitiesDropdown,
            "click",
            `Click on Select Facilities Dropdown`
        )
    }
    clickSelectRolesDropdown = async () => {
        await excuteSteps(
            this.test,
            this.selectRolesDropdown,
            "click",
            `Click on Select Roles Dropdown`
        )
    }
    getFacilityHierarchyId = async () => {
        this.facilityName = await this.facilityHierarchyId.innerText();
        return this.facilityName;
    }
    clickOnCloseButton = async () => {
        await excuteSteps(
            this.test,
            this.closeButton,
            "click",
            `Click on Close Button`
        )
    }
    clickOnDeactivateAndReassignTasksButton = async () => {
        await excuteSteps(
            this.test,
            this.deactivateAndReassignTasksButton,
            "click",
            `Click on Deactive and Reassign Tasks Button`
        )
    }
    clickOnAssignPrimaryUserButton = async () => {
        await excuteSteps(
            this.test,
            this.assignPrimaryUserButton,
            "click",
            `Click on Assign a new user Button`
        )
    }
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
    }
    changePrimaryUser = async () => {
        await this.primaryLabel.first().waitFor({ state: 'visible', timeout: 5000 });
        const primaryLabels = await this.primaryLabel.all();
        if (primaryLabels.length > 0) {
            let isDeactivated = false;
            while (!isDeactivated) {
                const randomIndex = Math.floor(Math.random() * primaryLabels.length);
                const inactiveToggleButton = this.page.locator(
                    "//arw-chip[@class='inline-flex overflow-hidden max-w-full shrink-0 ng-star-inserted']"
                    + "/ancestor::div[@data-column-definition-name='roleName']"
                    + "/following-sibling::div[@data-column-definition-name='isActive']"
                    + "//span[text()='Inactive']/parent::button"
                ).nth(randomIndex);
                this.facilityNameSelected = await this.facilityColumn.nth(randomIndex + 1).innerText();
                console.log("Facility Name:", this.facilityNameSelected);
                this.roleNameSelected = await this.roleColumn.nth(randomIndex + 1).innerText();
                console.log("Role Name:", this.roleNameSelected);
                await excuteSteps(
                    this.test,
                    inactiveToggleButton,
                    "click",
                    `Click on Inactive Toggle Button`
                )
                console.log('Inactive toggle button clicked for primary label index:', randomIndex);
                const deactivateButtonVisible = await this.deactivateAndReassignTasksButton.isVisible();
                const assignButtonVisible = await this.assignPrimaryUserButton.isVisible();
                const closeButtonVisible = await this.closeButton.isVisible();
                if (deactivateButtonVisible) {
                    await this.clickOnDeactivateAndReassignTasksButton();
                    console.log('Deactivate and Reassign Tasks button clicked');
                    await this.page.waitForTimeout(parseInt(process.env.smallWait));
                    const closeButtonVisibleAfterDeactivate = await this.closeButton.isVisible();
                    if (closeButtonVisibleAfterDeactivate) {
                        await this.clickOnCloseButton();
                        console.log('Close button clicked after deactivation, retrying...');
                        await this.page.waitForTimeout(parseInt(process.env.smallWait));
                    } else {
                        //await expect(this.primaryLabel.locator(`nth=${randomIndex}`)).toHaveCount(0);
                        console.log("Primary label is no longer visible after Deactivate and Reassign Tasks button clicked");
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
                        `//input[@type='radio'][${randomIndex + 1}]/parent::div/following-sibling::label//span[2]`
                    );
                    const userEmail = await emailLocator.innerText();
                    console.log('Assigned Primary To: ', userEmail);
                    await this.clickSaveButton();
                    isDeactivated = true;
                } else if (closeButtonVisible) {
                    await this.clickOnCloseButton();
                    console.log('Close button clicked, retrying...');
                    await this.page.waitForTimeout(parseInt(process.env.smallWait));
                } else {
                    console.log('No button is visible. Ending process.');
                    break;
                }
            }
        } else {
            console.log('No primary labels found!');
        }
    }
    handleUserDeactivation = async () => {
        await this.activeToggles.nth(0).waitFor({ state: 'visible', timeout: 5000 });
        const count = await this.activeToggles.count();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        let deactivated = false;
        let visitedCount = 0;
        while (!deactivated && visitedCount < count) {
            let randomIndex = Math.floor(Math.random() * count);
            let ariaChecked = 'false';
            while (ariaChecked === 'false') {
                const activeToggle = this.activeToggles.nth(randomIndex);
                ariaChecked = await activeToggle.getAttribute("aria-checked");
                if (ariaChecked === 'false') {
                    randomIndex = Math.floor(Math.random() * count);
                }
            }
            this.facilityNameSelected = await this.facilityColumn.nth(randomIndex + 1).innerText();
            console.log("Facility Name:", this.facilityNameSelected);
            this.roleNameSelected = await this.roleColumn.nth(randomIndex + 1).innerText();
            console.log("Role Name:", this.roleNameSelected);
            const inactiveToggle = this.page.locator(
                "//span[text()='Active']/ancestor::mat-button-toggle/following-sibling::mat-button-toggle"
            ).nth(randomIndex);
            await excuteSteps(
                this.test,
                inactiveToggle,
                "click",
                "Click on Inactive Toggle"
            );
            visitedCount++;
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
            if (await this.deactivateAndReassignTasksButton.isVisible()) {
                await excuteSteps(this.test, this.deactivateAndReassignTasksButton, "click", "Click on Deactivate and Reassign Tasks Button");
                deactivated = true;
                break;
            } else if (await this.closeButton.isVisible()) {
                await this.clickOnCloseButton();
                continue;
            } else {
                console.log("Neither Close button nor Deactivate and Reassign Tasks button is visible.");
            }
        }
        return this.facilityNameSelected, this.roleNameSelected;
    }
    checkActiveToggleIsDisabled = async () => {
        const correspondingActiveToggle = this.page.locator(
            `//span[text()='${this.facilityNameSelected}']`
            + `/ancestor::div[@data-column-definition-name='facilityName']`
            + `/following-sibling::div[@data-column-definition-name='roleName']`
            + `//div[text()=' ${this.roleNameSelected.split("\n")[0]} ']`
            + `/ancestor::div[@data-column-definition-name='roleName']`
            + `/following-sibling::div[@data-column-definition-name='isActive']`
            + `//span[text()='Active']/parent::button`
        );
        await correspondingActiveToggle.waitFor();
        const ariaChecked = await correspondingActiveToggle.getAttribute("aria-checked");
        console.log(`Checking toggle for ${this.facilityNameSelected} and ${this.roleNameSelected}: aria-checked = ${ariaChecked}`);
        expect(ariaChecked).toBe('false');
    }
    verifySearchByExistingUser = async () => {
        await this.clickOnSettingsButton();
        await this.clickUserManagementOption();
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.clickOnNewUserButton();
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
        await this.closeAddNewUserWindow();
    }
    verifySearchByNonExistingUser = async () => {
        await this.clickOnSettingsButton();
        await this.clickUserManagementOption();
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.clickOnNewUserButton();
        const users = test_Data.RevflowData.userManagementData.nonExistingUserNames;
        const nonExistingUser = users[Math.floor(Math.random() * users.length)];
        await this.enterUserNameInSearchBox([nonExistingUser]);
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.mediumWait));
        });
        const errorMessage = await this.errorMessageBox.innerText();
        const expectedErrorMessage = errorMessage
            .replace(/\s+/g, ' ')
            .replace('Found ', 'Found. ')
            .trim();
        expect(expectedErrorMessage).toBe(
            "No Results Found. Consider refining your search or reviewing the entered name."
        );
        await this.closeAddNewUserWindow();
    }
    verifyAddRoleAssignments = async () => {
        await this.clickOnSettingsButton();
        await this.clickUserManagementOption();
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.clickSelectUsersDropDown();
        await this.searchTextInSearchBox([
            test_Data.RevflowData.userManagementData.addRoleAssignmentUsername
        ]);
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.selectAllCheckBox();
        await this.clickOnApplyButton();
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.userViewSearchResults.waitFor({ state: 'visible' });
        const noOfFacilitiesBeforeAssignment = await this.getNoOfFacilities();
        await this.clickOnUserViewSearchResultsLink();
        await this.clickOnAssignNewLink();
        let assigned = false;
        let previousFacility = "";
        let previousRole = "";
        while (!assigned) {
            const selectedFacility = await this.selectFacilityOption();
            console.log(`Selected Facility: ${selectedFacility}`);
            await this.clickOnApplyButton();
            await this.test.step("The Page is loading, please wait", async () => {
                await this.page.waitForTimeout(parseInt(process.env.smallWait));
            });
            const selectedRole = await this.selectRoleOption();
            console.log(`Selected Role: ${selectedRole}`);
            await this.clickSaveButton();
            await this.test.step("The Page is loading, please wait", async () => {
                await this.page.waitForTimeout(parseInt(process.env.smallWait));
            });
            if (selectedFacility === previousFacility && selectedRole === previousRole) {
                console.error("Error: Repeated selection of facility and role. Retrying...");
                continue;
            }
            previousFacility = selectedFacility;
            previousRole = selectedRole;
            assigned = true;
            console.log(`Successfully assigned Facility: ${selectedFacility} and Role: ${selectedRole}`);
        }
        await this.clickOnChevronLeftButton();
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.largeWait));
        });
        const noOfFacilitiesAfterAssignment = await this.getNoOfFacilities();
        expect(noOfFacilitiesAfterAssignment).toBe(noOfFacilitiesBeforeAssignment + 1);
        console.log(`Before: ${noOfFacilitiesBeforeAssignment}, After: ${noOfFacilitiesAfterAssignment}`);
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.clickFacilityAndRoleViewButton();
        await this.clickSelectFacilitiesDropdown();
        await this.searchTextInSearchBox([this.selectedFacility]);
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.selectAllCheckBox();
        await this.clickOnApplyButton();
        await this.clickSelectRolesDropdown();
        await this.searchTextInSearchBox([this.selectedRole]);
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.selectAllCheckBox();
        await this.clickOnApplyButton();
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.getFacilityHierarchyId();
        expect(this.facilityName.trim()).toBe(this.selectedFacility.trim());
    }
    verifyChangePrimaryToAnyUser = async () => {
        await this.clickOnSettingsButton();
        await this.clickUserManagementOption();
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.clickSelectUsersDropDown();
        await this.searchTextInSearchBox([
            test_Data.RevflowData.userManagementData.addRoleAssignmentUsername
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
    }
    validateDeactivateFacilityRoleAssignment = async () => {
        await this.clickOnSettingsButton();
        await this.clickUserManagementOption();
        await this.test.step("The Page is loading, please wait", async () => {
            await this.page.waitForTimeout(parseInt(process.env.smallWait));
        });
        await this.clickSelectUsersDropDown();
        await this.searchTextInSearchBox([
            test_Data.RevflowData.userManagementData.addRoleAssignmentUsername
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
    }
}