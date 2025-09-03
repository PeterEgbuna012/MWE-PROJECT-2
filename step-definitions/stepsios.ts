import { Given, When, Then } from '@wdio/cucumber-framework';
import { $, $$, driver, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';
import BasePage, { clickButtonByName } from '../pageobjects/base.page';
import PhotoPage from '../pageobjects/photo.page';
import InitPage from '../pageobjects/init.page';
import WorkOrderPage from '../pageobjects/workOrder.page';


// Instantiate page objects
const loginPage = new LoginPage();
const basePage = new BasePage();
const photoPage = new PhotoPage();
const initPage = new InitPage();

// -------------------- INIT PAGE --------------------
Given('I am on the Init page', async () => {
  await initPage.getPageTitle();
});

When('I set {string} into Environment Code input field', async (EnvCode: string) => {
  await initPage.environmentTextField.setValue(EnvCode);
});

When('I set Region select field', async () => {
  await initPage.dropdown.click();
});

When('I set Region as {string}', async (country: string) => {
  await initPage.selectRegion(country);
});


Then('Connect button is disabled', async () => {
  await expect(initPage.connectButton).toHaveAttribute('disabled');
});

Then('I can connect to the Environment', async () => {
  await initPage.connectButton.click();
});

Then('signIn option shows up', async () => {
  await expect(initPage.signInButton).toBeDisplayed();
});

When('I switch to the web view context', async () => {
  const contexts = await driver.getContexts();
  const webviewContext = contexts.find((ctx: any) => typeof ctx === 'string' && ctx.includes('WEBVIEW'));
  if (webviewContext) {
    await driver.switchContext(webviewContext);
  }
});

// -------------------- USERNAME --------------------
When('I enter username as {string}', async (username: string) => {
    // Ensure we are in native context
    const contexts = await driver.getContexts();
    const nativeContext = contexts.find(ctx => typeof ctx === 'string' && ctx.includes('NATIVE_APP'));
    if (nativeContext) await driver.switchContext(nativeContext);

    const usernameField = await initPage.inputUsername;
    await usernameField.waitForDisplayed({ timeout: 20000 }); // Wait for visibility
    await usernameField.scrollIntoView();                       // Scroll into view if offscreen
    await usernameField.setValue(username);
});

// -------------------- PASSWORD --------------------
When('I enter password as {string}', async (password: string) => {
    const contexts = await driver.getContexts();
    const nativeContext = contexts.find(ctx => typeof ctx === 'string' && ctx.includes('NATIVE_APP'));
    if (nativeContext) await driver.switchContext(nativeContext);

    const passwordField = await initPage.inputPassword;
    await passwordField.waitForDisplayed({ timeout: 20000 }); // Wait for visibility
    await passwordField.scrollIntoView();                      // Scroll into view if offscreen
    await passwordField.setValue(password);
});


Then('I enter material from data file in textfield {string}', async (textfield: string) => {
  const materialData = readYamlFile('./Data.yaml');
  const materialText = materialData.material[0];

  if (textfield === 'Search by Part Code or Description') {
    await loginPage.searchTextfield.setValue(materialText);
  }
});

Then('I enter {string} in textfield {string}', async (text: string, textfield: string) => {
  if (textfield === '') {
    await loginPage.blankTextfield.setValue(text);
  } else {
    const element = initPage.getTextViewForReason() as unknown as WebdriverIO.Element;
    if (element && typeof element.setValue === 'function') {
      await element.setValue(text);
    } else {
      throw new Error('getTextViewForReason did not return a valid element');
    }
  }
});

Then('I switch to native view context', async () => {
  const contexts = await driver.getContexts();
  const webviewContext = contexts.find((ctx: any) => typeof ctx === 'string' && ctx.includes('WEBVIEW'));
  if (webviewContext) await driver.switchContext(webviewContext);
  const nativeContext = contexts.find((ctx: any) => typeof ctx === 'string' && ctx.includes('NATIVE_APP'));
  if (nativeContext) await driver.switchContext(nativeContext);
});

Then('I click on SignIn button', async () => {
  await initPage.signInButton.click();
});

Then('I see allow button', async () => {
  await loginPage.allowButton.waitForDisplayed({ timeout: 3000000 });
});

Then('The Worklist page is open', async () => {
  await expect(loginPage.worklistPage).toBeDisplayed();
});

Then('I enter on notifications', async () => {
  await driver.keys(['Enter']);
});

// -------------------- WORK ORDER --------------------
When("I click at {string} WO", async (workorder: 'first' | 'second') => {
  await basePage.clickWorkOrder(workorder);
});

// -------------------- WIDGETS --------------------
When("I press {string} widget", async (widget: string) => {
  await basePage.clickWidget(widget);
});

// -------------------- VERIFY TEXT --------------------
Then("I compare the {string} values", async (text: string) => {
  await basePage.verifyTextDisplayed(text);
});

// -------------------- BUTTON NEXT TO STATUS --------------------
Then("I click at button next to {string}", async (status: string) => {
  await basePage.clickLastButtonNextToStatus(status);
});

// -------------------- WO PAGE --------------------
Then("WO page is {string}", async (flag: 'Shown' | 'Hidden') => {
  await basePage.verifyWOPage(flag);
});

// -------------------- WORK ORDER STATUS --------------------
Then(
  'I verify the work order is in {string} and click the Pause button',
  async (expectedStatus: string) => {
    await basePage.verifyStatusAndClickPauseButton(expectedStatus);
  }
);

// -------------------- VERIFY WORK ORDER STATUS  --------------------
Then(/^The status of the work Order is in "(.*)"$/, async (status: string) => {
    await WorkOrderPage.verifyWorkOrderStatus(status);
});


// -------------------- PAGE APPEARANCE --------------------
Then("{string} page appears", async (pageName: string) => {
  await basePage.verifyTextDisplayed(`${pageName}. Task Details`);
});

// -------------------- BUTTON CLICK --------------------
When(/^I click on "([^"]+)" button$/, async (buttonName: string) => {
    await basePage.clickButtonByName(buttonName);
});

Then(/^I click at button next to "([^"]*)"$/, async (status: string) => {
    const validStatuses = ['Ready', 'On Hold', 'In Progress'];

    if (!validStatuses.includes(status)) {
        throw new Error(`❌ Unsupported status: "${status}". Allowed values: ${validStatuses.join(', ')}`);
    }

    let buttonClicked = false;

    // iOS-specific XPath: look for the StaticText with matching status,
    // then click the immediate following element (usually a button)
    for (let i = 1; i <= 15; i++) {
        const statusElementXPath = `(//XCUIElementTypeStaticText[@name="${status}"])[${i}]/following-sibling::*[1]`;
        const adjacentButton = await $(statusElementXPath);

        if (await adjacentButton.isDisplayed()) {
            await adjacentButton.click();
            buttonClicked = true;
            break;
        }
    }

    if (!buttonClicked) {
        throw new Error(`❌ No button found or visible next to status: "${status}" on iOS`);
    }
    
});

// -------------------- START WORK ACTION BUTTONS --------------------

When(
  "I handle {string} work order button",
  async (status: 'Ready' | 'In Progress' | 'On Hold') => {
    await basePage.handleWorkOrderButton(status);
  }
);

// -------------------- WORK ORDER ACTION BUTTONS --------------------
When(
  "I handle {string} action button",
  async (actionButton: string) => {
    await basePage.handleActionButton(actionButton);
  }
);

// -------------------- LOCATION SELECT BUTTON --------------------
When("I tap location select button", async () => {
  await basePage.clickElement('//XCUIElementTypeButton[@name="Select"]');
});

// -------------------- TAP TASK --------------------
When("I tap on task with number {string}", async (number: string) => {
  await basePage.clickElement(`.//XCUIElementTypeStaticText[@name="${number}"]`);
});

// -------------------- DROPDOWN OPTION --------------------
When("I click at {string} option", async (option: string) => {
  await basePage.selectDropdownOption('//XCUIElementTypeOther[@value="Select region"]', option);
});

// -------------------- HAMBURGER ICON --------------------
Then("I press the Hamburger icon", async () => {
  await loginPage.hamburgerIcon.click();
});

// -------------------- DATE FIELDS --------------------
let selectedDateField: 'Start' | 'End';

When(/^I select "(Start|End)" date field$/, async (fieldName: 'Start' | 'End') => {
  selectedDateField = fieldName;

  const selector =
    fieldName === 'Start'
      ? '//XCUIElementTypeStaticText[@name="Start Time"]/following-sibling::XCUIElementTypeOther[1]'
      : '//XCUIElementTypeStaticText[@name="End Time"]/following-sibling::XCUIElementTypeOther[1]';

  const field = await $(selector);
  await field.waitForDisplayed({ timeout: 20000 });
  await field.click();
});

Then(/^I set date as "(.+)" date$/, async (offsetText: string) => {
  const targetDate = parseOffsetToDate(offsetText);
  await selectDateFromCalendar(targetDate);
});

function parseOffsetToDate(offsetText: string): Date {
  const now = new Date();

  if (offsetText === 'todays') return now;
  if (offsetText === 'yesterdays') return new Date(now.getTime() - 86400000);
  if (offsetText === 'tomorrows') return new Date(now.getTime() + 86400000);

  const daysAgoMatch = offsetText.match(/^(\d+)\s+days?\s+ago$/);
  if (daysAgoMatch) {
    const days = parseInt(daysAgoMatch[1], 10);
    return new Date(now.getTime() - days * 86400000);
  }

  const daysFromNowMatch = offsetText.match(/^(\d+)\s+days?\s+from\s+now$/);
  if (daysFromNowMatch) {
    const days = parseInt(daysFromNowMatch[1], 10);
    return new Date(now.getTime() + days * 86400000);
  }

  throw new Error(`❌ Unsupported date offset format: "${offsetText}"`);
}

async function selectDateFromCalendar(date: Date): Promise<void> {
  const day = date.getDate();
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const month = date.toLocaleDateString('en-GB', { month: 'long' });

  const fullName = `${weekday} ${day} ${month}`;
  const fullDateSelector = `//XCUIElementTypeButton[@name="${fullName}"]`;
  const fallbackSelector = `//XCUIElementTypeStaticText[@name="${day}"]`;

  let element; // Let TS infer the type from WebdriverIO

  try {
    element = $(fullDateSelector);
    await element.waitForDisplayed({ timeout: 3000 });
  } catch {
    element = $(fallbackSelector);
    await element.waitForDisplayed({ timeout: 3000 });
  }

  await element.click();
  console.log(`📅 Selected UK date: ${fullName}`);
}



// -------------------- NAVIGATION --------------------
Then("I navigate {string} tab", async (tab: string) => {
  await basePage.clickElement(`//XCUIElementTypeStaticText[@name="${tab}"]`);
});

Then("I navigate to {string}", async (navigate: string) => {
    // Keep your original XPaths but allow future migration to accessibilityIds
    const xpathMap: Record<string, string> = {
        back: '//XCUIElementTypeButton[@name=""]',
        notifications: '//XCUIElementTypeButton[@name=""]',
        done: '//XCUIElementTypeStaticText[@name="DONE"]',
        default: '//XCUIElementTypeButton[@name=""]/preceding-sibling::XCUIElementTypeButton[1]'
    };

    const selector = xpathMap[navigate] || xpathMap.default;

    // Click element safely
    await basePage.clickElement(selector);
});
// -------------------- MORE ACTIONS --------------------
Then("I choose {string} button if WO is {string}", async (bottomcircle: string, status: string) => {
  if (bottomcircle === 'More Actions') {
    await basePage.clickLastButtonNextToStatus(status);
  }
});

// -------------------- TEXT ENTRY --------------------
 Then("I enter value in {string}", async (desc: string) => {
   await basePage.clickElement(`//XCUIElementTypeTextView[@value="${desc}"]`);
 });

Then("I enter text {string} in comments textbox", async (comment: string) => {
  const textbox = await $('//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeTextView[2]');
  await textbox.waitForDisplayed();
  await textbox.clearValue();
  await basePage.delay(3000);
  await textbox.setValue(comment);
  await basePage.delay(3000);
});

// -------------------- LOCATION FIELD --------------------
Then("I verify location field is populated", async () => {
  const field = await $('XCUIElementTypeTextField');
  await expect(await field.getText()).not.toBe('');
});

// -------------------- WIDGET CLICK --------------------
Then("{string} widget is clicked", async (widget: string) => {
  await basePage.clickElement(`//XCUIElementTypeOther[@name="${widget}"]`);
});

// -------------------- MANUAL TIME ENTRY --------------------
Then(/^I click on "Add Manual Time Entry" button$/, async () => {
    await WorkOrderPage.clickAddManualTimeEntry();
});

// -------------------- BUTTON DISPLAYED --------------------
Then("{string} button is displayed", async (button: string) => {
  const element = await $(`//XCUIElementTypeButton[@name="${button}"]`);
  await element.isDisplayed();
  await basePage.delay(5000);
});

// -------------------- TEXT DISPLAYED --------------------
Then("{string} text is displayed", async (text: string) => {
  const data = readYamlFile('./Data.yaml');
  const value = data[text.toLowerCase()]?.[0] || text;
  await basePage.verifyTextDisplayed(value);
  await basePage.delay(3000);
});

// -------------------- PRESS BUTTON --------------------
Then("I press the {string} button", async (buttonText: string) => {
  await basePage.clickElement(`//XCUIElementTypeStaticText[@name="${buttonText}"]`);
});

// -------------------- PHOTO --------------------
Then("Photo is Visible", async () => {
  await expect(PhotoPage.photo_visible).toBeDisplayed();
});

// -------------------- LOCATION --------------------
Then("I select the Location", async () => {
  await basePage.clickElement('//XCUIElementTypeOther[@name="Mobile Work Execution"]/XCUIElementTypeOther[18]');
});

// Mock function for YAML reading
type MaterialYaml = { material: string[]; [key: string]: any };

function readYamlFile(path: string): MaterialYaml {
  // Implement your YAML parser here or use js-yaml
  return { material: ['DTR0000448803'] }; 
}

// -------------------- DONE BUTTON --------------------

Then('I click on "Done" button', async () => {
    await WorkOrderPage.clickDoneButton();
});
// -------------------- ADD MANUAL TIME ENTRY BUTTON --------------------

Then('I click on "ADD MANUAL TIME ENTRY" button', async () => {
    await WorkOrderPage.clickAddManualTimeEntryBtn();
});

// -------------------- VALIDATE MANUAL TIME ENTRY --------------------
Then('I compare the {string} values', async (expectedValue: string) => {
    await WorkOrderPage.compareTimeLogValue(expectedValue);
});



