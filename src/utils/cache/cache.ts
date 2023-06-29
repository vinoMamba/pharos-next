import {toRaw} from "vue";
import {CACHE_TIME} from "./constant";
import {Memory} from "./memory";
import {createLocalStorage} from "./storageCache";
import type {UserInfo} from "/#/store";
import type {PROJ_CFG_KEY, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY} from "/@/enums/cacheEnum";
import type {ProjectConfig} from "/#/config";
import {APP_LOCAL_CACHE_KEY} from "/@/enums/cacheEnum";

interface BasicStore {
  [TOKEN_KEY]: string;
  [USER_INFO_KEY]: UserInfo | null;
  [ROLES_KEY]: string[];
  [PROJ_CFG_KEY]: ProjectConfig;
}

type LocalStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;

const ls = createLocalStorage();

const localMemory = new Memory(CACHE_TIME);



export class CacheStore {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }

  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false) {
    localMemory.set(key, toRaw(value));
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key);
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && ls.clear();
  }
}


function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY);
  localCache && localMemory.resetCache(localCache);
}
initPersistentMemory();
