import { $ } from '@wdio/globals';
import BasePage from './base.page.js';
import type { ChainablePromiseElement } from 'webdriverio';

export default class WorklistPage extends BasePage {
    get worklistTitle(): ChainablePromiseElement {
        return $('//XCUIElementTypeStaticText[@name="My Work List"]');
    }

    async verifyWorklistIsDisplayed() {
        return this.performStep("Verify Worklist Page is displayed", async () => {
            await expect(this.worklistTitle).toBeDisplayed();
        });
    }
}
