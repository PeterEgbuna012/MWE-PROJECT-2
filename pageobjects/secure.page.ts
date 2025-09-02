/**
 * SecurePage with Allure reporting and automatic failure screenshots
 */

import { $ } from '@wdio/globals';
import BasePage from './base.page.js';
import type { ChainablePromiseElement } from 'webdriverio';

class SecurePage extends BasePage {
    // Selector
    get flashAlert(): ChainablePromiseElement {
        return $('#flash');
    }

    // Page actions
    async getFlashAlertText(): Promise<string> {
        return this.performStep('Getting flash alert text', async () => {
            const alertElem = this.flashAlert;
            return await alertElem.getText();
        });
    }

    async isFlashAlertDisplayed(): Promise<boolean> {
        return this.performStep('Checking if flash alert is displayed', async () => {
            const alertElem = this.flashAlert;
            return await alertElem.isDisplayed();
        });
    }
}

export default new SecurePage();
