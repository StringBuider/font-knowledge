# 基于 Proxy 的响应系统

## 基本原理
```javascript
// 普通对象缓存
const toProxy = new WeakMap()
// proxy对象缓存
const toRaw = new WeakMap()
function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}
function reactive(data) {
    if(!isObject(data)) return data
    if(toProxy.has(data)) return toProxy.get(data)
    if(toRaw.has(data)) return data
    const obsvered = new Proxy(data, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            return isObject(res) ? reactive(res) : res
        },
        set(target, key,value, receiver) {
            const res = Reflect.set(target, key,value, receiver)
            console.log(key + '更新!')
            return res
        },
        deleteProperty(target, key) {
            // 删除
            const res = Reflect.deleteProperty(target, key) //返回一个布尔值
            console.log(`delete key ${key}, result: ${res}`)
            return res
        }
    })
    toProxy.set(data, obsvered)
    toRaw.set(obsvered, data)
    return obsvered
}
```
