export namespace LocalStorageManager {
  export function setItem(key: string, value: any) {
    if (typeof value === "string") {
      return localStorage.setItem(key, value);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  export function getItem(key: string) {
    const value = localStorage.getItem(key) ?? null;
    try {
      const parsed = JSON.parse(value!);
      return parsed;
    } catch (error) {
      return value;
    }
  }

  export function removeItem(key: string) {
    localStorage.removeItem(key);
  }

  export function clear() {
    localStorage.clear();
  }
}
