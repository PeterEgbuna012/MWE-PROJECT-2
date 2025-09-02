// yaml.utils.ts
import { $ } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

// Material, version, location, environment as simple arrays
export const material: string[] = ['DTR0000448803'];
export const version: string[] = ['1.8.0'];
export const location: string[] = ['Alstom Dismantle'];
export const environment: string[] = ['amtraknightly'];

// Elements using WebdriverIO selectors
export const signInButton: ChainablePromiseElement = $('//XCUIElementTypeButton[@name="Sign In"]');
export const notificationsButton: ChainablePromiseElement = $('//XCUIElementTypeButton[@name=""]');
export const workStaticText: ChainablePromiseElement = $('//XCUIElementTypeStaticText[@name="Work"]');
