const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");
const test_Data = require("../../test_Data/testData.json");
const randomPickPayerCategories =
  test_Data.RevflowData.OverridePayerCategories[
    Math.floor(
      Math.random() * test_Data.RevflowData.OverridePayerCategories.length
    )
  ];
exports.FacilityPage = class FacilityPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.settingsBtn = page.locator(
      "//span[normalize-space(text())='Settings']"
    );
    this.facilityBtn = page.locator(
      "//span[normalize-space(text())='Facility Payers']"
    );
    this.facilityFilterDropdown = page.locator(
      "//span[text()='Select Facilities']"
    );
    this.searchInput = page.locator("//input[@placeholder='Search']");
    this.selectFaciltyFilterOption = page.locator(
      "//span[text()='Regal Heights']"
    );
    this.applyBtn = page.locator("//span[normalize-space(text())='Apply']");
    this.payersFilterDropdown = page.locator("//span[text()='Select Payers']");
    this.editBtn = page.locator("(//span[text()='Edit'])[1]");
    this.FacilityPayergrid = (txt) => page.locator(`//span[text()='${txt}']`);
    this.overridePayercategoryDropdown = page.locator(
      "//div[contains(@class,'select-trigger')]"
    );
    this.saveBtn = page.locator("//span[normalize-space(text())='Save']");
    this.overridePayerCategoryOptions = (txt) =>
      page.locator(`//div[normalize-space(text())='${txt}']`);
    this.payerNameRow = page.locator("(//span[@class='ng-star-inserted'])[1]");
    this.facilityNameRow = page.locator(
      "(//span[@class='ng-star-inserted'])[2]"
    );
    this.payerCategoryRow = page.locator(
      "(//span[@class='arw-template-renderer'])[3]"
    );
  }
  clickOnSettings = async () => {
    await excuteSteps(
      this.test,
      this.settingsBtn,
      "click",
      `Click the Settings button in the left-side navigation menu`
    );
  };
  clickOnFacility = async () => {
    await excuteSteps(
      this.test,
      this.facilityBtn,
      "click",
      `Click the facility button in the left-side navigation menu`
    );
  };
  clickOnFacilityFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.facilityFilterDropdown,
      "click",
      `Click on the facility filter dropdown`
    );
  };
  searchFilterName = async (txt) => {
    await excuteSteps(
      this.test,
      this.searchInput,
      "fill",
      `Search filter name in the fileter search input`,
      txt
    );
  };
  clickOnApplyButton = async () => {
    await excuteSteps(
      this.test,
      this.applyBtn,
      "click",
      `Click on the Apply button`
    );
  };
  clickOnPayersFilterDropdown = async () => {
    await excuteSteps(
      this.test,
      this.payersFilterDropdown,
      "click",
      `Click on the payers filters dropdown`
    );
  };
  selectFacilityFilterOptions = async () => {
    await excuteSteps(
      this.test,
      this.selectFaciltyFilterOption,
      "click",
      `Slect facility option from the facility dropdown`
    );
  };
  clickOnEditBtn = async () => {
    await excuteSteps(
      this.test,
      this.editBtn,
      "click",
      `Click on the edit button`
    );
  };
  clickOnOverridePayerCategoryDropdown = async () => {
    await excuteSteps(
      this.test,
      this.overridePayercategoryDropdown,
      "click",
      `Click on the overridePayerCategory dropdown`
    );
  };
  selectOverridePayerCategoryOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.overridePayerCategoryOptions(txt),
      "click",
      `Select overridePayerCategory option from the dropdown`
    );
  };
  clickOnSaveButton = async () => {
    await excuteSteps(
      this.test,
      this.saveBtn,
      "click",
      `Click on the save button`
    );
  };
  validateFacilityPayerFilter = async () => {
    await this.clickOnSettings();
    await this.clickOnFacility();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnFacilityFilterDropdown();
    await this.searchFilterName([
      test_Data.RevflowData.facilityPagedata.facilityName,
    ]);
    await this.selectFacilityFilterOptions();
    await this.clickOnApplyButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnPayersFilterDropdown();
    await this.searchFilterName([
      test_Data.RevflowData.facilityPagedata.payerName,
    ]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let facilityTxt = "Regal Heights";
    let payerTxt = "Zzrespite";
    await expect(
      this.FacilityPayergrid(facilityTxt),
      "Verifying the FacilityName is correctly displayed on the Facility-Payer grid after applying the filter"
    ).toHaveText(test_Data.RevflowData.facilityPagedata.facilityName);
    await expect(
      this.FacilityPayergrid(payerTxt),
      "Verifying the PayerName is correctly displayed on the Facility-Payer grid after applying the filter"
    ).toHaveText(test_Data.RevflowData.facilityPagedata.payerName);
  };
  VerifyOverridingPayerCategory = async () => {
    await this.clickOnSettings();
    await this.clickOnFacility();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    let payerNameRowInnerTxt = await this.payerNameRow.innerText();
    let facilityNameRowInnerTxt = await this.facilityNameRow.innerText();
    console.log("payerName==", payerNameRowInnerTxt);
    console.log("facilityName==", facilityNameRowInnerTxt);
    await this.clickOnEditBtn();
    await this.clickOnOverridePayerCategoryDropdown();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.smallWait));
    });
    await this.selectOverridePayerCategoryOptions([randomPickPayerCategories]);
    await this.clickOnSaveButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnFacilityFilterDropdown();
    await this.searchFilterName([facilityNameRowInnerTxt]);
    await this.page.keyboard.press("Enter");
    await this.clickOnApplyButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnPayersFilterDropdown();
    await this.searchFilterName([payerNameRowInnerTxt]);
    await this.page.keyboard.press("Enter");
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    });
    await this.clickOnApplyButton();
    await this.test.step("The Page is loading, please wait", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await expect(
      this.payerCategoryRow,
      "Verify the updated override payer category name is displayed in the facility grid"
    ).toHaveText(randomPickPayerCategories);
  };
};
