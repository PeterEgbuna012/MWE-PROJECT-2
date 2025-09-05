// pages/workOrder.page.ts
type FieldName = 'summary' | 'details';
import basePage from './base.page';
import BasePage from './base.page';
import type { ChainablePromiseElement } from 'webdriverio';
type ElementPromise = ChainablePromiseElement;

class WorkOrderPage extends BasePage {
   // Selector for "Add Manual Time Entry" (small case)
    public readonly addManualTimeEntryButton = '//XCUIElementTypeButton[@name="Add Manual Time Entry"]';

    // Selector for "ADD MANUAL TIME ENTRY" (all caps)
    public readonly addManualTimeEntryBtnAllCaps = '//XCUIElementTypeButton[@name="ADD MANUAL TIME ENTRY"]';

    get AddManualTimeEntryButton(): ChainablePromiseElement {
            return $('//XCUIElementTypeButton[@name="ADD MANUAL TIME ENTRY"]');
        }
    
    /**
     * Clicks the "Add Manual Time Entry" button (small case).
     */
    public async clickAddManualTimeEntry(): Promise<void> {
        await this.clickElement(this.addManualTimeEntryButton);
    }

    /**
     * Clicks the "ADD MANUAL TIME ENTRY" button (all caps).
     */
    public async clickAddManualTimeEntryBtn(): Promise<void> {
        await this.clickElement(this.addManualTimeEntryBtnAllCaps);
    }

    /**
  /**
   * Sets a value in the specified field by name (case-insensitive).
   * @param fieldName - e.g. 'summary', 'details', 'comment'
   * @param value - The value to enter
   */
  async setValueInField(fieldName: string, value: string): Promise<void> {
    const normalizedField = fieldName.trim().toLowerCase();
    const selector = this.getSelectorForField(normalizedField);

    const inputField = await $(selector);
    await inputField.waitForDisplayed({ timeout: 20000 });

    await inputField.click(); 
    await inputField.clearValue();
    await browser.pause(3000); 
    await inputField.setValue(value);
    await browser.pause(3000);
  }

  /**
   * Gets the current value of a field by name.
   * @param fieldName - e.g. 'summary', 'details', 'comment'
   */
  async getValueFromField(fieldName: string): Promise<string> {
    const normalizedField = fieldName.trim().toLowerCase();
    const selector = this.getSelectorForField(normalizedField);

    const inputField = await $(selector);
    await inputField.waitForDisplayed({ timeout: 20000 });
    return inputField.getText();
  }

  /**
   * Internal: Maps normalized field name to XPath selector.
   */
  private getSelectorForField(normalizedField: string): string {
    switch (normalizedField) {
      case 'summary':
        return '//XCUIElementTypeTextView[@value="Enter summary..."]';
      case 'details':
        return '//XCUIElementTypeTextView[@value="Enter details..."]';
      case 'comment':
      case 'comments':
        return '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeTextView[2]';
        case 'description':
        return '//XCUIElementTypeTextView[@value="Please Enter Description"]';
      default:
        throw new Error(`Field "${normalizedField}" is not supported.`);
    }
  }
  
  /**
     * Returns the status element assumed to be at the bottom-left side of the screen.
     */
    public getStatusElement(status: string): ChainablePromiseElement {
        if (!status) {
            throw new Error(`Status string is required.`);
        }

        // Target the last matching static text (assumed bottom-left)
        const xpath = `(//XCUIElementTypeStaticText[@label="${status}" or @name="${status}"])[last()]`;
        return $(xpath);
    }

    /**
     * Verifies the work order status matches the expected value.
     */
    public async verifyWorkOrderStatus(expectedStatus: string): Promise<void> {
        const statusElement = this.getStatusElement(expectedStatus);

        // Move to the element (focus, not scroll)
        await statusElement.moveTo();

        // Wait until it is visible
        await statusElement.waitForDisplayed({ timeout: 10000 });

        const actualStatus = await statusElement.getText();

        console.log(`Verifying Work Order Status -> Expected: "${expectedStatus}" | Found: "${actualStatus}"`);

        expect(actualStatus).toEqual(expectedStatus);
    }

// Precise selectors
    private readonly startTimeField: string = '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[2]/XCUIElementTypeOther';
    private readonly endTimeField: string = '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[3]/XCUIElementTypeOther';
    private readonly doneButton: string = '//XCUIElementTypeButton[@name="Done"]';

    private readonly datePickerWheel = (index: number) => `//XCUIElementTypePickerWheel[${index}]`;

    /**
     * Clicks the Start Time date field.
     */
    public async selectStartTimeField(): Promise<void> {
        await this.clickElement(this.startTimeField);
    }

    /**
     * Clicks the End Time date field.
     */
    public async selectEndTimeField(): Promise<void> {
        await this.clickElement(this.endTimeField);
    }

    /**
     * Clicks the "Done" button after selecting a date.
     */
    public async clickDoneButton(): Promise<void> {
        await this.clickElement(this.doneButton);
    }

    /**
     * Sets the date picker to yesterday's date.
     */
    public async setDateToYesterday(): Promise<void> {
        const date = this.getFormattedDateOffset(-1);
        await this.setDatePicker(date);
    }

    /**
     * Sets the date picker to today's date.
     */
    public async setDateToToday(): Promise<void> {
        const date = this.getFormattedDateOffset(0);
        await this.setDatePicker(date);
    }

    /**
     * Sets the value on the native iOS date picker.
     */
    private async setDatePicker({ month, day, year }: { month: string; day: string; year: string }): Promise<void> {
        const wheels = [1, 2, 3];

        for (const i of wheels) {
            const wheel = await $(this.datePickerWheel(i));
            const value = await wheel.getAttribute('value');

            if (value?.includes(month)) {
                await wheel.setValue(month);
            } else if (value?.includes(day)) {
                await wheel.setValue(day);
            } else if (value?.includes(year)) {
                await wheel.setValue(year);
            }
        }
    }
    
 /**
   /**
 * Selector to click on the comment (opens comment info).
 */
private get commentClickElement() {
    return $('//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[4]');
}

/**
 * Selector to get the comment info text after clicking.
 */
private get commentInfoElement() {
    return $('//XCUIElementTypeStaticText[@name="Comment Info"]');
}

/**
 * Clicks the comment element.
 */
async clickComment(): Promise<void> {
    await this.commentClickElement.waitForDisplayed({
        timeout: 5000,
        timeoutMsg: '❌ Comment click element not visible.',
    });
    await this.commentClickElement.click();
}

/**
 * Gets the comment info text after clicking.
 */
async getCommentInfoText(): Promise<string> {
    await this.commentInfoElement.waitForDisplayed({
        timeout: 5000,
        timeoutMsg: '❌ Comment info not visible after clicking comment.',
    });
    return this.commentInfoElement.getText();
}

/**
 * Waits until a comment element (starting with "comment:") is visible.
 */
async waitForCommentToBeShown(timeout = 5000): Promise<void> {
    await this.commentInfoElement.waitForDisplayed({
        timeout,
        timeoutMsg: '❌ Expected comment to be shown, but it was not found.',
    });
}
public get assetField() {
    return $('(//XCUIElementTypeTextField)[2]');
}
async isAssetFieldPopulated(): Promise<boolean> {
        return this.isFieldPopulated(this.assetField);
    }

 /**
     * Returns true if the given input or text element has a non-empty value.
     */
    async isFieldPopulated(element: ChainablePromiseElement): Promise<boolean> {
        const isDisplayed = await element.isDisplayed();
        if (!isDisplayed) return false;

        const value = await element.getValue();
        return value.trim().length > 0;
    }
    

    
/**
 * Utility to get formatted date components for picker.
 */
    private getFormattedDateOffset(offsetDays: number): { month: string; day: string; year: string } {
        const date = new Date();
        date.setDate(date.getDate() + offsetDays);

        return {
            month: date.toLocaleString('default', { month: 'long' }), // "August"
            day: date.getDate().toString(),                            // "29"
            year: date.getFullYear().toString(),                       // "2025"
        };
    }

      // Locator for the search text field
  get locationSearchField() {
        return $('//XCUIElementTypeTextField[@value="Search Locations"]');
    }

    getLocationResultByName(name: string) {
        const fullName = `${name}`;
        return $(`//XCUIElementTypeOther[@name="${fullName}"]`);
    }

    // Example: assume the selected location is shown in a static label
    get selectedLocationLabel() {
        return $('//XCUIElementTypeStaticText[@name="SelectedLocationLabel"]');
    }

    async getSelectedLocationText(): Promise<string> {
        await this.selectedLocationLabel.waitForDisplayed({ timeout: 5000 });
        return await this.selectedLocationLabel.getText();
    }


    /**
     * Returns the selector for a time log static text element matching the exact time string.
     * @param timeValue string like "1d 0h" or "0h 55m"
     */
    private getTimeLogElement(timeValue: string) {
        // Using XPath with predicate on name attribute
        return $(`//XCUIElementTypeStaticText[@name="${timeValue}"]`);
    }

    /**
     * Compares the displayed time log value with expected value.
     * @param expectedValue - time string to verify
     */
    public async compareTimeLogValue(expectedValue: string): Promise<void> {
        const element = this.getTimeLogElement(expectedValue);
        await element.waitForDisplayed({ timeout: 5000 });
        const actualText = await element.getText();
        expect(actualText).toEqual(expectedValue);
    }

}

export default new WorkOrderPage();
