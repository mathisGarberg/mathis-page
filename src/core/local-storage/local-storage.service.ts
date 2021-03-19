import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const APP_PREFIX = 'APP-';

class LocalStorage implements Storage {
  [name: string]: any;
  readonly length: number;
  clear(): void {}
  getItem(key: string): string | null {
    return undefined;
  }
  key(index: number): string | null {
    return undefined;
  }
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.storage = new LocalStorage();

    if (isPlatformBrowser(platformId)) {
      this.storage = localStorage;
    }
  }

  static loadInitialState() {
    if (typeof window !== 'undefined') {
      return Object.keys(localStorage).reduce((state: any, storageKey) => {
        if (storageKey.includes(APP_PREFIX)) {
          const stateKeys = storageKey
            .replace(APP_PREFIX, '')
            .toLowerCase()
            .split('.')
            .map((key) =>
              key
                .split('-')
                .map((token, index) =>
                  index === 0
                    ? token
                    : token.charAt(0).toUpperCase() + token.slice(1)
                )
                .join('')
            );
          let currentStateRef = state;
          stateKeys.forEach((key, index) => {
            if (index === stateKeys.length - 1) {
              currentStateRef[key] = JSON.parse(
                localStorage.getItem(storageKey)
              );
              return;
            }
            currentStateRef[key] = currentStateRef[key] || {};
            currentStateRef = currentStateRef[key];
          });
        }
        return state;
      }, {});
    }

    return [];
  }

  setItem(key: string, value: any) {
    this.storage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string) {
    return this.storage.getItem(`${APP_PREFIX}${key}`)
      ? JSON.parse(this.storage.getItem(`${APP_PREFIX}${key}`))
      : null;
  }

  removeItem(key: string) {
    this.storage.removeItem(`${APP_PREFIX}${key}`);
  }

  /** Tests that localStorage exists, can be written to, and read from. */
  testLocalStorage() {
    const testValue = 'testValue';
    const testKey = 'testKey';
    const errorMessage = 'localStorage did not return expected value';

    this.setItem(testKey, testValue);
    const retrievedValue = this.getItem(testKey);
    this.removeItem(testKey);

    if (retrievedValue !== testValue) {
      throw new Error(errorMessage);
    }
  }
}
