export type TCacheType = 'memory' | 'session' | 'local'

class MemoryStorage {
  #storage: Record<string, string> = {}

  get length () {
    return Object.keys(this.#storage).length
  }

  key (index: number): string | null {
    const keys = Object.keys(this.#storage)
    if (index > keys.length - 1) {
      return null
    }
    return keys[index]
  }

  getItem (key: string): string | null {
    if (Object.prototype.hasOwnProperty.call(this.#storage, key)) {
      return this.#storage[key]
    } else return null
  }

  setItem (key: string, value: string): void {
    this.#storage[key] = value
  }

  removeItem (key: string): void {
    if (Object.prototype.hasOwnProperty.call(this.#storage, key)) {
      delete this.#storage[key]
    }
  }

  clear (): void {
    this.#storage = {}
  }
}

const memoryStorage = new MemoryStorage()
const cacheNames = new Set<string>()

export default class Dache {
  #type: TCacheType
  #name: string
  #storage: Storage

  constructor (type: TCacheType, name: string) {
    this.#type = type
    this.#name = name

    const cacheName = `_${this.#type}_${this.#name}`
    if (cacheNames.has(cacheName)) {
      console.warn(`Cache: duplicated ${this.#type} cache instance name "${name}".`)
    } else {
      cacheNames.add(cacheName)
    }

    switch (this.#type) {
      case 'memory':
        this.#storage = memoryStorage
        break
      case 'session':
        this.#storage = window.sessionStorage
        break
      case 'local':
        this.#storage = window.localStorage
    }
  }

  #prefix (key: string) {
    return this.#name + '_' + key
  }

  get <T> (key: string): T | null {
    const str = this.#storage.getItem(this.#prefix(key))
    if (typeof str !== 'string') {
      return null
    }

    try {
      const parseRes = JSON.parse(str)
      try {
        return JSON.parse(parseRes)
      } catch (err) {
        return parseRes
      }
    } catch (err) {
      if (typeof str === 'string') {
        return str as T
      } else return null
    }
  }

  set (key: string, value: any) {
    if (value === undefined) {
      return
    }
    return this.#storage.setItem(this.#prefix(key), JSON.stringify(value))
  }

  remove (key: string) {
    return this.#storage.removeItem(this.#prefix(key))
  }

  clear () {
    return this.#storage.clear()
  }

  has (key: string) {
    return this.get(key) !== null
  }

  is (key: string, value: any) {
    return value === this.get(key)
  }
}
