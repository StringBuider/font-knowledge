# 微前端-路由规范
## 配置
::: warning 注意
如果你希望全部路由/功能无需改动顺利被主应用接入，请一定使用`相对路径！！`  
:::
>例子
```javascript
//这可能是你的route配置
export default [
  {
    path: "/",
    component: AppLayout,
    meta: {
      label: "首页"
    },
    children: [
      {
        path: "",
        component: Home,
        meta: {
          label: "默认主页"
        }
      },
       //其他业务路由
      ...appRoutes

    ]
  },

//appRoutes
{
    path: "business",
    // 为主应用中的微应用提供专属Layout
    component: window.__POWERED_BY_QIANKUN__ ? MicroFrontendLayout : Layout,
    meta: {
      label: "我的业务",
      icon: "fa fa-cog"
    },
    children: [{
      path: "partOne",
      component: partOne,
      meta: {
        title: "第一部分"
      }
    }]
  },

```


## 页面聚合
**为了隐去子应用页面菜单等多余部分，为主应用中的微应用提供专属Layout**<br>
>例如上面route配置的Layout 可能有如下结构
```vue
<!-- 原工程该有的结构  Layout.vue-->
<template>
  <div>
    <!--侧边栏-->
    <sidebar />
    <div>
      <div>
        <!--顶部导航栏-->
        <navbar />
        <tags-view/>
      </div>
      <!--主页面-->
      <app-main />
    </div>
  </div>
</template>
import { AppMain, Navbar, Sidebar, TagsView } from '@/components'
export default {  
    components: {
        AppMain,
        Navbar,
        Sidebar,
        TagsView
    },  
}

<!-- 为主应用提供的结构 MicroFrontendLayout.vue-->
<template>
  <keep-alive :include="routeNames">
    <router-view />
  </keep-alive>
</template>

```

## 效果
**子应用**
<img :src="$withBase('/images/micro-child.png')" alt="fooo">
**迁入微前端后**
<img :src="$withBase('/images/micro-father.png')" alt="fooo">
