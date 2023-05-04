# 微前端
## 我们选择的方案
我们采用阿里qiankun库2.x版本作为初版微前端解决方案
([什么是微前端/qiankun是什么](https://v1.qiankun.umijs.org/zh/guide/))

官方网站:[https://qiankun.umijs.org/zh](https://qiankun.umijs.org/zh)

## 我们有哪些价值场景
- 各产品管理/运营端灵活聚合<br>

- 技术栈无关性，为未来接入三方系统提供更多可能性<br>

- 独立开发，独立部署，每一个微应用都可独立运行<br>

- 增量升级:在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略

- 独立运行时:每个微应用之间状态隔离，运行时状态不共享，将巨石应用拆解成若干可以自治的松耦合微应用
  
## 如何接入
### 微应用
- [qiankun2.x微应用官方快速上手](https://qiankun.umijs.org/zh/guide/getting-started#%E5%BE%AE%E5%BA%94%E7%94%A8)

- url模式（[是什么？](../tips/url-mode.html)）<br>
>如果你使用vue，可参照以下例子，其他框架请自行查阅文档
```javascript
// RouterMode = 'hash' | 'history' | 'abstract'
  router = new VueRouter({
    mode: 'hash',
    //__POWERED_BY_QIANKUN__ 来自qiankun包或你可以全局自定义
    base: window.__POWERED_BY_QIANKUN__ ? '/microApp/child-front/' : '/',
    routes,
  });
```

::: warning 为什么我们这样配base？举个栗子🌰
**主应用中的微应用list页路由：**

    https://www.x.com/microApp/child-front/xxx/list
**独立部署的子应用xlist页路由：**

    https://www.x.com/xxx/list
    
以上两种路由同时有效互不干扰
:::
    
#### 路由&页面聚合
>为了提供给主应用集成的能力，请注意微应用前端路由的[配置规范/约定](../standard/micro-frontends-route.html)


### 主应用
- [qiankun2.x主应用官方快速上手](https://qiankun.umijs.org/zh/guide/getting-started#1-%E5%AE%89%E8%A3%85-qiankun)<br>


- 想体验可下载我们的[demo工程](http://xxx.com.cn/)

### 版本管理 [（是什么？）](../standard/micro-frontends-version-control.html)
