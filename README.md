iOS Mobile Automation Framework – Arcadis
Tech Stack

WebdriverIO (Cucumber)

TypeScript

Appium 2.x + XCUITest

Allure Reporting

1. Requirements
Apple Developer Access

You must have:

Arcadis Apple Developer account

Registered MacBook

Registered iPhone/iPad

UDID + Serial Number submitted

2. Installation
Install dependencies
npm install

Install Appium
npm install -g appium
appium driver install xcuitest

Run Appium
appium

3. Run Tests
Execute all tests
npx wdio run ./wdio.conf.ts

4. Reporting
Generate Allure report
allure generate ./reports/allure-results --clean
allure open

5. Project Structure
src/
 ├── features/
 ├── steps/
 ├── pages/
 ├── helpers/
 ├── config/
 └── hooks/

6. Sample Scripts
Feature File
Scenario: User logs in
  Given the app is launched
  When the user logs in
  Then the home screen is displayed

Step Definition
import { Given, When, Then } from "@wdio/cucumber-framework";

Given("the app is launched", async () => {
  await driver.pause(2000);
});

7. Troubleshooting
Issue	Solution
WDA fails to install	Ensure signing team = Arcadis
Device not recognized	Enable "Developer Mode"
appium-doctor errors	Install missing iOS dependencies
