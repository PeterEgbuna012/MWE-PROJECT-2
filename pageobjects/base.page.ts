import { $ , $$ } from '@wdio/globals';
import allure from '@wdio/allure-reporter';
import type { ChainablePromiseElement } from 'webdriverio';
import path, { format, format as pathFormat } from 'path/win32';
import { format as dateFormat } from 'date-fns';

import * as fs from 'fs';


export default class BasePage {
    static delay(arg0: number) {
        throw new Error('Method not implemented.');
    }

  /** Perform a step with Allure reporting + screenshot on failure */
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
async waitAndClick(element: WebdriverIO.Element, timeout = 50000): Promise<void> {
    await element.waitForDisplayed({ timeout });
    await element.click();
  }
/**
   * Delay execution for a number of milliseconds
   */
  public async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get static text element by visible label
   */
  public getStaticTextElement(label: string): ChainablePromiseElement {
    return $(`-ios predicate string:type == 'XCUIElementTypeStaticText' AND label == '${label}'`);
  }

  /**
   * Wait for an element to be displayed
   */
  public async waitForElement(
    element: ChainablePromiseElement,
    timeout = 20000
  ): Promise<void> {
    await element.waitForDisplayed({ timeout });
  }


  
  /** Click element by XPath */
  async clickElement(selector: string, timeout = 50000): Promise<void> {
        const el = await $(selector);

        // Scroll into view if needed
        try {
            if (!(await el.isDisplayed())) {
                await el.scrollIntoView();
            }
        } catch (err) {
            console.warn(`Element not visible, attempting scroll: ${selector}`);
        }

        // Wait until displayed
        await el.waitForDisplayed({ timeout });

        // Click
        await el.click();
    }
 // Getter for START WORK button
    get STARTWORKButton(): ChainablePromiseElement {
        return $('//XCUIElementTypeButton[@name="START WORK"]');
    }


 // Getter for PAUSE button
get PAUSEButton(): ChainablePromiseElement {
    return $('//XCUIElementTypeButton[@name="Pause"]');
}
  

    // Generic button clicker
async clickButtonByName(name: string, timeout = 50000): Promise<void> {
    let xpath: string;
    const upper = name.toUpperCase();
    const lower = name.toLowerCase();

    switch (upper) {
        case 'START ICON':
            xpath = '//XCUIElementTypeButton[@name=""]';
            break;

            case 'PAUSE ICON':
            xpath = '//XCUIElementTypeButton[@name=""]';
            break;

        case 'START WORK':
            xpath = '//XCUIElementTypeButton[@name="START WORK"]';
            break;

        case 'PAUSE WORK ORDER':
            xpath = '//XCUIElementTypeButton[@name="PAUSE WORK ORDER"]';
            break;

        case 'DONE':
            xpath = '//XCUIElementTypeButton[@name="Done"]';
            break;

            case 'ON HOLD':
            xpath = '//XCUIElementTypeButton[@name="On Hold"]';
            break;

          case 'PAUSE':
            xpath = '//XCUIElementTypeButton[@name="Pause"]';
            break; 
          
            case 'COMPLETE':
            xpath = '//XCUIElementTypeButton[@name="Complete"]';
            break; 

            case 'PERMANENT FIX':
            xpath = '//XCUIElementTypeButton[@name="Permanent Fix"]';
            break;

            case 'WORK COMPLETE':
            xpath = '//XCUIElementTypeButton[@name="Work Complete"]';
            break;

          case 'RETURN ICON':
            xpath = '//XCUIElementTypeStaticText[@name=""]';
            break; 

        case 'RETURN':
            xpath = '//XCUIElementTypeButton[@name="Return"]';
            break;

          case 'RETURN WORK':
            xpath = '//XCUIElementTypeButton[@name="Return Work Order"]';
            break; 

            case 'TEAM VIEW ICON':
            xpath = '//XCUIElementTypeButton[@name=""]';
            break;

            case 'CONFIRM':
            xpath = '//XCUIElementTypeButton[@name="CONFIRM"]';
            break;

            case 'LOCATION EDIT':
            xpath = '//XCUIElementTypeStaticText[@name=""]';
            break;

            case 'LOCATION SEARCH':
            xpath = '//XCUIElementTypeTextField[@value="Search Locations"]';
            break; 

            case 'ADD COMMENT BUTTON':
            xpath = '//XCUIElementTypeButton[@name="ADD COMMENT"]';
            break;

            case 'ADD COMMENT':
            xpath = '//XCUIElementTypeButton[@name="Add Comment"]';
            break;

            case 'CREATE FOLLOW-ON WORK ORDER':
            xpath = '//XCUIElementTypeButton[@name="Create Follow-On Work Order"]';
            break;

            case 'CREATE FOLLOW ON':
            xpath = '//XCUIElementTypeButton[@name="CREATE FOLLOW ON"]';
            break;

            case 'FAIL TASK':
            xpath = '//XCUIElementTypeButton[@name="FAIL TASK"]';
            break;

              case 'CREATE FOLLOW-ON':
            xpath = '//XCUIElementTypeButton[@name="CREATE FOLLOW-ON"]';
            break;

            case 'HISTORY TAB':
            xpath = '//XCUIElementTypeStaticText[@name="History"]';
            break;

            case 'MARK ALL AS READ':
            xpath = '//XCUIElementTypeButton[@name="Mark All As Read"]';
            break;

            case 'HIDE COMPLETED TASKS':
            xpath = '//XCUIElementTypeButton[@name="Hide Completed Tasks"]';
            break;

          
            case 'WORK TAB':
            xpath = '//XCUIElementTypeStaticText[@name="Work"]';
            break;

            case 'DETAILS TAB':
            xpath = '//XCUIElementTypeStaticText[@name="Details"]';
            break;

            case 'FILES TAB':
            xpath = '//XCUIElementTypeStaticText[@name="Files"]';
            break;

            case 'BOOKMARK ICON':
            xpath = '(//XCUIElementTypeStaticText[@name=""])[1]';
            break;

            case 'SEE MORE':
            xpath = '//XCUIElementTypeStaticText[@name="See More"]';
            break;

            case 'SEE LESS':
            xpath = '//XCUIElementTypeStaticText[@name="See Less"]';
            break;

            case 'FILTER OPTIONS':
            xpath = '(//XCUIElementTypeOther[@value="All Updates"])[2]';
            break;

            case 'COMMENTS OPTION':
            xpath = '//XCUIElementTypeButton[@name="Comments"]';
            break;

            case 'FOLLOW-ONS OPTION':
            xpath = '//XCUIElementTypeButton[@name="Follow-Ons"]';
            break;

            case 'ALL UPDATES OPTION':
            xpath = '//XCUIElementTypeButton[@name="All Updates"]';
            break;

            case 'WORKFLOW OPTION':
            xpath = '//XCUIElementTypeButton[@name="Workflow"]';
            break;

            case 'SELECT A TEMPLATE ':
            xpath = '//XCUIElementTypeOther[@value="Select a Template"]';
            break;

            case 'TYPE FIELD':
            xpath = '//XCUIElementTypeOther[@value="Select type..."]';
            break;

            case 'UPDATE':
            xpath = '//XCUIElementTypeButton[@name="UPDATE"]';
            break;

            case 'ADD TO LIST':
            xpath = '//XCUIElementTypeButton[@name="ADD TO LIST"]';
            break;

            case 'SEARCH':
            xpath = '//XCUIElementTypeButton[@name="SEARCH"]';
            break;

            case 'MORE ACTION ICON':
            xpath = '//XCUIElementTypeButton[@name=""]';
            break;

            case 'SEARCH ALL PARTS':
            xpath = '//XCUIElementTypeButton[@name=" Search All Parts"]';
            break;

        case 'RETURN WORK ORDER':
            xpath = '//XCUIElementTypeButton[@name="RETURN WORK ORDER"]';
            break;

            case 'NEXT':
            xpath = '//XCUIElementTypeButton[@name="NEXT"]';
            break;

            case 'RESERVE':
            xpath = '(//XCUIElementTypeButton[@name=""])[1]';
            break;

            case 'PLUS':
            xpath = '//XCUIElementTypeStaticText[@name=""]';
            break;

            case 'CONFIRM':
            xpath = '//XCUIElementTypeButton[@name="CONFIRM"]';
            break;

            case 'SAVE':
            xpath = '//XCUIElementTypeButton[@name="SAVE"]';
            break;

        case 'SIGN OUT':
            xpath = '//XCUIElementTypeButton[@name="Sign Out"]';
            break;

        case 'BACK':
            xpath = '//XCUIElementTypeButton[@name=""]';
            break;

            case 'GO TO ASSET SWAP':
            xpath = '//XCUIElementTypeButton[@name="GO TO ASSET SWAP"]';
            break;

            case 'TAP TO SELECT OUTBOUND ASSET':
            xpath = '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[8]';
            break;

            case 'SELECT ASSET':
            xpath = '(//XCUIElementTypeStaticText[@name="Select"])[1]';
            break;

            case 'TAP TO SELECT INBOUND ASSET':
            xpath = '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[11]';
            break;

            case 'SELECT':
            xpath = '//XCUIElementTypeStaticText[@name="Select"]';
            break;

            case 'RETURN LOCATION SELECT':
            xpath = '//XCUIElementTypeButton[@name="Select"]';
            break;

            case '377 Air':
            xpath = '//XCUIElementTypeButton[@name="377 Air"]';
            break;

            case '377 Auxillaries':
            xpath = '//XCUIElementTypeButton[@name="377 Auxillaries"]';
            break;

            case '377 Bogies':
            xpath = '//XCUIElementTypeButton[@name="377 Bogies"]';
            break;

            case 'ASSIGN TO ME WORK PRIORITY 1 - UNIT WITHDRAW FROM SERVICE':
                
                xpath = `//XCUIElementTypeButton[@name="Assign To Me Work Priority 1 - Unit Withdrawn from Service"]`;
                break;

        default:
            xpath = `//XCUIElementTypeButton[@name="${name}"]`; 
            break;
    }

    const el = await $(xpath);

    try {
        await el.waitForExist({ timeout });

        if (!(await el.isDisplayed())) {
            try {
                await el.scrollIntoView();
            } catch {
                // scrollIntoView might not be supported on some platforms; ignore error
            }
        }

        await el.waitForDisplayed({ timeout });

        await browser.waitUntil(
            async () => (await el.isEnabled()) && (await el.isDisplayed()),
            {
                timeout,
                timeoutMsg: `Button "${name}" is not clickable (disabled or not visible) after ${timeout}ms`
            }
        );

        await el.click();
    } catch (error) {
        throw new Error(`❌ Failed to click button "${name}": ${error}`);
    }
}

  /** Click Work Order by index (first/second) */
  async clickWorkOrder(workorder: 'first' | 'second'): Promise<void> {
    const xpath = workorder === 'first'
      ? '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[5]'
      : '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[7]';
    await this.clickElement(xpath);
  }

  /** Click widget dynamically */
  async clickWidget(widgetName: string, timeout = 80000): Promise<void> {
  // normalize input for case-insensitive matching
  const normalizedName = widgetName.toLowerCase();

  // build case-insensitive XPath for text lookup only
  const selector = `//*[translate(@name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')="${normalizedName}"]`;

  // wait until element is displayed & enabled
  const element = await $(selector);
  await element.waitForDisplayed({ timeout });
  await element.waitForEnabled({ timeout });

  // perform the click
  await element.click();
}

  // Description field: XCUIElementTypeTextView
  get descriptionField() {
      return $('//XCUIElementTypeTextView[@value="Please Enter Description"]');
  }

    async setDescription(text: string): Promise<void> {
    const field = await this.descriptionField;
    await field.waitForDisplayed({ timeout: 20000 });

    await field.click();            
    await field.clearValue();       
    await field.addValue(text);     
}

 /**
   * Convert offset text to Date object
   */
  getDate(offset: 'todays' | 'yesterdays'): Date {
    const today = new Date();
    if (offset === 'yesterdays') {
      today.setDate(today.getDate() - 1);
    }
    return today;
  }

  async setDateInPicker(date: Date, timeout = 20000): Promise<void> {
    const picker = await $('//XCUIElementTypePicker');

    await picker.waitForDisplayed({
      timeout: timeout,
      reverse: false,
      timeoutMsg: 'Picker not displayed within timeout'
    });

    await picker.waitForEnabled({
      timeout: timeout,
      reverse: false,
      timeoutMsg: 'Picker not enabled within timeout'
    });

    const formattedDate = dateFormat(date, 'MM/dd/yyyy'); // use date-fns format
    await picker.addValue(formattedDate);
  }
/**
 * Select a sort option from another sort option on iOS
 * @param mainOption Main option name (e.g. "Start Date")
 * @param subOption Sub option name (e.g. "Compliance Date")
 */
public async selectSortByOption(mainOption: string, subOption: string): Promise<void> {
  const mainSelectors: Record<string, string> = {
    'Start Date': '//XCUIElementTypeOther[@value="Start Date"]',
    'Compliance Date': '//XCUIElementTypeOther[@value="Compliance Date"]',
    'Status': '//XCUIElementTypeOther[@value="Status"]',
    'Location': '//XCUIElementTypeOther[@value="Location"]',
    'Priority': '//XCUIElementTypeOther[@value="Priority"]',
  };

  const subSelectors: Record<string, string> = {
    'Start Date': '//XCUIElementTypeButton[@name="Start Date"]',
    'Compliance Date': '//XCUIElementTypeButton[@name="Compliance Date"]',
    'Status': '//XCUIElementTypeButton[@name="Status"]',
    'Location': '//XCUIElementTypeButton[@name="Location"]',
    'Priority': '//XCUIElementTypeButton[@name="Priority"]',
  };

  const mainSelector = mainSelectors[mainOption];
  const subSelector = subSelectors[subOption];

  if (!mainSelector) {
    throw new Error(`❌ No selector defined for main option "${mainOption}"`);
  }
  if (!subSelector) {
    throw new Error(`❌ No selector defined for sub option "${subOption}"`);
  }

  // ✅ Wait for and click main option
  const mainElement = await $(mainSelector);
  await mainElement.waitForDisplayed({ timeout: 100000 });
  await mainElement.click();

  // ✅ Wait for and click sub option
  const subElement = await $(subSelector);
  await subElement.waitForDisplayed({ timeout: 100000 });
  await subElement.click();
}

 /**
   * Bookmark a work order by its index
   * @param position Position of the work order (1 = first, 2 = second, etc.)
   */
  public async bookmarkWorkOrder(position: number): Promise<void> {
    // Map positions to selectors
    const bookmarkSelectors: Record<number, string> = {
      1: '(//XCUIElementTypeStaticText[@name=""])[2]',
      2: '(//XCUIElementTypeStaticText[@name=""])[3]',
      3: '(//XCUIElementTypeStaticText[@name=""])[4]',
      4: '(//XCUIElementTypeStaticText[@name=""])[5]',
      5: '(//XCUIElementTypeStaticText[@name=""])[6]',
    };

    const selector = bookmarkSelectors[position];
    if (!selector) {
      throw new Error(`❌ No bookmark selector defined for position ${position}`);
    }

    const element = await $(selector);
    await element.waitForDisplayed({ timeout: 30000 });
    await element.click();
  }

/**
     * Clicks any option by its visible name (supports buttons, cells, static texts)
     */
    async clickOptionByName(name: string, timeout = 50000): Promise<void> {
        let xpath: string;

        switch (name.toUpperCase()) {
            case 'FIRST RECORD':
                xpath = '(//XCUIElementTypeButton[contains(@name, ":")])[1]';
                break;

                  case 'SECOND RECORD':
                xpath = '(//XCUIElementTypeButton[contains(@name, ":")])[2]';
                break;

                case 'THIRD RECORD':
                xpath = '(//XCUIElementTypeButton[contains(@name, ":")])[3]';
                break;

            case 'FOURTH RECORD':
                xpath = '(//XCUIElementTypeButton[contains(@name, ":")])[4]';
                break;

            case 'FIFTH RECORD':
                xpath = '(//XCUIElementTypeButton[contains(@name, ":")])[5]';
                break;

            case 'FAILURE CLASS':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeOther[@value="Select Failure Class..."]`;
                break;

                case 'PROBLEM CLASS':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeOther[@value="Select Failure Problem..."]`;
                break;

                case 'CAUSE CLASS':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeOther[@value="Select Failure Cause..."]`;
                break;

                  case 'REMEDY CLASS':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeOther[@value="Select Failure Remedy..."]`;
                break;

              case 'ADD TO BACKLOG OPTIONS':
            xpath = '//XCUIElementTypeOther[@value="Add to backlog"]';
            break;

            case 'ADD TO BACKLOG':
            xpath = '//XCUIElementTypeOther[@value="Add to backlog"]';
            break;

            case 'FOUND IT, FIXED IT':
            xpath = '//XCUIElementTypeButton[@name="Found It, Fixed It"]';
            break;

            case 'ASSIGN TO ME':
            xpath = '//XCUIElementTypeButton[@name="Assign to me"]';
            break;

            case 'OUT':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeStaticText[@name="OUT"]`;
                break;

                case 'IN':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeStaticText[@name="IN"]`;
                break;

                case 'SELECT OUTCOME':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeOther[@value="Select outcome..."]`;
                break;

                case '377: AUXILIARIES':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeOther[@value="377: AUXILIARIES"]`;
                break;

              case 'CRACKED':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="CRACKED"]`;
                break;

                case 'DOORS':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="DOORS"]`;
                break;

                case 'End of Day (to be fixed within 1 day)':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="End of Day (to be fixed within 1 day)"]`;
                break;

                case 'Out of Service (to be fixed immediately)':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="Out of Service (to be fixed immediately)"]`;
                break;

                case 'COMPONENT REPAIRED':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="COMPONENT REPAIRED"]`;
                break;

                case 'ADJUSTED OR RESET':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="ADJUSTED OR RESET"]`;
                break;

                case 'DAMAGED':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="DAMAGED"]`;
                break;

                case 'Defect Investigation':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="Defect Investigation"]`;
                break;

                case 'CAPACITORS':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="CAPACITORS"]`;
                break;

                case 'EXAM':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="EXAM"]`;
                break;

                case 'AIR BRAKE DEFECT (TOPS)':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="AIR BRAKE DEFECT (TOPS)"]`;
                break;

                case 'CALIPERS':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="EXAM"]`;
                break;

                case 'BLOCK/PADS':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="BLOCK/PADS"]`;
                break;

                case 'BRAKES - AIR/VACUUM':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="BRAKES - AIR/VACUUM"]`;
                break;

                case 'BATTERY & CONTROL SYSTEMS':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="BATTERY & CONTROL SYSTEMS"]`;
                break;

                case '171-SQR-022: HEATING & LIGHTING':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="171-SQR-022: HEATING & LIGHTING"]`;
                break;

                case 'SQR LIGHTING FAILED':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="SQR 22(a) - Lighting - failed"]`;
                break;

                case 'ACTIVATED':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="ACTIVATED"]`;
                break;

                case 'CONTACTOR FAULT':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="CONTACTOR FAULT"]`;
                break;

                case 'FAILS EXAM TASK':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="FAILS EXAM TASK"]`;
                break;

                case 'FAULT INDICATION':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="FAULT INDICATION"]`;
                break;

              case 'SEATING':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="171-SQR-023: SEATING"]`;
                break;

                case 'HEATING & LIGHTING':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="171-SQR-022: HEATING & LIGHTING"]`;
                break;

                case 'VEHICLE INTERIOR CONDITION':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="171-SQR-024: VEHICLE INTERIOR CONDITION"]`;
                break;

                case 'SEAT MISSING PRIORITY':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="SQR 23(a)(i) - Seat - missing - priority"]`;
                break;

                case 'SEAT MISSING OTHER':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="SQR 23(a)(ii) - Seat - missing - other"]`;
                break;

                case 'SERVICE QUALITY FAULT REPORTED':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="Service Quality Fault Reported"]`;
                break; 

                case 'SERVICE QUALITY FAULT RECTIFIED':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="Service Quality Fault Rectified"]`;
                break; 

              case 'BURNT':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="BURNT"]`;
                break; 

                case 'REPAIR CARRIED OUT':
                // example special case if needed (otherwise fall through)
                xpath = `//XCUIElementTypeButton[@name="REPAIR CARRIED OUT"]`;
                break;


            default:
                // default to common option types (Other, StaticText, Button)
                xpath = `//XCUIElementTypeOther[@name="${name}"] | //XCUIElementTypeStaticText[@name="${name}"] | //XCUIElementTypeButton[@name="${name}"]`;
                break;
        }

        const element = await $(xpath);
        await element.waitForDisplayed({ timeout });
        await element.click();
    }

    async clickNthRecord(n: number = 1, timeout = 50000): Promise<void> {
    const xpath = `(//XCUIElementTypeButton[contains(@name, ":")])[${n}]`;
    const element = await $(xpath);
    await element.waitForDisplayed({ timeout });
    await element.click();
}

async clickField(fieldName: string, timeout = 50000): Promise<void> {
  let xpath: string;

  // normalize input so it's case-insensitive
  const normalized = fieldName.trim().toLowerCase();

  switch (normalized) {
    case 'location search':
      xpath = '//XCUIElementTypeTextField[@value="Search Locations"]';
      break;

    case 'search by part code or description':
      xpath = '//XCUIElementTypeTextField[@value="Search by Part Code or Description"]';
      break;

    case 'select location':
      xpath = '//XCUIElementTypeTextField[@value="Select Location"]';
      break;

    // Add more fields as needed...

    default:
      throw new Error(`❌ No matching field found for name: ${fieldName}`);
  }

  const element = await $(xpath);
  await element.waitForDisplayed({ timeout });
  await element.click();
}

/**
   * Get location element by name.
   * Tries both StaticText and Other element types.
   */
  private async getLocationElementByName(name: string) {
    const staticText = await $(`//XCUIElementTypeStaticText[@name="${name}"]`);
    if (await staticText.isExisting()) {
      return staticText;
    }

    const otherElement = await $(`//XCUIElementTypeOther[@name="${name}"]`);
    if (await otherElement.isExisting()) {
      return otherElement;
    }

    throw new Error(`❌ No location element found for name: ${name}`);
  }

  /**
   * Selects a location record by its displayed name.
   * Works across different element types.
   */
  public async selectLocationByName(name: string): Promise<void> {
    const element = await this.getLocationElementByName(name);

    await element.waitForDisplayed({ timeout: 50000 });
    await element.waitForEnabled({ timeout: 50000 });

    await element.click();
  }

   // 🔹 Precise selectors
  public readonly StartTimeField: string =
    '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[18]/XCUIElementTypeOther';
  public readonly EndTimeField: string =
    '//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[19]/XCUIElementTypeOther';
  public readonly DoneButton: string =
    '//XCUIElementTypeButton[@name="Done"]';

  /**
   * Clicks the Start Time date field.
   */
  public async selectStartTimeField(): Promise<void> {
    const element = await $(this.StartTimeField);
    await element.waitForDisplayed({ timeout: 30000 });
    await element.click();
  }
/**
 * Selects an option from the outcome dropdown by visible text.
 * Example optionText: "Assign to me"
 */
    /**
     * Clicks an option from an open dropdown by visible name.
     * Assumes the dropdown is already open.
     */
 
  /** Select dropdown option */
  async selectDropdownOption(dropdownXpath: string, optionText: string): Promise<void> {
    await this.performStep(`Select ${optionText} from dropdown`, async () => {
      const dropdown = await $(dropdownXpath);
      await dropdown.waitForDisplayed({ timeout: 50000 });
      await dropdown.click();

      const option = await $(`//XCUIElementTypeButton[@name="${optionText}"]`);
      await option.waitForDisplayed({ timeout: 50000 });
      await option.click();
    });
  }

  /** Click button by name */
async clickLastButtonNextToStatus(status: string): Promise<void> {
  await this.performStep(`Click START WORK button (icon) for status "${status}"`, async () => {
    // Collect all START WORK icon buttons
    const buttons = $$(`//XCUIElementTypeStaticText[@name="' +
            status +
            '"])[2]/following-sibling::*[1]`);

    // Find the last displayed one
    const buttonElements = await buttons;
    const elementsArray = await Promise.all(buttonElements);
    const lastDisplayed = await this.findLastDisplayed(elementsArray);

    if (lastDisplayed) {
      await lastDisplayed.click();
      console.log(`✅ Clicked START WORK icon button for status: "${status}"`);
    } else {
      console.warn(`⚠️ No visible START WORK icon button found for status: "${status}"`);
    }
  });
}

async verifyStatusAndClickPauseButton(expectedStatus: string): Promise<void> {
  // Locate any visible status label matching expectedStatus
  const statusElementsPromise = $$(`//XCUIElementTypeStaticText[@name="${expectedStatus}"]`);
  const statusElements = await statusElementsPromise;

  // Optional: Log how many matches found
  console.log(`Found ${statusElements.length} status elements with text "${expectedStatus}"`);

  // Find a visible one (if multiple)
  const elementsArray = await Promise.all(statusElements);
  const visibleStatus = await this.findVisibleElement(elementsArray);

  if (!visibleStatus) {
    throw new Error(`No visible status element found with text: ${expectedStatus}`);
  }

  // Confirm it's displayed
  const isDisplayed = await visibleStatus.isDisplayed();
  expect(isDisplayed).toBe(true);

  // Locate the Pause button
  const pauseButton = await $(`//XCUIElementTypeButton[@name="Pause"]`);

  // Optional wait
  await pauseButton.waitForDisplayed({ timeout: 20000 });

  // Click Pause
  await pauseButton.click();
}
 /**
 * Utility: find the last displayed element from an array
 */
protected async findLastDisplayed(
  elements: WebdriverIO.Element[]
): Promise<WebdriverIO.Element | null> {
  let last: WebdriverIO.Element | null = null;
  for (const el of elements) {
    if (await el.isDisplayed()) {
      last = el;
    }
  }
  return last;
}

/**
     * Generic method to type text into a field
     */
   async enterText(element: ChainablePromiseElement, text: string): Promise<void> {
        await element.waitForDisplayed({ timeout: 5000 });
        await element.clearValue();
        await element.setValue(text);
    }
    async tapElementByXPath(xpath: string): Promise<void> {
        const element = await $(xpath);
        await element.waitForDisplayed({ timeout: 5000 });
        await element.click();
    }
/**
 * Select an item by its index in a dynamic table
 * @param itemName Name of the item (e.g. "CLOTH")
 * @param index 1-based index of the item in the list
 */
async selectItemByIndex(itemName: string, index: number): Promise<void> {
  const itemXPath = `(//XCUIElementTypeStaticText[@name="${itemName}"])[${index}]`;

  const element = await $(itemXPath);
  await element.waitForDisplayed({ timeout: 50000 });

  // Safe click (no waitForClickable in XCUITest)
  await element.click();
}

/**
 * Select Inventory material with available balance
 * @param index 1-based index of material with positive balance (default = 1)
 */
async selectInventoryWithAvailableBalance(index: number = 1): Promise<void> {
  const elements = await $$(
    `//XCUIElementTypeStaticText[contains(@name,"Units Available: ")]`
  );

  const positiveBalanceElements = [];
  for (const el of elements) {
    const text = await el.getAttribute("name"); // e.g., "Units Available: 8"
    const match = text?.match(/Units Available:\s*(\d+)/);

    if (match && parseInt(match[1], 10) > 0) {
      positiveBalanceElements.push(el);
    }
  }

  if (positiveBalanceElements.length < index) {
    throw new Error(
      `❌ Only ${positiveBalanceElements.length} items with available balance found, cannot select index ${index}`
    );
  }

  const target = positiveBalanceElements[index - 1];
  await target.waitForDisplayed({ timeout: 30000 });
  await target.click();
}
/**
 * Utility: find the first visible element from an array
 */
protected async findVisibleElement(
  elements: WebdriverIO.Element[]
): Promise<WebdriverIO.Element | null> {
  for (const el of elements) {
    if (await el.isDisplayed()) {
      return el;
    }
  }
  return null;
}

/** Handle work order buttons: Start, Pause, Swap */
async handleWorkOrderButton(
    status: 'Ready' | 'In Progress' | 'On Hold'
): Promise<void> {
    await this.performStep(`Handle ${status} Work Order - START WORK`, async () => {
        // Primary START WORK button (page object getter)
        const startBtn = await this.STARTWORKButton;
        if (await startBtn.isDisplayed()) {
            await startBtn.click();
            return;
        }

        // Fallback: generic START WORK button by selector
        const startBtnGeneric = await $(`//XCUIElementTypeButton[@name="START WORK"]`);
        if (await startBtnGeneric.isDisplayed()) {
            await startBtnGeneric.click();
            return;
        }

        // Final fallback: click last button next to the status
        await this.clickLastButtonNextToStatus(status);
    });
}


async handleActionButton(actionButton: string): Promise<void> {
    await this.performStep(`Click on action button: ${actionButton}`, async () => {
        // Find the button by its text or accessibility label
        const button = await $(`//XCUIElementTypeButton[@name="${actionButton}"]`);
        if (await button.isDisplayed()) {
            await button.click();
        } else {
            // fallback: click the last button in the action panel (if needed)
            const buttons = await $$(`//XCUIElementTypeButton`);
            const resolvedButtons = await buttons;
            const buttonsArray = await resolvedButtons;
            if (await buttonsArray.length > 0) {
                await buttonsArray[await buttonsArray.length - 1].click();
            } else {
                throw new Error(`Action button "${actionButton}" not found`);
            }
        }
    });
}
/**
     * Takes a screenshot and saves it to the ./screenshots folder.
     * Automatically generates a timestamped filename unless one is provided.
     */
    async takeScreenshot(filename?: string): Promise<void> {
    // Set your screenshot folder
    const screenshotDir = "/Users/MWE-PROJECT/screenshots";

    // Ensure the folder exists
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // Generate filename with timestamp if not provided
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const finalFilename = filename || `screenshot-${timestamp}.png`;

    // Full path for the screenshot
    const fullPath = path.join(screenshotDir, finalFilename);

    // Save the screenshot
    await driver.saveScreenshot(fullPath);

    console.log(`📸 Screenshot saved: ${fullPath}`);
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
   * Wait for the page to fully load
   * (simulates a 50-second maximum wait)
   */
  async waitForPageToLoad(): Promise<void> {
    // Just wait for 50 seconds or until your app logic is ready
    await new Promise((resolve) => setTimeout(resolve, 25000));
  }
    

  /** Verify Follow-On page visibility */
  async verifyFollowOnPage(flag: 'Shown' | 'Hidden'): Promise<void> {
    const basePage = await $('//XCUIElementTypeOther[@name="Create Follow-On (1/2)"]'); 
    const addToBacklog = await $('//XCUIElementTypeOther[@value="Add to backlog"]');

    if (flag === 'Shown') {
      // Wait for base page
      await basePage.waitForDisplayed({ timeout: 80000 });
      await basePage.waitForEnabled({ timeout: 80000 });
      await expect(basePage).toBeDisplayed();

      // Small buffer delay to handle slow loading (>40s in your case)
      await browser.pause(5000);

      // Now wait for "Add to backlog" element
      await addToBacklog.waitForDisplayed({ timeout: 80000 });
      await addToBacklog.waitForEnabled({ timeout: 80000 });
      await expect(addToBacklog).toBeDisplayed();
    } else {
      // Wait until base page disappears
      await basePage.waitForDisplayed({ timeout: 80000, reverse: true });
      await expect(await basePage.isDisplayed()).toBe(false);
    }
  }


  /** Verify WO page visibility */
  async verifyWOPage(flag: 'Shown' | 'Hidden'): Promise<void> {
    const element = await $('//XCUIElementTypeStaticText[@name="Work"]');
    if (flag === 'Shown') await expect(element).toBeDisplayed();
    else await expect(await element.isDisplayed()).toBe(false);
  }

  /** Verify text displayed */
  async verifyTextDisplayed(text: string): Promise<void> {
    await this.performStep(`Verify text: ${text}`, async () => {
      const element = await $(`//XCUIElementTypeStaticText[contains(@name,"${text}")]`);
      await expect(element).toBeDisplayed();
    });
  }
}
export async function clickButtonByName(name: string, timeout = 50000): Promise<void> {
    const button = await $(`//XCUIElementTypeButton[@name="${name}"]`);
    await button.waitForDisplayed({ timeout });
    await button.click();
}
