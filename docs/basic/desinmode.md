# 设计模式
## 发布订阅模式
发布者不直接触及到订阅者、而是由统一的第三方（中介）来完成实际的通信的操作，这种叫做发布-订阅模式。
>例子
```javascript
class EventEmitter {
    constructor() {
        this.emitter = {}
    }

    on(eventName, callBack) {
        if (!this.emitter[eventName]) {
            this.emitter[eventName] = [callBack]
        } else {
            this.emitter[eventName].push(callBack)
        }
    }

    emit(eventName, ...args) {
        this.emitter[eventName] && this.emitter[eventName].forEach(callBack => {
            callBack(...args)
        });
    }

    uninstall(eventName, fn) {
        if (this.emitter[eventName]) {
            let fnIndex = this.emitter[eventName].findIndex(cFn => cFn === fn)
            if (fnIndex !== -1) this.emitter[eventName].splice(fnIndex, 1)
            else delete this.emitter[eventName]
        }
    }

    once(eventName, fn) {
        const handler = (...args) => {
            this.uninstall(eventName, handler)
            fn(...args)
        }
        this.on(eventName, handler)
    }
}
```
## 观察者模式
发布者维护一个观察者列表，发布任务时将任务信息通知观察者
>例子
```javascript
class Subject {
    constructor(name) {
        this.name = name
        this.state = '干饭'
        this.observerdList = []
    }
    setObserver(ob) {
        this.observerdList.push(ob)
    }
    setState(state) {
        this.state = state
        this.observerdList.forEach(ob => {
            ob.update(`${this.name}正在${this.state}`)
        })
    }
}

class Observer {
    update(info) {
        window.console.log(info)
    }
}
```
## 单例模式 
如果一个类只允许创建一个对象（或者实例），那这个类就是一个单例类，这种设计模式就叫作单例设计模式，从业务概念上，如果有些数据在系统中只应保存一份，那就比较适合设计为单例类
>例子
``` javascript
class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
        this.prop = 'value';
    }
    method() {
        console.log(this.prop);
    }
}
```
## 工厂模式 
工厂模式即对创建对象逻辑的封装，或者可以简单理解为对new的封装，这种封装就像创建对象的工厂，故名工厂模式
>例子
``` javascript
class User {
    constructor(name, auth) {
        this.name = name
        this.auth = auth
    }
}

class UserFactory {
    static createUser(name, auth) {
        //工厂内部封装了创建对象的逻辑:
        //权限为admin时,auth=1, 权限为user时, auth为2
        //使用者在外部创建对象时,不需要知道各个权限对应哪个字段, 不需要知道赋权的逻辑，只需要知道创建了一个管理员和用户
        if (auth === 'admin') new User(name, 1)
        if (auth === 'user') new User(name, 2)
    }
}

const admin = UserFactory.createUser('cxk', 'admin');
const user = UserFactory.createUser('cxk', 'user');
```


