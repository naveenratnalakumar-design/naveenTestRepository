const { expect } = require("@playwright/test");
const { excuteSteps } = require("../../utilities/actions");

exports.AgingPage = class AgingPage {
    constructor(test, page) {
        this.test = test;
        this.page = page;
        this.currentMonthToggle = page.locator("//span[text()='Current Month']/parent::label/preceding-sibling::button");
        this.allPriorBalancesToggle = page.locator("//span[text()='All Prior Balances']/parent::label/preceding-sibling::button");
        this.totalDisplayedBalanceToggle = page.locator("//span[text()='Total Displayed Balance']/parent::label/preceding-sibling::button");
        this.currentMonthColumn = page.locator("(//div[@data-column-definition-name='currentMonth'])[1]");
        this.allPriorBalancesColumn = page.locator("(//div[@data-column-definition-name='priorBalances'])[1]");
        this.totalDisplayedBalanceColumn = page.locator("(//div[@data-column-definition-name='totalBalance'])[1]");

        this.currentMonthSummaryColumn = page.locator("(//span[text()='Summary']/parent::div/following-sibling::div)[1]");
        this.allPriorBalancesSummaryColumn = page.locator("(//span[text()='Summary']/parent::div/following-sibling::div)[last()-1]");
        this.totalDisplayedBalanceSummaryColumn = page.locator("(//span[text()='Summary']/parent::div/following-sibling::div)[last()]");
    }

    clickOnCurrentMonthToggle = async () => {
        await excuteSteps(this.test, this.currentMonthToggle, "click", `Click on Current Month Toggle`);
    };

    clickOnAllPriorBalancesToggle = async () => {
        await excuteSteps(this.test, this.allPriorBalancesToggle, "click", `Click on All Prior Balances Toggle`);
    };

    clickOnTotalDisplayedBalanceToggle = async () => {
        await excuteSteps(this.test, this.totalDisplayedBalanceToggle, "click", `Click on Total Displayed Balance Toggle`);
    };

    getBalance = async (locator) => {
        const text = await locator.innerText();
        if (!text || text.trim() === '') {
            return 0;
        }
        const cleanedText = text.replace(/,/g, '').trim();
        const balance = parseFloat(cleanedText);
        if (isNaN(balance)) {
            return 0;
        }
        return Math.round(balance * 100) / 100;
    };

    verifyToggleStatusWhenOn = async () => {
        await expect(this.currentMonthToggle).toBeVisible();
        await expect(this.allPriorBalancesToggle).toBeVisible();
        await expect(this.totalDisplayedBalanceToggle).toBeVisible();
        await expect(this.currentMonthToggle).toBeEnabled();
        await expect(this.allPriorBalancesToggle).toBeEnabled();
        await expect(this.totalDisplayedBalanceToggle).toBeEnabled();
        await expect(this.currentMonthColumn).toBeVisible();
        await expect(this.allPriorBalancesColumn).toBeVisible();
        await expect(this.totalDisplayedBalanceColumn).toBeVisible();
    };

    verifyToggleStatusWhenOff = async () => {
        await this.clickOnCurrentMonthToggle();
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
        await expect(this.currentMonthToggle).toHaveAttribute("aria-checked", "false");
        await expect(this.currentMonthColumn).toBeHidden();

        await this.clickOnAllPriorBalancesToggle();
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
        await expect(this.allPriorBalancesToggle).toHaveAttribute("aria-checked", "false");
        await expect(this.allPriorBalancesColumn).toBeHidden();

        await this.clickOnTotalDisplayedBalanceToggle();
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
        await expect(this.totalDisplayedBalanceToggle).toHaveAttribute("aria-checked", "false");
        await expect(this.totalDisplayedBalanceColumn).toBeHidden();
    };

    verifyDataWhenTogglesAreOn = async () => {
        await this.currentMonthSummaryColumn.waitFor({ state: 'visible' });
        await this.allPriorBalancesSummaryColumn.waitFor({ state: 'visible' });
        await this.totalDisplayedBalanceSummaryColumn.waitFor({ state: 'visible' });

        this.currentMonthBalance = await this.getBalance(this.currentMonthSummaryColumn);
        this.allPriorBalance = await this.getBalance(this.allPriorBalancesSummaryColumn);
        this.totalDisplayedBalance = await this.getBalance(this.totalDisplayedBalanceSummaryColumn);

        await this.page.waitForTimeout(parseInt(process.env.mediumWait));

        await expect(this.currentMonthBalance).toBeGreaterThan(0);
        await expect(this.allPriorBalance).toBeGreaterThan(0);
        await expect(this.totalDisplayedBalance).toBeGreaterThan(0);
    };

    verifyDataWhenTogglesAreOff = async () => {
        let totalBefore = await this.getBalance(this.totalDisplayedBalanceSummaryColumn);
        await this.clickOnCurrentMonthToggle();
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
        let totalAfter = await this.getBalance(this.totalDisplayedBalanceSummaryColumn);
        await expect(Number((totalBefore - this.currentMonthBalance).toFixed(2))).toBe(Number(totalAfter.toFixed(2)));

        totalBefore = totalAfter;
        await this.clickOnAllPriorBalancesToggle();
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));
        totalAfter = await this.getBalance(this.totalDisplayedBalanceSummaryColumn);
        await expect(Number((totalBefore - this.allPriorBalance).toFixed(2)),"Validatin total summary balance when priorbalance toggle is off").toBe(Number(totalAfter.toFixed(2)));

        await this.clickOnTotalDisplayedBalanceToggle();
    };

    verifyDefaultToggles = async () => {
        await this.verifyToggleStatusWhenOn();
        await this.verifyToggleStatusWhenOff();
    };

    verifyActiveAndInactiveToggles = async () => {
        await this.verifyDataWhenTogglesAreOn();
        await this.verifyDataWhenTogglesAreOff();
    };
};