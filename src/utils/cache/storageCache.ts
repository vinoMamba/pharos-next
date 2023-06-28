import {AESEncryption} from "./cipher"
import {CACHE_TIME} from "./constant"

export interface StorageCache {
  key: string
  storage: Storage
  hasEncrypt: boolean
  timeout?: Nullable<number>
}

export const createStorage = ({
  key = '_11111000001111',
  storage = sessionStorage,
  timeout = null,
  hasEncrypt = true

}: Partial<StorageCache>) => {
  const encryption = new AESEncryption(key)

  const WebStorage = class WebStorage {
    storage: Storage
    encryption: AESEncryption
    hasEncrypt: boolean

    constructor() {
      this.storage = storage
      this.encryption = encryption
      this.hasEncrypt = hasEncrypt
    }

    set(key: string, value: any, expire: Nullable<number> = timeout) {
      const strData = JSON.stringify({
        value,
        time: Date.now(),
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null
      })
      const setValue = this.hasEncrypt ? this.encryption.encryptByAES(strData) : strData
      this.storage.setItem(key, setValue)
    }

    get(key: string, defaultValue?: any) {
      const val = this.storage.getItem(key)
      if (!val) return defaultValue
      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val
        const data = JSON.parse(decVal)
        const {value, expire} = data
        if (expire === null || expire >= new Date().getTime()) {
          return value
        }
        this.remove(key)
      } catch (e) {
        return defaultValue
      }
    }

    remove(key: string) {
      this.storage.removeItem(key)
    }

    clear() {
      this.storage.clear()
    }
  }

  return new WebStorage()
}

export const createLocalStorage = () => {
  return createStorage({
    storage: localStorage,
    timeout: CACHE_TIME,
  })
}

export const createSessionStorage = () => {
  return createStorage({
    storage: sessionStorage,
    timeout: CACHE_TIME,
  })
}
