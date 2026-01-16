/**
 * LoginPage with Allure reporting and dynamic actions
 */
import type { ChainablePromiseElement } from 'webdriverio';
import { $ } from '@wdio/globals';
import allure from '@wdio/allure-reporter';

import BasePage from './base.page.js';

export default class LoginPage extends BasePage {
  static hamburgerIcon: any;
    async login(username: string, password: string) {
        await this.enterTextInField("Username or email", username);
        await this.enterPassword(password);
        await this.clickButtonByName("Sign In");
    }
    
    // ✅ Generic: enter text into text field by placeholder
    async enterTextInField(placeholder: string, value: string) {
        return this.performStep(`Enter text in field: ${placeholder}`, async () => {
            const field = await $(`//XCUIElementTypeTextField[@value="${placeholder}"]`);
            await field.waitForDisplayed();
            await field.setValue(value);
        });
    }
   
    // ✅ Password entry (secure field)
    async enterPassword(value: string) {
        return this.performStep("Enter password", async () => {
            const field = await $('(//XCUIElementTypeSecureTextField[@name="Password"])[1]');
            await field.waitForDisplayed();
            await field.setValue(value);
        });
    }

    // ✅ Generic button click
    async clickButtonByName(name: string) {
        return this.performStep(`Click button: ${name}`, async () => {
            const button = await $(`//XCUIElementTypeButton[@name="${name}"]`);
            await button.waitForDisplayed();
            await button.click();
        });
    }

    // ✅ Generic static text validation
    async verifyTextDisplayed(text: string) {
        return this.performStep(`Verify text displayed: ${text}`, async () => {
            const element = await $(`//XCUIElementTypeStaticText[contains(@name,"${text}")]`);
            await expect(element).toBeDisplayed();
        });
    }

    

     // Selectors
        get inputUsername() {
        return $('//XCUIElementTypeTextField[@name="Username or email"]');
            
        }
    
        get inputPassword() {
            // Ensure index is valid; adjust if needed
            return $('(//XCUIElementTypeSecureTextField[@name="Password"])[1]');
        }
    
        get allowButton() {
        return $('.//XCUIElementTypeButton[@name="Allow"]');
        }

        get Europe() {
        return $('//XCUIElementTypeButton[@name="Europe"]');
        } 
        get US() {
        return $('//XCUIElementTypeButton[@name="US"]');
        } 
    
        get rejectButton() {
        return $('.//XCUIElementTypeButton[@name="Reject"]');
            
        }
    
        get worklistPage() {
        return $('.//XCUIElementTypeStaticText[@name="My Work List"]');
            
        }
    
        get WO() {
        return $('.//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[5]');
        }
    
        get WO2() {
        return $('.//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[7]');
        }
    
        get timetracking() {
        return $('.//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[6]');
        }
    
        get task() {
        return $('.//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[5]');
        }
    
        get material() {
        return $('.//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[7]');
        }
    
        get work() {
        return $('~Work');
        }
    
        get WOPage() {
        return $('.//XCUIElementTypeStaticText[@name="Work"]');
        }
    
        get startWorkButton() {
        return $('.//XCUIElementTypeButton[@name="Start Work"]');
        }
    
        get hamburgerIcon() {
        return $('//XCUIElementTypeButton[@name=""]');
        }
    
        get searchTextfield() {
        return $('//XCUIElementTypeTextField[@value="Search by Part Code or Description"]');
        }
    
        get blankTextfield() {
        return $('//XCUIElementTypeTextField');
        }
    
        get logoutButton() {
        return $('.//XCUIElementTypeButton[@name="Logout"]');
        }


        
        // Page actions using dynamic click
async clickAllow() {
    return this.clickButtonByName('Allow');
}

async clickReject() {
    return this.clickButtonByName('Reject');
}

async clickStartWork() {
    return this.clickButtonByName('Start Work');
}

async logout() {
    return this.performStep('Logging out', async () => {
        await this.clickButtonByName('');
        await this.clickButtonByName('Logout');
    });
}



        // ✅ Utility wrapper with Allure reporting
    protected async performStep<T>(stepDescription: string, action: () => Promise<T>): Promise<T> {
        try {
            allure.startStep(stepDescription);
            const result = await action();
            allure.endStep('passed');
            return result;
        } catch (error) {
            const screenshot = await browser.takeScreenshot();
            allure.addAttachment('Screenshot on failure', Buffer.from(screenshot, 'base64'), 'image/png');
            allure.endStep('failed');
            throw error;
        }
    }
}
