'use client';

export class ParamManager {
  static readParams(window?: Window & typeof globalThis) {
    if (!window) return {};

    return Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );
  }

  static setParam(
    window: Window & typeof globalThis,
    key: string,
    value: string
  ) {
    const url = new URL(window.location.href);

    url.searchParams.set(key, value);

    window.history.replaceState({}, '', url);
  }
}
