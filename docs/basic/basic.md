# 八股文

## 变量提升与函数提升
1. js代码执行前引擎会先进行预编译，预编译期间会将变量声明（使用var声明的变量）与函数声明提升至其对应作用域的最顶端。
2. 变量提升只提升声明，不提升赋值
3. 与变量提升不同，函数提升不仅仅提升函数声明，而是提升函数整体
4. 在提升的过程中，相同的函数会覆盖上一个函数
5. 函数优先于变量提升，也就是说函数声明会覆盖变量声明，但不会覆盖变量赋值。
```javascript
// 例1
var getName = function () {
    console.log(1)
}
function getName() {
    console.log(2)
}
getName() // => 输出1

// 例2
console.log(drink) // => 输出函数体 ƒ drink() { console.log('drink') }
function drink() {
    console.log('drink')
}
var drink = '饮料'
console.log(drink) // => '饮料'
```

## 隐式类型转换
如何让a == 1 && a == 2 && a==3 成立
>原理解析:
a是一个对象，JS中，当复杂类型和数字做比较时，会先调用复杂类型的valueOf方法，获取类型的原始值，
如果得到的是一个基本类型则直接返回原始值，如果得到的不是一个基本类型，则继续调用toString方法, 
得到string类型之后返回。
```javascript
// 方法一：重写valueOf
let a = {
    i: 0,
    valueOf: function () { return ++this.i }
}

console.log(a == 1 && a == 2 && a == 3) // => true

// 方法二：重写toString

let b = {
    i: 0,
    toString: function () { return ++this.i }
}

console.log(b == 1 && b == 2 && b == 3) // => true

// 区别
// 方法一是在a对象调用valueOf方法时劫持，而方法二原理是：转换类型时，发现a是一个复杂类型，调用valueOf方法，
// 返回时object类，不是一个基本类型，再调用toString方法，这个时候，我们劫持了toString方法，在toString方法中写我们的逻辑。
```

## 事件委托
>利用事件冒泡，把子元素的事件都绑定到父元素上，不必每个子节点单独设置事件监听器。如果子元素阻止了事件冒泡，那么委托就无法实现。
```javascript
// 点击li，li内的内容增加一个.
let main = document.getElementsByTagName('ul')[0]
main.onclick = function (event) {
    if (event.target.nodeName === 'LI') event.target.innerHTML = event.target.innerHTML + '.'
}
```

## 闭包
>闭包其实就是一个可以访问其他函数内部变量的函数。创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以 访问到当前函数的局部变量。闭包产生的本质就是：当前环境中存在指向父级作用域的引用
因为通常情况下，函数内部变量是无法在外部访问的（即全局变量和局部变量的区别），因此使用闭包的作用，就具备实现了能在外部访问某个函数内部变量的功能，让这些内部变量的值始终可以保存在内存中。下面我们通过代码先来看一个简单的例子
```javascript
function fun1() {
	var a = 1;
	return function(){
		console.log(a);
	};
}
const result = fun1();
result();  // 1

// 结合闭包的概念，我们把这段代码放到控制台执行一下，就可以发现最后输出的结果是 1（即 a 变量的值）。
// 那么可以很清楚地发现，a 变量作为一个 fun1 函数的内部变量，正常情况下作为函数内的局部变量，是无法被外部访问到的。
// 但是通过闭包，我们最后还是可以拿到 a 变量的值 
```
**闭包有两个常用的用途**
+ 闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，我们可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
+ 函数的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。
>其实闭包的本质就是作用域链的一个特殊的应用，只要了解了作用域链的创建过程，就能够理解闭包的实现原理。
```javascript
let a = 1
// fn 是闭包
function fn() {
  console.log(a);
}

function fn1() {
  let a = 1
  // 这里也是闭包
  return () => {
    console.log(a);
  }
}
const fn2 = fn1()
fn2() 
```
>大家都知道闭包其中一个作用是访问私有变量，就比如上述代码中的 fn2 访问到了 fn1 函数中的变量 a。但是此时 fn1 早已销毁，我们是如何访问到变量 a 的呢？不是都说原始类型是存放在栈上的么，为什么此时却没有被销毁掉？

<img src="@basic/scope.jpg" width="800" />

>可以看到，变量被存放到了函数的内部的对象 `[[Scopes]]` 中，该对象是被存放在堆上的，其中包含了闭包、全局对象等等内容，因此我们能通过闭包访问到本该销毁的变量。

## 作用域与作用域链
+ 作用域： 作用域是定义变量的区域，它有一套访问变量的规则，这套规则来管理浏览器引擎如何在当前作用域以及嵌套的作用域中根据变量（标识符）进行变量查找
+ 作用域链： 作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环境的变量和 函数。
>作用域链的本质上是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前 端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象。
+ 当我们查找一个变量时，如果当前执行环境中没有找到，我们可以沿着作用域链向后查找
+ 作用域链的创建过程跟执行上下文的建立有关
> 作用域可以理解为变量的可访问性，总共分为三种类型，分别为：
+ 全局作用域
+ 函数作用域
+ 块级作用域，ES6 中的 `let`、`const` 就可以产生该作用域

一旦我们将这些作用域嵌套起来，就变成了另外一个重要的知识点「作用域链」，也就是 JS 到底是如何访问需要的变量或者函数的。

+ 首先作用域链是在定义时就被确定下来的，和箭头函数里的 this 一样，后续不会改变，JS 会一层层往上寻找需要的内容。
+ 其实作用域链这个东西我们在闭包小结中已经看到过它的实体了：`[[Scopes]]`
<img src="@basic/scope.jpg" width="800" />

图中的 `[[Scopes]]` 是个数组，作用域的一层层往上寻找就等同于遍历 `[[Scopes]]`。

**1. 全局作用域** 
>全局变量是挂载在 window 对象下的变量，所以在网页中的任何位置你都可以使用并且访问到这个全局变量
```javascript
var globalName = 'global';
function getName() { 
  console.log(globalName) // => global
  var name = 'inner'
  console.log(name) // => inner
} 
getName();
console.log(name); // 
console.log(globalName); // => global
function setName(){ 
  vName = 'setName';
}
setName();
console.log(vName); // => setName 
```
+ 从这段代码中我们可以看到，globalName 这个变量无论在什么地方都是可以被访问到的，所以它就是全局变量。而在 getName 函数中作为局部变量的 name 变量是不具备这种能力的
+ 当然全局作用域有相应的缺点，我们定义很多全局变量的时候，会容易引起变量命名的冲突，所以在定义变量的时候应该注意作用域的问题。

**2. 函数作用域** 
>函数中定义的变量叫作函数变量，这个时候只能在函数内部才能访问到它，所以它的作用域也就是函数的内部，称为函数作用域
```javascript
function getName () {
  var name = 'inner';
  console.log(name); // => inner
}
getName();
console.log(name); 
```
>除了这个函数内部，其他地方都是不能访问到它的。同时，当这个函数被执行完之后，这个局部变量也相应会被销毁。所以你会看到在 getName 函数外面的 name 是访问不到的

**3. 块级作用域** 
>ES6 中新增了块级作用域，最直接的表现就是新增的 let 关键词，使用 let 关键词定义的变量只能在块级作用域中被访问，有“暂时性死区”的特点，也就是说这个变量在定义之前是不能被使用的。

在 JS 编码过程中 `if 语句` 及 `for 语句` 后面 `{...}` 这里面所包括的，就是块级作用域

```javascript
console.log(a) // a is not defined
if(true){
  let a = '123'；
  console.log(a)； // 123
}
console.log(a) // a is not defined 
```
>从这段代码可以看出，变量 a 是在 `if 语句{...}` 中由 `let 关键词` 进行定义的变量，所以它的作用域是 if 语句括号中的那部分，而在外面进行访问 a 变量是会报错的，因为这里不是它的作用域。所以在 if 代码块的前后输出 a 这个变量的结果，控制台会显示 a 并没有定义

**需要注意的是，js 采用的是静态作用域，所以函数的作用域在函数定义时就确定了。**

## 事件循环
<img src="@basic/event-loop.jpg" width="800" />

+ 默认代码从上到下执行，执行环境通过`script`来执行（宏任务）
+ 在代码执行过程中，调用定时器 `promise` `click`事件...不会立即执行，需要等待当前代码全部执行完毕
+ 给异步方法划分队列，分别存放到微任务（立即存放）和宏任务（时间到了或事情发生了才存放）到队列中
+ `script`执行完毕后，会清空所有的微任务
+ 微任务执行完毕后，会渲染页面（不是每次都调用）
+ 再去宏任务队列中看有没有到达时间的，拿出来其中一个执行
+ 执行完毕后，按照上述步骤不停的循环

## 原型和原型链
prototype和__proto__

```javascript
function F() {}
var f = F()
F.prototype // {constructor: f}
f.__proto__ // {constructor: f}
F.prototype === f.__proto__ // true
F.prototype.constructor = F //true
```
以上代码说明了这些问题
1. **prototype**: js中每个函数都有prototype属性，此属性指向该函数的原型对象
2. **\_\_proto\_\_**: js中每一个对象(null除外),都有一个__proto__属性，包括函数创建的对象，函数自身，原型对象，都有一个__proto__属性,
               指向了创建该对象的函数的原型F.prototype
3. **constructor**： 该属性属于原型对象，指向相关的构造函数

>那么Object.prototype的__proto__又指向那儿呢？<br>
Object.prototype.\_\_proto\_\_ ===> null<br>
Object.prototype的__proto__指向了null,说明了null是原型链的顶端

>原型链:
原型链由原型对象组成，每个对象都有__proto__属性，指向了创建该对象的构造函数的原型，__proto__将对象连接起来
组成了原型链。<br>
原型链最常用的使用场景就是属性查找，比如你说想访问某个对象的某个属性，如果对象自身不存在该属性，则沿着原型链往上一级
查找，找到则输出，不存在时，则继续沿着原型链往上一级查找，知道最顶级的原型对象Object.prototype，如果还是没有找到，则
输出Undefined

<img src="@basic/prototype.jpg" width="800" />

## MyPromise
>js手写实现一个Promise
```javascript
class MPromise {
    constructor(handle) {
        this.MState = "pending";
        this.MResult = undefined;
        this.resovleQueue = [];
        this.rejectQueue = [];
        handle(this._resolve.bind(this), this._reject.bind(this))
    }
    _resolve(val) {
        this.MState = 'fulfilled';
        this.MResult = val;
        let ob;
        const run = () => {
            let cb;
            while (cb = this.resovleQueue.shift()) {
                cb && cb(val)
            }
            ob.disconnect()
        }
        ob = new MutationObserver(run);
        ob.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute("isTrigger", "true");
    };
    _reject(err) {
        this.MState = 'rejected';
        this.MResult = err
        let ob;
        const run = () => {
            let cb;
            while (cb = this.rejectQueue.shift()) {
                cb && cb(err)
            }
            ob.disconnect()
        }
        ob = new MutationObserver(run);
        ob.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute("isTrigger", "true");
    }
    then(onResolve, onReject) {
        return new MPromise((resolve, reject) => {
            let resolveFn = function (val) {
                let result = onResolve(val)
                if (result instanceof MPromise) {
                    result.then(resolve, reject)
                } else {
                    resolve(result)
                }
            }
            this.resovleQueue.push(resolveFn)

            let rejectFn = function (err) {
                let error = onReject(err)
                if (error instanceof MPromise) {
                    error.then(reject);
                } else {
                    reject(error);
                }
            }
            this.rejectQueue.push(rejectFn)
        })
    }

    static resolve(val) {
        if (val instanceof MPromise) {
            return val
        }
        return new MPromise((resolve) => resolve(val))
    }

    static reject(err) {
        return new MPromise((resolve, reject) => reject(err))
    }

    static race(lists) {
        return new MPromise((resolve, reject) => {
            lists.forEach(p => {
                p.then(res => {
                    resolve(res)
                }, rej => {
                    reject(rej)
                })
            });
        })
    }

    static all(lists) {
        return new MPromise((resolve, reject) => {
            let num = 0
            let allReslve = []
            lists.forEach(p => {
                p.then(res => {
                    allReslve.push(res)
                    num++
                    if (num >= lists.length) {
                        resolve(allReslve)
                    }
                }, err => {
                    reject(err)
                    throw p
                })
            });
        })
    }

    static allSettled(lists) {
        return new MPromise((resolve, reject) => {
            let num = 0
            let allResult = []

            lists.forEach((p, key) => {
                let obj = {};
                p.then(res => {

                    obj['status'] = "fulfilled";
                    obj['value'] = res;
                    allResult[key] = obj;
                    num++;
                    if (num >= lists.length) {
                        resolve(allResult);
                    }
                }, err => {
                    obj['status'] = "reject";
                    obj['value'] = err;
                    allResult[key] = obj;
                    num++;
                    if (num >= lists.length) {
                        resolve(allResult);
                    }
                })
            });
        })
    }

    finally(callback) {
        return this.then(
            (res) => MPromise.resolve(callback()).then(() => res),
            (err) => MPromise.resolve(callback()).then(() => { })
        )
    }
}
```

## new操作符做了什么
> 1. 创建一个空对象newObj
> 2. 将空对象newObj的prototype指向构造函数的prototype
> 3. 执行构造函数
> 4. 判断构造函数是否返回了一个对象，是则返回该对象，否则返回对象newObj
```javascript
const _new = function (Fn, ...args) {
    // 创建一个空对象
    const newObj = Object.create(null)
    // 将空对象得prototype指向构造函数的prototype
    Object.setPrototypeOf(newObj, Fn.prototype)
    // 执行构造函数
    let result = Fn.apply(newObj, args)
    // 如果result是一个object则返回，否则返回对象newObj
    return result instanceof Object ? result : newObj
}
```
## 手写实现Object.create方法
>Object.create() 方法用于创建一个新对象,使用现有的对象来作为新创建对象的原型(prototype)
```javascript
const myCreate = proto => {
    const Fn = function () { }
    Fn.prototype = proto
    return new Fn()
}
```

## 手写实现Object.freeze方法
>Object.freeze() 方法用于冻结一个对象。一个被冻结的对象再也不能被修改，冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。
```javascript
const myFreeze = object => {
    Object.keys(object).forEach(key => {
        Object.defineProperty(object, key, {
            writable: false, //表示能否修改属性的值。默认值为false。
            configurable: false, //表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性
            enumerable: false, //表示能否通过for in循环访问属性，默认值为false
            value: object[key]
        })
    })
    // 封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置
    Object.seal(object)
}
```

## 手写实现call方法
>代码实现
```javascript
Function.prototype.myCall = function (obj, ...arg) {
    obj = obj ?? window
    const fn = Symbol()
    obj[fn] = this
    const res = obj[fn](...arg)
    delete obj[fn]
    return res
}
```

## 手写实现apply方法
>代码实现
```javascript
Function.prototype.myApply = function (obj, args) {
    obj = obj ?? window
    const fn = Symbol()
    obj[fn] = this
    obj[fn](...args)
    delete obj[fn]
    return res
}
```

## 手写实现bind方法
>代码实现
```javascript
Function.prototype.myBind = function (obj, ...args) {
    const context = this
    const bound = function () {
        return context.apply(this instanceof context ? this : obj, args.concat(Array.from(arguments)))
    }

    const fn = function () { }
    fn.prototype = this.prototype
    bound.prototype = new fn()
    bound.prototype.constructor = bound
    return bound
}
```

## 手写实现Array.filter方法
>代码实现
```javascript
Array.prototype.myFilter = function (fn) {
    if (typeof fn !== 'function') throw new Error(`${fn} is not a function`)
    let result = []
    // this.forEach((item, i) => {
    //     result.push(fn(item, i, this))
    // })
    // 使用for循环，防止Array.prototype.forEach函数被改写
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i], i, this))
            result.push(this[i])
    }
    return result
}
```

## 手写实现Array.map方法
>代码实现
```javascript
Array.prototype._map = function (fn) {
    if (typeof fn !== 'function') throw new Error(`${fn} is not a function`)
    let result = []
    for (let i = 0; i < this.length; i++) {
        result.push(fn(this[i], i, this))
    }
    return result
}
```

## 手写实现Array.reduce方法
>代码实现
```javascript
Array.prototype.myReduce = function (fn, init) {
    if (arguments.length === 0) return undefined
    if (arguments.length === 1) {
        if (typeof arguments[0] !== 'function') {
            throw new Error(`${arguments[0]} is not a function`)
        } else if (this.length === 0) {
            throw new Error('Reduce of empty array with no initial value')
        }
    }
    if (this.length === 0) return init

    let accumlator = init ?? this[0]
    let currentIndex = init ? 0 : 1

    for (currentIndex; currentIndex < this.length; currentIndex++) {
        accumlator = fn(accumlator, this[currentIndex], currentIndex, this)
    }
    return accumlator
}
```

## 手写实现typeof方法
>代码实现
```javascript
function myTypeof(obj) {
    if (obj === null) return String(obj)
    let classObj = {}
    'Array Date RegExp Object Error String Number Boolean'.split(' ').forEach(e => classObj[`[object ${e}]`] = e.toLowerCase())
    return typeof obj === 'object' ? classObj[Object.prototype.toString.call(obj)] || 'object' : typeof obj
}
```

## 手写实现instanceof方法
`instanceof` 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`
>代码实现
```javascript

// 循环
const _instanceof = (target, Fn) => {
    let proto = target.__proto__
    const prototype = Fn.prototype
    while (true) {
        if (proto === prototype) return true
        if (proto === null) return false
        proto = proto.__proto__
    }
}

// 递归
const _instanceof2 = (target, Fn) => {
    if (target.__proto__ === Fn.prototype) return true
    else if (Fn.prototype) return _instanceof2(target, Fn.prototype)
    else return false
}
```
