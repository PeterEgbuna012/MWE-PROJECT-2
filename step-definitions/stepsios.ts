import { Given, When, Then } from '@wdio/cucumber-framework';
import { $, $$, driver, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';
import BasePage, { clickButtonByName } from '../pageobjects/base.page';
import PhotoPage from '../pageobjects/photo.page';
import InitPage from '../pageobjects/init.page';
import WorkOrderPage from '../pageobjects/workOrder.page';
import workOrderPage from '../pageobjects/workOrder.page';
type FieldName = 'summary' | 'details';


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

Then("I click on {string} WO", async (workorder: 'first' | 'second') => {
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
When("I select {string} date field", async (fieldLabel: 'Start Time' | 'End Time') => {
    if (fieldLabel === 'Start Time') {
        await workOrderPage.selectStartTimeField();
    } else {
        await workOrderPage.selectEndTimeField();
    }
});

Then("I set date as {string} date", async (offsetText: 'todays' | 'yesterdays') => {
    if (offsetText === 'todays') {
        await workOrderPage.setDateToToday();
    } else {
        await workOrderPage.setDateToYesterday();
    }
    await workOrderPage.clickDoneButton(); // confirm date selection
});


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
When("I set {string} value field to {string}", async (fieldName: string, value: string) => {
  await workOrderPage.setValueInField(fieldName, value);
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

// -------------------- BUTTON DISPLAYED --------------------
Then("{string} button is displayed", async (button: string) => {
  const element = await $(`//XCUIElementTypeButton[@name="${button}"]`);
  await element.isDisplayed();
  await basePage.delay(10000);
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

When(/^I select the location result with name "(.*)"$/, async (locationName: string) => {
    // Add the  checkmark to the name, since it's always present
    const fullName = `${locationName}`;

    const locationResultSelector = `//XCUIElementTypeOther[@name="${fullName}"]`;
    const locationResultElement = await $(locationResultSelector);

    await locationResultElement.waitForDisplayed({ timeout: 5000 });
    await locationResultElement.click();
});

Then('the location should be selected successfully', async () => {
    const selectedLocationText = await WorkOrderPage.getSelectedLocationText();

    // Ensure the location is not empty and does not contain the  checkmark
    expect(selectedLocationText).to.not.be.empty;
    expect(selectedLocationText).to.not.include('');
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
// -------------------- VALIDATE MANUAL TIME ENTRY --------------------
Then("I compare the time value {string}", async (expectedValue: string) => {
    await workOrderPage.compareTimeLogValue(expectedValue);
});

// -------------------- COMMENT SECTION --------------------
Then(/^comment is "Shown"$/, async () => {
    await WorkOrderPage.waitForCommentToBeShown();
});

// -------------------- TAKE A SCREEN SHOOT --------------------
Then(/^I take a screenshot$/, async () => {
    await WorkOrderPage.takeScreenshot();
});

// -------------------- DESCRIPTION FIELD  --------------------
Then(/^I set Description field to "(.*)"$/, async (text: string) => {
  await WorkOrderPage.setValueInField('description', text);
});

// -------------------- CLICK OPTION BY NAME --------------------
When(/^I click on "([^"]+)" option$/, async (optionName: string) => {
    await basePage.clickOptionByName(optionName);
});

// -------------------- VERIFY ASSET FIELD IS POPULATED --------------------
Then(/^I verify asset field is populated$/, async () => {
    const isPopulated = await workOrderPage.isAssetFieldPopulated();
    expect(isPopulated).toBe(true, '❌ Expected asset field to be populated, but it was empty.');
});

// -------------------- LOCATION CLICK WIDGET -------------------
Then('I click on {string} widget', async (widget: string) => {
  await basePage.clickWidget(widget);
});

// --------------------  LOCATION CLICK  --------------------
When('I enter {string} in the location search field', async (locationName: string) => {
  await workOrderPage.enterLocationSearch(locationName);
});

When('I select the location result with name {string}', async (locationName: string) => {
  await workOrderPage.selectLocationFromResult(locationName);
});

When('I select no {int} record from location table', async (index: number) => {
  await workOrderPage.selectLocationByIndex(index);
});

Then('I click on {string} field', async (fieldName: string) => {
  await workOrderPage.clickField(fieldName);
});

Then('I select {string} location', async function (locationName: string) {
  await workOrderPage.selectLocation(locationName);
});

Then('I enter {string} in the select location search field', async (locationName: string) => {
  await basePage.clickField('select location');  
  await workOrderPage.enterSelectLocation(locationName);
});

// Select a select location by name
Then(/^I select "([^"]*)" location$/, async (locationName: string) => {
  await WorkOrderPage.selectLocationResults(locationName);
});


// -------------------- FILTER SELECTION --------------
When('I click on {string} filter and select {string}', async (mainFilter: string, subFilter: string) => {
  await WorkOrderPage.selectFromFilter(mainFilter, subFilter);
});


// -------------------- GENERIC OUTCOME/FILTER SELECTION --------------------
Then('I click on {string} outcome and select {string}', async (mainOption: string, subOption: string) => {
  await WorkOrderPage.selectFromDropdown(mainOption, subOption);
});

// -------------------- CREATE FOLLOW-ON PAGE IS DISPLAY --------------------
Then(
  /^the Follow-On page should be "(Shown|Hidden)"$/,
  async (flag: 'Shown' | 'Hidden') => {
    await basePage.verifyFollowOnPage(flag);
  }
);

// -------------------- INVENTORY SEARCH FIELD --------------------
// Locator for the Inventory search field
const searchField = $(`//XCUIElementTypeTextField[@value="Search by Part Code or Description"]`);

When('I enter {string} in the Inventory search field', async (item: string) => {
    await basePage.enterText(searchField, item);
});

// -------------------- INVENTORY ITEM SELECTIONS --------------------
// Ordinals mapping
const ordinals: Record<string, number> = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5
};

When('I select the {word} item {string} from the search results', async (position: string, itemName: string) => {
    const index = ordinals[position.toLowerCase()];
    if (!index) {
        throw new Error(`❌ Invalid position: ${position}`);
    }
    await basePage.selectItemByIndex(itemName, index);
});

// Select the first inventory material with available balance
Then('I select Inventory material with available balance', async () => {
    await basePage.selectInventoryWithAvailableBalance(1);
});

// Select the second inventory material with available balance
Then('I select second Inventory material with available balance', async () => {
    await basePage.selectInventoryWithAvailableBalance(2);
});

// -------------------- SORT BY OPTION SELECTION --------------------
Then(
  'I click on {string} sort by option and select {string}',
  async (mainOption: string, subOption: string) => {
    await basePage.selectSortByOption(mainOption, subOption);
  }
);

// -------------------- WORK ORDER BOOKMARK --------------------
const workOrderOrdinals: Record<string, number> = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5
};

Then('I {string} {word} work order', async (action: string, positionWord: string) => {
  const position = workOrderOrdinals[positionWord.toLowerCase()];
  if (!position) {
    throw new Error(`❌ Invalid work order position: "${positionWord}"`);
  }

  if (action.toLowerCase() === 'bookmark') {
    await basePage.bookmarkWorkOrder(position);
  } else {
    throw new Error(`❌ Unsupported action: "${action}"`);
  }
});

// -------------------- ASSET SWAP CONFIRM BUTTON --------------------
// Generic step for asset swap buttons
Then(/^I "([^"]*)" asset swap$/, async (buttonName: string) => {
  await WorkOrderPage.clickAssetSwapButton(buttonName);
});