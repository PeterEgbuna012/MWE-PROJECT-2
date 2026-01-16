import { $ } from '@wdio/globals';
import BasePage from './base.page.js';
import type { ChainablePromiseElement } from 'webdriverio';

export default class PhotoPage extends BasePage {
    static photo_visible(photo_visible: any) {
    throw new Error("Method not implemented.");
    }
    get photoVisible(): ChainablePromiseElement {
        return $('//XCUIElementTypeImage');
    }

    async verifyPhotoVisible() {
        return this.performStep("Verify photo is visible", async () => {
            await expect(this.photoVisible).toBeDisplayed();
        });
    }
}
