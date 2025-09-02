import { $ } from '@wdio/globals';
import BasePage from './base.page.js';
import type { ChainablePromiseElement } from 'webdriverio';
export default class InitPage extends BasePage {
  

    // -------------------- ELEMENT GETTERS --------------------
    get environmentTextField(): ChainablePromiseElement {
        return $('.//XCUIElementTypeTextField[@value="Environment Code"]');
    }

    get signInButton(): ChainablePromiseElement {
        return $('//XCUIElementTypeButton[@name="Sign In"]'); 
    }

    get connectButton(): ChainablePromiseElement {
        return $('//XCUIElementTypeButton[@name="CONNECT"]');
    }

    get selectRegionElement(): ChainablePromiseElement {
        return $('.//XCUIElementTypeOther[@value="Select region"]');
    }
get notificationsButton(): ChainablePromiseElement {
        return $('//XCUIElementTypeButton[@name=""]/following-sibling::XCUIElementTypeButton[1]');
    }
    get inputUsername(): ChainablePromiseElement {
        return $('//XCUIElementTypeTextField[@name="Username or email"]');
    }

    get inputPassword(): ChainablePromiseElement {
        return $('//XCUIElementTypeSecureTextField[@name="Password"]');
    }
 get backButton(): ChainablePromiseElement {
        return $('//XCUIElementTypeButton[@name=""]/preceding-sibling::XCUIElementTypeButton[1]');
    }
 get doneButton(): ChainablePromiseElement {
        return $('//XCUIElementTypeStaticText[@name="DONE"]/preceding-sibling::XCUIElementTypeButton[1]');
    }

    get dropdown(): ChainablePromiseElement {
        return $('.//XCUIElementTypeOther[@value="Select region"]');
    }



    // -------------------- METHODS --------------------

    async getPageTitle(): Promise<string> {
        return this.performStep("Get Init Page title", async () => {
            const titleElement = await $('//XCUIElementTypeStaticText');
            return await titleElement.getText();
        });
    }

    async isConnectButtonDisabled(): Promise<boolean> {
        return this.performStep("Check if Connect button is disabled", async () => {
            return (await this.connectButton.getAttribute("disabled")) !== null;
        });
    }

   
async selectRegion(country: string): Promise<void> {
    // Locate the button for the given country
    const regionButton = $(`//XCUIElementTypeButton[@name="${country}"]`);

    // Wait until the element is displayed on screen
    await regionButton.waitForDisplayed({ timeout: 20000 });

    // Click the button
    await regionButton.click();
}

clickButtonByName(buttonName: string): Promise<void> {
    return this.performStep(`Click ${buttonName} button`, async () => {
        const button = $(`//XCUIElementTypeButton[@name="${buttonName}"]`);
        await button.waitForDisplayed({ timeout: 20000 });
        await button.click();
    });
}

 /**
 * Optional: Return a text view element for entering a reason
 */
getTextViewForReason(): ChainablePromiseElement {
    return $('//XCUIElementTypeTextView[@value="Please enter a reason for returning the work..."]');
}
  

 /**
   * Maps button labels to UI elements.
   */
  public get buttonMap(): Record<string, ChainablePromiseElement> {
    return {
      'Sign In': this.signInButton,
      // Add more buttons here as needed
    };
  }
}


