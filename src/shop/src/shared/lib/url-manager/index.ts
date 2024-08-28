'use client';

export class ParamManager {
  static readParams(window?: Window) {
    if (!window) return {};

    return Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );
  }

  static setParam(window: Window, key: string, value: string) {
    const url = new URL(window.location.href);

    url.searchParams.set(key, value);

    window.history.replaceState({}, '', url);
  }

  static removeParam(window: Window, key: string) {
    let url = new URL(window.location.href);
    url.searchParams.delete(key);
    window.history.replaceState({}, '', url);
  }
}
