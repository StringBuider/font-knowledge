//配置文件的入口文件
const { resolve } = require('path')
module.exports = {
    title: '小张的共享文档',
    description: '🤔你有什么想说？写进来吧！😎',
    base: './',
    port: 8099,
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@as': resolve(__dirname, './assets'),
                '@imgs': resolve(__dirname, './assets/imgs'),
                '@basic': resolve(__dirname, './assets/basic')
            }
        }
    },
    themeConfig: {
        smoothScroll: true,
        plugins: [],
        nav: [
            { text: '首页', link: '/' },
            {
                text: '指南',
                items: [
                    { text: '参与写作', link: '/guide/getting-started.md' },
                    { text: '微前端', link: '/guide/micro-frontends.md' },
                    { text: '微前端FAQ', link: '/guide/micro-frontends-faq.md' },
                    { text: '工作流', link: '/guide/git-flow.md' }
                ]
            },
            {
                text: '规范',
                items: [
                    { text: '微前端-路由规范', link: '/standard/micro-frontends-route.md' },
                    { text: '微前端-版本管理', link: '/standard/micro-frontends-version-control.md' },
                    { text: 'TypeScript规范', link: '/standard/typescript.md' },
                    { text: '代码分支管理', link: '/standard/code-version-control.md' }
                ],
            },
            {
                text: 'tips',
                items: [
                    { text: 'url模式', link: '/tips/url-mode.md' }
                ]
            },
            {
                text: '插件',
                items: [
                    { text: '插件分享', link: '/plugins/plugin.md' }
                ]
            },
            {
                text: 'vue2.x',
                link: '/vue2/prepare/'
            },
            {
                text: 'vue3.x',
                items: [
                    { text: '组件的本质', link: '/vue3/essence-of-comp.md' },
                    { text: '把VNode解剖一下', link: '/vue3/vnode.md' },
                    { text: '辅助创建 VNode 的 h 函数', link: '/vue3/h.md' },
                    { text: '响应式原理', link: '/vue3/observer.md' },
                    { text: '渲染器之挂载', link: '/vue3/renderer.md' },
                    { text: '渲染器之patch', link: '/vue3/renderer-patch.md' },
                    { text: '渲染器的核心 Diff 算法', link: '/vue3/renderer-diff.md' },
                    { text: '自定义渲染器', link: '/vue3/renderer-advanced.md' }
                ]
            },
            {
                text: '前端八股文',
                items: [
                    { text: '八股文', link: '/basic/basic.md' },
                    { text: '算法', link: '/basic/arithmetic.md' },
                    { text: '设计模式', link: '/basic/desinmode.md' },
                ]
            },
            {
                text: '面试经验',
                items: [
                    { text: '面试经验', link: '/interview/interview.md' },
                ]
            },
        ],
        sidebar: {
            '/standard/': [
                {
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        'micro-frontends-route',
                        'micro-frontends-version-control',
                        'typescript',
                        'code-version-control'
                    ]
                },
            ],
            '/guide/': [
                {
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        'getting-started',
                        'micro-frontends',
                        'micro-frontends-faq',
                        'git-flow'
                    ]
                },
            ],
            '/tips/': [
                {
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        'url-mode'
                    ]
                },
            ],
            '/plugins/': [
                {
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        'plugin'
                    ]
                },
            ],
            '/vue2/': [
                {
                    title: '准备工作',
                    collapsable: false,
                    children: [
                        ['prepare/', 'Introduction'],
                        'prepare/flow',
                        'prepare/directory',
                        'prepare/build',
                        'prepare/entrance'
                    ]
                },
                {
                    title: '数据驱动',
                    collapsable: false,
                    children: [
                        ['data-driven/', 'Introduction'],
                        'data-driven/new-vue',
                        'data-driven/mounted',
                        'data-driven/render',
                        'data-driven/virtual-dom',
                        'data-driven/create-element',
                        'data-driven/update'
                    ]
                },
                {
                    title: '组件化',
                    collapsable: false,
                    children: [
                        ['components/', 'Introduction'],
                        'components/create-component',
                        'components/patch',
                        'components/merge-option',
                        'components/lifecycle',
                        'components/component-register',
                        'components/async-component'
                    ]
                },
                {
                    title: '深入响应式原理',
                    collapsable: false,
                    children: [
                        ['reactive/', 'Introduction'],
                        'reactive/reactive-object',
                        'reactive/getters',
                        'reactive/setters',
                        'reactive/next-tick',
                        'reactive/questions',
                        'reactive/computed-watcher',
                        'reactive/component-update',
                        'reactive/props',
                        'reactive/summary'
                    ]
                },
                {
                    title: '编译',
                    collapsable: false,
                    children: [
                        ['compile/', 'Introduction'],
                        'compile/entrance',
                        'compile/parse',
                        'compile/optimize',
                        'compile/codegen'
                    ]
                },
                {
                    title: '扩展',
                    collapsable: false,
                    children: [
                        ['extend/', 'Introduction'],
                        'extend/event',
                        'extend/v-model',
                        'extend/slot',
                        'extend/keep-alive',
                        'extend/tansition',
                        'extend/tansition-group'
                    ]
                },
                {
                    title: 'Vue Router',
                    collapsable: false,
                    children: [
                        ['vue-router/', 'Introduction'],
                        'vue-router/install',
                        'vue-router/router',
                        'vue-router/matcher',
                        'vue-router/transition-to'
                    ]
                },
                {
                    title: 'Vuex',
                    collapsable: false,
                    children: [
                        ['vuex/', 'Introduction'],
                        'vuex/init',
                        'vuex/api',
                        'vuex/plugin'
                    ]
                }
            ],
            '/vue3/': [
                {
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        'essence-of-comp',
                        'vnode',
                        'h',
                        'observer',
                        'renderer',
                        'renderer-patch',
                        'renderer-diff',
                        'renderer-advanced',
                    ]
                },
            ],
            '/basic/': [
                {
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        'basic',
                        'arithmetic',
                        'desinmode',
                    ]
                },
            ],
            '/interview/': [
                {
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        'interview',
                    ]
                },
            ],
        }
    }
}
