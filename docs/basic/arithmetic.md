# 算法

## 深拷贝
### 简易版
>例子
```javascript
const deepClone = (target, map = new WeakMap()) => {
    if (typeof target !== "object" || target === null) {
        return target;
    }
    const hit = map.get(target);
    if (hit) {
        return hit
    }
    const copy = (Array.isArray(target) || target instanceof Array) ? [] : {}
    map.set(target, copy)
    for (let key in target) {
        copy[key] = deepClone(target[key], map)
    }
    return copy
}

```
### 完整版
>例子
```javascript
const completeDeepClone = function (target, map = new WeakMap()) {
    const isObject = target => target !== null 
        && (typeof target === 'object' || typeof target === 'function')
    
    if (!isObject(target)) return target

    // 获取target实例
    const getInit = target => {
        const Ctro = target.constructor
        return new Ctro()
    }
    // 获取target类型
    const getTypes = (type) => {
        const types = {
            // 不可遍历对象
            '[object Number]': 'numberTag',
            '[object String]': 'stringTag',
            '[object Boolean]': 'booleanTag',
            '[object Function]': 'functionTag',
            '[object Date]': 'dateTag',
            '[object Symbol]': 'symbolTag',
            '[object RegExp]': 'regExpTag',
            // 可遍历对象
            '[object Object]': 'objectTag',
            '[object Array]': 'arrayTag',
            '[object Map]': 'mapTag',
            '[object Set]': 'setTag',
        }
        return types[type]
    }
    // 判断target是否为可遍历对象
    const isTraerse = (tag) => ['objectTag', 'arrayTag', 'mapTag', 'setTag'].includes(tag)
    // 克隆Symbol对象
    const cloneSymbol = target => Object(Symbol.prototype.valueOf.call(target))
    // 克隆正则对象
    const cloneRegExp = (target) => {
        let partten = target.valueOf()
        let flags = ''
        flags += partten.global ? 'g' : ''
        flags += partten.ignoreCase ? 'i' : ''
        flags += partten.multiline ? 'm' : ''
        return new RegExp(partten.source, flags)
    }
    // 克隆其他类型对象
    const cloneOtherType = (tag) => {
        const Ctor = target.constructor
        switch (tag) {
            case 'numberTag':
            case 'stringTag':
            case 'booleanTag':
            case 'dateTag':
                return new Ctor(target)
            case 'functionTag':
                return target
            case 'symbolTag':
                return cloneSymbol(target)
            case 'regExpTag':
                return cloneRegExp(target)
        }
    }

    const tag = getTypes(Object.prototype.toString.call(target))
    const result = getInit(target)

    if (isTraerse(tag)) {
        if (map.get(target)) return map.get(target)
        map.set(target, result)
        if (['objectTag', 'arrayTag'].includes(tag)) {
            for (let i in target) {
                result[i] = completeDeepClone(target[i], map)
            }
        } else if (tag === 'mapTag') {
            target.forEach((value, key) => {
                result.set(key, completeDeepClone(value, map))
            })
        } else {
            target.forEach(value => {
                result.add(value)
            })
        }
        return result
    } else {
        return cloneOtherType(tag)
    }
}
```

## 排序算法
### 冒泡排序
>例子
```javascript
function bubble(list) {
    if (!list.length || !Array.isArray(list)) return
    let n = list.length
    let result = [...list]
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            let temp = result[j + 1]
            if (temp < result[j]) {
                result[j + 1] = result[j]
                result[j] = temp
            }
        }
    }
    return result
}

/** 冒泡排序优化：
 *  冒泡排序总会执行(N-1)+(N-2)+...+2+1趟，但是冒泡排序会出现在中途某一趟
 *  就已经完成排序，或者数组本身就是一个有序数组的情况，这时后边的比较就是多余的
 *  解决方法是添加一个flag来判断排序是否完成，当某一趟排序没有任何元素交换的时候，
 *  说明已经完成排序
 */
function bubbleOptimze(list) {
    if (list.length === 0) return []
    let result = [...list]
    for (let i = 0; i < result.length; i++) {
        let flag = true
        for (let j = 0; j < result.length - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                flag = false
                let temp = result[j]
                result[j] = result[j + 1]
                result[j + 1] = temp
            }
        }
        if (flag) break
    }
    return result
}
```

### 快速排序
>例子
```javascript
function quickSort(array) {
    if (array.length <= 1) return array
    const key = array[0]
    let left = []
    let right = []
    for (let i = 1; i < array.length; i++) {
        if (array[i] <= key) left.push(array[i])
        else right.push(array[i])
    }
    const result = [...quickSort(left), key, ...quickSort(right)]
    return result
}

/**
 * 快速排序优化：
 * 上述快排实现方法每次会新开两个数组，占据新的内存空间，
 * 如果数据量过大，可能会造成内存溢出，优化方案：利用指针和数组下标，
 * 用元素交换的方式实现快排
 */
function quincSortOptimized(data, start, end) {
    if (start < end) {
        let pos = start - 1
        for (let i = start; i <= end; i++) {
            let key = data[end]
            if (data[i] <= key) {
                pos++
                let temp = data[pos]
                data[pos] = data[i]
                data[i] = temp
            }
        }
        quincSortOptimized(data, start, pos - 1)
        quincSortOptimized(data, pos + 1, end)
    }
    return data
}
const arr = [0, -1, 1, -2, 2]
const end = arr.length - 1
quincSortOptimized(arr, 0, end) // => [-2, -1, 0, 1, 2]
```
### 归并排序
建立在归并操作上的一种排序算法，该算法采用分治法，先将数组分为很多有序的子序列，
再将子序列合并，得到一个完整的序列，若将两个有序表合并成一个有序表，称为二路归并 
>例子
```javascript
function mergeSort(array) {
    if (array.length <= 1) return array
    const middleIndex = array.length / 2 | 0
    const left = array.slice(0, middleIndex)
    const right = array.slice(middleIndex, array.length)
    return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
    const result = []
    while (left.length && right.length) {
        left[0] <= right[0] ? result.push(left.shift()) : result.push(right.shift())
    }
    while (left.length) result.push(left.shift())
    while (right.length) result.push(right.shift())

    return result
}
```

## 防抖
在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
>例子
```javascript
const debounce = function (fn, wait = 500) {
    let timer
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
```

## 节流
规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
>例子
```javascript
// 定时器方案
const trottleTimer = function (fn, wait = 500) {
    let timer
    return function (...args) {
        if (timer) return
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, args)
        }, wait)
    }
}
// 时间戳方案
const trottleDate = function (fn, wait = 500) {
    let oldTime = Date.now()
    return function (...args) {
        let nowTime = Date.now()
        if (nowTime - date < wait) return
        else {
            oldTime = Date.now()
            fn.apply(this, args)
        }

    }
}
```

## 字符串全排列
输入：permute('abc') => 输出：['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
>例子
```javascript
const permute = string => {
    const strArr = string.split('')
    if (string.length === 2) {
        return [strArr[0] + strArr[1], strArr[1] + strArr[0]]
    }
    let result = []
    for (let i = 0; i < strArr.length; i++) {
        let key = strArr[i]
        let temp = JSON.parse(JSON.stringify(strArr))
        temp.splice(i, 1)
        let subsring = temp.join('')
        let subPermute = _permute(subsring)
        subPermute.forEach(item => {
            let str = key + item
            result.push(str)
        })
    }
    return result
}
```

## 数组去重
>例子
```javascript
/** 方法1
 * 利用es6的Set和...语法
*/
const unique1 = array => {
    return [...new Set(array)]
}

/**
 * 方法2
 * 利用es6的Set和Array.from
 * Array.from: 将一个类数组对象或者可遍历对象转换成一个真正的数组
*/
const unique2 = array => {
    return Array.from(new Set(array))
}

/**
 * 方法3
 * 利用forEach循环,此处可用的方法用find,findIndex,includes,indexOf
*/
const unique3 = array => {
    const result = []
    array.forEach(el => {
        if(result.findIndex(item => item === el) === -1){
            result.push(el)
        }
    });
    return result
}

/**
 * 方法4
 * 利用Map/WeekMap属性名不可重复的特点
*/
const unique4 = array => {
    const result = []
    const resultMap = new Map()
    array.forEach(el => {
        if (!resultMap.has(el)) {
            resultMap.set(el, true)
            result.push(el)
        }
    });
    return result
}

/**
* 方法5
* 利用对象属性名不可重复的特点
*/
const unique5 = array => {
    const result = []
    const obj = {}
    array.forEach(el => {
        if (!obj[el]) {
            obj[el] = true
            result.push(el)
        }
    });
    return result
}

/**
 * 方法6
 * 利用reduce和includes
*/
const unique6 = array => {
    const result = array.reduce((pre, cur) => {
        if (!pre.includes(cur)) pre.push(cur)
        return pre
    }, [])
    return result
}

/**
 * 方法7
 * 利用双循环
*/
const unique7 = array => {
    let result = JSON.parse(JSON.stringify(array))
    let length = result.length
    for(let i = 0; i < length; ) {
        for(let j = i+1; j < length; ) {
            if(result[i] === result[j]) {
                result.splice(j, 1)
                length--
            }
            j++
        }
        i++
    }
    
    return result
}
```

## 数组交集
>例子
```javascript
function union(arr1, arr2) {
    let result = []
    arr1.forEach(item => {
        if (arr2.includes(item) && !result.includes(item)) result.push(item)
    });
    return result
}
```

## 寄生组合式继承
>例子
```javascript
function Human(name) {
    this.name = name
    this.kingdom = 'animal'
    this.color = ['yellow', 'white', 'brown', 'black']
}

Human.prototype.getName = function () {
    return this.name
}

function Chinese(name, age) {
    Human.call(this, name)
    this.age = age
    this.color = 'yellow'
}

Chinese.prototype = Object.create(Human.prototype)

Object.defineProperty(Chinese.prototype, 'constructor', {
    writable: false,
    enumerable: false,
    configurable: false,
    value: Chinese
})

Chinese.prototype.getAge = function () {
    return this.age
}
```

## 将对象数组还原为树状结构
>例子
```javascript
/**
 * 需求：有一个对象数组，每个子项都包含id和parentId两个字段，将他还原树状结构
 * [ { id: 0, parentId: -1 }, { id: 1, parentId: 0 }] 
 * => [{ id: 0, parentId: -1, children: [ { id: 1, parentId: 0 } ] }]
*/
function transferToTree(data) {
    const result = []
    const map = {}
    data.forEach(item => {
        map[item.id] = item
    })
    data.forEach(item => {
        if (map[item.parentId]) {
            map[item.parentId].children ?
                map[item.parentId].children.push(item) :
                map[item.parentId].children = [item]
        } else {
            result.push(item)
        }
    })

    return result
}
```

<!-- ## 
>例子
```javascript
``` -->
