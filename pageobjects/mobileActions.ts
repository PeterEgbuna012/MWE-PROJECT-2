/** @typedef {import('webdriverio').Element} Element */

export function mobileActions() {
  // Example utility function
  console.log('Do something helpful');
}

export const CONSTANT = 'value';

export default class MobileActions {
  static async tap(element: WebdriverIO.Element) {
    await element.waitForDisplayed({ timeout: 10000 });
    await element.click();
  }

  static async type(element: WebdriverIO.Element, text: string) {
    await element.waitForDisplayed({ timeout: 10000 });
    await element.setValue(text);
  }

  static async scrollToElement(element: WebdriverIO.Element) {
    if (driver.isIOS) {
      await driver.execute('mobile: scroll', {
        element: element.elementId,
        toVisible: true,
      });
    } else {
      await element.scrollIntoView();
    }
  }

  static async swipeUp(duration = 1000) {
    const { height, width } = await driver.getWindowRect();
    const startX = width / 2;
    const startY = height * 0.8;
    const endY = height * 0.2;

    await driver.touchPerform([
      { action: 'press', options: { x: startX, y: startY } },
      { action: 'wait', options: { ms: duration } },
      { action: 'moveTo', options: { x: startX, y: endY } },
      { action: 'release' }
    ]);
  }

  static async isDisplayed(element: WebdriverIO.Element): Promise<boolean> {
    try {
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }
}
