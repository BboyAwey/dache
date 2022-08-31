# Dache

Use memory,session storagy or local storage to cache things.

## Install

```sh
# NPM
npm install @awey/dache --save

# Yarn
yarn add @awey/dache
```

## Useage

```ts
import Dache from 'dache'

const dache = new Dache('local', 'myDache')
dache.set('username', 'Tom')

console.log(dache.get('username'))
```

## API

* `new Dache(type: 'memory' | 'session' | 'local', name: string) => Dache`: init a Dache instance
* `dache.get(key: string) => any`: retrieve a value by key from cache
* `dache.set(key: string, value: any) => void`: store a value by key to cache
* `dache.remove(key: string) => void`: delete a value by key from cache
* `dache.clear() => void`: clear all values in cache
* `dache.has(key: string)`: determines whether a key exists(not null)
* `dache.is(key: string, value: any)`: determines whether a value is equal(===) to the specified value
