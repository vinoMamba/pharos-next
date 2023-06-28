import {CACHE_TIME} from "./constant";
import {Memory} from "./memory";
import {createLocalStorage, createSessionStorage} from "./storageCache";
import type {UserInfo} from "/#/store";

interface BasicStore {
  TOKEN_KEY: string | number | null | undefined;
  USER_INFO_KEY: UserInfo;
  ROLES_KEY: string[];
}

type LocalStore = BasicStore;
type SessionStore = BasicStore;
export type BasicKeys = keyof BasicStore;

type LocalKeys = keyof LocalStore;
export type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();
console.log(ss);

const localMemory = new Memory(CACHE_TIME);
const sessionMemory = new Memory(CACHE_TIME);
console.log(sessionMemory);

export class CacheStore {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }
  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && ls.clear();
  }
}
