// CommonJS
const foo = 'bar';
module.exports = { foo };




/** @typedef {import('webdriverio').Element} Element */

/**
 * Mobile utility actions
 */
export default class MobileActions {
    /**
     * Tap on an element
     * @param {Element} element
     */
    static async tap(element) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
    }

    /**
     * Type text into an input
     * @param {Element} element
     * @param {string} text
     */
    static async type(element, text) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.setValue(text);
    }

    /**
     * Scroll to an element (iOS & Android)
     * @param {Element} element
     */
    static async scrollToElement(element) {
        if (driver.isIOS) {
            await driver.execute('mobile: scroll', { element: element.elementId, toVisible: true });
        } else {
            await element.scrollIntoView();
        }
    }

    
    /**
     * Swipe up on the screen
     * @param {number} [duration=500]
     */
    static async swipeUp(duration = 500) {
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

    /**
     * Check if element is displayed
     * @param {Element} element
     * @returns {Promise<boolean>}
     */
    static async isDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch {
            return false;
        }
    }
}
