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
    await inputField.waitForDisplayed({ timeout: 50000 });

    await inputField.click(); 
    await inputField.clearValue();
    await browser.pause(10000); 
    await inputField.setValue(value);
    await browser.pause(10000);
  }

  /**
   * Gets the current value of a field by name.
   * @param fieldName - e.g. 'summary', 'details', 'comment'
   */
  async getValueFromField(fieldName: string): Promise<string> {
    const normalizedField = fieldName.trim().toLowerCase();
    const selector = this.getSelectorForField(normalizedField);

    const inputField = await $(selector);
    await inputField.waitForDisplayed({ timeout: 50000 });
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
        case 'fail task reason':
        return '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeTextView[2]';
        case 'measurement input':
        return '//XCUIElementTypeTextField';
      case 'comment':
      case 'comments':
        return '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeTextView';
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
        await statusElement.waitForDisplayed({ timeout: 50000 });

        const actualStatus = await statusElement.getText();

        console.log(`Verifying Work Order Status -> Expected: "${expectedStatus}" | Found: "${actualStatus}"`);

        expect(actualStatus).toEqual(expectedStatus);
    }

 // 🔹 Precise selectors
  public readonly StartTimeField: string =
    '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[2]/XCUIElementTypeOther';
  public readonly EndTimeField: string =
    '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[3]/XCUIElementTypeOther';
  public readonly DoneButton: string = '//XCUIElementTypeButton[@name="Done"]';
  public readonly ReturnStartTimeField: string =
    '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[18]/XCUIElementTypeOther';
  public readonly ReturnEndTimeField: string =
    '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[19]/XCUIElementTypeOther';

  /**
   * Clicks the Start Time date field.
   */
  public async selectStartTimeField(): Promise<void> {
    const element = await $(this.StartTimeField);
    await element.waitForDisplayed({ timeout: 30000 });
    await element.click();
  }
/**
   * Clicks the Return Start Time date field.
   */
  public async selectReturnStartTimeField(): Promise<void> {
    const element = await $(this.ReturnStartTimeField);
    await element.waitForDisplayed({ timeout: 30000 });
    await element.click();
  }

  /**
   * Clicks the End Time date field.
   */
  public async selectEndTimeField(): Promise<void> {
    const element = await $(this.EndTimeField);
    await element.waitForDisplayed({ timeout: 30000 });
    await element.click();
  }

  public async selectReturnEndTimeField(): Promise<void> {
    const element = await $(this.ReturnEndTimeField);
    await element.waitForDisplayed({ timeout: 30000 });
    await element.click();
  }

  /**
   * Clicks the "Done" button after selecting a date.
   */
  public async clickDoneButton(): Promise<void> {
    const element = await $(this.DoneButton);
    await element.waitForDisplayed({ timeout: 30000 });
    await element.click();
  }

  /**
   * Utility: Get a date object offset from today
   * @param offset -1 = yesterday, 0 = today, 1 = tomorrow
   */
  private getDateWithOffset(offset: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date;
  }

  /**
   * Utility: Break date into parts
   */
  private getDateParts(offset: number): { day: string; month: string; year: string } {
    const date = this.getDateWithOffset(offset);

    const day = date.getDate().toString(); // "18"
    const month = date.toLocaleString('default', { month: 'long' }); // "September"
    const year = date.getFullYear().toString(); // "2025"

    return { day, month, year };
  }

  /**
   * Dynamically select a date in iOS calendar
   * Handles cross-month and cross-year boundaries
   */
  private async selectDate(offset: number): Promise<void> {
    const { day, month, year } = this.getDateParts(offset);

    // Try multiple possible formats (depends on iOS version / app UI)
    const possibleSelectors = [
      `//XCUIElementTypeStaticText[@name="${day}"]`,
      `//XCUIElementTypeStaticText[@name="${month} ${day}"]`,
      `//XCUIElementTypeStaticText[@name="${month} ${day}, ${year}"]`
    ];

    let elementFound = false;
    for (const selector of possibleSelectors) {
      const elements = await $$(selector);
      if (await elements.length > 0) {
        const element = elements[0];
        await element.waitForDisplayed({ timeout: 30000 });
        await element.click();
        elementFound = true;
        console.log(`📅 Selected date: ${month} ${day}, ${year} using selector: ${selector}`);
        break;
      }
    }

    if (!elementFound) {
      throw new Error(`❌ Could not find date element for ${month} ${day}, ${year}`);
    }
  }

  /**
   * Public method: Set date to yesterday
   */
  public async setDateToYesterday(): Promise<void> {
    await this.selectDate(-1);
  }

  /**
   * Public method: Set date to today
   */
  public async setDateToToday(): Promise<void> {
    await this.selectDate(0);
  }

  /**
   * Public method: Set date to tomorrow
   */
  public async setDateToTomorrow(): Promise<void> {
    await this.selectDate(1);
  }
    

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
async waitForCommentToBeShown(timeout = 50000): Promise<void> {
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

  // ✅ Locators for asset swap buttons
  private readonly confirmButton: string = '//XCUIElementTypeButton[@name="CONFIRM"]';
  private readonly swapButton: string = '//XCUIElementTypeButton[@name=" Search All Parts"]';
  private readonly confirmswapButton: string = '//XCUIElementTypeButton[@name=" Search All Parts"]';

  /**
   * Clicks an asset swap button by name
   */
  public async clickAssetSwapButton(buttonName: string): Promise<void> {
    const normalizedName = buttonName.toUpperCase();

    let selector = '';
    switch (normalizedName) {
      case 'CONFIRM':
        selector = this.confirmButton;
        break;
        
      case 'SWAP':
        selector = this.swapButton;
        break;

      case 'CONFIRM SWAP':
        selector = this.confirmswapButton;
        break;

      default:
        throw new Error(`No button mapped for asset swap action: ${buttonName}`);
    }

    const button = await $(selector);
    await button.waitForDisplayed({ timeout: 50000 });
    await button.click();
  }
    
/**
 * Utility to get formatted date components for picker.
 */
    private getFormattedDateOffset(offsetDays: number): { month: string; day: string; year: string } {
        const date = new Date();
        date.setDate(date.getDate() + offsetDays);

        return {
            month: date.toLocaleString('default', { month: 'long' }), 
            day: date.getDate().toString(),                            
            year: date.getFullYear().toString(),                       
        };
    }

    // Locator for the location search text field
  get locationSearchField() {
    return $('//XCUIElementTypeTextField[@value="Search Locations"]');
  }

   // Locator for the location search text field
  get selectLocationSearchField() {
    return $('//XCUIElementTypeTextField[@value="Select Location"]');
  }

  // Locator for the selected location label
  get selectedLocationLabel() {
    return $('//XCUIElementTypeStaticText[@name="SelectedLocationLabel"]');
  }

  // Locator for location results (e.g. search result rows)
  get locationResults() {
    return $$('//XCUIElementTypeOther[contains(@name, "LocationCell")]');
  }

  // Locator for location result by name (with  suffix)
  getLocationResultByName(name: string) {
    return $(`//XCUIElementTypeOther[@name="${name}"]"`);
  }

 // Locator for location result by name 
  getSelectLocationResultByName(name: string) {
    return $(`//XCUIElementTypeOther[@name="${name}"]`);
  }

  // ✅ Enter location name into search field
  async enterLocationSearch(locationName: string): Promise<void> {
    await this.locationSearchField.waitForDisplayed({ timeout: 50000 });
    await this.locationSearchField.setValue(locationName);
  }

  // ✅ Enter location into "Select Location" field
  async enterSelectLocation(locationName: string): Promise<void> {
    await this.selectLocationSearchField.waitForDisplayed({ timeout: 50000 });
    await this.selectLocationSearchField.setValue(locationName);
  }

  // ✅ Select location from result by name 
  async selectLocationResults(locationName: string): Promise<void> {
    const result = this.getSelectLocationResultByName(locationName);
    await result.waitForDisplayed({ timeout: 50000 });
    await result.click();
}

   // ✅ Select location from result by name (with )
  async selectLocationFromResult(locationName: string): Promise<void> {
    const result = this.getLocationResultByName(locationName);
    await result.waitForDisplayed({ timeout: 50000 });
    await result.click();
  }
  // ✅ Get selected location text for verification
  async getSelectedLocationText(): Promise<string> {
    await this.selectedLocationLabel.waitForDisplayed({ timeout: 50000 });
    return await this.selectedLocationLabel.getText();
  }

  // ✅ Click any named field (generic method)
  async clickField(fieldName: string): Promise<void> {
  let xpath = '';

  switch (fieldName.toUpperCase()) {
    case 'LOCATION SEARCH':
      // ✅ Correct locator (matches your working getter)
      xpath = '//XCUIElementTypeTextField[@value="Search Locations"]';
      break;

      case 'SEARCH BY PART CODE OR DESCRIPTION':
      // ✅ Correct locator (matches your working getter)
      xpath = '//XCUIElementTypeTextField[@value="Search by Part Code or Description"]';
      break;

    case 'SELECT LOCATION':
  xpath = '//XCUIElementTypeTextField[@value="Select Location"]';
  break;

    // Add other mappings as needed...

    default:
      xpath = `//XCUIElementTypeOther[@name="${fieldName}"]`;
  }

  const field = await $(xpath);
  await field.waitForDisplayed({ timeout: 50000 });
  await field.click();
}
 /**
   * Builds the selector for a location item by name.
   * Update this based on your UI element's structure.
   */
  getLocationSelector(locationName: string): string {
    // XPath for iOS static text element
    return `//XCUIElementTypeStaticText[@name="${locationName}"]`;
  }

  /**
   * Selects the location by clicking on it.
   */
  async selectLocation(locationName: string): Promise<void> {
    const selector = this.getLocationSelector(locationName);
    const locationElement = await $(selector);

    const exists = await locationElement.isExisting();
    if (!exists) {
      throw new Error(`Location "${locationName}" not found.`);
    }

    await locationElement.click();
  }

   get selectedLocation() {
    // For example, a label with the selected location name.
    // This could also be `~SelectedLocationLabel` for accessibility ID.
    return $('//XCUIElementTypeStaticText[@name="selectedLocationLabel"]');
  }

  // main filter list (top-level filters like All, Unread, etc.)
  get mainFilters() {
    return $$('selector-for-main-filters');
  }

  // sub filter list (options that appear after clicking a filter)
  get subFilters() {
    return $$('selector-for-sub-filters');
  }

  /**
   * Builds a generic XPath selector for a filter button or element.
   * Prioritizes `XCUIElementTypeButton` first, then falls back to `XCUIElementTypeOther`
   * @param name Name of the filter (e.g. "All", "Unread", "Read")
   * @returns XPath selector string
   */
  private buildFilterSelector(name: string): string {
    return `//XCUIElementTypeButton[@name="${name}"] | //XCUIElementTypeOther[@value="${name}"]`;
  }

  /**
   * Select a sub-filter from a main filter on iOS
   * @param mainFilter Main filter name (e.g. "All", "Unread", etc.)
   * @param subFilter Sub filter name (e.g. "Unread", "Read", etc.)
   */
  public async selectFromFilter(mainFilter: string, subFilter: string): Promise<void> {
    const mainSelector = this.buildFilterSelector(mainFilter);
    const subSelector = this.buildFilterSelector(subFilter);

    const mainElement = await $(mainSelector);
    await mainElement.waitForExist({ timeout: 100000 });
    await mainElement.click();

    const subElement = await $(subSelector);
    await subElement.waitForExist({ timeout: 100000 });
    await subElement.click();
  }
  

  /**
 * Select a sub-option from any dropdown/outcome/filter
 * @param mainOption Main dropdown/outcome/filter name (e.g., "Add to backlog")
 * @param subOption Sub-option to select (e.g., "Assign to me", "Found It, Fixed It")
 */
async selectFromDropdown(mainOption: string, subOption: string) {
  // Map main options to selectors
  const mainSelectors: Record<string, string> = {
    'Add to backlog': '//XCUIElementTypeOther[@value="Add to backlog"]',
    // add other main filters here if needed
  };

  // Map sub options to selectors
  const subSelectors: Record<string, string> = {
    'Add to backlog': '//XCUIElementTypeOther[@value="Add to backlog"]',
    'Found It, Fixed It': '//XCUIElementTypeButton[@name="Found It, Fixed It"]',
    'Assign to me': '//XCUIElementTypeButton[@name="Assign to me"]',
    // add other sub-options here if needed
  };

  const mainSelector = mainSelectors[mainOption];
  const subSelector = subSelectors[subOption];

  if (!mainSelector) {
    throw new Error(`No selector defined for main option "${mainOption}"`);
  }
  if (!subSelector) {
    throw new Error(`No selector defined for sub option "${subOption}"`);
  }

  // Wait for and click main option
  const mainElement = await $(mainSelector);
  await mainElement.waitForDisplayed({ timeout: 100000 });
  await mainElement.click();

  // Wait for and click sub option
  const subElement = await $(subSelector);
  await subElement.waitForDisplayed({ timeout: 100000 });
  await subElement.click();
}

// =====================
  // Sort By Selectors
  // =====================
get allUpdatesSortOption() {
    return $('//XCUIElementTypeOther[@value="All Updates"]');
  }

  get commentsSortOption() {
    return $('//XCUIElementTypeButton[@name="Comments"]');
  }

  get followOnsSortOption() {
    return $('//XCUIElementTypeButton[@name="Follow-Ons"]');
  }

  get workflowSortOption() {
    return $('//XCUIElementTypeButton[@name="Workflow"]');
  }

    /**
     * Returns the selector for a time log static text element matching the exact time string.
     * @param timeValue string like "1d 0h" or "0h 55m"
     */
    private getTimeLogElement(timeValue: string) {
        return $(`//XCUIElementTypeStaticText[@name="${timeValue}"]`);
    }

    /**
     * Compares the displayed time log value with expected value.
     * @param expectedValue - time string to verify
     */
    public async compareTimeLogValue(expectedValue: string): Promise<void> {
        const element = this.getTimeLogElement(expectedValue);

        await element.waitForDisplayed({
            timeout: 50000,
            timeoutMsg: `Time log "${expectedValue}" was not found on screen`,
        });

        const actualText = await element.getText();

        if (actualText !== expectedValue) {
            throw new Error(
                `❌ Time log mismatch: expected "${expectedValue}", but found "${actualText}"`
            );
        }
    }

}

export default new WorkOrderPage();
